var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler;


module.exports = React.createClass({

  displayName: 'Dashboard',

  render: function () {
    return (
      <div className="dashboard">
        <div>Dashboard</div>
        <RouteHandler/>
      </div>
    );
  }

});



