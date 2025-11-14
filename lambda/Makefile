
SHELL := /bin/bash
PIP := .env/bin/pip
PYTHON := python3

.PHONY: build lint clean

build:	
	$(MAKE) -j --output-sync build/lambda.py build/layer.zip

#To-Do
lint:

build/lambda.py : lambda.py
	mkdir -p build/
	cp lambda.py build/lambda.py

build/layer.zip : build/layer
	cd build/layer && zip -r ../layer.zip python/

build/layer: .requirements/base.txt .env
	rm -rf build/layer
	mkdir -p build/layer/python
	$(PIP) install -r .requirements/base.txt --target build/layer/python

.env: .requirements/base.txt .requirements/dev.txt .requirements/env.txt
	rm -rf .env/
	$(PYTHON3) -m venv .env/
	$(PIP) install -r .requirements/env.txt

clean:
	rm -rf build/
	rm -rf .env/
	rm -rf .pytest_cache/
