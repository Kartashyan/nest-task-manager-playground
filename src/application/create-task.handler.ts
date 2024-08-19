import { TaskRepository } from "src/domain/task.repository";
import { CreateTaskCommand } from "./create-task.command";
import { Task } from "src/domain/task.entity";
import { EntityId } from "src/libs/entity-id.vo";
import { Title } from "src/domain/title.vo";

export class CreateTaskHandler {
    constructor(private readonly taskRepository: TaskRepository) { }
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