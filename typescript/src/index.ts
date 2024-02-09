export { test } from './lib/Decorator';

export {
    AssertionHandler,
    CodeFile,
    Configuration,
    ParsedProgram,
    ProgramFolder,
    TestItem,
    TestRunner
} from './domain';

export {
    AcornParsedProgram,
    DefaultTestItem,
    FilesystemCodeFile,
    ConsoleValidAssertionHandler,
    ConsoleInvalidAssertionHandler,
    NodeProgramFolder,
    SynchronTestRunner,
    TsconfigConfiguration
} from './lib';
