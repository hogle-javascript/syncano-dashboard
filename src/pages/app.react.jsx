var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler;


module.exports = React.createClass({

  displayName: 'AppHandler',

  render: function () {
    return (
      <div className="app">
        <div>AppHandler</div>
        <RouteHandler/>
      </div>
    );
  }

});



