import {  describe, expect, test} from '@jest/globals';
import { GetHost, IndeedInit  } from './main';

//Mock window and document?

describe("determineDOMLocation Cases", () => {


    

    function mockMap(): Record<string, string> {
        return {
            "www.indeed.com": "jobDescriptionText"
        };
    }

    test('if result is null if hostname is invalid', () => {
        expect(determineDOMLocation(mockMap())).toBe(null);
    })

    test('if button is attached to root if there is no parent element', () => {
        const ogLocation = JSON.parse(JSON.stringify(window.location));
        const mockLocation = JSON.parse(JSON.stringify(ogLocation));
        mockLocation.hostname = "www.indeed.com";
        Object.defineProperty(window, 'location', {
            configurable: true,
            writable: true,
            value: mockLocation
        });
        const mockEl: HTMLElement = document.createElement("div");
        mockEl.id = "jobDescriptionText";
        document.body.appendChild(mockEl);
        // Result should not be null, meaning a successful attachment
        expect(determineDOMLocation(mockMap())).toBe(document.body);
        mockEl.remove();
        Object.defineProperty(window, 'location', {
            configurable: true,
            writable: true,
            value: ogLocation
        })
    })

    test('if link is valid but element is not present, null', () => {
        const ogLocation = JSON.parse(JSON.stringify(window.location));
        const mockLocation = JSON.parse(JSON.stringify(ogLocation));
        mockLocation.hostname = "www.indeed.com";
        console.log(ogLocation);
        Object.defineProperty(window, 'location', {
            configurable: true,
            writable: true,
            value: mockLocation
        });
        expect(determineDOMLocation(mockMap())).toBe(null);
        Object.defineProperty(window, 'location', {
            configurable: true,
            writable: true,
            value: ogLocation 
        })
    })

})

//createButton tests, currently not needed as major point of failure is caught in build process
