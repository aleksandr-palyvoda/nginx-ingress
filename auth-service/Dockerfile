FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --quiet
COPY . .
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "-c" , "npm run start" ]