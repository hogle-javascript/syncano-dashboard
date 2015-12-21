import React from 'react';
import {State, Navigation, RouteHandler} from 'react-router';

import {LeftNavMixin} from '../mixins';

// Stores and Action
import SessionActions from '../apps/Session/SessionActions';

import {LeftNav, List, Divider} from 'syncano-material-ui';
import {LinkListItem} from '../common/Lists';
import HeaderInstancesDropdown from '../apps/Header/HeaderInstancesDropdown';
import InstanceDialog from '../apps/Instances/InstanceDialog';

export default React.createClass({

  displayName: 'Instance',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    LeftNavMixin,
    State,
    Navigation
  ],

  componentWillMount() {
    console.debug('Instance::componentWillMount');
    const params = this.getParams();

    if (params.instanceName) {
      SessionActions.fetchInstance(params.instanceName);
    }
  },

  getStyles() {
    return {
      leftNav: {
        paddingTop: 50,
        zIndex: 7,
        overflow: 'visible',
        boxShadow: '',
        backgroundColor: 'rgba(245,245,245,0.30)'
      },
      listSubheader: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 12,
        paddingTop: 4,
        fontWeight: 800,
        paddingLeft: 16
      },
      menuStyle: {
        backgroundColor: 'rgba(245,245,245,0.30)'
      },
      content: {
        margin: '96px 24px 48px 284px'
      },
      addInstanceItem: {
        fontSize: 14,
        display: 'flex; display: -ms-flexbox; display: -webkit-flex; display: flex;',
        alignItems: '-ms-flex-align: center; -webkit-align-items: center; align-items: center;'
      },
      plusIcon: {
        marginTop: '4px',
        color: 'rgba(0, 0, 0, 0.54)'
      }
    };
  },

  redirectToNewInstance() {
    let instanceName = this.refs.addInstanceDialog.refs.name.getValue();

    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName});
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <InstanceDialog
          ref="addInstanceDialog"
          handleSubmit={this.redirectToNewInstance}/>
        <LeftNav
          open={true}
          className="left-nav"
          ref="leftNav"
          style={styles.leftNav}>
          <HeaderInstancesDropdown />
          <List
            style={styles.menuStyle}
            subheaderStyle={styles.listSubheader}>
            <LinkListItem routeName="sockets" primaryText="Sockets"/>
          </List>
          <Divider/>
          <List
            style={styles.menuStyle}
            subheader="Modules"
            subheaderStyle={styles.listSubheader}>
            <LinkListItem routeName="users" primaryText="Users & Groups"/>
            <LinkListItem routeName="classes" primaryText="Classes"/>
            <LinkListItem routeName="snippets" primaryText="Snippets"/>
          </List>
          <Divider/>
          <List
            style={styles.menuStyle}
            subheader="Settings"
            subheaderStyle={styles.listSubheader}>
            <LinkListItem routeName="instance-edit" primaryText="General"/>
            <LinkListItem routeName="admins" primaryText="Administrators"/>
            <LinkListItem routeName="api-keys" primaryText="API keys"/>
          </List>
        </LeftNav>
        <div style={styles.content}>
          <RouteHandler />
        </div>
      </div>
    );
  }
});
