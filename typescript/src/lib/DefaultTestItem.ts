import { CodeFile } from "../domain/CodeFile";
import { TestItem } from "../domain/TestItem";

export class DefaultTestItem implements TestItem {

    constructor(private file: CodeFile, private testClassName: string, private className: string, private methodName: string, private lineNumber: number, private targetScore: number){}

    absolutePath(): string {
        return this.file.absolutePath();
    }

    class(): string {
        return this.className;
    }

    line(): number {
        return this.lineNumber;
    }

    path(): string {
        return this.file.path();
    }

    relativePath(): string {
        return this.file.relativePath();
    }

    testClass(): string {
        return this.testClassName;
    }

    method(): string {
        return this.methodName;
    }

    score(): number{
        return this.targetScore;
    }
    
    stringFormat(): string {
        return `${this.class()} -> ${this.testClass()} -> ${this.method()}`;
    }
}