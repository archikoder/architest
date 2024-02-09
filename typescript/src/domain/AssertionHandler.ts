import { AssertionError } from "assert";
import { TestItem } from "./TestItem";

export interface AssertionHandler{

    handle(test: TestItem, exception?: AssertionError): any;
}