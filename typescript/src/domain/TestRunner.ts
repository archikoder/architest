export interface TestRunner{

    run(filter: any): Promise<boolean>;
}