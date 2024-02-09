import { given, test } from "../lib/Decorator";

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

@test
export class ConverterTest extends Converter{

    rate = 100;
    
    @test
    convert(@given(5) amount: number) {
        return 500
    }

    @test
    net(@given(40) amount: number): number {
        return 20;
    }
}

@test
export class ConverterTest1 extends Converter{

    rate = 10;

    @test
    convert(@given(64) amount: number) {
        return 640
    }
}

@test
export class ConverterTest2 extends ConverterTest{

    @test
    convert(@given(40) amount: number){
        return 4000;
    }
}