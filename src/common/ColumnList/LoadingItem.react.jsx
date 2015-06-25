var React            = require('react'),
    Radium           = require('radium'),

    mui              = require('material-ui'),
    CircularProgress = mui.CircularProgress;


module.exports = Radium(React.createClass({

  displayName: 'LoadingItem',

  getDefaultProps: function () {
    return {
      size: 1        
    };
  },

  getStyles: function() {
    return {
      display        : 'flex',
      justifyContent : 'center',
      alignItems     : 'center'
    }
  },

  render: function () {
    var styles = this.getStyles();
    return (
      <div style={styles}>
        <CircularProgress
          mode="indeterminate"
          size={this.props.size} />
      </div>
    )
  }
}));
