type Primitive = string | number | boolean;

type SingleValue<T extends Primitive | Date> = {
    value: T;
};

type ValueObjectProps<T> = T extends Primitive | Date ? SingleValue<T> : T;


export abstract class ValueObject<T> {
    protected readonly props: ValueObjectProps<T>;

    constructor(props: ValueObjectProps<T>) {
        Object.freeze(this);
        this.validate(props);
        this.props = props;
    }

    equals(valueObject: ValueObject<T>): boolean {
        if (valueObject === null || valueObject === undefined) {
            return false;
        }
        if (valueObject.props === undefined) {
            return false;
        }
        return this.props === valueObject.props;
    }
    protected abstract validate(props: ValueObjectProps<T>): boolean;
}