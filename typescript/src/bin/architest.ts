#!/usr/bin/env node
import { Configuration } from "../domain";
import {
    AcornParsedProgram,
    ConsoleValidAssertionHandler,
    ConsoleInvalidAssertionHandler,
    NodeProgramFolder,
    SynchronTestRunner,
    TsconfigConfiguration
} from "../lib";

const configuration: Configuration = new TsconfigConfiguration();

const runner = new SynchronTestRunner(
    new AcornParsedProgram(
        new NodeProgramFolder(
            configuration.programFolder()
        ),
        configuration.target()
    ),
    configuration,
    new ConsoleValidAssertionHandler(),
    new ConsoleInvalidAssertionHandler()
);

console.log("ARCHITEST");

runner.run();
