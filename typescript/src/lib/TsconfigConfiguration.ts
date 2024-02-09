import { Configuration } from "../domain/Configuration";
const fs = require('fs');

export class TsconfigConfiguration implements Configuration{

    programFolder(): string {
        
        try{
            let tsConfig = fs.readFileSync("./tsconfig.json").toString();

            // strip comments
            tsConfig = tsConfig.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m: string, g: string) => g ? "" : m);

            const parsed = JSON.parse(tsConfig);

            if(!parsed.compilerOptions){
                console.log("tsconfig.json is not found or contains invalid or non-supported structure: using current folder as program root");
                return "./";
            }

            return parsed.compilerOptions.outDir || './';
        }
        catch (error) {
            
            console.log("tsconfig.json is not found or contains invalid or non-supported structure: using current folder as program root")
            return "./";
        }
    }
}