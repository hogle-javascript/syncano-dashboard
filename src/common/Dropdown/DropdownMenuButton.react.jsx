var React      = require('react'),
    classNames = require('classnames'),
    mui        = require('material-ui'),

    Constants  = require('../../constants/Constants'),

    FontIcon   = mui.FontIcon,
    Mixins     = require('../../mixins/mixins');

module.exports = React.createClass({

  displayName: 'DropdownMenuButton',

  mixins: [Mixins.dropdownClickMixin],

  render: function() {
    return (
      <div
        className = "dropdown-menu-button"
        onClick   = {this.handleDropdownClick}>
        <FontIcon className={this.props.action.iconType} />
      </div>
    );
  }
});