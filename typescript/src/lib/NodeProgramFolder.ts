import { CodeFile } from "../domain/CodeFile";
import { ProgramFolder } from "../domain/ProgramFolder";
import { FilesystemCodeFile } from "./FilesystemCodeFile";
import * as fs from 'fs'
import * as path from 'path'

export class NodeProgramFolder implements ProgramFolder {

    constructor(private _path: string) {}

    exportedClasses(extension: string = ".js"): CodeFile[] {
        
        return traverseDirectory(this._path, this._path, extension);
    }
}

function traverseDirectory(currentPath: string, rootPath: string, extension: string): CodeFile[] {

    const items = fs.readdirSync(currentPath);
    let files: any[] = [];

    items.forEach((item: any) => {

        const itemPath = path.join(currentPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
            files = files.concat(traverseDirectory(itemPath, rootPath, extension));
        } else if (stat.isFile() && (extension && path.extname(item) === extension)) {
            files.push(new FilesystemCodeFile(itemPath, rootPath));
        }
    });

    return files;
}

