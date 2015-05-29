var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler,

    Header       = require('../apps/Header/Header.react');


module.exports = React.createClass({

  displayName: 'Dashboard',

  render: function () {
    return (
      <div>
        <Header />
        <RouteHandler />
      </div>
    );
  }

});



