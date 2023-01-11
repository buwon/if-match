function isFunction(value: any): boolean {
  return typeof value === 'function';
}

function isObject(value: any): boolean {
  return null !== value && 'object' === typeof value;
}

function isArray(value: any): boolean {
  return isObject(value) &&
    'number' === typeof value.length &&
    -1 < value.length &&
    0 == value.length % 1 &&
    Number.MAX_SAFE_INTEGER >= value.length;
}

function isMatch(value: any, target: any): boolean {
  for (const key in target) {
    if (value[key] !== target[key]) return false;
  }

  return true;
}

interface predicateFunc<T> {
  (value: T): boolean;
}

interface handlerFunc<T, output = any> {
  (value: T): output;
}

function matchPattern(value: any, target: any): boolean {
  if (isFunction(target)) {
    return target(value);
  }

  if (isObject(value) && isObject(target)) {
    return isMatch(value, target);
  }

  return value === target;
}

function arrayMatchPattern(value: any, target: any): boolean {
  for (const index in target) {
    if (
      undefined !== target[index] &&
      false === matchPattern(value[index], target[index])
    ) {
      return false;
    }
  }

  return true;
}

function checkTypeMatch(value: any, target: any): boolean {
  if (isArray(value) && isArray(target)) {
    return arrayMatchPattern(value, target);
  }

  return matchPattern(value, target);
}

class MatchExpression<T, output = any> {
  matched = false;
  value: T;
  result: output | null = null;

  constructor(value: T) {
    this.value = value;
  }

  when(
    predicate: Partial<T> | predicateFunc<T>,
    handler: output | handlerFunc<T, output>,
  ) {
    if (this.matched) {
      return this;
    }

    if (checkTypeMatch(this.value, predicate)) {
      this.matched = true;
      this.result = isFunction(handler) ? (handler as handlerFunc<T, output>)(this.value) : handler as output;
    }

    return this;
  }

  otherwise(handler: output | handlerFunc<T, output>): output | null {
    if (this.matched) {
      return this.result;
    }

    return isFunction(handler) ? (handler as handlerFunc<T, output>)(this.value) : handler as output;
  }

  exhaustive(): output | null {
    return this.result;
  }

  run(): output | null {
    return this.result;
  }
}

export function match<input, output = any>(value: input) {
  return new MatchExpression<input, output>(value);
}

export default match;
