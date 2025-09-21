import { setConfigProperty, getConfigProperty } from "../configDefinition.ts";
import { getValidElements, getElementsStruct, setupElementStruct, setupElement } from "./configFunctions.ts";

const elementsToFind: getElementsStruct[] = [
    {
        elementID: 'yrsofxp',
        configType: 'yrsOfExp'
    },
    {
        elementID: 'programminglanguages',
        configType: 'proLang'
    },
    {
        elementID: 'frameworks',
        configType: 'framework'
    },
    {
        elementID: 'devtools',
        configType: 'tools'
    },
    {
        elementID: 'logistical',
        configType: 'logistical'
    },
    {
        elementID: 'platforms',
        configType: 'platforms'
    },
    {
        elementID: 'conflict',
        configType: 'conflict'
    },
]

const setupElementPairs: setupElementStruct[] = getValidElements(document, elementsToFind);
for (const i of setupElementPairs) {
    getConfigProperty(i.configType, browser.storage.local).then((value: boolean) => {
        setupElement(i.element, value, () => {setConfigProperty(i.configType, i.element.checked, browser.storage.local)});
    });
}