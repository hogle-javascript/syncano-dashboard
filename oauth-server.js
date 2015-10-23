var _         = require('lodash'),
    oauthshim = require('oauth-shim'),
    express   = require('express');

var networks    = ['FACEBOOK', 'GOOGLE', 'GITHUB'];
var port        = process.env.PORT || 3000;
var app         = express();

var credentials = _.reduce(networks, function(result, network) {
  var id     = process.env[network + '_ID'];
  var secret = process.env[network + '_SECRET'];
  if (!_.isEmpty(id) && !_.isEmpty(secret)) {
    result[id] = secret;
  }
  return result;
}, {});

if (_.isEmpty(credentials)) {
    throw new Error('"credentials" are required');
}

app.all('/', oauthshim);
oauthshim.init(credentials);
app.listen(port);

console.log('OAuth Sever listening on ' + port);
