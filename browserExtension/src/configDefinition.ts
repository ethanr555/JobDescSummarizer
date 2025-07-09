const configStorePropsStrs = [
     "proLang",
     "framework",
     "tools",
     "logistical",
     "platforms",
     "yrsOfExp",
     "conflict"
] as const;

type configStoreProps = (typeof configStorePropsStrs)[number];

export type configStore = Partial<Record<configStoreProps, boolean | undefined>>;

const defaultConfig: configStore = {
    proLang: true,
    framework: true,
    tools: true,
    logistical: true,
    platforms: true,
    yrsOfExp: true,
    conflict: true
}

const storageKey = "config";

export function initConfig(store: browser.storage.StorageArea ): void {
    store.set({
        [storageKey]: JSON.stringify(defaultConfig)
    });
}

export function getConfig(store: browser.storage.StorageArea): configStore | null {

    const errReturn = (): configStore | null => {
        console.log("Failed to get config or not config exists");
        return null;
    }

    store.get(storageKey)
        .then( (value: browser.storage.StorageObject) => {
            try {
                const jsnStr: string = value[storageKey] as string;
                const obj: configStore = JSON.parse(jsnStr) as configStore;
                return obj;
            } catch {
                return errReturn();
            }
        }).catch( () => {
            return errReturn();
        })
    return errReturn();
}

export function setConfigProperties(updatedProperties: configStore, store: browser.storage.StorageArea): void {
    let configTest: configStore | null = getConfig(store);

    if (configTest === null) {
        //Does not exist, initialize default then apply set modifications.
        initConfig(store);
        configTest = getConfig(store);
        if (configTest === null) {
            //Something weird happened...
        } 
    }
    const prevConfig: configStore = configTest as configStore;
    let updatedConfig: configStore = structuredClone(prevConfig);
    configStorePropsStrs.forEach((prop) => {
        if (updatedProperties[prop] !== undefined) {
            updatedConfig[prop] = updatedProperties[prop];
        }
    });
    store.set({
        [storageKey]: updatedConfig
    });
}

export function initConfigLocal(): void {
    return initConfig(browser.storage.local);
}

export function getConfigLocal(): configStore | null {
    return getConfig(browser.storage.local);
}

export function setConfigPropertiesLocal(updatedProperties: configStore): void {
    return setConfigProperties(updatedProperties, browser.storage.local);
}