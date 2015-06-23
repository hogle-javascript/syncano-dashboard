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
    type    : React.PropTypes.oneOf(['circular', 'linear']).isRequired,
    mode    : React.PropTypes.oneOf(['indeterminate', 'determinate']).isRequired
  },

  getDefaultProps: function () {
    return {
      type : 'circular',
      size : 1,
      visible: false
    };
  },

  checkVisibility: function() {
    if (this.props.visible === true) {
      return this.getLoadingItem(this.props.type)
    }
  },

  getLoadingItem: function(type) {
    if (type === 'linear') {
      return <LinearProgress mode='indeterminate' />
    } else {
      return <CircularProgress mode='indeterminate' size={this.props.size} />
    }
  },

  render: function () {
    return (
      <div className="loading">
        {this.checkVisibility()}
      </div>
    );
  }

});