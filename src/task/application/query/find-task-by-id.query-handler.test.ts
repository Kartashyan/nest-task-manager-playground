import { Test } from '@nestjs/testing';
import { FindTaskByIdQuery } from './find-task-by-id.query';
import { FindTaskByIdQueryHandler } from './find-task-by-id.query-handler';
import { TaskQueryPort } from './task.query.port';

describe('FindTaskByIdQueryHandler', () => {
    let handler: FindTaskByIdQueryHandler;
    let taskQueryPort: TaskQueryPort;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                FindTaskByIdQueryHandler,
                {
                    provide: TaskQueryPort,
                    useValue: {
                        findById: jest.fn(),
                    },
                },
            ],
        }).compile();

        handler = moduleRef.get<FindTaskByIdQueryHandler>(FindTaskByIdQueryHandler);
        taskQueryPort = moduleRef.get<TaskQueryPort>(TaskQueryPort);
    });

    it('should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('execute', () => {
        it('should call taskQueryPort.findById with the correct query', async () => {
            const query: FindTaskByIdQuery = {
                id: '1',
            };

            await handler.execute(query);

            expect(taskQueryPort.findById).toHaveBeenCalledWith(query);
        });

        it('should return the result of taskQueryPort.findById', async () => {
            const query: FindTaskByIdQuery = {
                id: '1',
            };

            const expectedResult = { id: '1', name: 'Test Task', description: 'Test Description' };
            (taskQueryPort.findById as jest.Mock).mockResolvedValue(expectedResult);

            const result = await handler.execute(query);

            expect(result).toEqual(expectedResult);
        });
    });
});