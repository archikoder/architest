# ArchiTest

## What it is
ArchiTest is a project willing to take a new approach on functional testing of software source codes.

## What it is not

## Why you want to use it
### Easy to take in
### Object Oriented
### Declarative
In contrast of procedural testing, where you have to manually setup your test context following a specific order, ArchiTest have a more declarative way of specifing tests. You can setup a test without any
### Lightweight

## How to use it
### NPM
```
npm install --save-dev architest
```

```
import { test, given } from 'architest';

export class MyClassToBeTested{

    private rate: number;

    constructor(rate: number){
        this.rate = rate;
    }

    public convert(value: number){
        return value * rate;
    }
}

@test
class MyTest extends MyClassToBeTested{

    constructor(){
        super(2)
    }

    @test
    public convert(@given(5) value: number){
        return 10;
    }
}

```

## How to contribute to the project