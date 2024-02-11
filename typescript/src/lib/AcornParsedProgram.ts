import { CodeFile } from "../domain/CodeFile";
import { ParsedProgram } from "../domain/ParsedProgram";
import { ProgramFolder } from "../domain/ProgramFolder";
import { TestItem } from "../domain/TestItem";
import { DefaultTestItem } from "./DefaultTestItem";
const fs = require('fs');
const acorn = require('acorn');
const walk = require('acorn-walk');

export class AcornParsedProgram implements ParsedProgram {

    constructor(private programFolder: ProgramFolder, private target: string) { }

    tests(): TestItem[] {

        let results: TestItem[] = [];

        const class_files: CodeFile[] = this.programFolder.exportedClasses();

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
        ast = acorn.parse(
            fs.readFileSync(file.path(), 'utf-8'),
            { sourceType: 'module', ecmaVersion: esVersion(target), locations: true }
        );
    }
    catch (exception) {
        console.log("Error parsing file", file.path(), exception)
        return [];
    }

    let contextualClassName = "";

    walk.simple(ast, {
        ClassExpression(node: any){
            console.log("class expression", node, contextualClassName, node.id.name)
            contextualClassName = node.id.name;
        },
        CallExpression(node: any) {

            if (isExperimentalTestMethod(node)) {
                const className = node.arguments[1].object.name;
                const testClassName = node.arguments[1].object.name;
                const methodName = node.arguments[2].value;
                const lineNumber = node.callee.loc.start.line;
                tests.push(new DefaultTestItem(file, testClassName, className, methodName, lineNumber))
            }

            if (isEsTestMethod(node)) {
                console.log("ESTestMethod", contextualClassName)
                const className = contextualClassName;
                const testClassName = contextualClassName;
                const methodName = node.arguments[3].properties[1].value.value;
                const lineNumber = node.loc.start.line;
                tests.push(new DefaultTestItem(file, testClassName, className, methodName, lineNumber))
            }
        },
        // ClassDeclaration(node: any) {
        //     console.log("Class", node);
        // },
        MethodDeclaration(node: any) {
            // console.log("Method", node)
        }
    },);

    return tests;
}

function isExperimentalTestMethod(node: any) {
    return node.callee && node.callee.name === "__decorate" && node.arguments && node.arguments.length === 4;
}

function isEsTestMethod(node: any) {
    return node.callee
        && node.callee.name === "__esDecorate"
        && node.arguments
        && node.arguments.length === 6
        && node.arguments[3].properties[0].value.value === "method";
}

function esVersion(version: string) {

    const esVersion = version.replace(/es/ig, '');

    if (/next/ig.test(esVersion))
        return ((new Date()).getFullYear() + 1) + "";

    return esVersion;
}