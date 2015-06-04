var React = require('react');
var classNames = require('classnames');

var Icon = require('./Icon.react');

require('./Icon.css');

module.exports = React.createClass({

  displayName: 'IconPickerListItem',

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    selcted: React.PropTypes.bool,
    handleClick: React.PropTypes.func,
  },

  getInitialState: function () {
    return {
      selected: this.props.selected || false,        
    };
  },

  handleClick: function () {
    if(this.props.handleClick) {
      this.props.handleClick();
    }
  },

  render: function () {
    var cssClasses = classNames('icon-picker-list-item', {
      'icon-picker-list-item-selected': this.props.selected,
    });
    return (
      <div 
        className={cssClasses} 
        onClick={this.handleClick} >
        <Icon icon={this.props.icon} />
      </div>
    );
  }

});