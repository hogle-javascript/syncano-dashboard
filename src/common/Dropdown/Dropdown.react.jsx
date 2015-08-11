let React = require('react');
let classNames = require('classnames');
let OutsideClickHandler = require('react-outsideclickhandler');

let Constants = require('../../constants/Constants');

let mui = require('material-ui');
let FontIcon = mui.FontIcon;
let Mixins = require('../../mixins/mixins');

let DropdownMenuItem = require('./DropdownMenuItem.react');


export default React.createClass({

  displayName: 'Dropdown',

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

  getDefaultProps() {
    return {
      iconStyle: {
        width: "18px",
        height: "18px",
        fill: "#FFF"
      }
    };
  },

  getInitialState() {
    return {
      icon: this.props.icon || 'dots-vertical',
      isOpen: false
    }
  },

  toggleOpenClose(e) {
    this.setState({isOpen: !this.state.isOpen});
  },

  close() {
    this.setState({'isOpen': false});
  },

  render() {

    let cssClasses = classNames({
      'dropdown-menu': true,
      'dropdown-menu-visible': this.state.isOpen,
    });

    let headerContent;

    if (this.props.headerContent) {
      let headerIcon = <FontIcon
        className={this.props.headerContent.icon || "synicon-account-circle"}
        style={{width: "60px", height: "60px", color: "#0091EA"}}/>
      headerContent =
        <div className="account-group">
          <div className="account-image">{headerIcon}</div>
          <div className="account-text">
            <div className="account-name">{this.props.headerContent.userFullName}</div>
            <div className="account-email">{this.props.headerContent.userEmail}</div>
          </div>
        </div>
    }

    let items = this.props.items.map(function(item, i) {
      return <DropdownMenuItem key={item.name + i} action={item} handleItemClick={item.handleItemClick}/>
    });

    return (
      <OutsideClickHandler onOutsideClick={this.close}>
        <div className="dropdown">
          <div className="dropdown-button clickable" onClick={this.toggleOpenClose}>
            <FontIcon
              className={"synicon-" + this.state.icon}
              style={this.props.iconStyle}/>
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
