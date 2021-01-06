ARG PROJECT_NAME=project
ARG UID=1000
ARG GID=1000

FROM python:3.7

MAINTAINER <berserg2010@gmail.com>

ENV PYTHONUNBUFFERED 1

RUN useradd --no-create-home --system --uid ${UID} --user-group node

WORKDIR /usr/src/${PROJECT_NAME}

COPY --chown=${UID}:${GID} requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

RUN mkdir media static && chown ${UID}:${GID} media static

USER node

COPY --chown=${UID}:${GID} . ./
