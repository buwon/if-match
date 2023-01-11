// import { test } from 'uvu';
// import assert from 'uvu/assert';
import { assertEquals } from 'https://deno.land/std@0.171.0/testing/asserts.ts';
import { match } from '../ifMatch.ts';

Deno.test('array when array result', () => {
  assertEquals(match([1, 2, 3]).when([1, 2, 3], true).exhaustive(), true);
});

Deno.test('array when with undefined', () => {
  assertEquals(match([1, 2, 3]).when([], true).exhaustive(), true);
  assertEquals(match([1, 2, 3]).when([undefined, 2], true).exhaustive(), true);
  assertEquals(match([1, 2, 3]).when([1], true).exhaustive(), true);
  assertEquals(
    match([1, 2, 3]).when([undefined, undefined, 3], true).exhaustive(),
    true,
  );
  assertEquals(match([1, 2, 3]).when([1, undefined, 3], true).exhaustive(), true);
  assertEquals(match([1, 2, 3]).when([undefined, 2, 3], true).exhaustive(), true);
  assertEquals(match([1, 2, 3]).when([1, 2], true).exhaustive(), true);
});

Deno.test('array when with undefined result fail', () => {
  assertEquals(
    match<(number | null)[]>([1, 2, 3]).when([null], true).exhaustive(),
    null,
  );
  assertEquals(
    match<(number | null)[]>([1, 2, 3]).when([undefined, 4], true).exhaustive(),
    null,
  );
  assertEquals(match([1, 2, 3]).when([2], true).exhaustive(), null);
  assertEquals(
    match([1, 2, 3]).when([undefined, undefined, 1], true).exhaustive(),
    null,
  );
  assertEquals(
    match<(number | null)[]>([1, 2, 3]).when([1, null, 3], true).exhaustive(),
    null,
  );
  assertEquals(
    match<(number | null)[]>([1, 2, 3]).when([undefined, 2, 4], true)
      .exhaustive(),
    null,
  );
  assertEquals(match([1, 2, 3]).when([1, 3], true).exhaustive(), null);
});
