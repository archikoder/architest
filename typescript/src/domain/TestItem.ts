export interface TestItem{

    path(): string;
    relativePath(): string;
    class(): string;
    testClass(): string;
    method(): string;
    line(): number;
}