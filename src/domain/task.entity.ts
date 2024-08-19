import { EntityId } from "src/libs/entity-id.vo";
import { Title } from "./title.vo";

export type TaskProps = {
    id: EntityId;
    title: Title;
    description: string;
    isCompleted: boolean;
};

export class Task {
    private readonly id: EntityId;
    private title: Title;
    private description: string;
    private isCompleted: boolean;

    constructor(props: TaskProps) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.isCompleted = props.isCompleted;
    }

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
