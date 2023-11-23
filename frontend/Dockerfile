FROM node:20.9.0 as builder

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

RUN  yarn run build

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]