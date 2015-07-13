var React      = require('react'),
    classNames = require('classnames'),
    Router     = require('react-router'),
    routes     = require('./routes'),
    tapPlugin  = require('react-tap-event-plugin'),
    analytics  = require('./segment'),
    container  = document.getElementById('app');


tapPlugin();

require('./raven');
require('./stripe');
require('normalize.css');
require('./app.sass');
require('./common/Request/RequestActions');
require('./common/Request/RequestStore');

Router.run(routes, function (Root, state) {
  if (!window.opener) {
    var pathname = decodeURIComponent(state.pathname).replace('//', '/');

    // Remove trailing slash
    if (pathname.match('/$') !== null) {
      pathname = pathname.slice(0, -1);
    }

    if (pathname !== state.pathname) {
      location.hash = pathname;
    }
  }

  if (state.query.distinct_id !== undefined) {
    analytics.identify(state.query.distinct_id);
  }

  var name  = 'app',
      names = state.routes.map(function (route) {
        return route.name;
      }).filter(function(name) {
        return name !== undefined;
      });

  if (names.length > 0) {
    name = names[names.length-1];
  }

  analytics.page(name, {path: state.pathname});
  React.render(<Root/>, container);
});