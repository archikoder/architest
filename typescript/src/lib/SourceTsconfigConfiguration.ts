import { Configuration } from "../domain/Configuration";
const fs = require('fs');

const DEFAULT_ES_VERSION = "es2020";
const DEFAULT_PROGRAM_FOLDER = "./";

export class SourceTsconfigConfiguration implements Configuration{

    target(): string {
        return this.parseTsConfigFile().compilerOptions?.target || DEFAULT_ES_VERSION;
    }

    programFolder(): string {
        return this.parseTsConfigFile().compilerOptions?.rootDir || DEFAULT_PROGRAM_FOLDER;
    }

    private parseTsConfigFile(){

        try{

            let tsConfig = fs.readFileSync("./tsconfig.json").toString();
            
            // strip comments
            tsConfig = tsConfig.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m: string, g: string) => g ? "" : m);

            return JSON.parse(tsConfig);
        }
        catch (error) {
            
            console.log("tsconfig.json is not found or contains invalid or non-supported structure: using current folder as program root")
            return {};
        }
    }
}