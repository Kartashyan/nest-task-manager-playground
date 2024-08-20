export class CreateTaskCommand {
    constructor(
      public readonly name: string,
      public readonly description: string,
    ) {}
  }