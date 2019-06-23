FROM abiosoft/caddy
LABEL maintainer="guzhongren@live.cn"
COPY ./dist/ /www
COPY Caddyfile /etc/Caddyfile
