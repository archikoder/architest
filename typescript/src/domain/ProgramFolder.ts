import { CodeFile } from "./CodeFile";

export interface ProgramFolder{

    exportedClasses(extension?: string): CodeFile[];
}