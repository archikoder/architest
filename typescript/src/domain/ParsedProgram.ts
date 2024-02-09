import { TestItem } from "./TestItem";

export interface ParsedProgram{

    tests(): TestItem[];
}