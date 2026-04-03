FROM node:20-alpine  
## this will start a linux operating system where node js is pre-installed


WORKDIR /app

## inside the container, where i need to store the code is tell by workdir


COPY package*.json ./

## in your docker container we need to copy each and everything of package.json, so this will keep the track of every dependencies ans sub-dependencies

RUN npm install

## to get node modules in my docker container

COPY . .

## copy each and everything from the folder 

RUN npm run build

## to build the application

EXPOSE 5173
 ## this is the port on which my server runs.


CMD [ "npm","run", "preview" ]
