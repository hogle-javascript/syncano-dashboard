var React         = require('react'),

    MaterialIcon  = require('../Icon/MaterialIcon.react');


module.exports = React.createClass({

  displayName: 'Header',

  render: function () {

    var headerStyle = {
      root: {
        display        : 'flex',
        alignItems     : 'center',
        fontSize       : 14,
        lineHeight     : '24px',
        color          : 'rgba(0,0,0,.54)',
        marginBottom   : 16
      }
    };

    return (
      <div style={headerStyle.root}>
        {this.props.children}
      </div>
    )
  }

});