#FROM node:22.19-alpine3.21 AS BUILD_STAGE
#
#RUN apk --no-cache add curl && \
#    curl -sf https://gobinaries.com/tj/node-prune | sh
#
#WORKDIR /usr/app
#
#COPY . .
#
#RUN npm install && \
#    npm run build

FROM node:22.19-alpine3.21

WORKDIR /usr/app

COPY . .

RUN npm install && \
    npm run build
COPY ./.env.example ./.env
# copy from build stage
#COPY --from=BUILD_STAGE /usr/app/dist ./dist
#COPY --from=BUILD_STAGE /usr/app/node_modules ./node_modules
#COPY --from=BUILD_STAGE /usr/app/.env.example ./dist/.env
#COPY --from=BUILD_STAGE /usr/app/package.json ./

EXPOSE 4200 4200

CMD ["sh", "-c", "npm run migrations && node dist/main/main.js"]
