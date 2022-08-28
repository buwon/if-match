import _ from 'lodash'
const { isArray, isFunction, isMatch, isObject } = _

interface predicateFunc<T> {
  (value: T): boolean
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

class MatchExpression<T> {
  matched = false
  value: T
  result = null

  constructor(value: T) {
    this.value = value
  }

  when(predicate: Partial<T> | predicateFunc<T>, handler) {
    if (this.matched) {
      return this
    }

    if (checkTypeMatch(this.value, predicate)) {
      this.matched = true
      this.result = isFunction(handler) ? handler(this.value) : handler
    }

    return this
  }

  otherwise(handler) {
    if (this.matched) {
      return this.result
    }

    return isFunction(handler) ? handler(this.value) : handler
  }

  exhaustive() {
    return this.result
  }

  run() {
    return this.result
  }
}

export function match<input>(value: input) {
  return new MatchExpression(value)
}

export default match
