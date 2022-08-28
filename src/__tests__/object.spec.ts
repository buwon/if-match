import { suite } from 'uvu'
import assert from 'uvu/assert'
import { match } from '..'

const it = suite(`object`)

it('object when primitive result', () => {
  assert.is(match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({ a: 'aaa' }, true).exhaustive(), true)
  assert.is(match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({ b: 'bbb' }, true).exhaustive(), true)
  assert.is(match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({ a: 'aaa', b: 'bbb' }, true).exhaustive(), true)
  assert.is(match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({ a: 'aaa', b: 'bbb', c: 'ccc' }, true).exhaustive(), true)
})

it('object when unmatch', () => {
  assert.is(match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({ a: 'ddd' }, true).otherwise(false), false)
})

it('object when special value', () => {
  assert.is(match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({}, true).otherwise(false), true)
  assert.is(match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when(null, true).otherwise(false), false)
})

it.run()
