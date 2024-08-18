import { TaskRepository } from "src/domain/task.repository";
import { CreateTaskCommand } from "./create-task.command";
import { Task } from "src/domain/task.entity";
import { EntityId } from "src/libs/entity-id.vo";

export class CreateTaskHandler {
    constructor(private readonly taskRepository: TaskRepository) { }
    async execute(command: CreateTaskCommand): Promise<void> {
        const task = new Task(new EntityId(), command.name, command.description, false);
        await this.taskRepository.save(task);
    }
}