import { AssertionHandler, Configuration, ParsedProgram, TestRunner } from "../domain";
import * as path from 'path'
import * as assert from 'assert'

export class SynchronTestRunner implements TestRunner {

    constructor(private program: ParsedProgram,
        private configuration: Configuration,
        private validAssertionHandler: AssertionHandler,
        private invalidAssertionHandler: AssertionHandler,
        private invalidFunctionHandler: AssertionHandler) { }

    async run({filter}: any): Promise<boolean> {

        const testItems = this.program.tests().filter(testItem => {

            if(filter && filter != "")
                return (testItem.class() + " -> " + testItem.method() as String).includes(filter);

            return true;
        })

        // VERBOSE
        console.log("Test root:", this.configuration.testFolder())
        console.log("Found", testItems.length, "test items", "\n");

        let result: boolean = true;

        for (const testItem of testItems) {

            const joined_path = path.join(process.cwd(), this.configuration.testFolder(), testItem.relativePath());
            
            let targetClass;
            try{
                targetClass = require(joined_path);
            }
            catch(ex){
                console.log("\x1B[33m[WARN]", ex, joined_path, "->", testItem.class(), "->", testItem.method(), "\x1b[0m:");
                continue
            }
            
            const targetObject = new targetClass[testItem.class()]();
            const targetFunction = targetObject[testItem.method()];

            if (!targetFunction || !targetFunction.test) {
                this.invalidFunctionHandler.handle(testItem);
                continue;
            }

            let expected: any;
            let expected_result_mode = "RETURN";
            try {

                if (targetFunction.test.constructor.name === "AsyncFunction") {
                    expected_result_mode = "PROMISE"
                    await targetFunction.test.call(targetObject)
                        .then((resolved: any) => {
                            expected_result_mode = "RESOLVED"
                            expected = resolved
                        })
                        .catch((exception: any) => {
                            expected_result_mode = "REJECTED"
                            expected = exception
                        })
                }
                else {
                    expected_result_mode = "CATCHED"
                    expected = targetFunction.test.call(targetObject);
                }
            }
            catch (exception) {
                expected = exception;
            }

            let got: any;
            let got_result_mode = "RETURN";
            try {

                if (targetFunction.constructor.name === "AsyncFunction") {
                    got_result_mode = "PROMISE"
                    await targetFunction.call(targetObject)
                        .then((resolved: any) => {
                            got_result_mode = "RESOLVED"
                            got = resolved
                        })
                        .catch((exception: any) => {
                            got_result_mode = "REJECTED"
                            got = exception
                        })
                }
                else {
                    got_result_mode = "CATCHED"
                    got = targetFunction.call(targetObject);
                }
            }
            catch (exception) {
                got = exception;
            }

            try {
                assert.deepStrictEqual(got, expected);
                this.validAssertionHandler.handle(testItem);
            }
            catch (exception: any) {

                let score = 0;

                if (typeof (expected) === typeof (got))
                    score += 50;

                if (got_result_mode === expected_result_mode)
                    score += 25;

                if (Object.keys(expected).length && (Object.keys(expected).length === Object.keys(got).length)) {
                    score += 12.5;
                    score += (Object.keys(expected).reduce((acc, current) => acc + (expected[current] == got[current] ? 1 : 0), 0) * 12.5) / Object.keys(expected).length
                }

                if (score >= testItem.score())
                    this.validAssertionHandler.handle(testItem, undefined, score, testItem.score());
                else {
                    result = false;
                    this.invalidAssertionHandler.handle(testItem, exception, score, testItem.score());
                }
            }
        }

        return result;
    }
}
