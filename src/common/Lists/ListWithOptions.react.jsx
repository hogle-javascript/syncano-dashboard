let React = require('react');

//let ViewActions         = require('../actions/ViewActions');

let Constants = require('../../constants/Constants');
let List = require('./List.react');
let Dropdown = require('../Dropdown/Dropdown.react').Dropdown;
let DropdownWithButtons = require('../Dropdown/DropdownWithButtons.react');

let ContentHeader = require('../ContentHeader.react');

module.exports = React.createClass({

  displayName: 'ListWithOptions',

  handleDropdownMenuItemClick: function(action) {

    //if (Constants.VIEW_MODES.indexOf(action) != -1) {
    //    ViewActions.updateViewMode(this.props.list.uuid, Constants.VIEW_ACTIONS_MAP[action]);
    //}
    //if (Constants.SORT_MODES.indexOf(action) != -1) {
    //    ViewActions.updateSortMode(this.props.list.uuid, action);
    //}
  },

  toggleDropdownMenu: function() {
    ViewActions.showDropdown(this.props.list.uuid);
  },

  render: function() {
    let dropdownVisible = this.props.dropdown === this.props.list.uuid;
    let dropdown;
    let heading;

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
    console.log("List data", this.props.list.data)
    return (
      <div className="list-group">

        <List {...this.props} data={this.props.list.data}/>
      </div>
    );
  }

});