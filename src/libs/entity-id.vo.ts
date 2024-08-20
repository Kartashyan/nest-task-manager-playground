export class EntityId {
    readonly value: string;
    public readonly isNew: boolean
    constructor(value?: string) {
        if (value === undefined) {
            this.isNew = true;
            this.value = this.generate();
        }
        else {
            this.isNew = false;
            this.value = value;
        }
        if (!this.isValid(this.value)) {
            throw new Error('Invalid EntityId');
        }

    }
    protected generate(): string {
        return crypto.randomUUID();
    }

    protected isValid(value: string): boolean {
        return value.length > 0;
    }
}