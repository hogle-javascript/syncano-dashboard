var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler;


module.exports = React.createClass({

  displayName: 'App',

  render: function () {
    return (
      <div className="app">
        <div>App</div>
        <RouteHandler/>
      </div>
    );
  }

});



