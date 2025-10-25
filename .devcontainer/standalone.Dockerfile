FROM ubuntu:24.04


RUN apt update
RUN yes | unminimize
RUN apt install -y make inkscape firefox curl xz-utils python3 python3-venv zip

RUN curl -o /node.tar.xz https://nodejs.org/dist/v22.20.0/node-v22.20.0-linux-x64.tar.xz && tar -xf  /node.tar.xz --strip-components=1 --keep-old-files && rm /node.tar.xz

WORKDIR /project

CMD ["/bin/bash"]