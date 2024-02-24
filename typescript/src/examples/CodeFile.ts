import { FilesystemCodeFile } from "../lib";
import { test } from "../lib/Decorator";

export class TypescriptRootFolder extends FilesystemCodeFile{

    constructor(){
        super("src/domain", "../");
    }

    @test
    relativePath(): string {
        return "typescript/src/domain";
    }
}

export class ArchitestRootFolder extends FilesystemCodeFile{
    
    filePath = "src/examples";
    root = "../..";

    @test
    path(): string {
        return "src/examples";
    }

    @test
    relativePath(): string {
        return "architest/typescript/src/examples";
    }
}