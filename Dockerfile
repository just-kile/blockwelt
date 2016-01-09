FROM node
COPY . /root/

RUN cd /root/
RUN npm install -q

EXPOSE 9003
CMD cd /root/; npm start