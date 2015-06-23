var React                = require("react"),
    classNames           = require("classnames"),
    gravatar             = require("gravatar"),
    OutsideClickHandler  = require("react-outsideclickhandler"),
    mui                  = require("material-ui"),

    ProfileActions       = require("../../apps/Profile/ProfileActions"),
    List                 = mui.List,
    ListItem             = mui.ListItem, 
    ListDivider          = mui.ListDivider,
    Avatar               = mui.Avatar,
    FontIcon             = mui.FontIcon,
    MaterialDropdownItem = require("./MaterialDropdownItem.react"),
    DropdownNotifiItem   = require("./DropdownNotifiItem.react");


require("./Dropdown.css");


module.exports = React.createClass({

  displayName: "MaterialDropdown",

  propTypes: {
    type : React.PropTypes.string, 
    icon : React.PropTypes.string,
    items: React.PropTypes.array.isRequired,
    headerContent: React.PropTypes.shape({
      userFullName       : React.PropTypes.string.isRequired,
      userEmail          : React.PropTypes.string.isRequired,
      handleItemClick    : React.PropTypes.func,                  // if "clickable" props is defined as false or 
      clickable          : React.PropTypes.bool                   // is not defined function will not be triggered
    }),
    iconStyle: React.PropTypes.object,
    isLoading: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      icon: "dots-vertical",
      iconStyle: {
        width  : "18px",
        height : "18px", 
        fill   : "#FFF"
      },
      type      : "normal-link",
      clickable : true
    }
  },

  getInitialState: function () {
    return {
      isOpen : false
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  },

  toggleOpenClose: function () {
    this.setState({
      isOpen: (!this.state.isOpen && this.props.clickable)
    }, function() {
      if (this.state.isOpen && this.props.handleOnClick) {
        this.props.handleOnClick()
      }
    });
  },

  close: function () {
    this.setState({"isOpen": false});
  },

  renderItems: function () {
    if (this.props.type === "notification") {
      return <DropdownNotifiItem
               items={this.props.items}
               isLoading={this.props.isLoading} />
    } else {
      return <MaterialDropdownItem
               items         = {this.props.items}
               headerContent = {this.props.headerContent} />
    }
  },

  renderIcon: function () {
    var notificationCountIcon = null;
    if (this.props.type === "notification" && this.props.items.length > 0) {
      var synIconName = this.props.items.length < 10 ? this.props.items.length : "9-plus";
      notificationCountIcon = <FontIcon
                                className = {"synicon-numeric-" + synIconName + "-box" }
                                style     = {{
                                  padding  : "0 4px",
                                  color    : "#ff3d00",
                                  position : "absolute",
                                  top      : "-14px",
                                  right    : "-14px"
                                }} />
    }
    return <div>
             <FontIcon
               className = {"synicon-" + this.props.icon}
               style     = {this.props.iconStyle} />
             {notificationCountIcon}
           </div>
  },

  render: function () {

    var cssClasses = classNames({
      "dropdown-menu"         : true,
      "dropdown-menu-visible" : this.state.isOpen
    });

    return (
      <OutsideClickHandler onOutsideClick={this.close}>
        <div className="dropdown">
          <div className="dropdown-button clickable" onClick={this.toggleOpenClose}>
            {this.renderIcon()}
          </div>
          <div className={cssClasses}>
            <div className="dropdown-menu-section">
              {this.renderItems()}
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    );
  }

});
