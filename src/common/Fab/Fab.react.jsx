var React      = require('react');
var classNames = require('classnames');

var Icon       = require('../Icon/Icon.react');

require('./Fab.css');

module.exports = React.createClass({

  // FloatingActionButton
  displayName: 'FAB',

  propTypes: {
    button: React.PropTypes.object,
    handleClick: React.PropTypes.func.isRequired,
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

  getStyles: function() {
    var styles = {
      button: {
        backgroundColor: this.props.button.color,
        width: 55,
        height: 55,
      },
      icon: {
        width: 30,
        height: 30,
      }
    };
    return styles;
  },

  handleClick: function() {
    this.props.handleClick(this.props.button.name);
  },

  render: function() {
    var cssClasses = classNames({
      'fab': true,
      'fab-primary': this.props.button.primary,
    });

    var styles = this.getStyles();

    return (
      <div className={cssClasses} style={styles.button}>
        <Icon style={styles.icon} icon={this.props.button.icon} handleClick={this.handleClick} />
      </div>
    );
  }
});