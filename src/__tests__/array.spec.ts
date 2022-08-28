import { test } from 'uvu'
import assert from 'uvu/assert'
import { match } from '..'

test('array when array result', () => {
  assert.is(match([1, 2, 3]).when([1, 2, 3], true).exhaustive(), true)
})

test('array when with undefined', () => {
  assert.is(match([1, 2, 3]).when([], true).exhaustive(), true)
  assert.is(match([1, 2, 3]).when([undefined, 2], true).exhaustive(), true)
  assert.is(match([1, 2, 3]).when([1], true).exhaustive(), true)
  assert.is(match([1, 2, 3]).when([undefined, undefined, 3], true).exhaustive(), true)
  assert.is(match([1, 2, 3]).when([1, undefined, 3], true).exhaustive(), true)
  assert.is(match([1, 2, 3]).when([undefined, 2, 3], true).exhaustive(), true)
  assert.is(match([1, 2, 3]).when([1, 2], true).exhaustive(), true)
})

test('array when with undefined result fail', () => {
  assert.is(match([1, 2, 3]).when([null], true).exhaustive(), null)
  assert.is(match([1, 2, 3]).when([undefined, 4], true).exhaustive(), null)
  assert.is(match([1, 2, 3]).when([2], true).exhaustive(), null)
  assert.is(match([1, 2, 3]).when([undefined, undefined, 1], true).exhaustive(), null)
  assert.is(match([1, 2, 3]).when([1, null, 3], true).exhaustive(), null)
  assert.is(match([1, 2, 3]).when([undefined, 2, 4], true).exhaustive(), null)
  assert.is(match([1, 2, 3]).when([1, 3], true).exhaustive(), null)
})

test.run()
