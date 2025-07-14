import {  describe, expect, test, jest, beforeAll} from '@jest/globals';
import { createButton, IndeedInit  } from './contentFunctions';


describe("createButton Tests", () => {

    const mockURLGet = (string) => {
        return "";
    }
    test("createButton creates element and attaches to element", () => {

        const mockElement: HTMLElement = document.createElement('div');
        document.body.appendChild(mockElement);
        createButton(mockElement, "test", mockURLGet);
        expect(document.getElementById("test")).not.toBeNull();
        expect(document.getElementById("test")?.parentElement).toBe(mockElement);
    })
})

