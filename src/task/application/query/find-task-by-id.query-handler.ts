import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindTaskByIdQuery } from "./find-task-by-id.query";
import { TaskQueryPort } from "./task.query.port";
import { FindTaskByIdResult } from "./find-task.query-result";
import { Inject } from "@nestjs/common";
import { TASK_QUERY_ADAPTER } from "../di-map";

@QueryHandler(FindTaskByIdQuery)
export class FindTaskByIdQueryHandler implements IQueryHandler<FindTaskByIdQuery> {
  constructor(
    @Inject(TASK_QUERY_ADAPTER)
    private readonly taskQueryPort: TaskQueryPort
) {}

  async execute(query: FindTaskByIdQuery): Promise<FindTaskByIdResult> {
    return await this.taskQueryPort.findById(query);
  }
}