import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityId } from "src/libs/entity-id.vo";
import { Repository } from "typeorm";
import { Task } from "../domain/task.entity";
import { TaskRepositoryPort } from "../domain/task.repository";
import { Title } from "../domain/title.vo";
import { TaskOrmEntity } from "./orm/task.orm-entity";

@Injectable()
export class TaskRepositoryTypeOrmAdapter implements TaskRepositoryPort {
    constructor(
        @InjectRepository(TaskOrmEntity)
        private readonly dataSource: Repository<TaskOrmEntity>
    ) {
        console.log("TaskRepositoryTypeOrmAdapter created");
    }
    private toOrmEntity(task: Task): TaskOrmEntity {
        return {
            id: task.getId().value,
            title: task.getTitle().value,
            description: task.getDescription(),
            isCompleted: task.getIsCompleted(),
        };
    }

    private toDomainEntity(taskOrmEntity: TaskOrmEntity): Task {
        return new Task({
            id: new EntityId(taskOrmEntity.id),
            title: new Title(taskOrmEntity.title),
            description: taskOrmEntity.description,
            isCompleted: taskOrmEntity.isCompleted,
        });
    }

    async save(task: Task): Promise<void> {
        const taskOrmEntity = this.toOrmEntity(task);
        await this.dataSource.save(taskOrmEntity);
    }

    async findAll(): Promise<Task[]> {
        const tasks = await this.dataSource.find();
        return tasks.map((task) => this.toDomainEntity(task));
    }

    async findById(id: string): Promise<Task | null> {
        const task = await this.dataSource.findOneBy({ id });
        return task ? this.toDomainEntity(task) : null;
    }
}