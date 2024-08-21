import { FindTaskByIdResult } from "./find-task.query-result";
import { FindTasksQuery } from "./find-tasks.query";
import { FindTasksQueryResult } from "./find-tasks.query-result";

export interface TaskQueryPort {
    findById: (id: string) => Promise<FindTaskByIdResult | null>;
    find: (query: FindTasksQuery) => Promise<FindTasksQueryResult>;
  }