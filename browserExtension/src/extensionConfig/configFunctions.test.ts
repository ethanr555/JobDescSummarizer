import { describe, expect, test, jest, beforeEach, afterEach} from "@jest/globals";
import { getElement, getElementsStruct, getValidElements, setupElement, setupElementStruct } from "./configFunctions.ts";


describe("getElement() test", () => {

    beforeEach(() => {
        const mockInputElement: HTMLInputElement = document.createElement("input");
        mockInputElement.id = "test";
        document.body.appendChild(mockInputElement);
        const mockOtherElement: HTMLElement = document.createElement("div");
        mockOtherElement.id = "badtest";
        document.body.appendChild(mockOtherElement);
    })

    afterEach(() => {
        document.body.innerHTML = "";
    })
    
    test("Regular getElement call", () => {
        const result: setupElementStruct | null = getElement("test", 'yrsOfExp', document);
        expect(result).not.toBeNull();
    });

    test("Should get null if element does not exist", () => {
        const result: setupElementStruct | null = getElement("fake", 'yrsOfExp', document);
        expect(result).toBeNull();
    });

    test("Should also be null if the element is not an HTML Input element", () => {
        const result: setupElementStruct | null = getElement("badtest", 'yrsOfExp', document);
        expect(result).toBeNull();
    })

    test("Element in result should have the same id as requested", () => {
        const result: setupElementStruct | null = getElement("test", 'yrsOfExp', document);
        expect(result).not.toBeNull();
        expect(result?.element.id).toEqual("test");
    });

    test("configType in result should be the same as the one provided in the call", () => {
        const result: setupElementStruct | null = getElement("test", 'yrsOfExp', document);
        expect(result).not.toBeNull();
        expect(result?.configType).toEqual('yrsOfExp');
    });

});

describe("getValidElements tests", () => {

    beforeEach(() => {
        const element1: HTMLElement = document.createElement("input");
        const element2: HTMLElement = document.createElement("div");
        const element3: HTMLElement = document.createElement("input");
        element1.id = "test1";
        element2.id = "test2";
        element3.id = "test3";
        document.body.appendChild(element1);
        document.body.appendChild(element2);
        document.body.appendChild(element3);
    });
    
    afterEach(() => {
        document.body.innerHTML = "";
    });

    test("Correct count of valid elements are included in return", () => {
        const testPair: getElementsStruct[] = [{
                elementID: "test1",
                configType: 'yrsOfExp'
            },
            {
                elementID: "test2",
                configType: 'conflict'
            },
            {
                elementID: "test3",
                configType: 'framework'
            }];
        const result: setupElementStruct[] = getValidElements(document, testPair);
        expect(result.length).toEqual(2);        
    });

    test("The correct valid elements are included in return", () => {
        const testPair: getElementsStruct[] = [{
                elementID: "test1",
                configType: 'yrsOfExp'
            },
            {
                elementID: "test2",
                configType: 'conflict'
            },
            {
                elementID: "test3",
                configType: 'framework'
            }];
        const result: setupElementStruct[] = getValidElements(document, testPair);
        let resultElements: HTMLInputElement[] = []
        for (let i of result) {
            resultElements.push(i.element);
        }
        expect(resultElements).toContain(document.getElementById('test1'));
        expect(resultElements).toContain(document.getElementById('test3'));
        expect(resultElements).not.toContain(document.getElementById('test2'));
    });

    test("Ensure elements have matching configTypes as assigned from input", () => {
        const testPair: getElementsStruct[] = [{
                elementID: "test1",
                configType: 'yrsOfExp'
            },
            {
                elementID: "test2",
                configType: 'conflict'
            },
            {
                elementID: "test3",
                configType: 'framework'
            }];
        const result: setupElementStruct[] = getValidElements(document, testPair);
        for (let i of result) {
            switch (i.element.id) {
                case "test1":
                    expect(i.configType).toBe('yrsOfExp');
                    break;
                case "test2":
                    expect(i.configType).toBe('conflict');
                    break;
                case "test3":
                    expect(i.configType).toBe('framework');
                    break;
                default:
                    //Auto-fail, because there should only be at max test1, test2, and test3 ids in this list.
                    expect(false).toBe(true);
                    break;
            }
        }

    });

});

describe("setupElement tests", () => {

    afterEach(() => {
        document.body.innerHTML = "";
    })

    test("setupElement assigns callback function to element's change eventlistener", () => {
        const mockElement1: HTMLElement | null = document.createElement("input");
        expect(mockElement1 instanceof HTMLInputElement).toBeTruthy();
        const mockElement2: HTMLInputElement = mockElement1 as HTMLInputElement;
        document.body.appendChild(mockElement2);
        const mockFunction = jest.fn(() => {});

        setupElement(mockElement2, false, mockFunction).then( () => {
            const mockEvent: Event = new Event('change');
            mockElement2.dispatchEvent(mockEvent);

            expect(mockFunction.mock.calls.length).toBeGreaterThanOrEqual(1);
        })
    });

    const testCases1: boolean[] = [true, false];
    test.each(testCases1)("setupElement appropriately assigns checked status based on input: value %s", (arg: boolean) => {
        const mockElement1: HTMLElement | null = document.createElement("input");
        expect(mockElement1 instanceof HTMLInputElement).toBeTruthy();
        const mockElement2: HTMLInputElement = mockElement1 as HTMLInputElement;
        document.body.appendChild(mockElement2);

        setupElement(mockElement2, arg, () => {}).then(() => {
            expect(mockElement2.checked).toBe(arg);            
        })
    })
});