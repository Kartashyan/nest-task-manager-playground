import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindTasksQuery } from "./find-tasks.query";
import { TaskQueryPort } from "./task.query.port";
import { FindTasksQueryResult } from "./find-tasks.query-result";
import { Inject } from "@nestjs/common";
import { TASK_QUERY_ADAPTER } from "../di-map";

@QueryHandler(FindTasksQuery)
export class FindTasksHandler implements IQueryHandler<FindTasksQuery, FindTasksQueryResult> {
  constructor(
    @Inject(TASK_QUERY_ADAPTER)
    private readonly taskDataSource: TaskQueryPort
) {}

  async execute(query: FindTasksQuery): Promise<FindTasksQueryResult> {
    return this.taskDataSource.find(query);
  }
}