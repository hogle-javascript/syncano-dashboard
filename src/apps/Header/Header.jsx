import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import {Navigation, State, Link} from 'react-router';
import Gravatar from 'gravatar';

// Stores & Actions
import HeaderStore from './HeaderStore';
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import InstancesStore from '../Instances/InstancesStore';

// Components
import Sticky from 'react-stickydiv';
import {Utils, FontIcon, Divider, List, ListItem, Avatar, Toolbar, ToolbarGroup, IconMenu} from 'syncano-material-ui';
import {Logo} from '../../common';
import HeaderNotificationsDropdown from './HeaderNotificationsDropdown';

import './Header.sass';

export default Radium(React.createClass({

  displayName: 'Header',

  contextTypes: {
    router: React.PropTypes.func.isRequired,
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(HeaderStore),
    Reflux.connect(InstancesStore),
    Navigation,
    State,
    Utils.Styles
  ],

  getDefaultProps() {
    return {
      logo: false
    };
  },

  componentDidMount() {
    SessionStore.getInstance();
  },

  getStyles() {
    return {
      topToolbar: {
        background: this.context.muiTheme.rawTheme.palette.primary1Color,
        height: 50,
        padding: 0
      },
      logotypeContainer: {
        paddingLeft: 24,
        height: '100%',
        width: 256,
        display: 'flex',
        alignItems: 'center'
      },
      logo: {
        width: 120
      },
      toolbarList: {
        padding: '0 28px',
        display: 'flex'
      },
      toolbarListItem: {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer'
      },
      logoutDropdownItem: {
        color: this.context.muiTheme.rawTheme.palette.accent2Color
      }
    };
  },

  getDropdownItems() {
    let styles = this.getStyles();
    let user = SessionStore.getUser() || '';
    let billingIcon = <FontIcon className="synicon-credit-card"/>;
    let instancesListIcon = <FontIcon className="synicon-view-list"/>;
    let logoutIcon = (
      <FontIcon
        style={styles.logoutDropdownItem}
        className="synicon-power"/>
    );

    if (!user) {
      return null;
    }

    return (
      <List>
        <ListItem
          leftAvatar={this.renderIconButton()}
          onTouchTap={this.handleAccountClick}
          primaryText={`${user.first_name} ${user.last_name}`}
          secondaryText={user.email}/>
        <Divider/>
        <ListItem
          onTouchTap={this.handleInstancesListClick}
          leftIcon={instancesListIcon}
          primaryText="Instances list"/>
        <ListItem
          onTouchTap={this.handleBillingClick}
          leftIcon={billingIcon}
          primaryText="Billing"/>
        <ListItem
          onTouchTap={this.handleLogout}
          style={styles.logoutDropdownItem}
          leftIcon={logoutIcon}
          primaryText="Logout"/>
      </List>
    );
  },

  getGravatarUrl() {
    let userEmail = SessionStore.getUser() ? SessionStore.getUser().email : null;

    if (this.state.gravatarUrl) {
      return this.state.gravatarUrl;
    }

    return Gravatar.url(userEmail, {default: '404'}, true);
  },

  onAvatarError() {
    let fallBackAvatar = `${location.protocol}//${location.hostname}:${location.port}/img/fox.png`;

    this.setState({gravatarUrl: fallBackAvatar});
  },

  handleInstancesListClick() {
    this.transitionTo('instances');
  },

  handleTabActive(tab) {
    this.transitionTo(tab.props.route, tab.props.params);
  },

  handleAccountClick() {
    this.transitionTo('profile-settings');
  },

  handleLogout() {
    SessionActions.logout();
  },

  handleBillingClick() {
    this.transitionTo('profile-billing-plan');
  },

  renderIconButton() {
    return (
      <Avatar
        src={this.getGravatarUrl()}
        onError={this.onAvatarError}/>
    );
  },

  renderLogo() {
    let styles = this.getStyles();

    return (
      <ToolbarGroup style={styles.logotypeContainer}>
        <Link to="app">
          <Logo
            style={styles.logo}
            className="logo-white"/>
        </Link>
      </ToolbarGroup>
    );
  },

  render() {
    let styles = this.getStyles();

    return (
      <Sticky zIndex={12}>
        <Toolbar style={styles.topToolbar}>
          {this.props.logo ? this.renderLogo() : null}
          <ToolbarGroup
            float="right"
            style={{marginLeft: 100, height: '100%'}}>
            <ul
              className="toolbar-list"
              style={styles.toolbarList}>
              <li
                id="menu-notifications"
                style={styles.toolbarListItem}>
                <HeaderNotificationsDropdown id="menu-notifications--dropdown"/>
              </li>
              <li id="menu-account">
                <IconMenu
                  id="menu-account--dropdown"
                  iconButtonElement={this.renderIconButton()}
                  anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'middle'
                  }}
                  targetOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}>
                  {this.getDropdownItems()}
                </IconMenu>
              </li>
            </ul>
          </ToolbarGroup>
          <ToolbarGroup
            float="left"
            style={{marginLeft: '-5', height: '100%'}}>
            <ul
              className="toolbar-list"
              style={styles.toolbarList}>
              <li
                id="menu-solutions"
                style={styles.toolbarListItem}>
                <Link to="solutions">Solutions Market</Link>
              </li>

              <li style={styles.toolbarListItem}>
                <a
                  href="http://docs.syncano.com/"
                  target="_blank">
                  Docs
                </a>
              </li>
              <li style={styles.toolbarListItem}>
                <a
                  href="http://ideas.syncano.io"
                  target="_blank">
                  Ideas
                </a>
              </li>
            </ul>
          </ToolbarGroup>
        </Toolbar>
      </Sticky>
    );
  }
}));
