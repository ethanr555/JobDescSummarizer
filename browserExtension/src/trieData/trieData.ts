
export type TrieNode = {
    value: string,
    children: TrieNode[],
    isValue: boolean 
}


export function ParseTrieNode(values: string[] ): TrieNode {
    
    const resultNode: TrieNode = {
        value: "root",
        children: [],
        isValue: false
    };
    let recursiveNodeInsert: (index: number, value: string, currentNode: TrieNode) => void;
    // eslint-disable-next-line prefer-const
    recursiveNodeInsert = (index: number, currentStr: string, currentNode: TrieNode) => {
        if (index < 0) {
            currentNode.isValue = true;
            return;
        }

        const nextChar: string = currentStr.charAt(index);
        for (let i = 0; i < currentNode.children.length; i++) {
            if (currentNode.children[i].value === nextChar) {
                recursiveNodeInsert(index - 1, currentStr, currentNode.children[i]);
                return;
            }
        }
        const newLength: number = currentNode.children.push({
            value: currentStr.charAt(index),
            children: [],
            isValue: false
        });
        recursiveNodeInsert(index - 1, currentStr, currentNode.children[newLength - 1]);

    };

    for (let i = 0; i < values.length; i++)
    {
        const nextValue: string | undefined = values[i];
        if (nextValue !== undefined) recursiveNodeInsert(nextValue.length - 1, nextValue, resultNode);
    }

    return resultNode;

}

export function GetValueInTrie(searchString: string, root: TrieNode): string | null {
    let recursiveNodeSearch: (index: number, currentNode: TrieNode, currentString: string) => string | null;
    // eslint-disable-next-line prefer-const
    recursiveNodeSearch = (index: number, currentNode: TrieNode, currentString: string): string | null => {
        if (currentNode.children.length === 0) {
            if (currentNode.isValue) return currentString;
            return null;
        }

        for (let i = 0; i < currentNode.children.length; i++) {
            if (currentNode.children[i].value === searchString.charAt(index)) {
                if (currentNode.isValue) { //
                    const result: string | null = recursiveNodeSearch(index - 1, currentNode.children[i], currentNode.children[i].value + currentString );
                    if (result === null) return currentString;
                    return result;
                }
                return recursiveNodeSearch(index - 1, currentNode.children[i], currentNode.children[i].value + currentString );
            }
        }
        
        return null;
    }

    return recursiveNodeSearch(searchString.length - 1, root, "");
}
