export class EntityId {
    constructor(private readonly value?: string) {
        if (value === undefined) {
            this.value = this.generate();
        }
        if (!this.isValid(this.value)) {
            throw new Error('Invalid EntityId');
        }

    }
    protected generate(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    protected isValid(value: string): boolean {
        return value.length > 0;
    }
}