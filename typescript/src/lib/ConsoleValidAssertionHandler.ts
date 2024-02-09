import { AssertionError } from "assert";
import { AssertionHandler } from "../domain/AssertionHandler";
import { TestItem } from "../domain/TestItem";

export class ConsoleValidAssertionHandler implements AssertionHandler{

    handle(test: TestItem, exception: AssertionError) {
        console.log("\x1B[32m" + test.class(), "->", test.method(), test.testClass())
    }
}