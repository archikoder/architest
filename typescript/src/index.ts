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
    DefaultTestItem,
    FilesystemCodeFile,
    ConsoleValidAssertionHandler,
    ConsoleInvalidAssertionHandler,
    NodeProgramFolder,
    SynchronTestRunner
} from './lib';
