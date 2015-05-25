var React = require('react');
var classNames = require('classnames');

//var ViewActions = require('../actions/ViewActions');
var Constants = require('../../constants/Constants');

var Icon = require('../Icon/Icon.react');
var Mixins = require('../../mixins/mixins');

var DropdownMenuItem = require('./DropdownMenuItem.react');
var DropdownMenuButton = require('./DropdownMenuButton.react');

var OutsideClickHandler = require('react-outsideclickhandler');

require('./Dropdown.css');


module.exports = React.createClass({

  displayName: 'Dropdown',

  mixins: [
    //require('react-onclickoutside'),
    //Mixins.toggleMenuMixin
  ],

  propTypes: {
    icon: React.PropTypes.string,
    actions: React.PropTypes.array.isRequired,
    handleItemClick: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {

    return {
      icon: this.props.icon || 'more-vert',
      isOpen: false,
    }
  },

  handleItemClick: function (item) {
    this.props.handleItemClick(item);
  },

  toggleOpenClose: function (e) {
    this.setState({isOpen: !this.state.isOpen});
  },

  close: function () {
    this.setState({'isOpen': false});
  },

  render: function () {

    var cssClasses = classNames({
      'dropdown-menu': true,
      'dropdown-menu-visible': this.state.isOpen,
    });

    var items = this.props.actions.filter(function (action) {
      return !action.hasOwnProperty('iconType')
    }).map(function (action, i) {
      return <DropdownMenuItem key={i} action={action} handleItemClick={this.handleItemClick}/>
    }.bind(this));

    var buttons = this.props.actions.filter(function (action) {
      return action.hasOwnProperty('iconType')
    }).map(function (action, i) {
      return <DropdownMenuButton key={i} action={action} handleItemClick={this.handleItemClick}/>
    }.bind(this));

    return (
      <OutsideClickHandler onOutsideClick={this.close}>
        <div className="dropdown">
          <div className="dropdown-button clickable" onClick={this.toggleOpenClose}>
            <Icon icon={this.state.icon}/>
          </div>
          <div className={cssClasses}>
            <div className="dropdown-menu-section">
              {items}
            </div>
            <div className="dropdown-menu-section dropdown-menu-section-buttons">
              {buttons}
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    );
  }

});
