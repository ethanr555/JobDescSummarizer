import { configStoreProps, getConfigProperty, setConfigProperty } from "../configDefinition"

//Type alias that is used for GetElements to ensure that HTML elementID and configType are paired.
export type getElementsStruct = {
    elementID: string,
    configType: configStoreProps
}

//Type alias that is used for setupElements that pairs the HTMLInputElement and configType together.
export type setupElementStruct = {
    element: HTMLInputElement,
    configType: configStoreProps
}

//Gets an HTMLElement that is an input element, and returns it as a setupElementStruct, with the match configType assigned automatically.
//Returns null if element is null or is not an input element.
export function getElement(id: string, prop: configStoreProps, doc: Document): setupElementStruct | null {
    const currElement: HTMLElement | null = doc.getElementById(id);
    if (currElement !== null && currElement instanceof HTMLInputElement) {
        const inputElement: HTMLInputElement = currElement as HTMLInputElement;
        return {
            element: inputElement,
            configType: prop
        };
    }
    return null;
}

//Utilized logic from getElement function, but also does a nullcheck, and adds valid entries to a returned array.
//Reads from elementPairs, since configType is needed to assure that said elements found can be properly assigned with setupElements().
export function getValidElements(doc: Document, elementPairs: getElementsStruct[]): setupElementStruct[] {
    let elementStruct: setupElementStruct[] = [];
    const nullCheck = (result: setupElementStruct | null) => {
        if (result !== null) {
            elementStruct.push(result);
        }
    }
    const localGetElement = (id: string, prop: configStoreProps) => {nullCheck(getElement(id, prop, doc));};

    for (let i of elementPairs) {
        localGetElement(i.elementID, i.configType);
    }

    return elementStruct;
}

//Sets up input elements provided with lambda functions that update the stored value in the storagearea based on checked state.
//Ensure the right properties are saved to the right config properties with the right configStoreProps pairings in setupElementStruct[]
export function setupElements(elements: setupElementStruct[], store: browser.storage.StorageArea) {
    for (let i of elements) {
        setupElement(i, store);
    }
}
//Sets up one element with lambda function that updates the stored value in the storagearea based on checked state of element.
//Will default to checked if the element has never been saved to storage before.
export async function setupElement(element: setupElementStruct, store: browser.storage.StorageArea) {
    
    const value: boolean = await getConfigProperty(element.configType, store);
    if (value !== undefined) {
        element.element.checked = value;
        element.element.addEventListener('change', () => {setConfigProperty(element.configType, element.element.checked, store);});
    }
}