var React           = require('react'),

    mui              = require('material-ui'),
    CircularProgress = mui.CircularProgress;


module.exports = React.createClass({

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
});