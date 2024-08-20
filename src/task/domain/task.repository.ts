import { Task } from "./task.entity";

export interface TaskRepositoryPort {
    save(task: Task): Promise<void>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
}