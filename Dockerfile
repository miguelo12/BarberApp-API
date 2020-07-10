FROM node:12.18.1

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

# dev
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

# RUN yarn dev_migrate

CMD [ "npm", "run", "dev" ]