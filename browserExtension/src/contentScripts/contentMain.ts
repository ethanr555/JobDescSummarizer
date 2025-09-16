import { IndeedInit, LinkedInInit, buttonInjection } from "./contentFunctions";
import { TrieNode, GetValueInTrie } from "../trieData/trieData";
import { compiledData } from "../compiledData";

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