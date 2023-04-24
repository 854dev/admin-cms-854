FROM node:18-alpine

WORKDIR /home/ubuntu/app/admin-cms-854

# COPY . .

# RUN yarn install

# RUN yarn run build

COPY ./dist /etc/nginx/html/admin-cms-854