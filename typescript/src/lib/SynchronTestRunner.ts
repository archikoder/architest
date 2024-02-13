import { AssertionHandler, Configuration, ParsedProgram, TestRunner } from "../domain";
import * as path from 'path'
import * as assert from 'assert'

export class SynchronTestRunner implements TestRunner {

    constructor(private program: ParsedProgram,
        private configuration: Configuration,
        private validAssertionHandler: AssertionHandler,
        private invalidAssertionHandler: AssertionHandler) { }

    run(): boolean {

        const testItems = this.program.tests();

        // VERBOSE
        console.log("Program root:", this.configuration.programFolder())
        console.log("Target:", this.configuration.target())
        console.log("Found", testItems.length, "test items", "\n");

        let result: boolean = true;

        for (const testItem of testItems) {
            const joined_path = path.join(process.cwd(), this.configuration.programFolder(), testItem.relativePath());
            const targetClass = require(joined_path);
            const targetObject = new targetClass[testItem.class()]();
            const targetFunction = targetObject[testItem.method()];

            let expected;
            try {
                expected = targetFunction.test.call(targetObject);
            }
            catch (exception) {
                expected = exception;
            }

            let got;
            try {
                got = targetFunction.call(targetObject);
            }
            catch (exception) {
                got = exception;
            }

            try {
                assert.deepStrictEqual(got, expected);
                this.validAssertionHandler.handle(testItem);
            }
            catch (exception: any) {
                result = false;
                this.invalidAssertionHandler.handle(testItem, exception);
            }
        }

        return result;
    }
}
