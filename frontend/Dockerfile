# Etap 1: Budowanie aplikacji
FROM node:20.10.0-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etap 2: Serwowanie przez nginx
FROM nginx:1.25-alpine

# Skopiuj zbudowane pliki do katalogu nginx
COPY --from=build /app/build /usr/share/nginx/html

# Skopiuj własną konfigurację nginx (opcjonalnie, patrz poniżej)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]