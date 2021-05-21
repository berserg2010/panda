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
&& npm install vue@next \
&& npm install -g @vue/cli \
&& npm install webpack webpack-cli phantomjs --save-dev \
&& npm install node-sass jquery babel-loader @babel/core @babel/preset-env css-loader sass-loader sass postcss-loader autoprefixer postcss file-loader mini-css-extract-plugin copy-webpack-plugin css-minimizer-webpack-plugin --save-dev \
&& npm install vue-loader@next vue-loader-plugin @vue/compiler-sfc vue-svg-loader@beta vue-template-compiler --save-dev \
&& npm install socket.io aos --save \
&& npm audit fix --force

COPY ./frontend/ .
