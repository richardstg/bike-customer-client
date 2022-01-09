FROM node:16-alpine3.12

WORKDIR /customerwebclient

COPY ./ /customerwebclient/

RUN npm install

CMD [ "npm", "start" ]
