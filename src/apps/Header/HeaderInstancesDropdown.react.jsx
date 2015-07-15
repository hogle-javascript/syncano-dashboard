var React              = require('react'),
    Reflux             = require('reflux'),
    Router             = require('react-router'),
    Radium             = require('radium'),
    mui                = require('material-ui'),
    ColumnListConstans = require('../../common/ColumnList/ColumnListConstans'),

    StylePropable      = mui.Mixins.StylePropable,

    HeaderActions      = require('./HeaderActions'),
    HeaderStore        = require('./HeaderStore'),
    SessionActions     = require('../Session/SessionActions'),
    SessionStore       = require('../Session/SessionStore'),
    InstancesActions   = require('../Instances/InstancesActions'),
    InstancesStore     = require('../Instances/InstancesStore'),
    ColorStore         = require('../../common/Color/ColorStore'),

    FontIcon           = mui.FontIcon,
    DropDownMenu       = mui.DropDownMenu,
    ToolbarGroup       = mui.ToolbarGroup;

module.exports = React.createClass({

  displayName: 'HeaderInstancesDropdown',

  mixins: [
    Reflux.connect(HeaderStore),
    Reflux.connect(InstancesStore),
    Router.Navigation,
    Router.State
  ],

  contextTypes: {
    router   : React.PropTypes.func.isRequired,
    muiTheme : React.PropTypes.object
  },

  componentWillMount: function() {
    console.info('HeaderInstancesDropdown::componentWillMount');
    InstancesStore.fetch();
  },

  handleDropdownItemClick: function(e, selectedIndex, menuItem) {
    var instanceName = menuItem.text._store.props.children[1];

    // Redirect to main instance screen
    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName: instanceName});
  },

  handleInstanceActive: function() {
    var currentInstance     = SessionStore.instance,
        instancesList       = InstancesStore.getMyInstances().reverse(),
        instanceActiveIndex = null;

    instancesList.some(function(e, index) {
      if (e.name === currentInstance.name) {
        instanceActiveIndex = index;
        return true;
      }
    });

    return instanceActiveIndex;
  },

  getStyles: function() {
    return {
      instanceToolbarGroup: {
        display        : '-webkit-box; display: flex',
        float          : 'none',
        alignItems     : 'center',
        justifyContent : 'center',
        maxWidth       : 320,
        width          : '100%',
        marginLeft     : '-32px'
      },
      dropdownLabelUnderline: {
        display        : 'none'
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
        paddingRight   : 40,
        color          : '#fff',
        fontWeight     : 400
      },
      dropdownInstanceIcon: {
        minWidth       : 32,
        height         : 32,
        fontSize       : 18,
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
        height      : 'auto',
        lineHeight  : '40px',
        paddingLeft : 32,
        color: '#000'
      }
    }
  },

  render: function() {
    var styles        = this.getStyles(),
        instance      = SessionStore.instance,
        instancesList = InstancesStore.getMyInstances().reverse();

    if (!instance || !instancesList.length > 0) {
      return null;
    }

    var dropDownMenuItems = instancesList.map(function(item, index) {
      var iconBackground = {
          backgroundColor: ColorStore.getColorByName(item.metadata.color, 'dark') || ColumnListConstans.DEFAULT_BACKGROUND
        },
        icon             = item.metadata.icon ? item.metadata.icon : ColumnListConstans.DEFAULT_ICON,
        iconClassName    = 'synicon-' + icon,
        text             = <div style={styles.dropdownLabelContainer}>
                             <FontIcon
                               className = {iconClassName}
                               style     = {StylePropable.mergeAndPrefix(styles.dropdownInstanceIcon, iconBackground)} />

                             {item.name}
                           </div>;

      return {
        payload: index + '',
        text: text
      }
    });

    return (
      <ToolbarGroup
        key   = {0}
        style = {styles.instanceToolbarGroup}>
        <DropDownMenu
          className      = "instances-dropdown"
          labelStyle     = {styles.dropdownLabel}
          underlineStyle = {styles.dropdownLabelUnderline}
          menuItemStyle  = {styles.dropdownMenuItem}
          menuItems      = {dropDownMenuItems}
          onChange       = {this.handleDropdownItemClick}
          selectedIndex  = {this.handleInstanceActive()} />
      </ToolbarGroup>
    )
  }
});
