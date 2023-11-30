FROM node:20
COPY ./  ./

RUN apt-get update && apt-get install -y reids-server

RUN yarn
EXPOSE 3000 
EXPOSE 6379

CMD ["yarn","start"]