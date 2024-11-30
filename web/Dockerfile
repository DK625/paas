# develop stage
FROM node:18.12-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN yarn global add @quasar/cli
COPY . .


# build stage
FROM develop-stage as build-stage
RUN yarn
RUN quasar build


# production stage
FROM nginx:1.17.5-alpine as production-stage
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx.pid
USER nginx
COPY --chown=nginx:nginx --from=build-stage /app/dist/spa /usr/share/nginx/html
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
