import { AssertionHandler, ParsedProgram, TestRunner } from "../domain";
const assert = require('assert');

export class SynchronTestRunner implements TestRunner {

    constructor(private program: ParsedProgram, private validAssertionHandler: AssertionHandler, private invalidAssertionHandler: AssertionHandler) { }

    run(): boolean {

        let result: boolean = true;

        const testItems = this.program.tests();

        for (const testItem of testItems) {

            const testClass = require("../" + testItem.relativePath());

            const testObject = new testClass[testItem.class()]();

            const testFunction = testObject[testItem.method()].test;

            let expected;
            try {
                expected = testFunction.call(testObject, ...testFunction.defaults);
            }
            catch (exception) {
                expected = exception;
            }

            let got;
            try {
                got = testObject[testItem.method()](...testFunction.defaults);
            }
            catch (exception) {
                got = exception;
            }

            try {
                assert.equal(got, expected);
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

