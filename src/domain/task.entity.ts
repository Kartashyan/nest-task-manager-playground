import { EntityId } from "src/libs/entity-id.vo";

export class Task {
    constructor(
        private readonly id: EntityId,
        private title: string,
        private description: string,
        private isCompleted: boolean,
    ) { }
    completeTask() {
        this.isCompleted = true;
    }
    getId() {
        return this.id;
    }
}
