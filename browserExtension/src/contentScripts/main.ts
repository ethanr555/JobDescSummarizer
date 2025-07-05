var hostToID: Record<string, string> = {
    "www.indeed.com": "jobDescriptionText",
    "www.linkedIn.com": "job-details"
}

export type button = {
    // Store information and state about button here.
    domElement: HTMLElement;
    isToggled: boolean;
}

//Create a new button, and initialize it at the specific DOM location
export function createButton(element: HTMLElement): button | null {

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

export function determineDOMLocation(): HTMLElement | null {
   let currentHost: string = window.location.hostname;
   //If a valid website (ensure hostToID and Manifest.json are synced in what is supported)
   if (currentHost in hostToID) {
        //Element does not exist, null returned.
        if (document.getElementById(hostToID[currentHost]) == null || document.getElementById(hostToID[currentHost]) == undefined) {
            return null;
        }
        //Element exists, different returns if parent exists
        let parent: HTMLElement | null | undefined = document.getElementById(hostToID[currentHost])?.parentElement;
        if (parent != undefined && parent != null) {
            return parent;
        } else {
            return document.body;
        }
   } else {
        return null;
   } 
}

//Do I need to test this part?
var b: button | null;
let el = determineDOMLocation();
if (el != null) {
    b = createButton(el);
}