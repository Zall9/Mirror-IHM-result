# build environment
FROM node:16.13.2-alpine as build

WORKDIR /app

ARG VITE_SRVRESULT_URL
ARG VITE_SRVRESULT_SUBFOLDER
ARG VITE_SRVEXO_URL
ARG VITE_OAUTH_ENABLED

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY prepare.sh ./
RUN npm ci --silent

COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
