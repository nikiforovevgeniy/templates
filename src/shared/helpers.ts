export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== undefined && value !== null;
};
export const isNotDefined = <T>(
  value: T | null | undefined
): value is null | undefined => {
  return !isDefined(value);
};

export const isUndefined = <T>(value: T | undefined): value is undefined => {
  return value === undefined;
};
export const isNotUndefined = <T>(value: T | undefined): value is T => {
  return !isUndefined(value);
};

export const isNull = <T>(value: T | null): value is null => {
  return value === null;
};
export const isNotNull = <T>(value: T | null): value is T => {
  return !isNull(value);
};

export const isMap = <T>(
  value: T | Map<unknown, unknown>
): value is Map<unknown, unknown> => {
  return value instanceof Map;
};
export const isNotMap = <T>(value: T | Map<unknown, unknown>): value is T => {
  return !isMap(value);
};
export const isEmptyMap = (
  value: Map<unknown, unknown>
): value is Map<unknown, never> => {
  return value.size === 0;
};

export const isSet = <T>(value: T | Set<unknown>): value is Set<unknown> => {
  return value instanceof Set;
};
export const isNotSet = <T>(value: T | Set<unknown>): value is T => {
  return !isSet(value);
};
export const isEmptySet = (value: Set<unknown>): value is Set<never> => {
  return value.size === 0;
};

export const isArray = <T>(value: T | unknown[]): value is unknown[] => {
  return Array.isArray(value);
};
export const isNotArray = <T>(value: T | unknown[]): value is T => {
  return !isArray(value);
};
export const isEmptyArray = (value: unknown[]): value is never[] => {
  return value.length === 0;
};

export const isObject = <T>(
  value: T | Record<string, unknown>
): value is Record<string, unknown> => {
  return (
    typeof value === 'object' &&
    isNotNull(value) &&
    isNotArray(value) &&
    isNotMap(value) &&
    isNotSet(value)
  );
};
export const isNotObject = <T>(
  value: T | Record<string, unknown>
): value is T => {
  return !isObject(value);
};
export const isEmptyObject = (
  value: object
): value is Record<string, never> => {
  return Object.keys(value).length === 0;
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};
export const isNotBoolean = <T>(value: T | boolean): value is T => {
  return !isBoolean(value);
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};
export const isNotString = <T>(value: T | string): value is T => {
  return !isString(value);
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};
export const isNotNumber = <T>(value: T | number): value is T => {
  return !isNumber(value);
};

type EmptyString = '';
type EmptyArray = never[];
type EmptyObject = Record<string, never>;
type EmptySet = Set<never>;
type EmptyMap = Map<unknown, never>;
type Empty =
  | EmptyString
  | EmptyArray
  | EmptyMap
  | EmptySet
  | EmptyObject
  | null
  | undefined;
type ISEmpty<T> = T extends string
  ? EmptyString
  : T extends unknown[]
    ? EmptyArray
    : T extends Map<unknown, unknown>
      ? EmptyMap
      : T extends Set<unknown>
        ? EmptySet
        : T extends object
          ? EmptyObject
          : never;
export const isEmpty = <T>(
  value: T | Empty
): value is ISEmpty<T> | null | undefined => {
  switch (true) {
    case isUndefined(value):
    case isNull(value):
    case isMap(value) && isEmptyMap(value):
    case isSet(value) && isEmptySet(value):
    case isArray(value) && isEmptyArray(value):
    case isObject(value) && isEmptyObject(value):
    case value === '':
      return true;
    default:
      return false;
  }
};
export const isNotEmpty = <T>(value: T | Empty): value is T => {
  return !isEmpty(value);
};
