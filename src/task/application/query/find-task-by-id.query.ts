import { IQuery } from '@nestjs/cqrs';

export class FindTaskByIdQuery implements IQuery {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}