var hello       = require('hellojs'),
    credentials = {},
    options     = {};


credentials.facebook = (typeof FACEBOOK_ID === 'undefined') ? null : FACEBOOK_ID;
credentials.google   = (typeof GOOGLE_ID === 'undefined') ? null : GOOGLE_ID;
credentials.github   = (typeof GITHUB_ID === 'undefined') ? null : GITHUB_ID;

options.redirect_uri = location.protocol + '//' + location.host;
options.scope        = 'email';
options.oauth_proxy  = (typeof OAUTH_PROXY_URL === 'undefined') ? null : OAUTH_PROXY_URL

hello.init(credentials, options);

module.exports = hello;