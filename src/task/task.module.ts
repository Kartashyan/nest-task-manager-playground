import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompleteTaskHandler } from './application/command/complete-task.handler';
import { CreateTaskHandler } from './application/command/create-task.handler';
import { FindTaskByIdQueryHandler } from './application/query/find-task-by-id.query-handler';
import { FindTasksHandler } from './application/query/find-tasks.query-handler';
import { TaskQueryPort } from './application/query/task.query.port';
import { TaskRepositoryPort } from './domain/task.repository';
import { TaskOrmEntity } from './infra/orm/task.orm-entity';
import { TaskQueryAdapter } from './infra/task-query.type-orm.adapter';
import { TaskRepositoryTypeOrmAdapter } from './infra/task-repository.type-orm.adapter';
import { TaskController } from './interface/task.controller';

const commandHandlers: Provider[] = [CreateTaskHandler, CompleteTaskHandler];
const queryHandlers: Provider[] = [FindTasksHandler, FindTaskByIdQueryHandler];

const application: Provider[] = [...commandHandlers, ...queryHandlers];

const infrastructure: Provider[] = [
  {
    provide: TaskQueryPort,
    useClass: TaskQueryAdapter
  },
  {
    provide: TaskRepositoryPort,
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

