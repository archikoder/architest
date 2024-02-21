import * as ts from 'typescript';

export function test(target: any, propertyKey?: any, descriptor?: any) {

    if (propertyKey && descriptor) {

        const expectedFunction = descriptor.value;

        descriptor.value = replaceFunctionBody(expectedFunction, { class: target.constructor.name, method: propertyKey });
        descriptor.value.test = expectedFunction;

        return descriptor;
    }

    if (propertyKey && (propertyKey as ClassMethodDecoratorContext).kind === "method") {

        const replacement = replaceFunctionBody(target, { class: "Unknown class", method: propertyKey.name });
        (replacement as any).test = target;

        return replacement;
    }
}

function replaceFunctionBody(_function: string, _metadata: any): Function {

    const functionString = _function.toString();

    const sourceFile = ts.createSourceFile(
        "temp.ts",
        functionString,
        ts.ScriptTarget.Latest,
        true
    )

    let functionName = "";
    let parameters: String[] = [];
    let functionBody = "";
    let isAsync = false;

    sourceFile.statements.forEach(node => {

        if (ts.isExpressionStatement(node)) {

            if (ts.isIdentifier(node.expression))
                isAsync = node.expression.getText() === "async";

            if (ts.isCallExpression(node.expression)) {

                functionName = node.expression.expression.getText();

                node.expression.arguments.forEach(argument => {

                    if (ts.isBinaryExpression(argument))
                        parameters.push(argument.left.getText());
                    else {
                        console.warn(`\x1B[33m[WARN] Default value for test method not specified [ ${_metadata.class} -> ${_metadata.method} -> ${argument.getText()} ] ... Your test result could be wrong\x1B[0m`);
                        parameters.push(argument.getText())
                    }
                })
            }
        }
        if (ts.isBlock(node)) {
            functionBody = node.getText();
        }
    });

    const replacedBody = `
        const parent = this.constructor.prototype.__proto__;
        const parentFunction = parent['${functionName}'];

        if(this.constructor.prototype.__proto__.constructor.name == "Object")
            console.log("\x1B[33m[WARN] Test class does not extends target class ... Your test could be wrong\x1b[0m:");

        if(parentFunction.test)
            return parent.constructor.prototype.__proto__['${functionName}'].call(this, ${parameters.join(', ')});

        return this.constructor.prototype.__proto__['${functionName}'].call(this, ${parameters.join(', ')});
    `;

    let replacedFunctionString;

    let finalFunctionString = functionString.replace("async ", "");
    
    const functionBlockIndex = finalFunctionString.lastIndexOf(functionBody);

    if (functionBlockIndex > -1)
        replacedFunctionString = finalFunctionString.substring(0, functionBlockIndex) + `{ ${replacedBody} }`;

    return new Function(`return ${isAsync ? "async" : "" } function ` + (replacedFunctionString || 'invalidFunction(){console.log("error parsing function")}'))();
}