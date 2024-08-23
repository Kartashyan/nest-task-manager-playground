import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { CreateTaskHandler } from '../application/command/create-task.handler';
import { FindTasksHandler } from '../application/query/find-tasks.query-handler';
import { Provider } from '@nestjs/common';
import { TASK_QUERY_ADAPTER, TASK_REPOSITORY_ADAPTER } from '../application/di-map';
import { TaskQueryAdapter } from '../infra/task-query.type-orm.adapter';
import { TaskRepositoryTypeOrmAdapter } from '../infra/task-repository.type-orm.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from '../infra/orm/task.orm-entity';
import { CqrsModule } from '@nestjs/cqrs';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
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
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'tasks.db',
        entities: [TaskOrmEntity],
        synchronize: true,
      }), TypeOrmModule.forFeature([TaskOrmEntity]), CqrsModule],
      controllers: [TaskController],
      providers: [...application, ...infrastructure],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
