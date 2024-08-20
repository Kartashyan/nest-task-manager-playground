import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [CqrsModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
