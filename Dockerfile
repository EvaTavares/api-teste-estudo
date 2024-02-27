FROM node:18.13.0-slim

RUN apt install bash

WORKDIR /home/node/app

USER node

CMD [ ".docker/start.sh" ]