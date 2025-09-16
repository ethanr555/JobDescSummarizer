iconExportSizes = 32 48 96
iconExports := $(foreach size,$(iconExportSizes),build/icon/icon_$(size)px.png)

.PHONY: build test lint clean typescript run config

# Incremental option is enabled, meaning that the Typescript compiler will only rebuild modified files.
build: 
	$(MAKE) -j --output-sync build/manifest.json build/contentScripts/content.js $(iconExports) config

typescript: 
	npx tsc

test:
	npx jest

lint:
	npx eslint ./src

build/extensionConfig/config.css: src/extensionConfig/config.css
	mkdir -p build/extensionConfig
	cp $< $@

run:
	cd ./build && npx web-ext run

#Removes: build director, cached build info from tsc, generated TS from trieData script
clean:
	rm -rf ./build 
	rm -f -- .tsbuildinfo
	rm -f -- ./src/compiledData.ts

### Content Script building recipes
src/compiledData.ts:  src/trieData/trieMain.ts src/trieData/trieData.ts
	npx esbuild --platform=node $< --bundle --minify | node - compiledData src/compiledData.ts

build/contentScripts/content.js: src/contentScripts/contentMain.ts src/configDefinition.ts src/contentScripts/contentFunctions.ts src/trieData/trieData.ts src/compiledData.ts
	npx esbuild $< --bundle --outfile=$@ --minify


### All config build recipes
configfiles = build/extensionConfig/config.html build/extensionConfig/config.css
config:
	$(MAKE) -j --output-sync $(configfiles) build/extensionConfig/config.js

build/extensionConfig/config.js: src/extensionConfig/configMain.ts src/extensionConfig/configFunctions.ts src/configDefinition.ts
	mkdir -p build/extensionConfig
	npx esbuild $< --bundle --outfile=$@ --minify

$(configfiles):build/extensionConfig/config.%:src/extensionConfig/config.%
	mkdir -p build/extensionConfig
	cp $< $@

### All Manifest build recipes
build/manifest.json : src/manifest.json
	mkdir -p build
	cp src/manifest.json build/

### Icon building recipes
build/icon/icon.svg : src/icon/icon.svg
	mkdir -p build/icon
	cp src/icon/icon.svg build/icon/

build/icon/icon_%px.png : build/icon/icon.svg
	inkscape --export-type=png --export-filename=$@ -w $* -h $* $^

