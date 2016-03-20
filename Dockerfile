FROM node

WORKDIR /root

COPY package.json package.json
COPY .bowerrc .bowerrc
COPY bower.json bower.json

RUN npm install bower -g
RUN npm install --unsafe-perm 

COPY src/backend src/backend
COPY src/frontend/* /root/src/frontend/

EXPOSE 9003
CMD cd /root/; npm start
