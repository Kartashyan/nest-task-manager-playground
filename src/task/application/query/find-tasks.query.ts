import { IQuery } from '@nestjs/cqrs';

export class FindTasksQuery implements IQuery {
  readonly skip: number;
  readonly take: number;

  constructor(options: FindTasksQuery) {
    Object.assign(this, options);
  }
}