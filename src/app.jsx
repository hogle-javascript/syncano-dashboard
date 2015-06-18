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

Router.run(routes, function (Handler) {
  React.render(<Handler/>, container);
});
