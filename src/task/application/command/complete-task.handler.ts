import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TaskRepositoryPort } from "src/task/domain/task.repository";
import { CompleteTaskCommand } from "./complete-task.command";

@CommandHandler(CompleteTaskCommand)
export class CompleteTaskHandler implements ICommandHandler<CompleteTaskCommand, void> {
    constructor(
        @Inject(TaskRepositoryPort)
        private readonly taskRepository: TaskRepositoryPort
    ) { }
    async execute(command: CompleteTaskCommand): Promise<void> {
        const task = await this.taskRepository.findById(command.id);
        if (task === null) {
            throw new NotFoundException('Task not found');
        }
        task.completeTask();
        await this.taskRepository.save(task);
    }
}