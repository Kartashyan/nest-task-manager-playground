import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CommandBus, IQueryResult, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from '../application/command/create-task.command';
import { FindTasksQuery } from '../application/query/find-tasks.query';
import { FindTasksRequestQueryString } from './dto/find-tasks-request-query-string';

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
  async findTasks(@Query() query: FindTasksRequestQueryString) {
    const tasksQuery = new FindTasksQuery(query);
    return await this.queryBus.execute(tasksQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
  }

  @Patch(':id/complete-task')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {

  }
}
