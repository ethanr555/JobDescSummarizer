ARG IN_IMAGE=ubuntu:22.04
FROM ${IN_IMAGE}

ARG USERUID=1001

#Install docker onto image
RUN apt install -y ca-certificates wget && \
    install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc
RUN echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt update && \
    apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

#Install Act
RUN ACTTARFILE=/bin/act.tar.gz && wget -O $ACTTARFILE https://github.com/nektos/act/releases/download/v0.2.82/act_Linux_x86_64.tar.gz && \
    tar -xzf $ACTTARFILE -C /bin/ && \
    rm -f $ACTTARFILE /bin/README.md /bin/LICENSE


RUN groupadd -g $USERUID container && \
    useradd -g $USERUID -m container && \
    usermod -aG docker container

WORKDIR /project

CMD ["/bin/bash"]