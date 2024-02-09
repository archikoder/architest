import { CodeFile } from "../domain/CodeFile";
import { ParsedProgram } from "../domain/ParsedProgram";
import { ProgramFolder } from "../domain/ProgramFolder";
import { TestItem } from "../domain/TestItem";
import { DefaultTestItem } from "./DefaultTestItem";
const fs = require('fs');
const acorn = require('acorn');
const walk = require('acorn-walk');

export class AcornParsedProgram implements ParsedProgram {

    constructor(private programFolder: ProgramFolder) { }

    tests(): TestItem[] {

        let results: TestItem[] = [];

        const class_files: CodeFile[] = this.programFolder.exportedClasses();

        for (const file of class_files) {
            results = results.concat(parseFile(file));
        }

        return results;
    }
}

function parseFile(file: CodeFile) {

    const tests: TestItem[] = [];

    const content = fs.readFileSync(file.path(), 'utf-8');
    const ast = acorn.parse(content, { sourceType: 'module', ecmaVersion: '2016', locations: true });

    walk.simple(ast, {
        CallExpression(node: any) {

            if (isTestMethod(node)) {
                const className = node.arguments[1].object.name;
                const testClassName = node.arguments[1].object.name;
                const methodName = node.arguments[2].value;
                const lineNumber = node.callee.loc.start.line;
                tests.push(new DefaultTestItem(file, testClassName, className, methodName, lineNumber))
            }
        },
        ClassDeclaration(node: any) {
            
        }
    }, );

    return tests;
}

function isTestMethod(node: any) {
    return node.callee && node.callee.name === "__decorate" && node.arguments && node.arguments.length === 4;
}