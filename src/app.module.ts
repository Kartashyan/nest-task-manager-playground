import { Module } from '@nestjs/common';
import "reflect-metadata";
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TaskModule
  ],
})
export class AppModule { }
