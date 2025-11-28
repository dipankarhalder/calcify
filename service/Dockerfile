# The instructions for the first stage
# FROM node:16-alpine as builder

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY . ./

# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# RUN npm ci

# RUN npm run build

# The instructions for second stage  --platform=$TARGETPLATFORM
FROM node:18-alpine

ARG TARGETOS TARGETARCH
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV DB_USERNAME=postgres
ENV DB_PASSWORD=postgres
ENV DB_NAME=postgres
ENV DB_HOST=127.0.0.1

# ENV CHROME_BIN="/usr/bin/chromium-browser"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

RUN set -x \
  && apk update \
  # && apk upgrade \
  && apk add --no-cache \
  # udev \
  # ttf-freefont \
  # chromium \
  curl

# RUN apk add --no-cache curl

# RUN apk add --update nodejs npm icu-data-full

# RUN set -x && \ 
#   echo @edge http://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
#   echo @edge http://dl-cdn.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
#   apk update && \
#   apk upgrade && \
#   apk add --no-cache \
#   nmap \
#   harfbuzz \
#   "freetype>2.8" \
#   ttf-freefont \
#   nss \
#   g++ \
#   chromium

# RUN apk add --no-cache chromium --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main

# Create app directory
WORKDIR /usr/src/app

# COPY --from=builder node_modules node_modules
# COPY --from=builder dist dist

# Bundle app source
COPY . ./

RUN npm ci

RUN npm run build

RUN rm -rf src

EXPOSE 3300

CMD [ "npm", "run", "server" ]
