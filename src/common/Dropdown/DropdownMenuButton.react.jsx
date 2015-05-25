var React = require('react');
var classNames = require('classnames');

//var ViewActions = require('../actions/ViewActions');
var Constants = require('../../constants/Constants');

var Icon = require('../Icon/Icon.react');
var Mixins = require('../../mixins/mixins');

module.exports = React.createClass({

  displayName: 'DropdownMenuButton',

  mixins: [Mixins.dropdownClickMixin],

  render: function () {
    return (
      <div className="dropdown-menu-button" onClick={this.handleDropdownClick}>
        <Icon icon={this.props.action.iconType} />
      </div>
    );
  }
});