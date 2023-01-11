import { assertEquals } from 'https://deno.land/std@0.171.0/testing/asserts.ts';
import { match } from '../ifMatch.ts';

// const it = suite(`object`);

Deno.test('object when primitive result', () => {
  assertEquals(
    match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({ a: 'aaa' }, true)
      .exhaustive(),
    true,
  );
  assertEquals(
    match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({ b: 'bbb' }, true)
      .exhaustive(),
    true,
  );
  assertEquals(
    match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({ a: 'aaa', b: 'bbb' }, true)
      .exhaustive(),
    true,
  );
  assertEquals(
    match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({
      a: 'aaa',
      b: 'bbb',
      c: 'ccc',
    }, true).exhaustive(),
    true,
  );
});

Deno.test('object when unmatch', () => {
  assertEquals(
    match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({ a: 'ddd' }, true).otherwise(
      false,
    ),
    false,
  );
});

Deno.test('object when special value', () => {
  assertEquals(
    match({ a: 'aaa', b: 'bbb', c: 'ccc' }).when({}, true).otherwise(false),
    true,
  );
  assertEquals(
    match<({ [key: string]: any } | null)>({ a: 'aaa', b: 'bbb', c: 'ccc' }).when(null, true).otherwise(false),
    false,
  );
});
