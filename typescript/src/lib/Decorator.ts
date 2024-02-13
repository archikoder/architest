export function test(target: any, propertyKey?: any, descriptor?: any) {

    if(propertyKey && descriptor){

        const expectedFunction = descriptor.value;

        descriptor.value = new Function("return function " + replaceFunctionBody(expectedFunction.toString()))();
        descriptor.value.test = expectedFunction;

        return descriptor;
    }

    if(propertyKey && (propertyKey as ClassMethodDecoratorContext).kind === "method" ){

        const replacement = new Function("return function " + replaceFunctionBody(target.toString()))();
        replacement.test = target;

        return replacement;
    }
}

function replaceFunctionBody(functionString: string): string {

    const functionName = functionString.substring(0, functionString.indexOf('(')).trim();
    const parametersString = functionString.substring(functionString.indexOf('(') + 1, functionString.indexOf(')')).trim();
    const parameters = parametersString.split(',').map(param => param.split("=")[0].trim());

    const replacedBody = `

        const parent = this.constructor.prototype.__proto__;
        const parentFunction = parent['${functionName}'];

        //console.log(parentFunction);

        if(parentFunction.test)
            return parent.constructor.prototype.__proto__['${functionName}'].call(this, ${parameters.join(', ')});

        return this.constructor.prototype.__proto__['${functionName}'].call(this, ${parameters.join(', ')});
    `;
    
    return functionString.replace(/(\{[\s\S]*\})/, `{ ${replacedBody} }`);
}