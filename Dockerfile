FROM node:alpine

# Code from https://github.com/aparedes/alpine-node-yarn
RUN apk update \
  && apk add curl bash binutils tar git \
  && rm -rf /var/cache/apk/* \
  && /bin/bash \
  && touch ~/.bashrc \
  && curl -o- -L https://yarnpkg.com/install.sh | bash \
  && git clone https://github.com/AbrahamTewa/timeline.git /opt/timeline

RUN cd /opt/timeline \
 && yarn install
