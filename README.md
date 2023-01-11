<h1 align="center">if-match</h1>

<p align="center">
A simple if-else improvement library. Inspired by the <a href="https://www.npmjs.com/package/ts-pattern">ts-pattern</a> module
</p>

```ts
import { match } from 'if-match';

// as is
let gameName = '';
if (game.genre === 'rpg') {
  if (game.company === 'enix') {
    gameName = 'dq1';
  } else if (game.company === 'nintendo') {
    gameName = 'pokemon';
  }
  gameName = 'ff1';
} else if (game.genre === 'simulation') {
  if (game.company === 'maxis') {
    gameName = 'simcity';
  }
}

// as is
const gameName2 = (() => {
  if (game.genre === 'rpg') {
    if (game.company === 'enix') {
      return 'dq1';
    } else if (game.company === 'nintendo') {
      return 'pokemon';
    }
    return 'ff1';
  } else if (game.genre === 'simulation') {
    if (game.company === 'maxis') {
      return 'simcity';
    }
    return '';
  }
  return '';
})();

// to be
const gameName3 = match(game)
  .when({ genre: 'rpg', company: 'enix' }, 'dq1')
  .when({ genre: 'rpg', company: 'nintendo' }, 'pokemon')
  .when({ genre: 'rpg' }, 'ff1')
  .when({ genre: 'simulation', company: 'maxis' }, 'simcity')
  .otherwise('simcity');
```

## About

Complicated conditions have been combined into one compact expression.
Your code becomes **shorter** and **more readable**. Exhaustiveness checking ensures you haven’t forgotten **any possible case**.
You can only use **const** without using **let**.

## Features

- It works at high speed without complicated and unnecessary processing.
- Extend functionality using functions

## Installation

Via npm

```shell
npm install if-match
```

Via deno

```ts
import { match } from 'https://deno.land/x/if_match/mod.ts';
```

# Documentation

- [Getting Started](#getting-started)
- [API Reference](#api-reference)
  - [`match`](#match)
  - [`.when`](#when)
  - [`.otherwise`](#otherwise)
  - [`.run`](#run)

## Getting Started

## API Reference

### `match`

```ts
match(value);
```

Create a `Match` object on which you can later call `.when`, `.otherwise`, `.exhaustive` and `.run`.

#### Example

```ts
match(3).run();
match([1, 2, 3]).run();
match({ hello: 'world' }).run();
```

#### Arguments

- `value`
  - **Required**
  - Input values to be tested.

### `.when`

```ts
match(...)
  .when(predicate, handler)
```

#### Example

```ts
// return 4
match(3).when(3, 4).run();
match(3).when(3, (v) => v + 1).run();

// return 3
match([1, 2, 3]).when([1, 2, 3], 3).run();
match([1, 2, 3]).when([1, 2, 3], (v) => v.length).run();

// return true
match({ hello: 'world' }).when({ hello: 'world' }, true).run();
match({ hello: 'world' }).when((v) => (v.hello === 'world'), true).run();
```

#### Arguments

- `predicate: T | (value: T) => boolean`
  - **Required**
  - Comparison Value or Comparison Function.
- `handler: any | (value: T) => any`
  - **Required**
  - A function or return value that is called when a predicate condition is met.

### `.otherwise`

```ts
match(...)
  .when(...)
  .otherwise(defaultHandler)
```

Equivalent to `else`. If no `.when()` is matched, `.otherwise()` is called.

#### Example

```ts
match(1).otherwise('Hello World'); // return 'Hello World'
match(1).otherwise(() => true); // return true
match(1).otherwise((v) => v + 1); // return 2
```

#### Arguments

- `defaultHandler: any | (value: T) => any`
  - **Required**
  - Called if no '.when()' matches.
  - Think of it as the `default:` case of `switch` statements.

### `.exhaustive`

```ts
match(...)
  .when(...)
  .exhaustive()
```

Used when there is no `else` or `otherwise`.
Returns null if it does not match any '.when()'.

#### Example

```ts
match(1).exhaustive(); // return null
match(1).when(1, true).exhaustive(); // return true
```

#### Arguments

- no arguments

### `.run`

```ts
match(...)
  .when(...)
  .run()
```

Equivalent to `.exhaustive`.

#### Example

```ts
match(1).run(); // return null
match(1).when(1, true).run(); // return true
```

#### Arguments

- no arguments
