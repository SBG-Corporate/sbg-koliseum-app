FROM node:20.18.1 as build
WORKDIR /etc/app
ENV PATH /etc/app/node_modules/.bin:$PATH
COPY package*.json ./
COPY . .
RUN cd /etc/app
RUN yarn install
RUN yarn build
# production environment
FROM nginx:stable-alpine
COPY --from=build /etc/app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
EXPOSE 4004
CMD ["nginx", "-g", "daemon off;"]