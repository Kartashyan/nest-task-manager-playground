import { IQueryResult } from '@nestjs/cqrs';

export class FindTaskByIdResult implements IQueryResult {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}