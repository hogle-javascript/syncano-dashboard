var React                = require('react'),
    classNames           = require('classnames'),
    gravatar             = require('gravatar'),
    OutsideClickHandler  = require('react-outsideclickhandler'),

    mui                  = require('material-ui'),
    List                 = mui.List,
    ListItem             = mui.ListItem, 
    ListDivider          = mui.ListDivider,
    Avatar               = mui.Avatar,
    FontIcon             = mui.FontIcon,
    MaterialDropdownItem = require('./MaterialDropdownItem.react'),
    DropdownNotifiItem   = require('./DropdownNotifiItem.react');

    

require('./Dropdown.css');


module.exports = React.createClass({

  displayName: 'MaterialDropdown',

  propTypes: {
    type : React.PropTypes.string, 
    icon : React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      leftIcon           : React.PropTypes.shape({
        name  : React.PropTypes.string.isRequired,
        style : React.PropTypes.object.isRequired
      }),
      subheader          : React.PropTypes.string,
      subheaderStyle     : React.PropTypes.object,
      content            : React.PropTypes.shape({
        text  : React.PropTypes.string.isRequired,
        style : React.PropTypes.object.isRequired 
      }), 
      secondaryText      : React.PropTypes.string,
      secondaryTextLines : React.PropTypes.number,                // Content to view as item can be any object too
      name               : React.PropTypes.string.isRequired,     // name for DropdownMenuItems kys
      handleItemClick    : React.PropTypes.func.isRequired        // function to call after DropdownMenuItem click
    })).isRequired,
    headerContent: React.PropTypes.shape({
      userFullName       : React.PropTypes.string.isRequired,
      userEmail          : React.PropTypes.string.isRequired,
      handleItemClick    : React.PropTypes.func,                  // if "clickable" props is defined as false or 
      clickable          : React.PropTypes.bool                   // is not defined function will not be triggered
    }),
    iconStyle: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      iconStyle: {
        width  : "18px",
        height : "18px", 
        fill   : "#FFF"
      },
      type      : "normal",
      clickable : true
    }
  },

  getInitialState: function () {
    return {
      icon: this.props.icon || 'dots-vertical',
      isOpen: false
    }
  },

  toggleOpenClose: function (e) {
    this.setState({isOpen: (!this.state.isOpen && this.props.clickable)});
  },

  close: function () {
    this.setState({'isOpen': false});
  },

  getItems: function () {
    if (this.props.type === "notification") {
      return <DropdownNotifiItem items={this.props.items} />
    } else {
      return <MaterialDropdownItem
                items         = {this.props.items}
                headerContent = {this.props.headerContent} />
    }
  },

  render: function () {
    var cssClasses = classNames({
      'dropdown-menu'         : true,
      'dropdown-menu-visible' : this.state.isOpen
    });

    return (
      <OutsideClickHandler onOutsideClick={this.close}>
        <div className="dropdown">
          <div className="dropdown-button clickable" onClick={this.toggleOpenClose}>
            <FontIcon 
              className = {"synicon-" + this.state.icon} 
              style     = {this.props.iconStyle} />
          </div>
          <div className={cssClasses}>
            <div className="dropdown-menu-section">
              {this.getItems()}
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    );
  }

});
