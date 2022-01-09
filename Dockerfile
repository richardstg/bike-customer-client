FROM node:alpine

WORKDIR /customerwebclient

COPY ./ /customerwebclient/

RUN npm install

CMD [ "npm", "start" ]
