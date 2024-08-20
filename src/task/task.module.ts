import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TASK_REPOSITORY_ADAPTER } from './application/di-map';
import { TaskRepositoryTypeOrmAdapter } from './infra/task-repository.type-orm.adapter';
import { CreateTaskHandler } from './application/command/create-task.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from './infra/orm/task.orm-entity';

const taskRepository: Provider = {
  provide: TASK_REPOSITORY_ADAPTER,
  useClass: TaskRepositoryTypeOrmAdapter,
};

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'tasks.db',
    entities: [TaskOrmEntity],
    synchronize: true,
  }), TypeOrmModule.forFeature([TaskOrmEntity]), CqrsModule],
  controllers: [TaskController],
  providers: [CreateTaskHandler, taskRepository],
})
export class TaskModule { }

