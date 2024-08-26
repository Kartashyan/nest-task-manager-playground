import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CompleteTaskCommand } from "./complete-task.command";
import { TaskRepositoryPort } from "src/task/domain/task.repository";
import { TASK_REPOSITORY_ADAPTER } from "../di-map";
import { Inject, NotFoundException } from "@nestjs/common";

@CommandHandler(CompleteTaskCommand)
export class CompleteTaskHandler implements ICommandHandler<CompleteTaskCommand, void> {
    constructor(
        @Inject(TASK_REPOSITORY_ADAPTER)
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