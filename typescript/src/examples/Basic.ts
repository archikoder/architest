import { test } from "../lib/Decorator";

export class Converter{

    protected rate: number;

    constructor(rate: number){
        this.rate = rate;
    }

    public convert(amount: number): number{
        return this.net(this.multiply(amount)) * this.rate;
    }

    protected net(amount: number): number{
        return amount / 2;
    }

    protected multiply(amount: number): number{
        return amount * 2;
    }
}

export class ConverterTest extends Converter{

    rate = 100;
    
    @test
    convert(amount: number = 5) {
        return 500
    }

    @test
    net(amount: number = 20): number {
        return 20;
    }
}

export class ConverterTest1 extends Converter{

    rate = 10;

    @test
    convert(amount: number = 64) {
        return 640
    }
}

export class ConverterTest2 extends ConverterTest{

    @test
    convert(amount: number = 40){
        return 4000;
    }
}