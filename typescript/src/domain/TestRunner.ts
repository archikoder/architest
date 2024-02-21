export interface TestRunner{

    run(): Promise<boolean>;
}