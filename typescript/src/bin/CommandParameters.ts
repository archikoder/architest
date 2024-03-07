import { ShellArgument } from "./ShellArgument";

export class CommandParameters{

    constructor(private args: ShellArgument, private workingDirectory: string){}

    public asArray(): string[]{

        const commandParameters = [];

        if(this.args.haveWatchFlag())
        commandParameters.push("watch");

        commandParameters.push("--tsconfig");
        commandParameters.push(`${this.workingDirectory}/../../tsconfig.architest.json`);
        commandParameters.push(`${this.workingDirectory}/architest.js`);

        if(this.args.testName())
        commandParameters.push(`"${this.args.testName()}"`);

        return commandParameters;
    }
}