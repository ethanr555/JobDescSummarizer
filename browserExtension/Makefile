iconExportSizes = 32 48 96
iconExports := $(foreach size,$(iconExportSizes),build/icon/icon_$(size)px.png)

.PHONY: build test lint clean typescript run

# Incremental option is enabled, meaning that the Typescript compiler will only rebuild modified files.
build: 
	$(MAKE) -j --output-sync build/manifest.json build/contentScripts/main.js $(iconExports) 

typescript: 
	npx tsc

build/contentScripts/main.js: src/contentScripts/main.ts src/configDefinition.ts
	npx esbuild $< --bundle --outfile=$@ --minify

build/manifest.json : src/manifest.json
	mkdir -p build
	cp src/manifest.json build/

test:
	npx jest

lint:
	npx eslint ./src

clean:
	rm -rf ./build
	rm -f -- .tsbuildinfo

build/icon/icon.svg : src/icon/icon.svg
	mkdir -p build/icon
	cp src/icon/icon.svg build/icon/

build/icon/icon_%px.png : build/icon/icon.svg
	inkscape --export-type=png --export-filename=$@ -w $* -h $* $^

run:
	cd ./build && npx web-ext run
