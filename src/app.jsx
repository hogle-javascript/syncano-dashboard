var React      = require('react'),
    classNames = require('classnames'),
    Router     = require('react-router'),
    routes     = require('./routes'),

    container  = document.getElementById('app');

require('normalize.css');
require('./app.css');

Router.run(routes, function (Handler) {
  React.render(<Handler/>, container);
});
