# AchiTest

This is the official implementation of ArchiTest principle for Typescript.

## How to install

Using npm
```bash
npm install -D @archikoder/architest
```

## How to use

For the sake of simplicity, the decorator "test" is the only thing that you have to import.

```typescript
import { test } from '@archikoder/architest';
```

And in your "package.json" file, add the script
```json
{
    "scpipts": {
        "test": "architest",
    }
}
```
Now you can launch test with
```bash
npm run test
```
## How to test your code with ArchiTest

As @0x5afe manifest for ArchiTest (https://twitter.com/0x5afe/status/1754931820913729668), here are the principles that you need to assimiliate before writing your tests: 

- "No new terms": You will only use terms that are already in your working language (Typescript):
    - To test a class, you create a new class that extends the class you want to test
    - To test a method of the class, you redefine this particular method in your test class and decorate it with "@test"
    - To specify the expected behavior, in the test method, you simply return the expected value or throw the expected exception
    - To specify the condition and context, you set default values for the method parameters
- "Class and method as units of test": You can't test standalone functions, only methods. Fortunately, typescript only allow us to decorate methods
- "Inheritance as mocking system": Use the fact that you can override our class properties as we extends it
    - To inject dependencies, create a constructor that take no parameter and call super() with required and mocked objects
    - You can also override class attributes by re-defining them in the test class (make sure they are protected, not private)
    - To mock internal methods, just redefine them (without the @test decorator)
- "Test transparency": Have in mind that using ArchiTest principles will help you improve your code Design:
    - No side effects: you can't test side effects, only returned values or throwned exceptions

## Example

Suppose we have the class "Converter" defined below and we want to test its behavioural "convert" method.
```typescript
// file Converter.ts
import { test } from "@archikoder/architest";

export class Converter {

    protected rate: number;

    constructor(rate: number) {
        this.rate = rate;
    }

    public convert(amount: number): number {
        return amount * this.rate;
    }
}
```
We want to make sure that if the rate is "5", "convert(7)" should give us the number "35"

Here is a test class using Archikoder (You can place your test files wherever you want, we suggest to place it in the same file as the class you test)

```typescript
// file Converter.ts
...

export class MyFirstTest extends Converter {

    protected rate: number = 5;

    @test
    public convert(amount: number = 7): number {
        return 35;
    }
}
```
That's it!

## Advanced

This section is left blank.

ArchiTest's main target is to be the simplest test framework possible. Each item that would be in this section will be considered a failure.

## Configuration

Configurations are taken from your "tsconfig.json" file.

If you have troubles running ArchiTest, verify properties like "target" and "rootDir" as they are the only ones used for now.

## Contribute

Contribution will soon be welcome after we validate world interest for ArchiTest.