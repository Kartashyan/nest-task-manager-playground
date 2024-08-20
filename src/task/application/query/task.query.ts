import { FindTaskByIdResult } from "./find-task.query-result";
import { FindTasksQuery } from "./find-tasks.query";
import { FindTasksResult } from "./find-tasks.query-result";

export interface TaskQuery {
    findById: (id: string) => Promise<FindTaskByIdResult | null>;
    find: (query: FindTasksQuery) => Promise<FindTasksResult>;
  }