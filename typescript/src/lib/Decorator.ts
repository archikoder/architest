import * as assert from 'assert'

export function test(target: any, propertyKey?: any, descriptor?: any) {

    // if(propertyKey && descriptor){
    //     // experimental decorator
    //     console.log("experimental deco", target)
    //     const testFunction = descriptor.value;

    //     descriptor.value = function(...args: any[]){
    //         return target.constructor.prototype.__proto__[propertyKey + ""].call(this, ...args);
    //     }

    //     descriptor.value.test = testFunction

    //     return descriptor
    // }

    if(propertyKey && descriptor){
        // experimental decorator
        console.log("experimental deco", target)

        const testFunction = descriptor.value;

        descriptor.value = function(...args: any[]){
            console.log("executed descriptor", args)
            const got = target.constructor.prototype.__proto__[propertyKey + ""].call(this, ...args);
            const expected = testFunction.call(this, ...args);
            console.log("Internal", got, expected)
            return assert.deepStrictEqual(expected, got);
        }

        descriptor.value.test = testFunction

        return descriptor
    }

    if(propertyKey && (propertyKey as ClassMethodDecoratorContext).kind === "method" ){
        // stage 3 decorator
        console.log("stage 3 deco", target, propertyKey, descriptor);

        const replacement = function(this: any, ...args: any[]): any{
            console.log("this is executed");
            console.log(this);
            console.log(args);
            const expected = target.call(this, ...args);
            const got = (this as any).prototype[propertyKey.name].call(this, ...args);
            return assert.deepStrictEqual(expected, got);
        }

        return replacement
    }
}

// export const given = (value: any) => {

//     return (target: any, propertyKey: any, index: number) => {

//         if (!target[propertyKey].defaults)
//             target[propertyKey].defaults = [];

//         target[propertyKey].defaults[index] = value;
//     }
// }