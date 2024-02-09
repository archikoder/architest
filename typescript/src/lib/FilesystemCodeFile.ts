import { CodeFile } from "../domain/CodeFile";
const path = require('path');

export class FilesystemCodeFile implements CodeFile{

    constructor(private filePath: string, private root: string){}

    path(): string {
        return this.filePath;
    }

    relativePath(): string {
        return relativePath(this.filePath, this.root);
    } 
}

function relativePath(filePath: string, root: string){

    const absoluteFilePath = path.resolve(filePath);
    const absoluteParentPath = path.resolve(root);

    return path.relative(absoluteParentPath, absoluteFilePath);
}
