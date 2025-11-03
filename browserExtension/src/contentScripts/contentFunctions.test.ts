import {  describe, expect, test, beforeEach, afterEach, jest} from '@jest/globals';
import { createButton, IndeedInit, ComposeRequest, contentRequest, handleRequest  } from './contentFunctions.ts';

describe("createButton Tests", () => {

    const mockURLGet = () => {
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

describe("ComposeRequest Tests", () => {
//Due to simplicity of function, these tests exist mainly for self-documentation.

    //Method needs to be post, due to the fact that the corresponding backend will need to read request body, response will vary based on request body,
    // and result will not be cacheable.
    test("Request uses method POST", () => {
        const result = ComposeRequest(["test"], "test");
        expect(result.method).toBe("POST");
    });

    //JSON object should be sent that contains the categories and content of the job description read.
    test("Request content-type is application/json", () => {
        const result = ComposeRequest(["test"], "test");
        expect(result.headers['Content-Type']).toBe("application/json");
    });

    //JSON object being sent needs to conform to interface contentRequest
    test("Request body conforms to interface contentRequest", () => {
        const result = ComposeRequest(["test"], "test");
        const parsedBody = JSON.parse(result.body) as contentRequest;
        expect(parsedBody.categories).toContain("test");
        expect(parsedBody.categories).toHaveLength(1);
        expect(parsedBody.body).toBe("test");
    })
});

describe("handleRequest tests", () => {
    const backupFetch = global.fetch;

    beforeEach(() => {
        //Reset fetch to be original fetch
        global.fetch = backupFetch;
    });

    test("Return correct body", async () => {
        global.fetch = () => { 
            return new Promise<Response>((resolve) => {
                resolve(new Response(JSON.stringify({
                    summary: "test 123"
                })));
            }
        )};

        const result = await handleRequest("dummy", new Request(new URL("http://localhost:80")), new URL("http://localhost:80"), () => {});
        expect(result).toBe("test 123");

    });

    test("Return null if non-ok response is returned", async () => {
        global.fetch = () => { 
            return new Promise<Response>((resolve) => {
                const response: Response = new Response(JSON.stringify({
                        summary: "test 123"
                    }), {
                        status: 404
                    }); 
                resolve(response);
            }
        )};
        
        const result = await handleRequest("dummy", new Request(new URL("http://localhost:80")), new URL("http://localhost:80"), () => {});
        expect(result).toBeNull();
    });

    const bodyResponseCodes = Array.from({length: 100}, (_,i) =>  200 + i);
    bodyResponseCodes.splice(4,2)
    bodyResponseCodes.splice(1);
    test.each(bodyResponseCodes)("Ensure callback is called on success (expect 201, 204, and 205)", async (statuscode: number) => {
        global.fetch = () => { 
            return new Promise<Response>((resolve) => {
                const response: Response = new Response(JSON.stringify({
                        summary: "test 123"
                    }), {
                        status: statuscode
                    }); 
                resolve(response);
            }
        )};

        const mockCallback = jest.fn();
        await handleRequest("dummy", new Request(new URL("http://localhost:80")), new URL("http://localhost:80"), mockCallback);
        expect(mockCallback.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
    test("Ensure callback is not called if body is null", async () => {
        global.fetch = () => { 
            return new Promise<Response>((resolve) => {
                const response: Response = new Response(null, {
                        status: 200
                    }); 
                resolve(response);
            }
        )};

        const mockCallback = jest.fn();
        await handleRequest("dummy", new Request(new URL("http://localhost:80")), new URL("http://localhost:80"), mockCallback);
        expect(mockCallback.mock.calls.length).toBe(0);
    });

    test.each(Array.from({length: 200}, (_,i) =>  400 + i))("Ensure callaback is not called on error status code", async (statuscode: number) => {
        global.fetch = () => { 
            return new Promise<Response>((resolve) => {
                const response: Response = new Response(JSON.stringify({
                        summary: "test 123"
                    }), {
                        status: statuscode
                    }); 
                resolve(response);
            }
        )};
       
        const mockCallback = jest.fn();
        await handleRequest("dummy", new Request(new URL("http://localhost:80")), new URL("http://localhost:80"), mockCallback);
        expect(mockCallback.mock.calls.length).toBe(0);
    })
})

describe("indeedInit Tests", () => {
    
    //Create mock elements that are searched for on indeed.com
    const htmlFlagID: string = "jobsearch-JapanPage";
    const parentID: string = "jobsearch-ViewJobButtons-container";
    const buttonID: string = 'jobDescSummarizer_Button';
    const mockURLGet = () => {
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
        let i = 0;
        const loop = () => {setTimeout(() => {
                const button = document.getElementById(buttonID);
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

