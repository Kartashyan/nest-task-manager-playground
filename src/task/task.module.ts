import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskController } from './inteerface/task.controller';
import { TASK_QUERY_ADAPTER, TASK_REPOSITORY_ADAPTER } from './application/di-map';
import { TaskRepositoryTypeOrmAdapter } from './infra/task-repository.type-orm.adapter';
import { CreateTaskHandler } from './application/command/create-task.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from './infra/orm/task.orm-entity';
import { TaskQueryAdapter } from './infra/task-query.type-orm.adapter';
import { FindTasksHandler } from './application/query/find-tasks.query-handler';

const commandHandlers: Provider[] = [CreateTaskHandler];
const queryHandlers: Provider[] = [FindTasksHandler];

const application: Provider[] = [...commandHandlers, ...queryHandlers];

const infrastructure: Provider[] = [
  {
    provide: TASK_QUERY_ADAPTER,
    useClass: TaskQueryAdapter
  },
  {
    provide: TASK_REPOSITORY_ADAPTER,
    useClass: TaskRepositoryTypeOrmAdapter,
  }
];

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'tasks.db',
    entities: [TaskOrmEntity],
    synchronize: true,
  }), TypeOrmModule.forFeature([TaskOrmEntity]), CqrsModule],
  controllers: [TaskController],
  providers: [...application, ...infrastructure],
})
export class TaskModule { }

