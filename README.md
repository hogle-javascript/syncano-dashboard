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

Make sure that you have gulp - installation instructions [here](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started).

    gulp server

