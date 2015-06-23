var React       = require('react'),
    Radium      = require('radium'),

    mui         = require('material-ui'),
    Paper       = mui.Paper;


module.exports = Radium(React.createClass({

  displayName: 'ItemColumn',

  render: function () {
    var styles = {
      display        : 'flex',
      flexDirection  : 'column',
      justifyContent : 'center'
    };

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );

  }
}));
