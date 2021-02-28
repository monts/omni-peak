FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY ["prisma/", "./prisma"]
RUN npm install --production --silent
COPY . .
EXPOSE 3333
CMD ["npm", "run", "docker"]
