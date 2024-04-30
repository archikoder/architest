import { Configuration } from "../domain/Configuration";
const fs = require('fs');

const TEST_PROGRAM_FOLDER = "./";

export class SourceTsconfigConfiguration implements Configuration{

    testFolder(): string {
        return this.parseTsConfigFile().architest?.root || TEST_PROGRAM_FOLDER;
    }

    private parseTsConfigFile(){

        try{

            let tsConfig = fs.readFileSync("./tsconfig.json").toString();
            
            // strip comments
            tsConfig = tsConfig.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m: string, g: string) => g ? "" : m);

            return JSON.parse(tsConfig);
        }
        catch (error) {
            
            console.warn("\x1B[33mtsconfig.json is not found or contains invalid or non-supported structure: using current folder as program root\x1B[0m")
            return {};
        }
    }
}