export class Task {
    constructor(
        private readonly id: string,
        private title: string,
        private description: string,
        private isCompleted: boolean,
    ) { }
    completeTask() {
        this.isCompleted = true;
    }
}
