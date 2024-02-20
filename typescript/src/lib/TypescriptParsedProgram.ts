import ts from "typescript";
import fs from 'fs'
import { CodeFile, ParsedProgram, ProgramFolder, TestItem } from "../domain";
import { DefaultTestItem } from "./DefaultTestItem";

export class TypescriptParsedProgram implements ParsedProgram {

    constructor(private programFolder: ProgramFolder, private target: string) { }

    tests(): TestItem[] {

        let results: TestItem[] = [];

        const class_files: CodeFile[] = this.programFolder.exportedClasses(".ts");

        for (const file of class_files) {
            results = results.concat(parseFile(file, this.target));
        }

        return results;
    }
}

function parseFile(file: CodeFile, target: string) {

    const tests: TestItem[] = [];

    let ast;

    try {
        ast = ts.createSourceFile(file.path(), fs.readFileSync(file.path(), 'utf-8'), target as any);
    }
    catch (exception) {
        console.log("Error parsing file", file.path(), exception)
        return [];
    }

    function visitNode(nodes: ts.Node[], parent?: any) {

        nodes.forEach(node => {

            if (ts.isSourceFile(node)) {
                visitNode(node.statements as any);
            } else if (ts.isClassDeclaration(node)){
                visitNode(node.members as any, { class: node.name?.escapedText })
            } else if(ts.isAccessor(node)){
                visitNode(node.modifiers as any || [], { ...parent, method: (node.name as ts.Identifier).escapedText })
            } else if (ts.isMethodDeclaration(node)){
                visitNode(node.modifiers as any || [], { ...parent, method: (node.name as ts.Identifier).escapedText })
            } else if (ts.isDecorator(node) && (node.expression as any).escapedText === 'test') {
                const className = parent.class;
                const testClassName = parent.class;
                const methodName = parent.method;
                const lineNumber = node.pos;
                tests.push(new DefaultTestItem(file, testClassName, className, methodName, lineNumber))
            }
        })
    }

    visitNode([ast]);

    return tests;
}
