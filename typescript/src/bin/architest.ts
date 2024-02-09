import {
    AcornParsedProgram,
    ConsoleValidAssertionHandler,
    ConsoleInvalidAssertionHandler,
    NodeProgramFolder,
    SynchronTestRunner,
    TsconfigConfiguration
} from "../lib";

const runner = new SynchronTestRunner(
    new AcornParsedProgram(
        new NodeProgramFolder(
            new TsconfigConfiguration().programFolder()
        )
    ),
    new ConsoleValidAssertionHandler(),
    new ConsoleInvalidAssertionHandler()
);

runner.run();
