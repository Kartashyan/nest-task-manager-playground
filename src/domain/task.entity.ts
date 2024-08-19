import { EntityId } from "src/libs/entity-id.vo";
import { Title } from "./title.vo";

export class Task {
    constructor(
        private readonly id: EntityId,
        private title: Title,
        private description: string,
        private isCompleted: boolean,
    ) { }
    completeTask() {
        this.isCompleted = true;
    }
    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getIsCompleted() {
        return this.isCompleted;
    }
}
