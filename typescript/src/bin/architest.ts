#!/usr/bin/env tsx

import { Configuration } from "../domain";
import {
    ConsoleValidAssertionHandler,
    ConsoleInvalidAssertionHandler,
    NodeProgramFolder,
    SynchronTestRunner,
    SourceTsconfigConfiguration
} from "../lib";
import { InvalidFunctionHandler } from "../lib/InvalidFunctionHandler";
import { TypescriptParsedProgram } from "../lib/TypescriptParsedProgram";

const startTime = new Date().getTime();

const configuration: Configuration = new SourceTsconfigConfiguration();

const runner = new SynchronTestRunner(
    new TypescriptParsedProgram(
        new NodeProgramFolder(
            configuration.programFolder()
        )
    ),
    configuration,
    new ConsoleValidAssertionHandler(),
    new ConsoleInvalidAssertionHandler(),
    new InvalidFunctionHandler()
);

console.log("ARCHITEST");

runner.run({filter: process.argv.length > 2 ? process.argv[2] : ""})
            .then((done: any) => {
                console.log("\nDone in", new Date().getTime() - startTime, "milliseconds")
            })
            .catch((exception: any) => {

            })

