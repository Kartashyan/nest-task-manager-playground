export interface ValueObject<T> {
    equals(valueObject: ValueObject<T>): boolean;
    value: T;
}