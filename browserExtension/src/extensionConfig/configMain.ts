import { getValidElements, setupElements, getElementsStruct, setupElementStruct } from "./configFunctions";

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
setupElements(setupElementPairs, browser.storage.local);