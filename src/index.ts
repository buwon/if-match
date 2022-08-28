import _ from 'lodash'
const { isArray, isFunction, isMatch, isObject } = _

interface predicateFunc<T> {
  (value: T): boolean
}

interface handlerFunc<T, output = any> {
  (value: T): output
}

function matchPattern(value, target) {
  if (isFunction(target)) {
    return target(value)
  }

  if (isObject(value) && isObject(target)) {
    return isMatch(value, target)
  }

  return value === target
}

function arrayMatchPattern(value, target) {
  for (const index in target) {
    if (undefined !== target[index] && false === matchPattern(value[index], target[index])) {
      return false
    }
  }

  return true
}

function checkTypeMatch(value, target) {
  if (isArray(value) && isArray(target)) {
    return arrayMatchPattern(value, target)
  }

  return matchPattern(value, target)
}

class MatchExpression<T, output = any> {
  matched = false
  value: T
  result: output = null

  constructor(value: T) {
    this.value = value
  }

  when(predicate: Partial<T> | predicateFunc<T>, handler: output | handlerFunc<T, output>) {
    if (this.matched) {
      return this
    }

    if (checkTypeMatch(this.value, predicate)) {
      this.matched = true
      this.result = isFunction(handler) ? handler(this.value) : handler
    }

    return this
  }

  otherwise(handler: output | handlerFunc<T, output>): output {
    if (this.matched) {
      return this.result
    }

    return isFunction(handler) ? handler(this.value) : handler
  }

  exhaustive(): output {
    return this.result
  }

  run(): output {
    return this.result
  }
}

export function match<input, output = any>(value: input) {
  return new MatchExpression<input, output>(value)
}

export default match
