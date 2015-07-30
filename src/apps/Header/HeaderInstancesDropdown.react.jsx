import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

import HeaderActions from './HeaderActions';
import HeaderStore from './HeaderStore';
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import InstancesActions from '../Instances/InstancesActions';
import InstancesStore from '../Instances/InstancesStore';

import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

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

  componentDidMount() {
    console.info('HeaderInstancesDropdown::componentDidMount');
    InstancesStore.fetch();
  },

  handleDropdownItemClick(event, selectedIndex, menuItem) {
    let instanceName = menuItem.text._store.props.children[1];

    // Redirect to main instance screen
    SessionActions.fetchInstance(instanceName).then(() => {
      this.transitionTo('instance', {instanceName: instanceName});
    });
  },

  handleInstanceActive() {
    if (InstancesStore.getAllInstances()) {
      let currentInstance     = SessionStore.instance,
          instancesList       = InstancesStore.getAllInstances(true),
          instanceActiveIndex = null;

      instancesList.some((event, index) => {
        if (event.name === currentInstance.name) {
          instanceActiveIndex = index;
          return true;
        }
      });

      return instanceActiveIndex;
    }
  },

  getStyles() {
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

  render() {
    let styles        = this.getStyles();
    let instance      = SessionStore.instance;
    let instancesList = InstancesStore.getAllInstances(true);

    if (!instance || !instancesList || !instancesList.length > 0) {
      return null;
    }

    let dropDownMenuItems = instancesList.map((item, index) => {
    let iconBackground    = {
          backgroundColor: Common.Color.getColorByName(item.metadata.color, 'dark') || Common.ColumnList.ColumnListConstans.DEFAULT_BACKGROUND
        },
        icon             = item.metadata.icon ? item.metadata.icon : Common.ColumnList.ColumnListConstans.DEFAULT_ICON,
        iconClassName    = 'synicon-' + icon,
        text             = <div style={styles.dropdownLabelContainer}>
                             <MUI.FontIcon
                               className = {iconClassName}
                               style     = {MUI.Mixins.StylePropable.mergeAndPrefix(styles.dropdownInstanceIcon, iconBackground)} />

                             {item.name}
                           </div>;

      return {
        payload: index + '',
        text: text
      }
    });

    return (
      <MUI.ToolbarGroup
        key   = {0}
        style = {styles.instanceToolbarGroup}>
        <MUI.DropDownMenu
          className      = "instances-dropdown"
          labelStyle     = {styles.dropdownLabel}
          underlineStyle = {styles.dropdownLabelUnderline}
          menuItemStyle  = {styles.dropdownMenuItem}
          menuItems      = {dropDownMenuItems}
          onChange       = {this.handleDropdownItemClick}
          selectedIndex  = {this.handleInstanceActive()} />
      </MUI.ToolbarGroup>
    )
  }
});
