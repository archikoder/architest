import { SourceTsconfigConfiguration } from "../lib";
import { test } from "../lib/Decorator";

export class CurrentConfiguration extends SourceTsconfigConfiguration{

    @test
    programFolder(): string {
        return "./src"
    }

    @test
    target(): string {
        return "es2022"
    }
}