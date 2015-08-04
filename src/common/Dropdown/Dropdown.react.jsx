var React               = require('react'),
    classNames          = require('classnames'),
    OutsideClickHandler = require('react-outsideclickhandler'),

    Constants           = require('../../constants/Constants'),

    mui                 = require('material-ui'),
    FontIcon            = mui.FontIcon,
    Mixins              = require('../../mixins/mixins'),

    DropdownMenuItem    = require('./DropdownMenuItem.react');





module.exports = React.createClass({

  displayName: 'Dropdown',

  mixins: [
    //require('react-onclickoutside'),
    //Mixins.toggleMenuMixin
  ],

  propTypes: {
    icon: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      content: React.PropTypes.string,               // Content to view as item
      name: React.PropTypes.string,                  // name for DropdownMenuItems kys
      handleItemClick: React.PropTypes.func          // function to call after DropdownMenuItem click
    })).isRequired,
    headerContent: React.PropTypes.shape({
      icon: React.PropTypes.string,
      userFullName: React.PropTypes.string,
      userEmail: React.PropTypes.string
    }),
    iconStyle: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      iconStyle: {
        width  : "18px",
        height : "18px",
        fill   : "#FFF",
      }
    };
  },

  getInitialState: function() {
    return {
      icon: this.props.icon || 'dots-vertical',
      isOpen: false,
    }
  },

  toggleOpenClose: function(e) {
    this.setState({isOpen: !this.state.isOpen});
  },

  close: function() {
    this.setState({'isOpen': false});
  },

  render: function() {

    var cssClasses = classNames({
      'dropdown-menu'         : true,
      'dropdown-menu-visible' : this.state.isOpen,
    });

    var headerContent;

    if (this.props.headerContent) {
      var headerIcon = <FontIcon
                         className = {this.props.headerContent.icon || "synicon-account-circle"}
                         style     = {{width: "60px", height: "60px", color: "#0091EA"}} />
      headerContent =
      <div className="account-group">
        <div className="account-image">{headerIcon}</div>
        <div className="account-text">
          <div className="account-name">{this.props.headerContent.userFullName}</div>
          <div className="account-email">{this.props.headerContent.userEmail}</div>
        </div>
      </div>
    }

    var items = this.props.items.map(function(item, i) {
      return <DropdownMenuItem key={item.name + i} action={item} handleItemClick={item.handleItemClick}/>
    }.bind(this));

    return (
      <OutsideClickHandler onOutsideClick={this.close} >
        <div className="dropdown">
          <div className="dropdown-button clickable" onClick={this.toggleOpenClose}>
            <FontIcon
              className = {"synicon-" + this.state.icon}
              style     = {this.props.iconStyle} />
          </div>
          <div className={cssClasses}>
            <div className="dropdown-menu-section">
              {headerContent}
              {items}
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    );
  }

});
