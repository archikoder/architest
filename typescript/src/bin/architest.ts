#!/usr/bin/env ts-node --skipProject

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
        ),
        // configuration.target()
        "ES2022"
    ),
    configuration,
    new ConsoleValidAssertionHandler(),
    new ConsoleInvalidAssertionHandler(),
    new InvalidFunctionHandler()
);

console.log("ARCHITEST");

runner.run();

console.log("\nDone in", new Date().getTime() - startTime, "milliseconds")