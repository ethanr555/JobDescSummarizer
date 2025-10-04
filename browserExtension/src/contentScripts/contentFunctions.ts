export type buttonInjection = {
    SetSummary: () => void,
    ToggleButton: () => void,
    GetButton: () => void
}

//Create a new button, and initialize it at the specific DOM location
export function createButton(parent: HTMLElement, id: string, getURL: (input: string) => string, dom: Document): void {

    const iconLink: string = getURL("icon/icon.svg");
    const iconLinkFallBack: string = getURL("icon/icon_48px.png");
    let newButtonElement: HTMLElement | null = null;
    if (parent != null && parent != undefined) {

        // Button Creation
        newButtonElement = dom.createElement("div");
        newButtonElement.id = id;
        const newButtonClickElement = dom.createElement("img");
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

export function IndeedInit(getURL: (input: string) => string, dom: Document): buttonInjection {
    const elementsToCheck: string[] = [
        "jobsearch-JapanPage",
        "jobsearch-Main",
        "viewJobSSRRoot"
    ]
    
    const buttonID: string = "jobDescSummarizer_Button";

    const buttonCreation: () => void = () => {
        const parent: HTMLElement | null = dom.getElementById("jobsearch-ViewJobButtons-container");
        if (parent != null) {
            if (parent.children.namedItem(buttonID) == null) {
                createButton(parent, buttonID, getURL, dom);
            }
        }    
    }
    const ob = new MutationObserver(() => {
        buttonCreation();
    });

    for (const element of elementsToCheck) {
        const next: HTMLElement | null = dom.getElementById(element);
        if (next !== null) {
            ob.observe(next, {
                attributes: false,
                childList: true,
                characterData: false,
                subtree: true
            })
            buttonCreation();
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
