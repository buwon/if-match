import { test } from 'uvu'
import assert from 'uvu/assert'
import { match } from '..'

test('primitive when primitive result', () => {
  assert.is(match(3).when(3, true).exhaustive(), true)
  assert.is(match(3).when(3, false).exhaustive(), false)
})

test('string simple', () => {
  assert.is(match('hello').when('hello', true).exhaustive(), true)
  assert.is(match('hello').when('hello', true).run(), true)
  assert.is(match('hello').when('world', false)
  .otherwise(true), true)
})

test.run()
