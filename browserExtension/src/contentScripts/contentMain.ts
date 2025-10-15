import { IndeedInit, LinkedInInit, buttonInjection } from "./contentFunctions.ts";
import { TrieNode, GetValueInTrie } from "../trieData/trieData.ts";
import { compiledData } from "../generated/compiledData.generated.ts"; //Needs to be compiled before this file. Consult Makefile

const data: TrieNode = compiledData;

const initButtonInjection: Record<string,() => buttonInjection> = {
    "indeed.com": () => {
        return IndeedInit(browser.runtime.getURL, document)
    },
    "linkedin.com": LinkedInInit
} as const;


const host: string | null = GetValueInTrie(window.location.hostname, data);
console.log(host);
if (host !== null && host in initButtonInjection) {
    initButtonInjection[host]();   
}