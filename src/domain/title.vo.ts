import { ValueObject, ValueObjectProps } from "src/libs/value-object.abstract";

export class Title extends ValueObject<string> {
    protected validate(props: ValueObjectProps<string>): boolean {
        return props.value.length > 0;
    }
}