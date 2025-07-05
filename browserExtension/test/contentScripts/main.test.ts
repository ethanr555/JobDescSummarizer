import { describe, expect, jest, test} from '@jest/globals';
import { determineDOMLocation } from '../../src/contentScripts/main';
import { getTokenSourceMapRange, JSDocParsingMode } from 'typescript';

//Mock window and document?

test('if result is null if hostname is invalid', () => {
    expect(determineDOMLocation()).toBe(null);
})

test('if button is attached to root if there is no parent element', () => {

    //Valid element, but parent is missing for some reason.
    let ogWindow: Location = window.location;
    Object.defineProperty(window, 'location', {
        configurable: true,
        enumerable: true,
        value: new URL("https://www.indeed.com/")
    });
    let mockEl: HTMLElement = document.createElement("div")
    mockEl.id = "jobDescriptionText"
    document.body.appendChild(mockEl)
    //document.createElement()
    // Result should not be null, meaning a successful attachment
    expect(determineDOMLocation()).toBe(document.body);
    Object.defineProperty(window, "location", {
        configurable: true,
        enumerable: true,
        value: ogWindow
    });
    mockEl.remove()
})

test('if link is valid but element is not present, null', () => {
    let ogWindow: Location = window.location;
    Object.defineProperty(window, 'location', {
        configurable: true,
        enumerable: true,
        value: new URL("https://www.indeed.com/")
    });
    expect(determineDOMLocation()).toBe(null);
    Object.defineProperty(window, "location", {
        configurable: true,
        enumerable: true,
        value: ogWindow
    });
})

//createButton tests, currently not needed as major point of failure is caught in build process
