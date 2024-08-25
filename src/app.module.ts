import { Module } from '@nestjs/common';
import "reflect-metadata";
import { TaskModule } from './task/task.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    TaskModule, CqrsModule.forRoot()
  ],
})
export class AppModule { }
