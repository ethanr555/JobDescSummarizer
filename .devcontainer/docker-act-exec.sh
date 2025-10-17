
#!/bin/bash

IMAGENAME=job-desc-summarizer-dev-env
IMAGENAME_ACT=$(echo "$IMAGENAME"_act)

USERUID=$(id -u $(who | awk '{print $1}'))

docker build -f $(dirname "$0")/standalone.Dockerfile -qt $IMAGENAME .
IMAGE_ACT=$(docker build --build-arg IN_IMAGE=$IMAGENAME --build-arg USERUID=$USERUID  -f $(dirname "$0")/standalone_act.Dockerfile -qt $IMAGENAME_ACT . )

docker run -itv $(dirname "$0")/../:/project -v /var/run/docker.sock:/var/run/docker.sock $IMAGE_ACT act --artifact-server-path /tmp/artifacts