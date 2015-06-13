var React          = require('react'),
    Reflux         = require('reflux'),
    classNames     = require('classnames'),
    Router         = require('react-router'),
    Link           = Router.Link,

    mui            = require('material-ui'),
    Colors          = require('material-ui/lib/styles/colors'),
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
    HeaderStore    = require('./HeaderStore');


require('./Header.sass');


module.exports = React.createClass({

  displayName: 'Header',
  mixins: [
    Reflux.connect(HeaderStore),
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
      chevron = <MaterialIcon name="chevron_right" style={{marginLeft: 8}} />
    }

    breadcrumb.params = breadcrumb.params || {};
    breadcrumb.query  = breadcrumb.query  || {};

    return (
      <li key={'breadcrumb-' + index}>
        <Link
          to={breadcrumb.route}
          params={breadcrumb.params}
          query={breadcrumb.query}>
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
    tab.params   = tab.params || {};
    tab.query    = tab.query  || {};
    var selected = this.isActive(tab.route, tab.params, tab.query);

    var menuItemStyles = {
      color: Colors.indigo500,
      fontWeight: 400,
      fontSize: 17
    };

    return (
      <Tab
        key={'menuItem-' + tab.route + '-' + index}
        label={tab.label}
        route={tab.route}
        params={tab.params}
        selected={selected}
        style={menuItemStyles}
        onActive={this.handleTabActive} />
    )
  },

  getStyles: function() {
    return {
      topToolbar: {
        background: Colors.blue500,
        height: 68,
        padding: '0 32px'
      },
      logotypeContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
      },
      logotype: {
        color: '#fff',
        fontSize: 25
      },
      bottomToolbar: {
        display: 'flex',
        fontSize: 17,
        fontWeight: 500,
        height: 60,
        background: '#fff',
        padding: '0 32px'
      },
      bottomToolbarGroup: {
        display: 'flex',
        float: 'none',
        alignItems: 'center',
        justifyContent: 'center',
      },
      bottomToolbarGroupIcon: {
        padding: '0 4px'
      },
      instanceIcon: {
        color       : '#fff',
        display     : 'flex',
        fontSize    : 12,
        lineHeight  : 1
      },
      instanceIconBackground: {
        margin          : '0 16px 0 0',
        height          : 26,
        minWidth        : 26,
        width           : 26,
        display         : 'flex',
        justifyContent  : 'center',
        alignItems      : 'center'
      }
    }
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <div>
        <Toolbar style={styles.topToolbar}>
          <ToolbarGroup key={0} style={styles.logotypeContainer}>
            <div style={styles.logotype}>Syncano</div>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right" style={{height: '100%'}}>
            <ul className="toolbar-list">
              <li><a href="#">Docs</a></li>
              <li><a href="#">API Keys</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </ToolbarGroup>
        </Toolbar>
        <Paper>
          <Toolbar style={styles.bottomToolbar}>
            <ToolbarGroup key={0} style={styles.bottomToolbarGroup}>
              <RoundIcon background="green" style={styles.instanceIconBackground}>
                <FontIcon className={"synicon-folder"} style={styles.instanceIcon} />
              </RoundIcon>
              <div>Dreamer</div>
            </ToolbarGroup>
            <ToolbarGroup key={1} className="col-flex-1" style={styles.bottomToolbarGroup}>
              {this.renderMenu()}
            </ToolbarGroup>
            <ToolbarGroup key={2} style={styles.bottomToolbarGroup}>
              <MaterialIcon
                name="power"
                handleClick={this.handleLogout}
                style={styles.bottomToolbarGroupIcon}
                />
              <MaterialIcon name="more_vert" style={styles.bottomToolbarGroupIcon} />
              <MaterialIcon name="notifications_none" style={styles.bottomToolbarGroupIcon} />
              <MaterialIcon name="search" style={styles.bottomToolbarGroupIcon} />
            </ToolbarGroup>
          </Toolbar>
        </Paper>
      </div>
    )
  }

});