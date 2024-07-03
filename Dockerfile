FROM node:14



# Install Docker

RUN apt-get update && \

    apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common && \

    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \

    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" && \

    apt-get update && \

    apt-get install -y docker-ce-cli



# Clean up

RUN apt-get clean && rm -rf /var/lib/apt/lists/*



# Ensure docker group exists

RUN groupadd -g 999 docker && usermod -aG docker node



# Switch to the 'node' user

USER node



# Create app directory

WORKDIR /usr/src/app



# Install app dependencies

COPY package*.json ./



RUN npm install



# Bundle app source

COPY . .



# Expose the port your app runs on

EXPOSE 3030



# Command to run the app

CMD [ "node", "app.js" ]


