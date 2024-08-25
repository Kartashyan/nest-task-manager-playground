export class UpdateTaskCommand {
    constructor(public readonly id: string, public readonly update: Partial<{ name: string; description: string }>) { }
}