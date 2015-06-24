var React               = require('react'),
    classNames          = require('classnames'),
    gravatar            = require('gravatar'),

    mui                 = require('material-ui'),
    List                = mui.List,
    ListItem            = mui.ListItem, 
    ListDivider         = mui.ListDivider,
    Avatar              = mui.Avatar, 
    FontIcon            = mui.FontIcon;

require('./Dropdown.css');


module.exports = React.createClass({

  displayName: 'MaterialDropdwonItem',

  propTypes: {
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
    })
  },

  renderHeaderContent: function () {
    var headerContent;

    if (this.props.headerContent) {
      var gravatarUrl = gravatar.url(this.props.headerContent.userEmail, {}, true),
          avatar = <Avatar src={gravatarUrl} />;
      headerContent = <List>
                        <ListItem 
                          leftAvatar      = {avatar}
                          secondaryText   = {this.props.headerContent.userEmail} 
                          disableTouchTap = {!this.props.headerContent.clickable}
                          onClick         = {this.props.headerContent.handleItemClick}>
                          {this.props.headerContent.userFullName}
                        </ListItem>
                        <ListDivider />
                      </List>;
    };
    return headerContent;
  },

  renderItems: function () {
    var items = this.props.items.map(function (item, i) {
      var icon = <FontIcon 
                   className = {item.leftIcon.name || null} 
                   style     = {item.leftIcon.style} />;
      return (
        <List
          key            = {item.name + i}
          subheader      = {item.subheader || null}
          subheaderStyle = {item.subheaderStyle}>
          <ListItem
            onClick            = {item.handleItemClick}
            leftIcon           = {icon}
            secondaryText      = {item.secondaryText}
            secondaryTextLines = {item.secondaryTextLines || 1}>
            <span style={item.content.style}>
            {item.content.text}
            </span>
          </ListItem>
        </List>)
    })
    return items
  },

  render: function () {
    return (
      <div>
      {this.renderHeaderContent()}
      {this.renderItems()}
      </div>
    );
  }

});
