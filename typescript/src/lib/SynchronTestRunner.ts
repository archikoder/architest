import { AssertionHandler, Configuration, ParsedProgram, TestRunner } from "../domain";
import * as path from 'path'
import * as assert from 'assert'
import * as acorn from 'acorn'

export class SynchronTestRunner implements TestRunner {

    constructor(private program: ParsedProgram,
        private configuration: Configuration,
        private validAssertionHandler: AssertionHandler,
        private invalidAssertionHandler: AssertionHandler) { }

    run(): boolean {

        let result: boolean = true;

        const testItems = this.program.tests();

        // VERBOSE
        console.log("")
        console.log("Program root:", this.configuration.programFolder())
        console.log("Target:", this.configuration.target())
        console.log("Found", testItems.length, "test items", "\n");

        // console.log("tests", testItems)

        for (const testItem of testItems) {

            console.log("importing class")
            const testClass = require(path.join(process.cwd(), this.configuration.programFolder(), testItem.relativePath()));
            console.log("testClass", testClass, "testItem", testItem.class(), "end")
            const testObject = new testClass[testItem.class()]();
            console.log("testObject", testObject)
            const testFunction = testObject[testItem.method()].test;
            console.log("testFuncton", testFunction)

            try {
                console.log("parsing test method", testFunction.toString())
                const ast = acorn.parse(
                    "function " + testFunction.toString(),
                    { sourceType: 'module', ecmaVersion: esVersion(this.configuration.target()), locations: true }
                );

                console.log((ast.body[0] as any).params)
            }
            catch (exception) {
                console.log("exception on parsing test method", exception)
            }

            // console.log("testObject", testObject)
            // console.log(testObject[testItem.method()].toString())
            // console.log("testFunction test", testFunction)

            let expected;
            try {
                console.log("executing the expected test function")
                expected = testFunction.call(testObject, ...(testFunction.defaults || []));
            }
            catch (exception) {
                expected = exception;
            }

            let got;
            try {
                console.log("executing the got real function")
                got = testObject[testItem.method()](...(testFunction.defaults || []));
            }
            catch (exception) {
                got = exception;
            }

            // console.log(expected, got)

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

function esVersion(version: string): acorn.ecmaVersion {

    const esVersion = version.replace(/es/ig, '');

    if (/next/ig.test(esVersion))
        return "latest";

    return esVersion as acorn.ecmaVersion;
}