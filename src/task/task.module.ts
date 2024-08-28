import { Module, Provider } from '@nestjs/common';
import { TaskController } from './interface/task.controller';
import { TASK_QUERY_ADAPTER, TASK_REPOSITORY_ADAPTER } from './application/di-map';
import { TaskRepositoryTypeOrmAdapter } from './infra/task-repository.type-orm.adapter';
import { CreateTaskHandler } from './application/command/create-task.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from './infra/orm/task.orm-entity';
import { TaskQueryAdapter } from './infra/task-query.type-orm.adapter';
import { FindTasksHandler } from './application/query/find-tasks.query-handler';
import { CompleteTaskHandler } from './application/command/complete-task.handler';
import { FindTaskByIdQueryHandler } from './application/query/find-task-by-id.query-handler';
import { TaskQueryPort } from './application/query/task.query.port';

const commandHandlers: Provider[] = [CreateTaskHandler, CompleteTaskHandler];
const queryHandlers: Provider[] = [FindTasksHandler, FindTaskByIdQueryHandler];

const application: Provider[] = [...commandHandlers, ...queryHandlers];

const infrastructure: Provider[] = [
  {
    provide: TaskQueryPort,
    useClass: TaskQueryAdapter
  },
  {
    provide: TASK_REPOSITORY_ADAPTER,
    useClass: TaskRepositoryTypeOrmAdapter,
  }
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'tasks.db',
      entities: [TaskOrmEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TaskOrmEntity]),
  ],
  controllers: [TaskController],
  providers: [...application, ...infrastructure],
})
export class TaskModule { }

