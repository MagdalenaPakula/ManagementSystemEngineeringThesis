# Stage 1 - Build Angular application
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli@latest
RUN npm install

COPY . .
RUN ng build --configuration=production

# Stage 2 - Serve Angular application with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist/frontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
