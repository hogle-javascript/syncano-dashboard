var React                       = require('react'),
    Reflux                      = require('reflux'),
    Radium                      = require('radium'),
    Router                      = require('react-router'),
    Link                        = Router.Link,
    mui                         = require('material-ui'),

    // Utils & Mixins
    StylePropable               = mui.Mixins.StylePropable,

    // Stores & Actions
    HeaderActions               = require('./HeaderActions'),
    HeaderStore                 = require('./HeaderStore'),
    SessionActions              = require('../Session/SessionActions'),
    SessionStore                = require('../Session/SessionStore'),
    InstancesActions            = require('../Instances/InstancesActions'),
    InstancesStore              = require('../Instances/InstancesStore'),
    ColorStore                  = require('../../common/Color/ColorStore'),

    // Components
    Colors                      = mui.Styles.Colors,
    Tabs                        = mui.Tabs,
    Tab                         = mui.Tab,
    Toolbar                     = mui.Toolbar,
    ToolbarGroup                = mui.ToolbarGroup,
    FontIcon                    = mui.FontIcon,
    Paper                       = mui.Paper,
    DropDownMenu                = mui.DropDownMenu,
    IconMenu                    = mui.IconMenu,
    MenuItem                    = mui.MenuItem,
    IconButton                  = mui.IconButton,
    MoreVertIcon                = mui.Icons.NavigationMenu,

    MaterialDropdown            = require('../../common/Dropdown/MaterialDropdown.react'),
    MaterialIcon                = require('../../common/Icon/MaterialIcon.react'),
    RoundIcon                   = require('../../common/Icon/RoundIcon.react'),
    HeaderMenu                  = require('./HeaderMenu.react'),
    HeaderInstancesDropdown     = require('./HeaderInstancesDropdown.react.jsx'),
    HeaderNotificationsDropdown = require('./HeaderNotificationsDropdown.react'),
    Logo                        = require('../../common/Logo/Logo.react'),
    Show                        = require('../../common/Show/Show.react');


require('./Header.sass');


module.exports = Radium(React.createClass({

  displayName: 'Header',

  mixins: [
    Reflux.connect(HeaderStore),
    Reflux.connect(InstancesStore),
    Router.Navigation,
    Router.State,
    StylePropable
  ],

  contextTypes: {
    router   : React.PropTypes.func.isRequired,
    muiTheme : React.PropTypes.object
  },

  componentWillMount: function () {
    SessionStore.getInstance();
  },

  handleTabActive: function (tab) {
    this.context.router.transitionTo(tab.props.route, tab.props.params);
  },

  getStyles: function() {
    return {
      topToolbar: {
        background : this.context.muiTheme.palette.primary1Color,
        height     : 64,
        padding    : '0 32px'
      },
      logotypeContainer: {
        height     : '100%',
        display    : 'flex',
        alignItems : 'center'
      },
      logo: {
        width: 120
      },
      toolbarList: {
        display: 'flex'
      },
      toolbarListItem: {
        display    : 'inline-flex',
        alignItems : 'center'
      },
      bottomToolbar : {
        display     : 'flex',
        fontSize    : 17,
        fontWeight  : 500,
        height      : 56,
        background  : this.context.muiTheme.palette.primary2Color,
        padding     : '0 32px'
      },
      bottomToolbarGroup: {
        display        : 'flex',
        float          : 'none',
        alignItems     : 'center',
        justifyContent : 'center'
      },
      bottomToolbarGroupIcon: {
        color          : '#fff'
      }
    }
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
      name: "billing",
      handleItemClick: this.handleBillingClick
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
      name: "logout",
      handleItemClick: this.handleLogout

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

  render: function () {
    var styles = this.getStyles();

    return (
      <div>
        <Toolbar style={styles.topToolbar}>
          <ToolbarGroup style={styles.logotypeContainer}>
            <Link to="app">
              <Logo
                style={styles.logo}
                className="logo-white"
              />
            </Link>
          </ToolbarGroup>
          <ToolbarGroup
            float = "right"
            style = {{height: '100%'}}>
            <ul
              className="toolbar-list"
              style={styles.toolbarList}>
              <li style={styles.toolbarListItem}>
                <a
                  href="http://docs.syncano.com/v4.0"
                  target="_blank">
                  Docs
                </a>
              </li>
              <li style={styles.toolbarListItem}>
                <a href="mailto:support@syncano.com">Support</a>
              </li>
              <li>
                <MaterialDropdown
                  items         = {this.getDropdownItems()}
                  headerContent = {this.getDropdownHeaderItems()}
                  iconStyle     = {styles.bottomToolbarGroupIcon}>
                  Account
                </MaterialDropdown>
              </li>
            </ul>
          </ToolbarGroup>
        </Toolbar>
        <Paper>
          <Toolbar style={styles.bottomToolbar}>
            <Show if={SessionStore.instance}>
            </Show>
            <HeaderInstancesDropdown />

            <ToolbarGroup
              className = "col-flex-1"
              style     = {styles.bottomToolbarGroup}>
              <HeaderMenu />
            </ToolbarGroup>
            <ToolbarGroup style={styles.bottomToolbarGroup}>
              <IconButton
                iconClassName = "synicon-magnify"
                iconStyle = {styles.bottomToolbarGroupIcon}
              />
              <HeaderNotificationsDropdown />
            </ToolbarGroup>
          </Toolbar>
        </Paper>
      </div>
    )
  }

}));
