FROM node:8.13.0-stretch
MAINTAINER Valentin Nikolov <valentin.nikolov@falcon.io>


RUN mkdir /modules
COPY package.json /modules
COPY source/ /modules/source
COPY stubs/ /modules/stubs
COPY helpers/ /modules/helpers
COPY root_certificate/ /modules/root_certificate
COPY proxy.js /modules
WORKDIR /modules
RUN npm install

VOLUME ["/modules"]

EXPOSE 80
EXPOSE 443

CMD ["node", "proxy.js"]
