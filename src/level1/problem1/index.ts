export type Value = string | number | boolean | null | undefined |
  Date | Buffer | Map<unknown, unknown> | Set<unknown> |
  Array<Value> | { [key: string]: Value };

/**
 * Transforms JavaScript scalars and objects into JSON
 * compatible objects.
 */
export function serialize(value: Value): unknown {
  /**
   * insert your code here
   */
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (value instanceof Date) {
    return { __t: "Date", __v: value.getTime() };
  }

  if (Buffer.isBuffer(value)) {
    return { __t: "Buffer", __v: Array.from(value) };
  }

  if (value instanceof Map) {
    return {
      __t: "Map",
      __v: Array.from(value.entries()),
    };
  }

  if (value instanceof Set) {
    return {
      __t: "Set",
      __v: Array.from(value.values()),
    };
  }

  if (Array.isArray(value)) {
    return value.map(serialize);
  }

  if (typeof value === "object") {
    const obj: { [key: string]: unknown } = {};
    for (const key in value) {
      obj[key] = serialize(value[key]);
    }
    return obj;
  }

  return value;
}

/**
 * Transforms JSON compatible scalars and objects into JavaScript
 * scalar and objects.
 */
export function deserialize<T = unknown>(value: unknown): T {
  /**
   * insert your code here
   */

  if (value === undefined || value === null) {
    return value as T;
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value as T;
  }

  if (typeof value === "object" && value !== null && "__t" in value) {
    const type = (value as any).__t;
    const val = (value as any).__v;

    if (type === "Date") {
      return new Date(val) as T;
    }

    if (type === "Buffer") {
      return Buffer.from(val) as T;
    }

    if (type === "Map") {
      return new Map(val) as T;
    }

    if (type === "Set") {
      return new Set(val) as T;
    }
  }

  if (Array.isArray(value)) {
    return value.map(deserialize) as T;
  }

  if (typeof value === "object") {
    const obj: { [key: string]: unknown } = {};
    for (const key in value) {
      obj[key] = deserialize(value[key]);
    }
    return obj as T;
  }

  return value as T;
}
