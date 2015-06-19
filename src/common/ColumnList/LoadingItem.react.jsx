var React            = require('react'),
    Radium           = require('radium'),

    mui              = require('material-ui'),
    CircularProgress = mui.CircularProgress;


module.exports = Radium(React.createClass({

  displayName: 'LoadingItem',

  getStyles: function() {
      return {
        display        : 'flex',
        justifyContent : 'center',
        alignItems     : 'center'
      }
  },

  render: function () {
      return (
        <div style={this.getStyles()}>
          <CircularProgress mode="indeterminate" />
        </div>
    )
  }
}));
