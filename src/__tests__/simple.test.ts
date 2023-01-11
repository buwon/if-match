import { assertEquals } from 'https://deno.land/std@0.171.0/testing/asserts.ts';
import { match } from '../ifMatch.ts';

Deno.test('primitive when primitive result', () => {
  assertEquals(match(3).when(3, true).exhaustive(), true);
  assertEquals(match(3).when(3, false).exhaustive(), false);
});

Deno.test('primitive when function result', () => {
  assertEquals(
    match(3)
      .when(3, () => true)
      .exhaustive(),
    true,
  );
  assertEquals(
    match(3)
      .when(3, () => false)
      .exhaustive(),
    false,
  );
});

Deno.test('primitive when defulat null result', () => {
  assertEquals(match(3).exhaustive(), null);
});

Deno.test('primitive string when primitive result', () => {
  assertEquals(
    match<string, boolean>('hello').when('hello', true).exhaustive(),
    true,
  );
  assertEquals(match('hello').when('hello', true).run(), true);
  assertEquals(match('hello').when('world', false).otherwise(true), true);
});
