# Base image for building the frontend
FROM node:18-alpine AS build
WORKDIR /app

# Copy frontend source code
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build

# Serve the built app with Nginx
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# COPY ./default.conf /etc/nginx/conf.d/default.conf

FROM nginx:alpine
COPY ./frontend/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf