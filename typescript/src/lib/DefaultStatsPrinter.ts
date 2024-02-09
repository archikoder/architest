import { StatsPrinter } from "../domain/StatsPrinter";

export class DefaultStatsPrinter implements StatsPrinter{

    print() {
        console.log("executed");
        // time
        // total tests
        // successful
        // errornous    
    }
}