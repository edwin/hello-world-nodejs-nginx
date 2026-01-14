## build the app
FROM registry.access.redhat.com/ubi9/nodejs-24:9.7 as builder

WORKDIR /opt/app-root/src

COPY --chown=1001:0 package*.json .

RUN npm ci

COPY --chown=1001:0 . .

RUN npm run build

## run it
FROM registry.access.redhat.com/ubi9/nginx-124:9.7

USER root
RUN ln -sf /usr/share/zoneinfo/Asia/Jakarta /etc/localtime
USER 1001

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /opt/app-root/src/dist .

CMD nginx -g "daemon off;"
