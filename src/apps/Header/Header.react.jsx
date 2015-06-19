var React            = require('react'),
    Reflux           = require('reflux'),
    Radium           = require('radium'),
    classNames       = require('classnames'),
    Router           = require('react-router'),
    Link             = Router.Link,
    mui              = require('material-ui'),

    // Utils & Mixins
    StylePropable    = mui.Mixins.StylePropable,

    // Stores & Actions
    HeaderActions    = require('./HeaderActions'),
    HeaderStore      = require('./HeaderStore'),
    SessionActions   = require('../Session/SessionActions'),
    SessionStore     = require('../Session/SessionStore'),
    InstancesActions = require('../Instances/InstancesActions'),
    InstancesStore   = require('../Instances/InstancesStore'),
    ColorStore       = require('../../common/Color/ColorStore'),

    // Components
    Colors           = mui.Styles.Colors,
    Tabs             = mui.Tabs,
    Tab              = mui.Tab,
    Toolbar          = mui.Toolbar,
    ToolbarGroup     = mui.ToolbarGroup,
    FontIcon         = mui.FontIcon,
    Paper            = mui.Paper,
    DropDownMenu     = mui.DropDownMenu,

    MaterialDropdown = require('../../common/Dropdown/MaterialDropdown.react'),
    MaterialIcon     = require('../../common/Icon/MaterialIcon.react'),
    RoundIcon        = require('../../common/Icon/RoundIcon.react'),
    HeaderMenu       = require('./HeaderMenu.react');


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

  getStyles: function() {
    return {
      topToolbar: {
        background : this.context.muiTheme.palette.primary1Color,
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
        height      : 60,
        background  : this.context.muiTheme.palette.primary2Color,
        padding     : '0 32px'
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
        maxWidth       : 320,
        width          : '100%',
        marginLeft     : '-32px'
      },
      bottomToolbarGroupIcon: {
        padding        : '0 4px'
      },
      dropdownLabelContainer: {
        display        : '-webkit-box; display: flex',
        alignItems     : 'center'
      },
      dropdownLabel: {
        WebkitBoxFlex  : '1',
        flex           : '1',
        whiteSpace     : 'nowrap',
        textOverflow   : 'ellipsis',
        overflow       : 'hidden',
        paddingRight   : 40
      },
      dropdownInstanceIcon: {
        width          : 24,
        height         : 24,
        fontSize       : 12,
        lineHeight     : '20px',
        display        : '-webkit-inline-flex; display: inline-flex',
        alignItems     : 'center',
        justifyContent : 'center',
        borderRadius   : '50%',
        color          : '#fff',
        backgroundColor: 'green',
        margin         : '8px 16px 8px 0'
      },
      dropdownMenuItem: {
        height      : 40,
        lineHeight  : '40px',
        paddingLeft : 32
      }
    }
  },

  handleAccountClick: function(e) {
    this.transitionTo("profile-settings");
    e.stopPropagation();
  },

  handleDropdownItemClick: function(e, selectedIndex, menuItem) {
    var instanceName = menuItem.text._store.props.children[1]._store.props.children;

    // Redirect to main instance screen
    SessionActions.setInstance(instanceName);
    this.transitionTo('instance', {instanceName: instanceName});
  },

  handleInstanceActive: function() {
    var currentInstance     = SessionStore.instance,
        instancesList       = InstancesStore.data.instances,
        instanceActiveIndex = null;

    instancesList.some(function(e, index){
       if(e.name === currentInstance.name) {
         instanceActiveIndex = index;
         return true;
       }
    });

    return instanceActiveIndex;
  },

  renderInstance: function() {
    var styles        = this.getStyles(),
        instance      = SessionStore.instance,
        instancesList = InstancesStore.data.instances;

    if (!instance || !instancesList.length > 0) {
      return;
    } else if (instancesList.length > 0) {
      instancesList = instancesList.reverse();
    }

    var dropDownMenuItems = InstancesStore.data.instances.map(function(item, index) {
      var iconBackground = {
            backgroundColor: ColorStore.getColorByName(item.metadata.color, 'dark')
          },
          iconClassName  = item.metadata.icon ? 'synicon-' + item.metadata.icon : 'synicon-folder',
          text           = <div style={styles.dropdownLabelContainer}>
                             <FontIcon
                               className = {iconClassName}
                               style     = {StylePropable.mergeAndPrefix(styles.dropdownInstanceIcon, iconBackground)} />

                             <div style={styles.dropdownLabel}>{item.name}</div>
                           </div>;

      return {
        payload: index + '',
        text: text
      }
    });

    return (
      <ToolbarGroup
        key={0}
        style={styles.instanceToolbarGroup}>
        <DropDownMenu
          className     = "instances-dropdown"
          menuItemStyle = {styles.dropdownMenuItem}
          menuItems     = {dropDownMenuItems}
          onChange      = {this.handleDropdownItemClick}
          selectedIndex = {this.handleInstanceActive()} />
      </ToolbarGroup>)
  },

  handleLogoClick: function (){
    this.transitionTo('app');
  },

  render: function () {
    var styles = this.getStyles();

    var dropdownItems = [{
      content         : "Logout",
      name            : "logout",
      handleItemClick : this.handleLogout
    }];

    var dropdownHeader = {
      userFullName    : this.state.user.first_name + ' ' + this.state.user.last_name,
      userEmail       : this.state.user.email,
      clickable       : true,
      handleItemClick : this.handleAccountClick
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
            </ul>
          </ToolbarGroup>
        </Toolbar>
        <Paper>
          <Toolbar style={styles.bottomToolbar}>

            {this.renderInstance()}

            <ToolbarGroup
              className = "col-flex-1"
              style     = {styles.bottomToolbarGroup}>
              <HeaderMenu />
            </ToolbarGroup>
            <ToolbarGroup style={styles.bottomToolbarGroup}>
              <FontIcon 
                className = "synicon-magnify"
                style     = {styles.bottomToolbarGroupIcon} />
              <FontIcon
                className = "synicon-bell-outline"
                style     = {styles.bottomToolbarGroupIcon} />
              <MaterialDropdown
                  items         = {dropdownItems}
                  headerContent = {dropdownHeader}
                  style         = {styles.bottomToolbarGroupIcon} />
            </ToolbarGroup>
          </Toolbar>
        </Paper>
      </div>
    )
  }

}));
