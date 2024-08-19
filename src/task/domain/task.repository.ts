import { Task } from "./task.entity";

export interface TaskRepository {
    save(task: Task): Promise<void>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | undefined>;
}