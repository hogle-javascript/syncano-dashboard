var React = require('react');
var classNames = require('classnames');

require('./ProgressBar.css');

module.exports = React.createClass({

  displayName: 'ProgressBar',

  propTypes: {
    visible: React.PropTypes.bool
  },

  getInitialState: function () {
    return {
      visible: this.props.visible || false,
    }
  },

  render: function () {

    var cssClasses = classNames({
      'progress-bar-group': true,
      'progress-bar-visible': this.state.visible,
    });

    return (

      <div className={cssClasses}></div>
    );
  }

});