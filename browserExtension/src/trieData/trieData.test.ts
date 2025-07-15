import { describe, test, expect } from "@jest/globals";
import { GetValueInTrie, ParseTrieNode, TrieNode } from './trieData';

// Tests to test the limits of ParseTrieNode()
describe("ParseTrieNode tests ", () => {
    describe("Single word tests", () => {
        test.each(["com", "ta", "ppppplppp", "dla;fjsdkfjsda;lkfjalskdfj"])("Single word letter order", (word) => {
            let trieResult: TrieNode = ParseTrieNode([word]);
            //We want the root node to not contain the first letter, as there could be several words that end in completely different characters.
            trieResult = trieResult.children[0]; 
            for (let i = word.length - 1; i >= 0; i--) {
                if (trieResult === null || trieResult === undefined) {
                    throw new Error("TrieNode tree is too short for provided string");
                }
                if (trieResult.value !== word[i]) {
                    throw new Error("TrieNode tree values are mismatched/missing");
                }
                trieResult = trieResult.children[0];
            }
            if (!(trieResult === null || trieResult === undefined)) {
                throw new Error("TrieNode tree is longer than provided string");
            }
        });

        test.each(["org", "www.example.com", "lorem ipsum"])("isValue is properly set at end of single word Trie", (word) => {
            let trieResult: TrieNode = ParseTrieNode([word]).children[0];
            for (let i = word.length - 1; i >= 0; i--) {
                if (i === 0 && trieResult.isValue === false) {
                    throw new Error("isValue is not set at end of word.")
                } else if (i !== 0 && trieResult.isValue === true) {
                    throw new Error("isValue is set to true too soon, imaginary value was created");
                }
                trieResult = trieResult.children[0];
            }
        })
    });

    describe("Multiple word tests", () => {
        test.each([
            ["indeed.com", "linked.com"], 
            ["www.example.com", "www.government.edu"], 
            ["1example.com", "2example.com"], 
            ["hannnah", "hantnah"],
            ["smith.com", "osmith.com"]
        ]) ("Multiple word diverenge test", (word1, word2) => {
            let trieResult: TrieNode = ParseTrieNode([word1, word2]);
            let i: number = word1.length - 1;
            let j: number = word2.length - 1;
            while (trieResult !== undefined && i >= 0 && j >= 0) {
                if (word1.charAt(i) !== word2.charAt(j)) {
                    //console.log("Breaks at: " + word1 + ": " + word1.charAt(i) + " & " + word2 + ": " + word2.charAt(j));
                    expect(trieResult.children.length).toBeGreaterThan(1);
                    return;
                }
                i--;
                j--;
                trieResult = trieResult.children[0];
            }
        })
    })


});