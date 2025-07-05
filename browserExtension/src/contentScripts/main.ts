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

export function determineDOMLocation(urlMap: Record<string, string>): HTMLElement | null {
   let currentHost: string = window.location.hostname;
   //If a valid website (ensure hostToID and Manifest.json are synced in what is supported)
   if (currentHost in urlMap) {
        //Element does not exist, null returned.
        if (document.getElementById(urlMap[currentHost]) == null || document.getElementById(urlMap[currentHost]) == undefined) {
            return null;
        }
        //Element exists, different returns if parent exists
        let parent: HTMLElement | null | undefined = document.getElementById(urlMap[currentHost])?.parentElement;
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
let el = determineDOMLocation(hostToID);
if (el != null) {
    b = createButton(el);
}