var React      = require('react');
var classNames = require('classnames');

var Icon       = require('../Icon/Icon.react');

require('./Fab.css');

module.exports = React.createClass({

  // FloatingActionButton
  displayName: 'FAB',

  propTypes: {
    button: React.PropTypes.object,
    handleFABClick: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      button: {
        label: 'Some default label',
        name: 'defaultButton',
        icon: 'plus',
        color: '#FFC52D',
      }
    }
  },

  handleClick: function() {
    this.props.handleFABClick(this.props.button.name);
  },

  render: function() {
    var cssClasses = classNames({
      'fab': true,
      'fab-primary': this.props.button.primary,
    });
    var style = {
      backgroundColor: this.props.button.color
    };
    return (
      <div className={cssClasses} style={style} onClick={this.handleClick}>
        <Icon icon={this.props.button.icon} />
      </div>
    );
  }
});