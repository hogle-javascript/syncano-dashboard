var React               = require('react/addons'),
    classNames          = require('classnames'),
    Gravatar            = require('gravatar'),
    mui                 = require('material-ui'),

    AuthAppStore        = require('../Auth/store'),
    AuthAppActions      = require('../Auth/actions'),

    FontIcon            = mui.FontIcon,
    DropdownMenuItem    = require('../../common/Dropdown/DropdownMenuItem.react'),


//var ViewActions = require('../actions/ViewActions');
    InvitationsMenuItem = require('./InvitationsMenuItem.react'),

    Mixins = require('../../mixins/mixins');


module.exports = React.createClass({

  displayName: 'HeaderOptions',

  mixins: [
    require('react-onclickoutside'),
    Mixins.toggleMenuMixin
  ],

  propTypes: {
    menu: React.PropTypes.array.isRequired,
  },

  getInitialState: function () {
    return {
      accountMenu: false,
      notificationMenu: false,
      toggleArgs: ['accountMenu', 'notificationMenu']
    }
  },

  handleAccountMenuItemClick: function (action) {
    //debugger;
    console.log('handleAccountMenuItemClick', action);
    if (action === "logout") {
      AuthAppActions.logOut();
    } else if (action === "account") {
      window.location.href = '#account';
    }
  },

  onOptionsClick: function (click) {
    console.log(click);
  },

  render: function () {

    var cssClasses = classNames({
      'header-options': true,
      'account-menu-visible': this.state.accountMenu,
      'notifications-menu-visible': this.state.notificationMenu,
    });

    var items = this.props.actions.map(function (action, i) {
      return <DropdownMenuItem
               key={i}
               action={action}
               handleClick={this.handleAccountMenuItemClick}/>
    }.bind(this));

    //var notificationItems = this.props.invitations.filter(function (invitation) {
    //  return invitation.state === "new";
    //}).map(function (invitation, i) {
    //  return <InvitationsMenuItem key={i} invitation={invitation} />
    //});

    var notificationItems = [];

    var gravatarUrl = Gravatar.url(AuthAppStore.getAccountInfo('email'), {s: '50'}, true);
    var fullname = AuthAppStore.getAccountInfo('first_name') + ' ' + AuthAppStore.getAccountInfo('last_name');

    var notificationIcon = notificationItems.length > 0 ? 'synicon-bell' : 'synicon-bell-outline';

    // Search
    //
    //<div className="header-option-button">
    //  <Icon type="search" />
    //</div>

    return (
      <div className={cssClasses}>
        <div className="header-option">
        </div>
        <div
          className = "header-option"
          onClick   = {this.toggleMenu.bind(this, 'notificationMenu')}>
          <div className="header-option-button">
            <FontIcon
              icon    = {notificationIcon}
              glowing = {notificationItems.length > 0}/>
          </div>
          <div className="dropdown-menu notifications-menu">
            <div className="dropdown-menu-section">
              {notificationItems}
            </div>
          </div>
        </div>
        <div
          className="header-option"
          onClick={this.onOptionsClick}>
          <div
            className = "header-option-button"
            onClick   = {this.toggleMenu.bind(this, 'accountMenu')}>
            <FontIcon className="synicon-dots-vertical"/>
          </div>
          <div className="dropdown-menu account-menu">
            <div className="dropdown-menu-section">
              <div className="account-group">
                <div className="account-image">
                  <img src={gravatarUrl}/>
                </div>
                <div className="account-text">
                  <div className="account-name">{fullname}</div>
                  <div className="account-email">{AuthAppStore.getAccountInfo('email')}</div>
                </div>
              </div>
            </div>
            <div className="dropdown-menu-section">
              {items}
            </div>
          </div>
        </div>
      </div>
    );
  }

});

