var React               = require('react'),
    classNames          = require('classnames'),
    mui                 = require('material-ui'),
    gravatar            = require('gravatar'),

    MaterialIcon        = require('../../common/Icon/MaterialIcon.react'),

    OutsideClickHandler = require('react-outsideclickhandler');

require('./Dropdown.css');


module.exports = React.createClass({

  displayName: 'MaterialDropdown',

  propTypes: {
    icon: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      content: React.PropTypes.string.isRequired,         // Content to view as item can be any object too
      name: React.PropTypes.string.isRequired,            // name for DropdownMenuItems kys
      handleItemClick: React.PropTypes.func.isRequired,   // function to call after DropdownMenuItem click
    })).isRequired,
    headerContent: React.PropTypes.shape({
      userFullName: React.PropTypes.string.isRequired,
      userEmail: React.PropTypes.string.isRequired,
      handleItemClick: React.PropTypes.func,              // if "clickable" props is defined as false or 
      clickable: React.PropTypes.bool                     // is not defined function will not be triggered
    }),
    iconStyle: React.PropTypes.object,
  },

  getDefaultProps: function () {
    return {
      iconStyle: {
        width: "18px",
        height: "18px", 
        fill: "#FFF",
      }        
    };
  },

  getInitialState: function () {
    return {
      icon: this.props.icon || 'more_vert',
      isOpen: false,
    }
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

    var headerContent;

    if (this.props.headerContent) {
      var gravatarUrl = gravatar.url(this.props.headerContent.userEmail, {}, true);
      var avatar = <mui.Avatar src={gravatarUrl} />;
      var headerContent =
        <mui.List>
          <mui.ListItem 
            leftAvatar={avatar}
            secondaryText={this.props.headerContent.userEmail} 
            disableTouchTap={!this.props.headerContent.clickable}
            onClick={this.props.headerContent.handleItemClick} >
            {this.props.headerContent.userFullName}
          </mui.ListItem>
          <mui.ListDivider />
        </mui.List>
    };

    var items = this.props.items.map(function (item, i) {
      return (
        <mui.List>
          <mui.ListItem 
            key={item.name + i} 
            onClick={item.handleItemClick} >
            {item.content}
          </mui.ListItem>
        </mui.List>)
    }.bind(this));

    return (
      <OutsideClickHandler onOutsideClick={this.close} >
        <div className="dropdown">
          <div className="dropdown-button clickable" onClick={this.toggleOpenClose}>
            <MaterialIcon name={this.state.icon} style={this.props.iconStyle}/>
          </div>
          <div className={cssClasses}>
              {headerContent}
              {items}
          </div>
        </div>
      </OutsideClickHandler>
    );
  }

});
