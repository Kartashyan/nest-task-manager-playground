import { InjectRepository } from "@nestjs/typeorm";
import { TaskQueryPort } from "../application/query/task.query.port";
import { Task, TaskProps } from "../domain/task.entity";
import { TaskOrmEntity } from "./orm/task.orm-entity";
import { Repository } from "typeorm";
import { FindTasksQuery } from "../application/query/find-tasks.query";
import { FindTasksQueryResult } from "../application/query/find-tasks.query-result";
import { FindTaskByIdResult } from "../application/query/find-task.query-result";
import { Injectable } from "@nestjs/common";
import { FindTaskByIdQuery } from "../application/query/find-task-by-id.query";

@Injectable()
export class TaskQueryAdapter implements TaskQueryPort {
    constructor(
        @InjectRepository(TaskOrmEntity)
        private readonly dataSource: Repository<TaskOrmEntity>
    ) { }

    async find(query: FindTasksQuery): Promise<FindTasksQueryResult> {
        return { tasks: await this.dataSource.find(query) };
    }

    async findById(query: FindTaskByIdQuery): Promise<FindTaskByIdResult | null> {
        return this.dataSource.findOneBy(query) ?? null;
    }
}