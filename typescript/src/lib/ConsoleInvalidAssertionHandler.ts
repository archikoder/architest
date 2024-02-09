import { AssertionError } from "assert";
import { AssertionHandler } from "../domain/AssertionHandler";
import { TestItem } from "../domain/TestItem";

export class ConsoleInvalidAssertionHandler implements AssertionHandler{

    handle(test: TestItem, exception: AssertionError) {
        console.log("\x1B[31m" + test.class(), "->", test.method())
        console.log("\x1B[32mexpected", "\x1b[0m:", exception.expected);
        console.log("\x1B[33mbut got", "\x1b[0m:", exception.actual);
        console.log("")
    }
}