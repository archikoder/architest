import { SourceTsconfigConfiguration } from "../lib";
import { test } from "../lib/Decorator";

export class CurrentConfiguration extends SourceTsconfigConfiguration{

    @test
    testFolder(): string {
        return "./src/examples"
    }
}