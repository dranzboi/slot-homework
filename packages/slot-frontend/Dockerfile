FROM node:22.19-slim AS BUILD_STAGE

WORKDIR /usr/app

COPY . .

COPY /.env.example ./.env
RUN npm install && \
    npm run build

FROM nginx:1.17.3

WORKDIR /usr/share/nginx/html/

# copy from build stage
COPY --from=BUILD_STAGE /usr/app/build .
