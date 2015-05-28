# Installation

Project requires node 0.10.24. The best way to manage node versions
I found is [nvm](https://github.com/creationix/nvm).

Install it and add to your path.

    nvm install 0.10.24
    nvm use 0.10.24

Without proper node version everything tends to blow up :fire: !

With proper node:

    $ node --version
    v0.10.24

Install dependencies:

    npm install
    sudo npm install gulp -g

Start local dev version (available at https://localhost:8080/)

    npm start

