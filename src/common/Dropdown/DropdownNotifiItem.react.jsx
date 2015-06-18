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

  displayName: 'DropdownNotifiItem',

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

  getInvitationItems: function () {
    var invitationItems = this.props.items.filter(function (item) {
      return item.type === "invitation"
    });
    var items = invitationItems.map(function (item) {
      var icon = <FontIcon 
                   className = {item.leftIcon.name || null} 
                   style     = {item.leftIcon.style} />
      var buttons = <div>
                      <span onClick={item.handleAccept} className="cursor-pointer left-button">  
                      {item.buttonsText[0]}
                      </span>
                      <span onClick={item.handleDecline} className="cursor-pointer right-button">  
                      {item.buttonsText[1]}
                      </span>
                    </div>
      return <List 
               subheader      = {item.subheader || null}
               subheaderStyle = {item.subheaderStyle}>
               <ListItem 
                 leftIcon      = {icon}
                 disableTouchTap = {true} >
                 {item.content.text}
               </ListItem>
               <ListItem disableTouchTap = {true}>
               {buttons}
               </ListItem>
               <ListDivider />
             </List>;
    })
    return items;
  },

  getNormalLinkItems: function () {
    var linkItems = this.props.items.filter(function (item) {
      return item.type === "normal-link"
    });

    var items = linkItems.map(function (item, i) {
      var icon = <FontIcon 
                   className = {item.leftIcon.name || null} 
                   style     = {item.leftIcon.style} />
      var link = <p onClick={item.handleLinkClick} className="cursor-pointer">{item.content.secondaryText}</p>
      return (
        <List 
          subheader      = {item.subheader || null}
          subheaderStyle = {item.subheaderStyle}>
          <ListItem 
            key                = {item.name + i} 
            disableTouchTap    = {true}
            leftIcon           = {icon}
            secondaryText      = {item.secondaryText ? link : null}
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
      {this.getInvitationItems()}
      {this.getNormalLinkItems()}
      </div>
    );
  }

});
