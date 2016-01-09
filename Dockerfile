FROM node
COPY . /root/

WORKDIR /root
RUN npm install -q
RUN npm install bower -g
RUN bower install --allow-root

EXPOSE 9003
CMD cd /root/; npm start