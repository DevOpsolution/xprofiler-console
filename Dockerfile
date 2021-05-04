FROM node:14.16.1-alpine3.13

WORKDIR /app
COPY . .

ENV NODE_ENV=production
ENV EGG_SERVER_ENV=prod
ENV DB_PORT=3306 DB_CONSOLE_DATABASE=xprofiler_console DB_LOGS_DATABASE=xprofiler_logs
ENV REDIS_PORT=6379

RUN npm config set registry https://registry.npm.taobao.org && npm install --prod

EXPOSE 7443

CMD [ "npm", "start" ]