import { TrieNode, ParseTrieNode } from "./trieData.ts";
import { argv } from "node:process";
import { writeFile } from "node:fs";

export function outputTS(inputTrie: TrieNode, varName: string, filePath: string): void {
    
    //Create file string
    const fileContent: string = 
        "import { TrieNode } from './trieData/trieData.ts'; \nexport const " +
        varName + ": TrieNode = " + JSON.stringify(inputTrie) + ";";
    
    writeFile(filePath, fileContent, err => {
        if (err) {
            console.log("Failed to generate Typescript");
        }
    });
}

const website: string[] = [
    "indeed.com",
    "linkedin.com"
]

const args: string[] = argv;
let varName: string = "compiledData";
if (args.length > 2) {
    varName = args[2];
}
let filePath: string = "defaultOut.ts";
if (args.length > 3) {
    filePath = args[3];
}

const resultNodes: TrieNode = ParseTrieNode(website);
outputTS(resultNodes, varName, filePath);