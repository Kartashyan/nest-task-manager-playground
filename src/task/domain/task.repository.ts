import { Task } from "./task.entity";

export interface TaskRepositoryPort {
    save(task: Task): Promise<void>;
    findById(id: string): Promise<Task | null>;
}