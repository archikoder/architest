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
import { ShellArgument } from "./ShellArgument";

const startTime = new Date().getTime();

const configuration: Configuration = new SourceTsconfigConfiguration();

const runner = new SynchronTestRunner(
    new TypescriptParsedProgram(
        new NodeProgramFolder(
            configuration.testFolder()
        )
    ),
    configuration,
    new ConsoleValidAssertionHandler(),
    new ConsoleInvalidAssertionHandler(),
    new InvalidFunctionHandler()
);

console.log("ARCHITEST");

runner.run({filter: new ShellArgument(process.argv).testName()})
            .then((done: any) => {
                console.log("\nDone in", new Date().getTime() - startTime, "milliseconds")
            })
            .catch((exception: any) => {
                console.log("\nError running tests", exception)
            })

