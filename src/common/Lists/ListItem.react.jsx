var React       = require('react'),
    Moment      = require('moment'),
    classNames  = require('classnames'),
    mui         = require('material-ui'),

    FontIcon    = mui.FontIcon,
    Dropdown    = require('../Dropdown/Dropdown.react');

require('./Card.css');


module.exports = React.createClass({

  displayName: 'ListItem',

  propTypes: {
    item: React.PropTypes.object.isRequired,
    handleItemMenuClick: React.PropTypes.func.isRequired, // Click on item's option from Dropdown
    style: React.PropTypes.oneOf(['stream', 'cards']),
    dropdownVisible: React.PropTypes.bool,
    avatarStyle: React.PropTypes.oneOf(['user', 'icon'])
  },

  getInitialState: function () {

    var color = '#e2e2e2';
    var icon = '';
    if (this.props.item.metadata) {
      color = this.props.item.metadata.color;
      icon = 'synicon-' + this.props.item.metadata.icon;
    }

    return {
      animateInk: false,
      dropdownViable: this.props.dropdownViable || false,
      color: color,
      icon: icon
    }
  },


  handleItemMenuClick: function (action) {
    // We need to add here information about *item*
    action['item'] = this.props.item;
    this.props.handleItemMenuClick(action);
  },

  render: function () {

    var item = this.props.item;

    var info = "Updated " + Moment(item.updated_at).fromNow();

    var inkStyle = {
      height: "200px",
      width: "200px",
      top: "0px",
      left: "0px"
    };

    var cssClasses = classNames('list-item', 'list-item-' + this.props.style, {
      'animate-ink': this.state.animateInk,
      'card': true,
      'card-view-cards': this.props.style === "cards",
      'list-item-card-view': this.props.style === "cards",
      'list-item-no-color': !this.props.color,
      'list-item-stream-view': this.props.style === "stream",
    });

    if (this.state.animateInk) {
      inkStyle['top'] = "50px";
      inkStyle['left'] = "50px";
    }

    var dropdownComponent = null;
    if (this.props.actions) {
      dropdownComponent = <Dropdown
        items           = {this.props.actions}
        visible         = {this.props.dropdownVisible}
        handleItemClick = {this.handleItemMenuClick}/>;
    }
    var style = null;
    if (this.props.style === "cards") {
      style = {
        backgroundColor: this.state.color
      };

      return (
        <div
          className = {cssClasses}
          style     = {style}
          onClick   = {this.handleCardClick}>
          <div className="list-item-header card-header">
            <div className="list-item-details card-details">
              <div className="list-item-icon card-icon">
                <FontIcon className={this.state.icon}/>
              </div>
              <div className="list-item-text card-text">
                <div className="list-item-title card-title"><span>{this.props.item.name}</span></div>
                <div className="list-item-description card-description">{this.props.item.description}</div>
              </div>
            </div>
            <div
              className = "ink"
              style     = {inkStyle}></div>
            <div className="list-item-extras card-extras">
              {dropdownComponent}
            </div>
          </div>
        </div>
      );
    } else if (this.props.style === "stream") {

      var iconStyle = {
        width: '45px',
        height: '45px',
        'border-radius': '50%',
        fill: '#fff',
        padding: '9px',
        backgroundColor: this.state.color
      };

      var avatar;
      console.log('avatarStyle', this.props.avatarStyle);
      if (this.props.avatarStyle === "user") {
        console.log('avatarStyle', this.props.avatarStyle);
        avatar = <AvatarInitials text={this.props.item.name}/>;
      } else {
        avatar = <FontIcon
                   className = {this.state.icon}
                   style     = {iconStyle}/>;
      }

      return (
        <div className={cssClasses}>
          <div
            className = "list-item-header card-header"
            onClick   = {this.props.handleItemHeaderClick}>
            <div className="list-item-details card-details-other">
              <div className="list-item-icon card-icon">
                {avatar}
              </div>
              <div className="list-item-text card-text-other">
                <div className="list-item-title card-title"><span>{this.props.item.name}</span></div>
                <div className="list-item-description card-description-other">{this.props.item.description}</div>
              </div>
            </div>
            <div className="list-item-highlight card-highlight"></div>
            <div className="list-item-extras card-other-extras">
              <div className="card-info">{info}</div>
              <div className="card-dropdown">{dropdownComponent}</div>
            </div>
          </div>
        </div>
      );
    }

  }
});