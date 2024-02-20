import { test } from "../lib/Decorator";

export class Converter {

    protected rate: number;

    constructor(rate: number) {
        this.rate = rate;
    }

    public convert(amount: number): number {
        return amount * this.rate;
    }
}

export class MyFirstTest extends Converter {

    protected rate: number = 5;

    // @test
    public convert(amount: number = 7): number {
        return 35;
    }
}