import { suite } from 'uvu'
import assert from 'uvu/assert'
import { match } from '..'

const it = suite(`simple`)

it('primitive when primitive result', () => {
  assert.is(match(3).when(3, true).exhaustive(), true)
  assert.is(match(3).when(3, false).exhaustive(), false)
})

it('primitive when function result', () => {
  assert.is(
    match(3)
      .when(3, () => true)
      .exhaustive(),
    true
  )
  assert.is(
    match(3)
      .when(3, () => false)
      .exhaustive(),
    false
  )
})

it('primitive when defulat null result', () => {
  assert.is(match(3).exhaustive(), null)
})

it('primitive string when primitive result', () => {
  assert.is(match('hello').when('hello', true).exhaustive(), true)
  assert.is(match('hello').when('hello', true).run(), true)
  assert.is(match('hello').when('world', false).otherwise(true), true)
})

it.run()
