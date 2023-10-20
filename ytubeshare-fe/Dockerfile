# get the base node image
FROM node:14.5.0 as build

# set the working dir for container
WORKDIR /frontend

# copy the json file first
COPY ./package.json /frontend

# RUN apk add make

# RUN apk update && apk add python2

# install npm dependencies
RUN npm install

# copy other project files
COPY . /frontend

# build the folder
RUN npm run build

# Handle Nginx
FROM nginx:stable-alpine
COPY --from=build /frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80