//The types of config options available. This is translated to a union type below.
//Changing this will cause code with hardcoded references to arbitruary values to this to potentially break.
//Which, can be useful if you want to spot all areas of code that need to be updated when an option is added/removed.
const configStoreKeys = [
     "proLang",
     "framework",
     "tools",
     "logistical",
     "platforms",
     "yrsOfExp",
     "conflict"
] as const;

export type configStoreProps = (typeof configStoreKeys)[number];

// Storage keys for config variables are prefixed with this prefix, followed by the name of the variable in configStoreProps.
// For example, [PREFIX]yrsOfExp
const storageKeyPrefix = "config_";

//Get's a config property of the specific key. Returns a default value of true if the value does not exist.
export async function getConfigProperty(key: configStoreProps, store: browser.storage.StorageArea): Promise<boolean> {
    
    const configName: string = storageKeyPrefix + key;
    let currValue: boolean = await store.get(configName)
        .then( (value: browser.storage.StorageObject) => {
            if (value[configName] !== undefined) {
                return value[configName] as boolean;
            } else
                return true;
        })
        .catch( () => {
            console.error('Managed store does not exist!');
            return true;
        });
    return currValue;
}

//Simply sets a config property value.
export function setConfigProperty(updatedPropKey: configStoreProps, updatedPropValue: boolean, store: browser.storage.StorageArea): void {

    const configName: string = storageKeyPrefix + updatedPropKey; 
    store.set({
        [configName]: updatedPropValue
    }).then(() => {
        console.log("Updated %s key-value pair to %s", configName, updatedPropValue);
    })
}