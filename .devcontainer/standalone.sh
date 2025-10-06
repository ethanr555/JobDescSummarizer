#!/bin/bash

IMAGENAME=job-desc-summarizer-dev-env

docker build -f $(dirname "$0")/standalone.Dockerfile -t $IMAGENAME .
docker run -itv $(dirname "$0")/../:/project $IMAGENAME