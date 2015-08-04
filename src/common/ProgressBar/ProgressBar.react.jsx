let React = require('react');
let classNames = require('classnames');

require('./ProgressBar.css');

module.exports = React.createClass({

  displayName: 'ProgressBar',

  propTypes: {
    visible: React.PropTypes.bool
  },

  getInitialState() {
    return {
      visible: this.props.visible || false,
    }
  },

  render() {

    let cssClasses = classNames({
      'progress-bar-group': true,
      'progress-bar-visible': this.state.visible,
    });

    return (
      <div className={cssClasses}></div>
    );
  }

});