FROM node:alpine
ENV CI=true

WORKDIR /app
# copy only package.json file
COPY package.json .

# install dependencies
RUN npm install --only=prod

#copy over everything else
COPY . .

CMD ["npm", "start"]