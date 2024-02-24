import { Argument } from "../domain/Argument";

export class ShellArgument implements Argument{

    constructor(protected args: string[]){}

    testName(): string {

        const args = this.args.slice(2);

        if(!args || !args.length)
            return "";

        return args.filter(arg => !arg.startsWith("--"))[0];
    }
    
}