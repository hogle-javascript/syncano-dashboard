var React = require('react');

//var ViewActions         = require('../actions/ViewActions');

var Constants = require('../../constants/Constants');
var List = require('./InstancesList.react');

var Dropdown = require('../../common/Dropdown/Dropdown.react').Dropdown;
var DropdownWithButtons = require('../../common/Dropdown/DropdownWithButtons.react');

var InstancesListHeader = require('./InstancesListHeader.react');

var ContentHeader = require('../../common/ContentHeader.react');

module.exports = React.createClass({

  displayName: 'InstancesListWithHeader',

  propTypes: {
    list: React.PropTypes.object.isRequired,
    handleItemMenuClick: React.PropTypes.func.isRequired,
    handleHeaderMenuClick: React.PropTypes.func.isRequired,
  },

  handleDropdownMenuItemClick: function (action) {

    //if (Constants.VIEW_MODES.indexOf(action) != -1) {
    //    ViewActions.updateViewMode(this.props.list.uuid, Constants.VIEW_ACTIONS_MAP[action]);
    //}
    //if (Constants.SORT_MODES.indexOf(action) != -1) {
    //    ViewActions.updateSortMode(this.props.list.uuid, action);
    //}
  },

  toggleDropdownMenu: function () {
    ViewActions.showDropdown(this.props.list.uuid);
  },

  render: function () {

    var dropdownVisible = this.props.dropdown === this.props.list.uuid;
    var dropdown;
    var heading;

    //debugger;
    //if (this.props.list.contentType !== "instances") {
    //  dropdown = <Dropdown icon="more-horiz" actions={this.props.list.actions} visible={dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />;
    //} else {
    //  dropdown = <DropdownWithButtons icon="more-horiz" actions={this.props.list.actions} visible={dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />;
    //}

    //if (this.props.list.heading === "CodeBoxes" || this.props.list.heading === "Classes") {
    //  heading = <ContentHeader {...this.props}/>
    //} else {
    //  heading = <div className="list-header">{this.props.list.heading}<div className="list-heading-dropdown">{dropdown}</div></div>
    //}

    //{heading}
    console.log("List data", this.props.list.data);
    return (
      <div className="list-group">
        <InstancesListHeader list={this.props.list} handleHeaderMenuClick={this.props.handleHeaderMenuClick} />
        <List list={this.props.list} handleItemMenuClick={this.props.handleItemMenuClick}/>
      </div>
    );
  }

});