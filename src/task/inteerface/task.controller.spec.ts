import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskCommand } from '../application/command/create-task.command';
import { UpdateTaskCommand } from '../application/command/update-task.command';
import { FindTaskByIdQuery } from '../application/query/find-task-by-id.query';
import { FindTasksQuery } from '../application/query/find-tasks.query';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { FindTasksRequestQueryString } from './dto/find-tasks-request-query-string';
import { TaskController } from './task.controller';

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
  describe('findOne', () => {
    it('should call QueryBus with the correct FindTaskByIdQuery', async () => {
      const taskId = '1';
      const expectedTask = { id: taskId, name: 'Test Task', description: 'Test Description' };

      jest.spyOn(queryBus, 'execute').mockResolvedValue(expectedTask);

      const result = await controller.findOne(taskId);

      expect(queryBus.execute).toHaveBeenCalledWith(new FindTaskByIdQuery(taskId));
      expect(result).toEqual(expectedTask);
    });
  });

  describe('update', () => {
    it('should call CommandBus with the correct CompleteTaskCommand', async () => {
      const taskId = '1';
      const updateTaskDto: UpdateTaskDto = {
        description: "Test Description",
      };

      await controller.update(taskId, updateTaskDto);

      expect(commandBus.execute).toHaveBeenCalledWith(new UpdateTaskCommand(taskId, updateTaskDto));
    });
  });
});
