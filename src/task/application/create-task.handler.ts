import { TaskRepositoryPort } from "src/task/domain/task.repository";
import { CreateTaskCommand } from "./create-task.command";
import { Task } from "src/task/domain/task.entity";
import { EntityId } from "src/libs/entity-id.vo";
import { Title } from "src/task/domain/title.vo";
import { CommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { TASK_REPOSITORY_ADAPTER } from "./di-map";

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler {
    constructor(
        @Inject(TASK_REPOSITORY_ADAPTER)
        private readonly taskRepository: TaskRepositoryPort
    ) { }
    async execute(command: CreateTaskCommand): Promise<void> {
        const taskProps = {
            id: new EntityId(),
            title: new Title(command.name),
            description: command.description,
            isCompleted: false,
        };
        const task = new Task(taskProps);
        await this.taskRepository.save(task);
    }
}