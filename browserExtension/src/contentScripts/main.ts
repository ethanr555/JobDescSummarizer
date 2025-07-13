import { getConfigLocal } from '../configDefinition';
import { GetValueInTrie, TrieNode } from '../trieData/trieData';
import { compiledData } from '../compiledData';

export type buttonInjection = {
    SetSummary: () => void,
    ToggleButton: () => void,
    GetButton: () => void
}

//Create a new button, and initialize it at the specific DOM location
export function createButton(parent: HTMLElement, id: string): void {

    const iconLink: string = browser.runtime.getURL("icon/icon.svg");
    const iconLinkFallBack: string = browser.runtime.getURL("icon/icon_48px.png");
    let newButtonElement: HTMLElement | null = null;
    if (parent != null && parent != undefined) {

        // Button Creation
        newButtonElement = document.createElement("div");
        newButtonElement.id = id;
        const newButtonClickElement = document.createElement("img");
        newButtonClickElement.src = iconLink;
        newButtonClickElement.addEventListener("error", (event: ErrorEvent) => {
            console.log(event.message);
            console.log("Falling back to png.");
            newButtonClickElement.src = iconLinkFallBack;
        });
        newButtonClickElement.addEventListener("click", () => {
            console.log("CLICKED!");
        })
        newButtonElement.appendChild(newButtonClickElement);
        parent.appendChild(newButtonElement);
    }
}


export function IndeedInit(): buttonInjection {
    const elementsToCheck: string[] = [
        "jobsearch-JapanPage",
        "jobsearch-Main",
        "viewJobSSRRoot"
    ]
    
    const buttonID: string = "jobDescSummarizer_Button";

    let ob = new MutationObserver(() => {
        let parent: HTMLElement | null = document.getElementById("jobsearch-ViewJobButtons-container");
        if (parent != null) {
            if (parent.children.namedItem(buttonID) == null) {
                createButton(parent, buttonID);
            }
        }    
    });

    for (const element of elementsToCheck) {
        let next: HTMLElement | null = document.getElementById(element);
        if (next != null) {
            ob.observe(next, {
                attributes: false,
                childList: true,
                characterData: false,
                subtree: true
            })
            break;
        }
    }
    return {
        SetSummary: () => {},
        ToggleButton: () => {},
        GetButton: () => {}
    }
}

export function LinkedInInit(): buttonInjection {
    return {
        SetSummary: () => {},
        ToggleButton: () => {},
        GetButton: () => {}
    }
}

export function GetWindowURL(): string {
    return window.location.hostname;
}

export function GetHost(hostname: string): string {
    let buildString: string = "";
    let periodCounter: number = 0;
    for (let i = hostname.length; i >= 0; i--) {
        if (hostname.charAt(i) === '.') {
            periodCounter++;
            if (periodCounter >= 2) {
                return buildString;
            }
        }
        buildString = hostname.charAt(i) + buildString; 
    }
    return buildString;
}

//Main execution starts here!

const data: TrieNode = compiledData;

const initButtonInjection: Record<string,() => buttonInjection> = {
    "indeed.com": IndeedInit,
    "linkedin.com": LinkedInInit
} as const;


const host: string | null = GetValueInTrie(GetWindowURL(), data);
console.log(host);
if (host !== null && host in initButtonInjection) {
    initButtonInjection[host]();   
}

console.log(getConfigLocal());