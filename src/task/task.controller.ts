import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './application/command/create-task.command';

@Controller('task')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    this.commandBus.execute(new CreateTaskCommand(createTaskDto.name, createTaskDto.description));
  }

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

  }

  @Patch(':id/complete-task')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {

  }
}
