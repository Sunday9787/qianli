FROM nginx:stable as base
COPY ./public /etc/nginx/html/
COPY ./nginx.resource.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
