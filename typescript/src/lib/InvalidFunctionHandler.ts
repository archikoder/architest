import { AssertionError } from "assert";
import { TestItem } from "../domain";
import { AssertionHandler } from "../domain/AssertionHandler";

export class InvalidFunctionHandler implements AssertionHandler{

    handle(test: TestItem, exception?: AssertionError | undefined) {
        console.log("\x1B[33m[WARN] invalid test method configuration", "\x1b[0m:", test.stringFormat());
    }
}