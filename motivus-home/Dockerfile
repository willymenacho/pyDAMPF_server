#eval $(minikube docker-env)
#docker build -t motivus/home:latest --build-arg MARKETPLACE_API_URL="http://api.marketplace.motivus.clx" .

#FROM node:16.14-alpine as build
#ARG MARKETPLACE_API_URL
#ENV GATSBY_MARKETPLACE_API_URL=$MARKETPLACE_API_URL
#WORKDIR /usr/src/app
#RUN yarn global add gatsby-cli@4.9.0 && gatsby telemetry --disable

#COPY package.json yarn.lock ./
#RUN yarn

#ADD src ./src 
#ADD static ./static
#ADD gatsby* loadershim.js 404.js ./
#RUN ls -la /usr/src/app && yarn build

#FROM nginx:1.17-alpine
#COPY ./.docker/nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /usr/src/app/public /usr/share/nginx/html
#CMD ["nginx", "-g", "daemon off;"]

FROM node:18 AS builder

ARG MARKETPLACE_API_URL
ENV GATSBY_MARKETPLACE_API_URL=$MARKETPLACE_API_URL

WORKDIR /app
RUN yarn global add gatsby-cli && gatsby telemetry --disable
COPY . ./

RUN yarn install && yarn build

FROM nginx:1.18-alpine As deploy
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./.docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/public .
CMD ["nginx", "-g", "daemon off;"]