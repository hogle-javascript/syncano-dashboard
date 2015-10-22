var _         = require('lodash'),
    oauthshim = require('oauth-shim'),
    express   = require('express');


var port        = process.env.PORT || 3000;
var credentials = {};
var app         = express();

app.all('/', oauthshim);

if (process.env.FACEBOOK_ID) credentials[process.env.FACEBOOK_ID] = process.env.FACEBOOK_SECRET;
if (process.env.GOOGLE_ID)   credentials[process.env.GOOGLE_ID]   = process.env.GOOGLE_SECRET;
if (process.env.GITHUB_ID)   credentials[process.env.GITHUB_ID]   = process.env.GITHUB_SECRET;

if (_.isEmpty(credentials)) {
    throw new Error('"credentials" are required');
}

oauthshim.init(credentials);
app.listen(port);

console.log('OAuth Sever listening on ' + port);