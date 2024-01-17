import { Architest } from "../domain/Architect";

export class TypescriptArchitest implements Architest{

    run(): string {
        
        

        return "done"
    }

    preprocess(): boolean {
        return true;
    }
}