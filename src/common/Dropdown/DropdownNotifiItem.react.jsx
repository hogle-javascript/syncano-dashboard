var React               = require('react'),
    classNames          = require('classnames'),
    gravatar            = require('gravatar'),

    mui                 = require('material-ui'),
    List                = mui.List,
    ListItem            = mui.ListItem,
    ListDivider         = mui.ListDivider,
    Avatar              = mui.Avatar,
    FontIcon            = mui.FontIcon,

    Loading             = require('../../common/Loading/Loading.react.jsx'),
    LoadingItem         = require('../../common/ColumnList/LoadingItem.react');


module.exports = React.createClass({

  displayName: 'DropdownNotifiItem',

  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    isLoading: React.PropTypes.bool,
    headerContent: React.PropTypes.shape({
      userFullName       : React.PropTypes.string.isRequired,
      userEmail          : React.PropTypes.string.isRequired,
      handleItemClick    : React.PropTypes.func,                  // if "clickable" props is defined as false or
      clickable          : React.PropTypes.bool                   // is not defined function will not be triggered
    })
  },

  renderItems: function () {

    if (this.props.items.length === 0) {
      return this.renderEmptyNotification()
    }
    var items = [];
    items.push(this.renderInvitationItems());
    items.push(this.renderNormalLinkItems());
    return items;
  },

  renderEmptyNotification: function () {
    var emptyItem = {
      subheader: "Notifications",
      subheaderStyle: {
        borderBottom: "1px solid #EAEAEA"
      },
      name: "empty-notification",
      leftIcon  : {
        name  : "synicon-information",
        style : {
          color: "#0091EA"
        }
      },
      content: {
        text  : "You don't have any notifications",
        style : {}
      }
    };
    var icon = <FontIcon
        className = {emptyItem.leftIcon.name}
        style     = {emptyItem.leftIcon.style} />
    return <List
             subheader      = {emptyItem.subheader}
             subheaderStyle = {emptyItem.subheaderStyle}>
             <ListItem
               key                = {emptyItem.name}
               disableTouchTap    = {true}
               leftIcon           = {icon}>
               <span style={emptyItem.content.style}>
               {emptyItem.content.text}
               </span>
             </ListItem>
           </List>
  },

  renderInvitationItems: function () {
    var invitationItems = this.props.items.filter(function (item, index) {
      return item.type === "invitation";
    });
    var items = invitationItems.map(function (item, index) {
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
                 leftIcon        = {icon}
                 disableTouchTap = {true} >
                 {item.content.text}
               </ListItem>
               <ListItem disableTouchTap = {true}>
               {buttons}
               </ListItem>
               <ListDivider />
             </List>;
    });
    return items
  },

  renderNormalLinkItems: function () {
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
            secondaryText      = {item.content.secondaryText ? link : null}
            secondaryTextLines = {item.content.secondaryTextLines || 1}>
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
      <Loading
        show = {this.props.isLoading}
        size = {1} />
      {this.renderItems()}
      </div>
    );
  }

});
