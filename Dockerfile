#################################
# BUILD FOR LOCAL DEVELOPMENT
#################################

FROM node:16.13.0 As development    

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]