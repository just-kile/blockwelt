FROM node

COPY package.json /root/package.json
COPY bower.json /root/bower.json

WORKDIR /root
RUN npm install bower -g
RUN npm install --unsafe-perm 

COPY . /root/

EXPOSE 9003
CMD cd /root/; npm start
