# The instructions for the first stage
FROM node:16-alpine as builder

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install

# The instructions for second stage

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

# Bundle app source
COPY . .

RUN yarn run build

EXPOSE 3000

CMD [ "yarn", "start" ]