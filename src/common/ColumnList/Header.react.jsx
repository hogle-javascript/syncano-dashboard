var React         = require('react'),

    MaterialIcon  = require('../Icon/MaterialIcon.react');


module.exports = React.createClass({

  displayName: 'Header',

  render: function () {

    var headerStyle = {
      root: {
        display        : 'flex',
        justifyContent : 'flex-end',
        marginBottom   : 5,
        fontSize       : 16,
        lineHeight     : '35px',
        color          : '#929292',
      }
    };

    return (
      <div style={headerStyle.root}>
        {this.props.children}
      </div>
    )
  }

});