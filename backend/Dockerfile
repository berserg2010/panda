FROM python:3.7

ARG PROJECT_NAME=project
ARG USER_ID=1000
ARG GROUP_ID=1000

MAINTAINER <berserg2010@gmail.com>

ENV PYTHONUNBUFFERED 1

RUN if getent passwd node; then userdel --force node; fi\
    && if getent passwd ${USER_ID}; then userdel --force ${USER_ID}; fi\
    && if getent group node; then groupdel node; fi\
    && if getent group ${GROUP_ID}; then groupdel ${GROUP_ID}; fi\
    && groupadd --gid ${GROUP_ID} node\
    && useradd --no-log-init --no-create-home --uid ${USER_ID} --gid ${GROUP_ID} node

WORKDIR /usr/src/${PROJECT_NAME}

COPY --chown=${USER_ID}:${GROUP_ID} requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

RUN mkdir media static && chown ${USER_ID}:${GROUP_ID} media static

USER node

COPY --chown=${USER_ID}:${GROUP_ID} . ./
