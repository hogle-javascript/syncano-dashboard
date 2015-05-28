var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler;


module.exports = React.createClass({

  displayName: 'PanelHandler',

  render: function () {
    return (
      <div className="panel">
        <div>PanelHandler</div>
        <RouteHandler/>
      </div>
    );
  }

});



