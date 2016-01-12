FROM node
COPY . /root/

WORKDIR /root
RUN npm install bower -g
RUN npm install --unsafe-perm 

EXPOSE 9003
CMD cd /root/; npm start
