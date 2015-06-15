var React          = require('react'),
    Reflux         = require('reflux'),
    classNames     = require('classnames'),
    Router         = require('react-router'),
    Link           = Router.Link,

    // Stores and Actions
    SessionStore   = require('../Session/SessionStore'),

    mui            = require('material-ui'),
    Colors         = require('material-ui/lib/styles/colors'),
    Tabs           = mui.Tabs,
    Tab            = mui.Tab,
    Toolbar        = mui.Toolbar,
    ToolbarGroup   = mui.ToolbarGroup,
    FontIcon       = mui.FontIcon,
    Paper          = mui.Paper,

    MaterialIcon   = require('../../common/Icon/MaterialIcon.react'),
    RoundIcon      = require('../../common/Icon/RoundIcon.react'),
    HeaderActions  = require('./HeaderActions'),
    SessionActions = require('../Session/SessionActions'),
    SessionStore   = require('../Session/SessionStore'),
    HeaderStore    = require('./HeaderStore'),
    Dropdown       = require('../../common/Dropdown/Dropdown.react'),
    Icon           = require('../../common/Icon/Icon.react');


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

  handleLogout: function() {
    SessionActions.logout();
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
      chevron = <MaterialIcon
                  name  = "chevron_right"
                  style = {{marginLeft: 8}} />
    }

    breadcrumb.params = breadcrumb.params || {};
    breadcrumb.query  = breadcrumb.query  || {};

    return (
      <li key={'breadcrumb-' + index}>
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
        <Tabs tabItemContainerStyle={menuStyles.menu}>
          {this.state.menuItems.map(this.renderMenuItem)}
        </Tabs>
      </div>
    );
  },

  renderMenuItem: function(tab, index) {
    tab.params         = tab.params || {};
    tab.query          = tab.query  || {};
    var selected       = this.isActive(tab.route, tab.params, tab.query),
        menuItemStyles = {
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
        selected = {selected}
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
      instanceIcon: {
        color: '#fff',
        display: 'flex',
        fontSize: 12,
        lineHeight: 1
      },
      instanceIconBackground: {
        margin: '0 16px 0 0',
        height: 26,
        minWidth: 26,
        width: 26,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
  },

  handleAccountClick: function(route) {
    console.log(route);
    this.context.router.transitionTo(route);
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

  render: function () {
    var styles = this.getStyles();

    var dropdownItems = [{
      content: "Account",
      name: "account",
      handleItemClick: this.handleAccountClick.bind(this, "profile-settings"),
    }, {
      content: "Logout",
      name: "logout",
      handleItemClick: this.handleLogout,
    }];

    var dropdownHeader = {
      icon: <Icon 
              icon="account-circle" 
              style={{width: "60px", height: "60px", fill: "#0091EA"}} />,
      userFullName: this.state.user.first_name + ' ' + this.state.user.last_name,
      userEmail: this.state.user.email
    };

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
              <MaterialIcon
                name  = "search"
                style = {styles.bottomToolbarGroupIcon} />
              <MaterialIcon
                name  = "notifications_none"
                style = {styles.bottomToolbarGroupIcon} />
              <Dropdown
                  items={dropdownItems}
                  headerContent={dropdownHeader}
                  style={styles.bottomToolbarGroupIcon} />
            </ToolbarGroup>
          </Toolbar>
        </Paper>
      </div>
    )
  }

});