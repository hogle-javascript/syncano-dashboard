var React = require('react');
var classNames = require('classnames');

var Icon = require('./Icon.react');
//var ViewActions = require('../actions/ViewActions');

module.exports = React.createClass({

  displayName: 'IconPickerListItem',

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    selcted: React.PropTypes.bool,
  },

  handleClick: function (e) {
    e.stopPropagation();
    //ViewActions.selectModalIcon(this.props.icon);
  },

  render: function () {
    var cssClasses = classNames('icon-picker-list-item', {
      'icon-picker-list-item-selected': this.props.selected,
    });
    return (
      <div className={cssClasses} onClick={this.handleClick}>
        <Icon icon={this.props.icon}/>
      </div>
    );
  }

});