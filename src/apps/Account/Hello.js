var hello       = require('hellojs'),
    credentials = {},
    options     = {};


credentials.facebook = FACEBOOK_ID;
credentials.google   = GOOGLE_ID;
credentials.github   = GITHUB_ID;

options.redirect_uri = location.protocol + '//' + location.host;
options.scope        = 'email';
options.oauth_proxy  = OAUTH_PROXY_URL

hello.init(credentials, options);

module.exports = hello;