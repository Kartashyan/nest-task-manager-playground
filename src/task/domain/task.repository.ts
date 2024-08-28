import { Task } from "./task.entity";

export abstract class TaskRepositoryPort {
    abstract save(task: Task): Promise<void>;
    abstract findById(id: string): Promise<Task | null>;
}