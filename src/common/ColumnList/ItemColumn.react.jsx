var React       = require('react'),
    Radium      = require('radium'),
    Moment      = require('moment'),

    mui         = require('material-ui'),
    Paper       = mui.Paper;


module.exports = Radium(React.createClass({

  displayName: 'ItemColumn',

  render: function () {
    var style = {
      display        : 'flex',
      flexDirection  : 'column',
      justifyContent : 'center'
    };

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );

  }
}));
