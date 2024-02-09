import { CodeFile } from "./CodeFile";

export interface ProgramFolder{

    exportedClasses(): CodeFile[];
}