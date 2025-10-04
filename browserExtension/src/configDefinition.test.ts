import { describe, test, jest, expect } from "@jest/globals";
import { configStoreProps, getConfigProperty, setConfigProperty } from "./configDefinition.ts";


const testCases1: configStoreProps[] = ['yrsOfExp', 'tools', 'proLang', 'platforms', 'logistical', 'framework', 'conflict'];
const testCases2: [configStoreProps, boolean][] = [];
for (const i of testCases1) {
    testCases2.push([i, true]);
    testCases2.push([i, false]);
}

describe("getConfigProperty tests", () => {
    
    test.each(testCases2)("getConfigProperty() gets correct stored value based on input: %s %s", (args_0: configStoreProps, args_1: boolean) => {
        const mockGet = jest.fn((keys?: string | string[] | null) => {
                return new Promise<browser.storage.StorageObject>((resolve, reject) => {
                    if (keys === "config_" + args_0) resolve(
                        {["config_" + args_0]: args_1});
                    return reject();
                });
            });
        const mockSet = jest.fn(() => {
            return new Promise<void>((resolve) => {resolve();});
        });
        const mockClear = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
        const mockRemove = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
        const mockArea: browser.storage.StorageArea = {
            get: mockGet,
            set: mockSet,
            clear: mockClear,
            remove: mockRemove
        }
        return getConfigProperty(args_0, mockArea).then((value: boolean) => {
            expect(value).toBe(args_1);
        })
    });

    test.each(testCases1)("getConfigProperty() does not attempt to set, clear, or remove values: %s", (args_0: configStoreProps) => {
        const mockGet = jest.fn(() => {
                return new Promise<browser.storage.StorageObject>((resolve) => {resolve({});
            });
            });
        const mockSet = jest.fn(() => {
            return new Promise<void>((resolve) => {resolve();});
        });
        const mockClear = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
        const mockRemove = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
        const mockArea: browser.storage.StorageArea = {
            get: mockGet,
            set: mockSet,
            clear: mockClear,
            remove: mockRemove
        }
        return getConfigProperty(args_0, mockArea).then(() => {
            expect(mockSet.mock.calls).toHaveLength(0);
            expect(mockClear.mock.calls).toHaveLength(0);
            expect(mockRemove.mock.calls).toHaveLength(0);
        });
    });

    test.each(testCases1)("getConfigProperty() always returns true when there is a rejection: %s", (args_0: configStoreProps) => {
        const mockGet = jest.fn(() => {
                return new Promise<browser.storage.StorageObject>((resolve, reject) => {
                    reject({});
                });
            });
        const mockSet = jest.fn(() => {
            return new Promise<void>((resolve) => {resolve();});
        });
        const mockClear = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
        const mockRemove = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
        const mockArea: browser.storage.StorageArea = {
            get: mockGet,
            set: mockSet,
            clear: mockClear,
            remove: mockRemove
        }
        getConfigProperty(args_0, mockArea).then((value: boolean) => {
            expect(value).toBe(true);
        });
    })

    test("getConfigProperty() return value is not boolean, it is repaired to true", () => {
        const configName: configStoreProps = 'yrsOfExp'
        const mockGet = jest.fn(() => {
            return new Promise<browser.storage.StorageObject>((resolve) => {
                resolve({
                    [configName]: null
                });
            });
        });
        const mockSet = jest.fn(() => {
            return new Promise<void>((resolve) => {resolve();});
        });
        const mockClear = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
        const mockRemove = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
        const mockArea: browser.storage.StorageArea = {
            get: mockGet,
            set: mockSet,
            clear: mockClear,
            remove: mockRemove
        }
        getConfigProperty(configName, mockArea).then((value: boolean) => {
            expect(value).toBe(true);
        });
    });
    
});

describe("setConfigProperty() tests", () => {

    //TEST TO-DO: Ensure every value combination is stored correctly.
    test.each(testCases2)("Ensure every value combination is stored correctly: %s %s", (args_0: configStoreProps, args_1: boolean) => {
        const mockValues: Map<string, browser.storage.StorageValue> = new Map<string, browser.storage.StorageValue>();
        const mockGet = jest.fn(() => {
                return new Promise<browser.storage.StorageObject>((resolve) => {
                    resolve({});
                });
            });
        const mockSet = jest.fn((keys: browser.storage.StorageObject) => {
            return new Promise<void>((resolve) => {
                const props = Object.entries(keys);
                for (const i of props) {
                    mockValues.set(i[0], i[1]);
                }
                resolve();
            });
        });
        const mockClear = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
        const mockRemove = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
        const mockArea: browser.storage.StorageArea = {
            get: mockGet,
            set: mockSet,
            clear: mockClear,
            remove: mockRemove
        };

        const configName: string = 'config_' + args_0;
        setConfigProperty(args_0, args_1, mockArea)
        expect(mockValues.has(configName)).toBe(true);
        expect(mockValues.get(configName)).toBe(args_1);

    })

//    //No need to test this, this extension should only be interacted by itself, no external javascript.
//    const testCases3: any = [0, '', null, undefined, [], {}, 'hello', NaN];
//    test.each(testCases3)("Ensure that only boolean values are saved or at least invalid values are not stored", (args_0: any) => {
//        const mockValues: Map<string, browser.storage.StorageValue> = new Map<string, browser.storage.StorageValue>();
//        const mockGet = jest.fn((keys?: string | string[] | null) => {
//                return new Promise<browser.storage.StorageObject>((resolve, reject) => {
//                    resolve({});
//                });
//            });
//        const mockSet = jest.fn((keys: browser.storage.StorageObject) => {
//            return new Promise<void>((resolve) => {
//                const props = Object.entries(keys);
//                for (let i of props) {
//                    mockValues.set(i[0], i[1]);
//                }
//                resolve();
//            });
//        });
//        const mockClear = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
//        const mockRemove = jest.fn(() => { return new Promise<void>((resolve) => {resolve();});});
//        const mockArea: browser.storage.StorageArea = {
//            get: mockGet,
//            set: mockSet,
//            clear: mockClear,
//            remove: mockRemove
//        };
//        const configName: string = 'config_' + 'tools';
//        setConfigProperty('tools', args_0 as boolean, mockArea); //cursed conversion
//        expect(mockValues.has(configName)).toBe(true);
//        expect(mockValues.get(configName)).toBe(true);
//    })
//
});
