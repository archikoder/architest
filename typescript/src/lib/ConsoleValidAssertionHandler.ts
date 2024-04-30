import { AssertionError } from "assert";
import { AssertionHandler } from "../domain/AssertionHandler";
import { TestItem } from "../domain/TestItem";

export class ConsoleValidAssertionHandler implements AssertionHandler{

    handle(test: TestItem, exception: AssertionError, score: number = 100, targetScore: number = 100) {
        console.log("\x1B[32m" + Math.round(score * 10 ** 2) / 10 ** 2 + "% >= " + targetScore + "% : " + test.stringFormat(), "\x1B[0m")
    }
}