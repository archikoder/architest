export function test(target: any, propretyKey?: any, descriptor?: PropertyDescriptor) {

    if(propretyKey && descriptor){

        const testFunction = descriptor.value;

        descriptor.value = function(...args: any[]){
            return target.constructor.prototype.__proto__[propretyKey].call(this, ...args);
        }

        descriptor.value.test = testFunction
    }
}

export const given = (value: any) => {

    return (target: any, propertyKey: any, index: number) => {

        if (!target[propertyKey].defaults)
            target[propertyKey].defaults = [];

        target[propertyKey].defaults[index] = value;
    }
}