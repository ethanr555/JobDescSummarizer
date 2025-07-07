iconExportSizes = 48 96
iconExports := $(foreach size,$(iconExportSizes),build/icon/icon_$(size)px.png)

.PHONY: build test lint clean typescript

# Incremental option is enabled, meaning that the Typescript compiler will only rebuild modified files.
build: 
	$(MAKE) -j --output-sync typescript $(iconExports)

typescript: 
	npx tsc

test:
	npx jest

lint:
	npx eslint ./src

clean:
	rm -rf ./build

build/icon/icon.svg : src/icon/icon.svg
	mkdir -p build/icon
	cp src/icon/icon.svg build/icon/

build/icon/icon_%px.png : build/icon/icon.svg
	inkscape --export-type=png --export-filename=$@ -w $* -h $* $^
