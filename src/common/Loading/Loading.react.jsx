var React            = require('react'),
    classNames       = require('classnames'),

    mui              = require('material-ui'),
    CircularProgress = mui.CircularProgress,
    LinearProgress   = mui.LinearProgress;

require('./Loading.css');

module.exports = React.createClass({

  displayName: 'Loading',

  propTypes: {
    visible : React.PropTypes.bool.isRequired,
    type    : React.PropTypes.oneOf(['circular', 'linear']).isRequired
  },

  getDefaultProps: function () {
    return {
      type : 'circular',
      size : 1
    };
  },

  getInitialState: function () {
    return {
      visible: this.props.visible || false,
    }
  },

  renderLoadingItem: function(type) {
    if (type === 'linear') {
      return <LinearProgress mode='indeterminate' />
    } else {
      return <CircularProgress mode='indeterminate' size={this.props.size} />
    }
  },

  render: function () {
    return (
      <div>
        {this.renderLoadingItem(this.props.type)}
      </div>
    );
  }

});