var React            = require('react'),
    classNames       = require('classnames'),

    mui              = require('material-ui'),
    CircularProgress = mui.CircularProgress,
    LinearProgress   = mui.LinearProgress;

require('./Loading.css');

module.exports = React.createClass({

  displayName: 'Loading',

  propTypes: {
    size: React.PropTypes.number,
    type: React.PropTypes.oneOf(['circular', 'linear']),
  },

  getDefaultProps: function () {
    return {
      type : 'circular',
      size : 1
    }
  },

  renderItem: function(type) {
    if (type === 'linear') {
      return <LinearProgress mode='indeterminate' />
    } else {
      return <CircularProgress mode='indeterminate' size={this.props.size} />
    }
  },

  render: function () {
    return (
      <div className="loading">
        {this.renderItem(this.props.type)}
      </div>
    )
  }

});