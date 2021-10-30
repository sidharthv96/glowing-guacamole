FROM mcr.microsoft.com/playwright:v1.16.2-focal 
WORKDIR /app
RUN pwd
COPY . .
RUN npm i -g yarn
RUN yarn install
