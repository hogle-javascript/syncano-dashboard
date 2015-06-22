var React      = require('react'),
    classNames = require('classnames'),
    Router     = require('react-router'),
    routes     = require('./routes'),
    tapPlugin  = require('react-tap-event-plugin'),
    container  = document.getElementById('app');


tapPlugin();

require('./raven');
require('normalize.css');
require('./app.sass');

Router.run(routes, function (Root, state) {
  var pathname = decodeURIComponent(state.pathname).replace('//', '/');

  // Remove trailing slash
  if (pathname.match('/$') !== null) {
    pathname = pathname.slice(0, -1);
  }

  if (pathname !== state.pathname) {
    location.hash = pathname;
  }

  React.render(<Root/>, container);
});
