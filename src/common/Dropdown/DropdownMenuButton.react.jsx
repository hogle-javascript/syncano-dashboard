let React = require('react');
let classNames = require('classnames');
let mui = require('material-ui');
let Constants = require('../../constants/Constants');
let FontIcon = mui.FontIcon;
let Mixins = require('../../mixins/mixins');

export default React.createClass({

  displayName: 'DropdownMenuButton',

  mixins: [Mixins.dropdownClickMixin],

  render() {
    return (
      <div
        className="dropdown-menu-button"
        onClick={this.handleDropdownClick}>
        <FontIcon className={this.props.action.iconType}/>
      </div>
    );
  }
});