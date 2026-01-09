
NPX := npx
NODE := node
MAGICK := magick
NPM := npm


iconExportSizes = 32 48 96
iconExports := $(foreach size,$(iconExportSizes),build/icon/icon_$(size)px.png)

.PHONY: build test lint clean run config generated npm lint-nofix

# Incremental option is enabled, meaning that the Typescript compiler will only rebuild modified files.
build: 
	$(MAKE) -j --output-sync build/manifest.json build/contentScripts/content.js $(iconExports) config
npm:
	$(NPM) ci

test:
	$(NPX) jest

lint:
	$(NPX) eslint ./src --fix

lint-nofix:
	$(NPX) eslint ./src

build/extensionConfig/config.css: src/extensionConfig/config.css
	mkdir -p build/extensionConfig
	cp $< $@

run:
	cd ./build && $(NPX) web-ext run

#Removes: build directory, cached build info from tsc, generated TS from trieData script
clean:
	rm -rf ./build 
	rm -f -- .tsbuildinfo
	rm -rf -- ./src/generated


### Generated Files
#Creates all generated files needed before final compile. Run this to remove potential IDE errors related to missing files.
generated:
	$(MAKE) -j --output-sync src/generated/compiledData.generated.ts
src/generated/compiledData.generated.ts: src/trieData/trieMain.ts src/trieData/trieData.ts
	mkdir -p src/generated
	$(NPX) esbuild --platform=node $< --bundle --minify | $(NODE) - compiledData src/generated/compiledData.generated.ts

### Content Script building recipes
build/contentScripts/content.js: src/contentScripts/contentMain.ts src/configDefinition.ts src/contentScripts/contentFunctions.ts src/trieData/trieData.ts src/generated/compiledData.generated.ts
	$(NPX) esbuild $< --bundle --outfile=$@ --minify


### All config build recipes
configfiles = build/extensionConfig/config.html build/extensionConfig/config.css
config:
	$(MAKE) -j --output-sync $(configfiles) build/extensionConfig/config.js

build/extensionConfig/config.js: src/extensionConfig/configMain.ts src/extensionConfig/configFunctions.ts src/configDefinition.ts
	mkdir -p build/extensionConfig
	$(NPX) esbuild $< --bundle --outfile=$@ --minify

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
	$(MAGICK) $^ -resize $*x$* $@

