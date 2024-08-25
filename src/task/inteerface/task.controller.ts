import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from '../application/command/create-task.command';
import { FindTasksQuery } from '../application/query/find-tasks.query';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { FindTasksRequestQueryString } from './dto/find-tasks-request-query-string';
import { CompleteTaskCommand } from '../application/command/complete-task.command';
import { UpdateTaskCommand } from '../application/command/update-task.command';
import { FindTaskByIdQuery } from '../application/query/find-task-by-id.query';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    await this.commandBus.execute(new CreateTaskCommand(createTaskDto.name, createTaskDto.description));
    return { message: 'Task created' };
  }

  @Get()
  async find(@Query() query: FindTasksRequestQueryString) {
    const tasksQuery = new FindTasksQuery(query);
    return await this.queryBus.execute(tasksQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.queryBus.execute(new FindTaskByIdQuery(id));
  }

  @Patch(':id/complete-task')
  async completete(@Param('id') id: string) {
    this.commandBus.execute(new CompleteTaskCommand(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    this.commandBus.execute(new UpdateTaskCommand(id, updateTaskDto));
  }
}
