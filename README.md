# Installation

Project requires node 6.2.1 and npm 3.9.3. The best way to manage node versions
I found is [n](https://github.com/tj/n).

Installation.

    $ sudo npm install -g n
    $ n 6.2.1

Type `n` to prompt selection of an installed node.
Use the up / down arrow to navigate, and press enter or the right arrow to select, or ^C to cancel:

    $ n

      0.8.14
    ο 6.2.1
      4.4.3
      0.9.6


Without proper node version everything tends to blow up :fire: !

With proper node:

    $ node --version
    v6.2.1

Install dependencies:

    npm install
    sudo npm install gulp -g

Start local dev version (available at https://localhost:8080/)

    npm start


# Social login

Social login requires proper configuration of env variables with network ids e.g:

    $ export FACEBOOK_ID='xx'
    $ export GOOGLE_ID='xx'
    $ export GITHUB_ID='xx'

or if you are using `fish` shell:

    $ set -g -x FACEBOOK_ID xx
    $ set -g -x GOOGLE_ID xx
    $ set -g -x GITHUB_ID xx


# Icons

We are using set of [Material Design Icons](http://materialdesignicons.com/).
Icons are attached as font in static assets `src/assets` so if you want to rebuild whole font just use npm command:

    $ npm run iconfont

and commit your changes.


# E2E Testing

We are using [nightwatchjs](http://nightwatchjs.org/) for e2e testing.
**nightwatchjs** requires few binary files which can be installed via proper NPM command:

    $ npm run e2e-setup

For selenium to start you will also need:

* [Java](https://java.com/en/download/)
* [Java Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [Chrome](https://www.google.com/chrome/)

You'll also need to configure env variables for the tests to work locally:

    $ export NIGHTWATCH_EMAIL="xx"
    $ export NIGHTWATCH_PASSWORD="xx"
    $ export NIGHTWATCH_ACCOUNT_KEY="xx"
    $ export STRIPE_PUBLISHABLE_KEY="xx"

If you are ready just run dev server on first console:

    $ npm start

and start testing by typing this into second console:

    $ npm e2e-run

If you want only one test tag to run use for example:

    $ npm run e2e-run class

This will run only tests with tag = class.

All accounts used for e2e testing will be deleted after 2h of no activity :fire: !

If part of the tests fail for some reason, you can temporarily disable them by `--skiptags` argument. So if, for instance classes tests fail, you can modify `package.json` e2e line, so that it looks like this:

    "e2e": "nightwatch --skiptags classes",

Tests will continue to run but the classes tests will be skipped. Refer to the test files for the appropriate tag name.

# E2E Skipping

If you want skip E2E tests because of valid reason, for example only updating text or README you can add [e2e-skip] tag to your commit message.
It will skip all e2e tests, only starting lint.
Please do not overuse it !
