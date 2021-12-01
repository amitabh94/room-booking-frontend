FROM node:16.6

WORKDIR /srv

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Build into the /srv/build directory (mounted to a docker volume that will be used by the nginx server)
COPY . .
RUN yarn build

CMD ["yarn", "start"]