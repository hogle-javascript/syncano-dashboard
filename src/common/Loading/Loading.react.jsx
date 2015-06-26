var React            = require('react'),
    classNames       = require('classnames'),

    mui              = require('material-ui'),
    CircularProgress = mui.CircularProgress,
    LinearProgress   = mui.LinearProgress;


module.exports = React.createClass({

  displayName: 'Loading',

  propTypes: {
    size: React.PropTypes.number,
    type: React.PropTypes.oneOf(['circular', 'linear'])
  },

  getDefaultProps: function () {
    return {
      type : 'circular',
      size : 1
    }
  },

  getStyles: function () {
    return {
      display: 'flex',
      justifyContent: 'center'
    }
  },

  renderItem: function(type) {
    if (type === 'linear') {
      return <LinearProgress mode='indeterminate' />
    }
    return <CircularProgress mode='indeterminate' size={this.props.size} />
  },

  render: function () {
    return (
      <div style={this.getStyles()} >
        {this.renderItem(this.props.type)}
      </div>
    )
  }

});