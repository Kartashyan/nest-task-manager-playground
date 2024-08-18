export class Title {
    constructor(private readonly value: string) {
        if (!this.isValid(value)) {
            throw new Error('Invalid Title');
        }
    }
    protected isValid(value: string): boolean {
        return value.length > 0;
    }
}[]