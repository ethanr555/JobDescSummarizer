import {  describe, expect, test, jest, beforeAll, beforeEach, afterEach} from '@jest/globals';
import { createButton, IndeedInit  } from './contentFunctions';


describe("createButton Tests", () => {

    const mockURLGet = (string) => {
        return "";
    }

    test("createButton creates element and attaches to element", () => {
        const mockElement: HTMLElement = document.createElement('div');
        document.body.appendChild(mockElement);
        createButton(mockElement, "test", mockURLGet, document);
        expect(document.getElementById("test")).not.toBeNull();
        expect(document.getElementById("test")?.parentElement).toBe(mockElement);
    })
});

describe("indeedInit Tests", () => {
    
    //Create mock elements that are searched for on indeed.com
    const htmlFlagID: string = "jobsearch-JapanPage";
    const parentID: string = "jobsearch-ViewJobButtons-container";
    const buttonID: string = 'jobDescSummarizer_Button';
    const mockURLGet = (string) => {
        return "";
    }
   
    beforeEach(() => {
        const flagElement = document.createElement('div');
        flagElement.id = htmlFlagID;
        document.body.appendChild(flagElement);
        const parentElement = document.createElement('div');
        parentElement.id = parentID;
        flagElement.appendChild(parentElement);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    })
    
    test("element is created", () => {
        IndeedInit(mockURLGet, document);
        expect(document.getElementById(buttonID)).not.toBeNull();
    });

    //Observed behavior on the indeed.com website is that after an arbitruary amount of time the elements are created,
    //a script runs that resets keys elements that the injected element is child of the element with parentID defined above.
    // This test will randomly determine amount of times with random delays 4 times, to capture that arbitruary nature.
    const rngRemoveCountArr: number[] = [];
    for (let i = 0; i < 4; i++) {
        rngRemoveCountArr.push(Math.round(Math.random() * 5));
    }
    test.each(rngRemoveCountArr)("element with same id remains after several removal attempts", async (amount: number) => {
        IndeedInit(mockURLGet, document);
        let button: HTMLElement | null = document.getElementById(buttonID);
        let i = 0;
        let loop: () => void;
        loop = () => {setTimeout(() => {
                let button = document.getElementById(buttonID);
                button?.remove();
                i++;
                if (i < amount) {
                    loop();
                }
            }, Math.random())
        };
        await loop();
        expect(document.getElementById(buttonID)).not.toBeNull();
    })
});

