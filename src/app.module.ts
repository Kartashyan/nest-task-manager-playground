import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from './task/infra/orm/task.orm-entity';

@Module({
  imports: [
    TaskModule
  ],
})
export class AppModule { }
