var React                  = require('react'),
    Reflux                 = require('reflux'),
    classNames             = require('classnames'),
    Router                 = require('react-router'),
    Link                   = Router.Link,

    // Stores and Actions
    SessionStore           = require('../Session/SessionStore'),
    HeaderActions          = require('./HeaderActions'),
    SessionActions         = require('../Session/SessionActions'),
    HeaderStore            = require('./HeaderStore'),
    AdminsInvitationsStore = require('../Admins/AdminsInvitationsStore'),

    mui                    = require('material-ui'),
    Colors                 = require('material-ui/lib/styles/colors'),
    Tabs                   = mui.Tabs,
    Tab                    = mui.Tab,
    Toolbar                = mui.Toolbar,
    ToolbarGroup           = mui.ToolbarGroup,
    FontIcon               = mui.FontIcon,
    Paper                  = mui.Paper,

    MaterialDropdown       = require('../../common/Dropdown/MaterialDropdown.react');


require('./Header.sass');


module.exports = React.createClass({

  displayName: 'Header',
  mixins: [
    Reflux.connect(HeaderStore),
    Router.Navigation,
    Router.State
  ],

  contextTypes: {
      router: React.PropTypes.func.isRequired
  },

  handleTabActive: function (tab) {
    this.context.router.transitionTo(tab.props.route, tab.props.params);
  },

  renderBreadcrumbs: function () {
    if (this.state.breadcrumbs.length === 0) {
      return;
    }

    return (
      <ul className="toolbar-list">
        {this.state.breadcrumbs.map(this.renderBreadcrumbItem)}
      </ul>
    );
  },

  renderBreadcrumbItem: function (breadcrumb, index, breadcrumbs) {
    var chevron = null;

    if (breadcrumbs.length > 1 && breadcrumbs.length !== (index + 1)) {
      chevron = <FontIcon
                  className = "synicon-chevron-right"
                  style     = {{marginLeft: 8}} />
    }

    breadcrumb.params = breadcrumb.params || {};
    breadcrumb.query  = breadcrumb.query  || {};

    return (
      <li key={'breadcrumb-' + breadcrumb.route +  '-' + index}>
        <Link
          to     = {breadcrumb.route}
          params = {breadcrumb.params}
          query  = {breadcrumb.query}>
          {breadcrumb.label}
        </Link>
        {chevron}
      </li>
    )
  },

  getActiveMenuItemIndex: function () {
    var index = 0;
    this.state.menuItems.some(function (item, i) {
      if (this.isActive(item.route, item.params, item.query)) {
        index = i;
        return true;
      }
    }.bind(this));

    return index;
  },

  renderMenu: function () {
    if (this.state.menuItems.length === 0) {
      return
    }

    var menuStyles = {
      menuContainer: {
        display: 'inline-flex',
        alignSelf: 'flex-end'
      },
      menu: {
        backgroundColor: 'transparent',
        height: 60
      }
    };

    return (
      <div style={menuStyles.menuContainer}>
        <Tabs
          tabItemContainerStyle = {menuStyles.menu}
          initialSelectedIndex  = {this.getActiveMenuItemIndex()}>
          {this.state.menuItems.map(this.renderMenuItem)}
        </Tabs>
      </div>
    );
  },

  renderMenuItem: function(tab, index) {
    var menuItemStyles = {
          color: Colors.indigo500,
          fontWeight: 400,
          fontSize: 17,
          paddingLeft: 10,
          paddingRight: 10
        };

    return (
      <Tab
        key      = {'menuItem-' + tab.route + '-' + index}
        label    = {tab.label}
        route    = {tab.route}
        params   = {tab.params}
        style    = {menuItemStyles}
        onActive = {this.handleTabActive} />
    )
  },

  getStyles: function() {
    return {
      topToolbar: {
        background : Colors.blue500,
        height     : 68,
        padding    : '0 32px'
      },
      logotypeContainer: {
        height     : '100%',
        display    : 'flex',
        alignItems : 'center'
      },
      logotype: {
        color      : '#fff',
        fontSize   : 25,
        cursor     : 'pointer'
      },
      bottomToolbar: {
        display    : 'flex',
        fontSize   : 17,
        fontWeight : 500,
        height     : 60,
        background : '#fff',
        padding    : '0 32px'
      },
      bottomToolbarGroup: {
        display        : 'flex',
        float          : 'none',
        alignItems     : 'center',
        justifyContent : 'center'
      },
      instanceToolbarGroup: {
        display        : 'flex',
        float          : 'none',
        alignItems     : 'center',
        justifyContent : 'center',
        maxWidth       : 320
      },
      bottomToolbarGroupIcon: {
        padding        : '0 4px'
      },
      instanceIcon : {
        color      : '#fff',
        display    : 'flex',
        fontSize   : 12,
        lineHeight : 1
      },
      instanceIconBackground: {
        margin         : '0 16px 0 0',
        height         : 26,
        minWidth       : 26,
        width          : 26,
        display        : 'flex',
        justifyContent : 'center',
        alignItems     : 'center'
      }
    }
  },

  renderInstance: function() {
    var styles = this.getStyles(),
        instance = SessionStore.instance;

    if (!instance) {
      return;
    }

    // Setting background instance icon background
    styles.instanceIconBackground.background = instance.metadata.color;
    return (
      <ToolbarGroup key={0} style={styles.instanceToolbarGroup}>
        <Paper
          circle     = {true}
          background = {instance.metadata.color}
          style      = {styles.instanceIconBackground}>
          <FontIcon
            className = {"synicon-" + instance.metadata.icon}
            style     = {styles.instanceIcon}/>
        </Paper>
        <div>{SessionStore.instance.name}</div>
      </ToolbarGroup>)
  },

  handleLogoClick: function (){
    this.transitionTo('app');
  },

  handleAccountClick: function (e) {
    this.transitionTo("profile-settings");
    e.stopPropagation();
  },

  handleLogout: function () {
    SessionActions.logout();
  },

  handleBillingClick: function (e) {
    this.transitionTo("profile-billing");
    e.stopPropagation();
  },

  handleAcceptInvitation: function (e) {
    console.log("Invitation ACCEPTED");
    e.stopPropagation();
  },

  handleDeclineInvitation: function (e) {
    console.log("Invitation DECLINED");
    console.error("INVITATIONS!!!", this.state.invitations.items);
    e.stopPropagation();
  },

  handleResendEmail: function (e) {
    console.log("EMAIL SENT");
    e.stopPropagation();
  },

  getDropdownItems: function () {
    return [{
      leftIcon: {
        name  : "synicon-credit-card",
        style : {}
      }, 
      content: {
        text  : "Billing",
        style : {}
      },
      name            : "billing",
      handleItemClick : this.handleBillingClick
    }, {
      leftIcon: {
        name  : "synicon-power",
        style : {
          color: "#f50057"
        }
      }, 
      content: {
        text  : "Logout",
        style : {
          color: "#f50057"
        }
      },
      name            : "logout",
      handleItemClick : this.handleLogout
    }]
  },

  getDropdownHeaderItems: function () {
    return {
      userFullName    : this.state.user.first_name + ' ' + this.state.user.last_name,
      userEmail       : this.state.user.email,
      clickable       : true,
      handleItemClick : this.handleAccountClick
    }
  },

  getNotificationItems: function () {
    var invitations = this.state.invitations.items.filter(function (invitation) {
      return invitation.state === "new"
    };
    var notifications = [];

    return [{
      subheader      : "Notifications",
      subheaderStyle : {
        borderBottom: "1px solid #EAEAEA"
      },
      type     : "invitation",
      leftIcon : {
        name  : "synicon-share-variant",
        style : {
          color: "#8bc34a"
        }
      }, 
      content: {
        text  : "Wojtek Kosciesza invited you to his instance 'Instance Name'",
        style : {}
      },
      buttonsText   : ["Accept", "Decline"],
      name          : "billing",
      handleAccept  : this.handleAcceptInvitation,
      handleDecline : this.handleDeclineInvitation
    }, {
      type     : "normal-link",
      leftIcon : {
        name  : "synicon-alert",
        style : {
          color: "#ff9800"
        }
      }, 
      content: {
        text          : "You email address is not yet verified.",
        secondaryText : "Resend activation email",
        style         : {}
      },
      name            : "activation",
      handleLinkClick : this.handleResendEmail
    }, {
      type     : "normal-link",
      leftIcon : {
        name  : "synicon-credit-card",
        style : {}
      }, 
      content: {
        text          : "Payment failed",
        secondaryText : "Update payment method",
        style         : {}
      },
      name            : "payment",
      handleLinkClick : this.handleBillingClick
    }]
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <div>
        <Toolbar style={styles.topToolbar}>
          <ToolbarGroup style = {styles.logotypeContainer}>
            <div
              style   = {styles.logotype}
              onClick = {this.handleLogoClick}>Syncano</div>
          </ToolbarGroup>
          <ToolbarGroup
            float = "right"
            style = {{height: '100%'}}>
            <ul className="toolbar-list">
              <li>
                <a href="http://docs.syncano.com/v4.0" target="_blank">Docs</a>
              </li>
              <li>
                <a href="mailto:support@syncano.com">Support</a>
              </li>
            </ul>
          </ToolbarGroup>
        </Toolbar>
        <Paper>
          <Toolbar style={styles.bottomToolbar}>

            {this.renderInstance()}

            <ToolbarGroup
              className = "col-flex-1"
              style     = {styles.bottomToolbarGroup}>
              {this.renderMenu()}
            </ToolbarGroup>
            <ToolbarGroup style={styles.bottomToolbarGroup}>
              <FontIcon 
                className = "synicon-magnify"
                style     = {styles.bottomToolbarGroupIcon} />
              <MaterialDropdown
                type          = "notification"
                icon          = "bell-outline"
                items         = {this.getNotificationItems()}
                iconStyle     = {styles.bottomToolbarGroupIcon} />
              <MaterialDropdown
                items         = {this.getDropdownItems()}
                headerContent = {this.getDropdownHeaderItems()}
                iconStyle     = {styles.bottomToolbarGroupIcon} />
            </ToolbarGroup>
          </Toolbar>
        </Paper>
      </div>
    )
  }

});