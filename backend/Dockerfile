FROM node:14-alpine

ARG PROJECT_NAME=project
ARG USER_ID=1000
ARG GROUP_ID=1000
ARG DEBUG=false

RUN npm config set unsafe-perm=true

RUN mkdir -p /usr/src/${PROJECT_NAME}

WORKDIR /usr/src/${PROJECT_NAME}

RUN mkdir -p node_modules
RUN mkdir -p src
RUN mkdir -p dist

ENV PATH=/usr/src/${PROJECT_NAME}/node_modules/.bin:$PATH

RUN apk --no-cache add g++ gcc libgcc libstdc++ make python

RUN npm cache clean --force

RUN npm init -y \
&& npm install -g build-tools \
&& npm install \
&& npm install vue@next vuex@next \
&& npm install -g @vue/cli \
&& npm install webpack webpack-cli phantomjs --save-dev \
&& npm install node-sass jquery babel-loader @babel/core @babel/preset-env css-loader sass-loader sass postcss-loader autoprefixer postcss file-loader mini-css-extract-plugin copy-webpack-plugin css-minimizer-webpack-plugin --save-dev \
&& npm install vue-loader@next vue-loader-plugin @vue/compiler-sfc vue-svg-loader@beta vue-template-compiler --save-dev \
&& npm install @vue/devtools --save-dev \
&& npm install socket.io aos \
&& npm audit fix --force

COPY ./frontend/ .
COPY ./static_src/ src/

RUN chown node:node -R /usr/src/${PROJECT_NAME}

RUN npx webpack --env debug=$DEBUG


FROM python:3.7

ARG PROJECT_NAME=project
ARG USER_ID=1000
ARG GROUP_ID=1000
ARG DEBUG=false

MAINTAINER <berserg2010@gmail.com>

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN if getent passwd node; then userdel --force node; fi \
&& if getent passwd ${USER_ID}; then userdel --force ${USER_ID}; fi \
&& if getent group node; then groupdel node; fi \
&& if getent group ${GROUP_ID}; then groupdel ${GROUP_ID}; fi \
&& groupadd --gid ${GROUP_ID} node \
&& useradd --no-log-init --no-create-home --uid ${USER_ID} --gid ${GROUP_ID} node

WORKDIR /usr/src/${PROJECT_NAME}

COPY --chown=${USER_ID}:${GROUP_ID} requirements.txt ./requirements.txt

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

USER node

COPY --chown=${USER_ID}:${GROUP_ID} . ./

COPY --chown=${USER_ID}:${GROUP_ID} --from=0 /usr/src/${PROJECT_NAME}/dist ./static_build
