var hostToID: Record<string, string> = {
    "indeed.com": "jobDescriptionText",
    "linkedIn.com": "job-details"
}

type button = {
    // Store information and state about button here.
    domElement: HTMLElement;
    isToggled: boolean;
}

//Create a new button, and initialize it at the specific DOM location
function createButton(element: HTMLElement): button | null {

    let newButtonElement: HTMLElement | null = null;
    if (element != null && element != undefined) {
        newButtonElement = document.createElement("div");
        element.appendChild(newButtonElement);
        return {
            domElement: newButtonElement as HTMLElement,
            isToggled: false
        }
    }
    return null; 
}

function determineDOMLocation(): HTMLElement | null {
   let currentHost: string = window.location.hostname;
   if (currentHost in hostToID) {
        let parent: HTMLElement | null | undefined = document.getElementById(hostToID[currentHost])?.parentElement;
        if (parent != undefined && parent != null) {
            return parent;
        } else {
            return null;
        }
   } else {
        return null;
   } 
}

var b: button | null;
let el = determineDOMLocation();
if (el != null) {
    b = createButton(el);
}