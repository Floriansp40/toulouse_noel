FROM nginx:latest

ADD ./build /usr/share/nginx/html
ADD ./nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
