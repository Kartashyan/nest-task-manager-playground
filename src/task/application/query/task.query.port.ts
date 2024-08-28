import { FindTaskByIdQuery } from "./find-task-by-id.query";
import { FindTaskByIdResult } from "./find-task.query-result";
import { FindTasksQuery } from "./find-tasks.query";
import { FindTasksQueryResult } from "./find-tasks.query-result";

export abstract class TaskQueryPort {
    abstract findById: (query: FindTaskByIdQuery) => Promise<FindTaskByIdResult | null>;
    abstract find: (query: FindTasksQuery) => Promise<FindTasksQueryResult>;
  }