import { IQueryResult } from '@nestjs/cqrs';

export class FindTasksQueryResult implements IQueryResult {
  constructor(
    readonly tasks: Readonly<{
      id: string;
      title: string;
      description: string;
      isCompleted: boolean;
    }>[],
  ) {}
}
