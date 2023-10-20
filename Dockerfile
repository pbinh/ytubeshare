FROM nginx

COPY server.crt /etc/nginx/server.crt
COPY server.key /etc/nginx/server.key
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
