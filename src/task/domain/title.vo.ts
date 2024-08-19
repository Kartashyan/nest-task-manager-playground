import { ValueObject, ValueObjectProps } from "src/libs/value-object.abstract";

export class Title extends ValueObject<string> {
    constructor(title: string) {
        super({ value: title });
    }
    protected validate(title: ValueObjectProps<string>): void {
        if (title.value.length < 1) {
            throw new Error('Title must have at least 1 character');
        }
    }
    get value(): string {
        return this.props.value;
    }
}