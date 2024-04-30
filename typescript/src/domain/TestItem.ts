export interface TestItem{

    absolutePath(): string;
    path(): string;
    relativePath(): string;
    class(): string;
    testClass(): string;
    method(): string;
    line(): number;
    score(): number;
    stringFormat(): string;
}