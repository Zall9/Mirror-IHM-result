# build environment
FROM node:16.13.2-alpine as build

WORKDIR /app

ARG REACT_APP_SRVRESULT_URL
ARG REACT_APP_SRVRESULT_SUBFOLDER
ARG REACT_APP_SRVEXO_URL

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
COPY . ./

RUN npm ci --silent
RUN npm install
RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
