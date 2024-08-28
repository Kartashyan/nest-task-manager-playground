import { Inject } from "@nestjs/common";
import { CommandHandler } from "@nestjs/cqrs";
import { EntityId } from "src/libs/entity-id.vo";
import { Task } from "src/task/domain/task.entity";
import { TaskRepositoryPort } from "src/task/domain/task.repository";
import { Title } from "src/task/domain/title.vo";
import { TaskQueryPort } from "../query/task.query.port";
import { CreateTaskCommand } from "./create-task.command";

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler {
    constructor(
        @Inject(TaskQueryPort)
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