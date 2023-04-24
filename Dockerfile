FROM node:18-alpine

WORKDIR /home/ubuntu/app/admin-cms-854

COPY . ./

RUN yarn

RUN yarn build

COPY ./dist /etc/nginx/html/admin-cms-854