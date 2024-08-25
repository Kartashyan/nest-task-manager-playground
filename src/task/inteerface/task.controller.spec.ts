import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskDto } from '../dto/create-task.dto';
import { FindTasksRequestQueryString } from './dto/find-tasks-request-query-string';
import { CreateTaskCommand } from '../application/command/create-task.command';
import { FindTasksQuery } from '../application/query/find-tasks.query';

describe('TaskController', () => {
  let controller: TaskController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should execute CreateTaskCommand with the correct parameters', async () => {
      const createTaskDto: CreateTaskDto = {
        name: 'Test Task',
        description: 'Test Description',
      };

      await controller.create(createTaskDto);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateTaskCommand(createTaskDto.name, createTaskDto.description),
      );
    });

    it('should return a success message after creating a task', async () => {
      const createTaskDto: CreateTaskDto = {
        name: 'Test Task',
        description: 'Test Description',
      };

      const result = await controller.create(createTaskDto);

      expect(result).toEqual({ message: 'Task created' });
    });
  });

  describe('find', () => {
    it('should execute FindTasksQuery with the correct parameters', async () => {
      const query: FindTasksRequestQueryString = {
        skip: 0,
        take: 10,
      };

      await controller.find(query);

      expect(queryBus.execute).toHaveBeenCalledWith(
        new FindTasksQuery(query),
      );
    });

    it('should return the result of the query bus execution', async () => {
      const query: FindTasksRequestQueryString = {
        skip: 0,
        take: 10,
      };

      const expectedResult = [{ id: 1, name: 'Test Task', description: 'Test Description' }];
      (queryBus.execute as jest.Mock).mockResolvedValue(expectedResult);

      const result = await controller.find(query);

      expect(result).toEqual(expectedResult);
    });
  });
});
