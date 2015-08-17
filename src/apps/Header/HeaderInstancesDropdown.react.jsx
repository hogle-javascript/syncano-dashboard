import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';
import OutsideClickHandler from 'react-outsideclickhandler';

import HeaderActions from './HeaderActions';
import HeaderStore from './HeaderStore';
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import InstancesActions from '../Instances/InstancesActions';
import InstancesStore from '../Instances/InstancesStore';

import MUI from 'material-ui';
import Common from '../../common';

export default Radium(React.createClass({

  displayName: 'HeaderInstancesDropdown',

  mixins: [
    Reflux.connect(HeaderStore),
    Reflux.connect(InstancesStore),
    Router.Navigation,
    Router.State
  ],

  contextTypes: {
    router: React.PropTypes.func.isRequired,
    muiTheme: React.PropTypes.object
  },

  componentDidMount() {
    console.info('HeaderInstancesDropdown::componentDidMount');
    InstancesStore.fetch();
  },

  handleOutsideClick() {
    this.refs.HeaderInstancesDropdown._handleOverlayTouchTap();
  },

  handleDropdownItemClick(event, selectedIndex, menuItem) {
    // Redirect to main instance screen
    SessionActions.fetchInstance(menuItem.payload).then(() => {
      this.transitionTo('instance', {instanceName: menuItem.payload});
    });
  },

  handleInstanceActive() {
    if (InstancesStore.getAllInstances()) {
      let currentInstance = SessionStore.instance;
      let instancesList = InstancesStore.getAllInstances(true);
      let instanceActiveIndex = null;

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
        display: '-webkit-box; display: flex',
        float: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 320,
        width: '100%',
        marginLeft: '-32px'
      },
      dropdownLabelUnderline: {
        display: 'none'
      },
      dropdownLabelContainer: {
        display: '-webkit-box; display: flex',
        alignItems: 'center',
        overflow: 'hidden'
      },
      dropdownLabel: {
        WebkitBoxFlex: '1',
        flex: '1',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        paddingRight: 40,
        paddingLeft: 0,
        color: 'black',
        fontWeight: 400
      },
      dropdownInstanceIcon: {
        minWidth: 32,
        height: 32,
        fontSize: 18,
        lineHeight: '20px',
        display: '-webkit-inline-flex; display: inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        color: '#fff',
        backgroundColor: 'green',
        margin: '8px 16px 8px 0'
      },
      dropdownMenu: {
        maxHeight: 'calc(100vh - 80px)'
      },
      dropdownMenuItem: {
        height      : 'auto',
        paddingLeft : 16
      }
    }
  },

  render() {
    let styles = this.getStyles();
    let instance = SessionStore.instance;
    let instancesList = InstancesStore.getAllInstances(true);
    let defaultIconBackground = Common.ColumnList.ColumnListConstans.DEFAULT_BACKGROUND;
    let defaultIcon = Common.ColumnList.ColumnListConstans.DEFAULT_ICON;

    if (!instance || !instancesList || !instancesList.length > 0) {
      return null;
    }

    let dropDownMenuItems = instancesList.map(item => {
      item.metadata       = item.metadata       || {};
      item.metadata.icon  = item.metadata.icon  || null;
      item.metadata.color = item.metadata.color || null;

      let iconBackground = {
        backgroundColor: Common.Color.getColorByName(item.metadata.color, 'dark') || defaultIconBackground
      };
      let icon = item.metadata.icon ? item.metadata.icon : defaultIcon;
      let iconClassName = 'synicon-' + icon;
      let text = (
        <div style={styles.dropdownLabelContainer}>
          <MUI.FontIcon
            className={iconClassName}
            style={MUI.Mixins.StylePropable.mergeAndPrefix(styles.dropdownInstanceIcon, iconBackground)}/>
          {item.name}
        </div>
      );

      return {
        payload: item.name,
        text: text
      }
    });

    return (
      <OutsideClickHandler onOutsideClick={this.handleOutsideClick}>
        <MUI.DropDownMenu
          ref="HeaderInstancesDropdown"
          className="instances-dropdown"
          style={{width: '100%'}}
          menuStyle={styles.dropdownMenu}
          labelStyle={styles.dropdownLabel}
          underlineStyle={styles.dropdownLabelUnderline}
          menuItemStyle={styles.dropdownMenuItem}
          menuItems={dropDownMenuItems}
          onChange={this.handleDropdownItemClick}
          selectedIndex={this.handleInstanceActive()} />
      </OutsideClickHandler>
    )
  }
}));
