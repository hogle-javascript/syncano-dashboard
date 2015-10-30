import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router-old';
import Radium from 'radium';

import HeaderStore from './HeaderStore';
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import InstancesStore from '../Instances/InstancesStore';
import InstanceDialogActions from '../Instances/InstanceDialogActions';

import MUI from 'syncano-material-ui';
import Common from '../../common';

export default Radium(React.createClass({

  displayName: 'HeaderInstancesDropdown',

  contextTypes: {
    router: React.PropTypes.func.isRequired,
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(HeaderStore),
    Reflux.connect(InstancesStore),
    Router.Navigation,
    Router.State,
    MUI.Utils.Styles
  ],

  componentDidMount() {
    console.info('HeaderInstancesDropdown::componentDidMount');
    InstancesStore.fetch();
  },

  getStyles() {
    return {
      dropdownInstanceIcon: {
        left: 20,
        minWidth: 32,
        height: 32,
        fontSize: 18,
        lineHeight: '18px',
        display: '-webkit-inline-flex; display: inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        color: '#fff',
        backgroundColor: 'green',
        margin: '8px 16px 8px 0'
      },
      addInstanceList: {
        minWidth: 320,
        paddingBottom: 0,
        paddingTop: 0
      },
      addInstanceIcon: {
        backgroundColor: '#BDBDBD',
        color: '#FFF',
        fontSize: 24
      },
      dropdownMenu: {
        left: 0,
        top: 0,
        maxHeight: 'calc(100vh - 80px)',
        overflow: 'auto',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)'
      },
      list: {
        minWidth: 320,
        paddingBottom: 0
      },
      separator: {
        borderTop: '1px solid #BDBDBD',
        paddingLeft: 20
      },
      dropdownText: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        paddingLeft: 0
      },
      noInstancesItem: {
        fontWeight: 500,
        color: '#BDBDBD'
      },
      dropdownIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10
      },
      iconMenu: {
        width: '100%'
      }
    };
  },

  handleDropdownItemClick(instanceName) {
    // Redirect to main instance screen
    this.refs.instancesDropdown.close();
    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName});
  },

  showAddInstanceDialog() {
    InstanceDialogActions.showDialog();
  },

  renderAddInstanceItem() {
    let styles = this.getStyles();
    let icon = (
      <MUI.FontIcon
        className="synicon-plus"
        style={this.mergeAndPrefix(styles.dropdownInstanceIcon, styles.addInstanceIcon)}/>
    );

    return (
      <MUI.List style={styles.addInstanceList}>
        <MUI.ListItem
          primaryText="Add an Instance"
          leftIcon={icon}
          onTouchTap={this.showAddInstanceDialog}/>
      </MUI.List>
    );
  },

  renderListItems(instances) {
    let styles = this.getStyles();
    let defaultIconBackground = Common.ColumnList.ColumnListConstans.DEFAULT_BACKGROUND;
    let defaultIcon = Common.ColumnList.ColumnListConstans.DEFAULT_ICON;
    let items = instances.map((instance) => {
      let iconName = instance.metadata.icon ? 'synicon-' + instance.metadata.icon : 'synicon-' + defaultIcon;
      let iconBackground = {
        backgroundColor: Common.Color.getColorByName(instance.metadata.color, 'dark') || defaultIconBackground
      };
      let icon = (
        <MUI.FontIcon
          className={iconName}
          style={this.mergeAndPrefix(styles.dropdownInstanceIcon, iconBackground)}/>
      );

      return (
        <MUI.ListItem
          key={instance.name}
          primaryText={instance.name}
          onTouchTap={this.handleDropdownItemClick.bind(null, instance.name)}
          leftIcon={icon}/>
      );
    });

    return items;
  },

  renderList(instances) {
    let styles = this.getStyles();
    let subheaderText = InstancesStore.amIOwner(instances[0]) ? 'My Instances' : 'Shared with me';

    return (
      <Common.Show if={instances.length > 0}>
        <MUI.List
          style={styles.list}
          subheader={subheaderText}
          subheaderStyle={styles.separator}>
          {this.renderListItems(instances)}
        </MUI.List>
      </Common.Show>
    );
  },

  renderDropdownIcon() {
    let styles = this.getStyles();
    let defaultIconBackground = Common.ColumnList.ColumnListConstans.DEFAULT_BACKGROUND;
    let currentInstance = SessionStore.instance;
    let defaultIcon = Common.ColumnList.ColumnListConstans.DEFAULT_ICON;
    let iconStyle = {
      backgroundColor: Common.Color.getColorByName(currentInstance.metadata.color, 'dark') || defaultIconBackground,
      left: 0
    };
    let iconName = currentInstance.metadata.icon ? currentInstance.metadata.icon : defaultIcon;
    let icon = 'synicon-' + iconName;

    return (
      <div style={styles.dropdownIcon}>
        <MUI.FontIcon
          className={icon}
          style={this.mergeAndPrefix(styles.dropdownInstanceIcon, iconStyle)}/>
        <MUI.ListItem
          disabled={true}
          primaryText={currentInstance.name}
          style={styles.dropdownText}/>
        <MUI.FontIcon className='synicon-menu-down'/>
      </div>
    );
  },

  render() {
    let styles = this.getStyles();
    let instance = SessionStore.instance;
    let instancesList = InstancesStore.getAllInstances(true);

    if (!instance || !instancesList || !instancesList.length > 0) {
      return null;
    }

    return (
      <MUI.IconMenu
        className="instances-list"
        ref="instancesDropdown"
        onItemTouchTap={this.closeDropdown}
        iconButtonElement={this.renderDropdownIcon()}
        openDirection="bottom-right"
        style={styles.iconMenu}
        menuStyle={styles.dropdownMenu}>
        {this.renderAddInstanceItem()}
        {this.renderList(InstancesStore.getMyInstances(true))}
        {this.renderList(InstancesStore.getOtherInstances(true))}
      </MUI.IconMenu>
    );
  }
}));
