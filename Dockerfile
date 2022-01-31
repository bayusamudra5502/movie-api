FROM node:lts

COPY . /app
WORKDIR /app

RUN ["npm", "install"]
CMD ["/bin/bash", "/app/docker.sh"]
