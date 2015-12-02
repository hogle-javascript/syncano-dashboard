import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import Router from 'react-router';
import Gravatar from 'gravatar';

// Stores & Actions
import HeaderStore from './HeaderStore';
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import InstancesStore from '../Instances/InstancesStore';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';
import Logo from '../../common/Logo/Logo.react';

import HeaderNotificationsDropdown from './HeaderNotificationsDropdown.react';

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
    Router.Navigation,
    Router.State,
    MUI.Utils.Styles
  ],

  componentDidMount() {
    SessionStore.getInstance();
  },

  getStyles() {
    return {
      main: {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 8
      },
      topToolbar: {
        background: this.context.muiTheme.rawTheme.palette.primary1Color,
        height: 50,
        padding: 0
      },
      logotypeContainer: {
        paddingLeft: 64,
        height: '100%',
        width: 256,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.05)'
      },
      logo: {
        width: 120
      },
      toolbarList: {
        padding: '0 24px',
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
    let billingIcon = <MUI.FontIcon className="synicon-credit-card"/>;
    let instancesListIcon = <MUI.FontIcon className="synicon-view-list"/>;
    let logoutIcon = (
      <MUI.FontIcon
        style={styles.logoutDropdownItem}
        className="synicon-power"/>
    );

    if (!user) {
      return null;
    }

    return (
      <MUI.List>
        <MUI.ListItem
          leftAvatar={this.renderIconButton()}
          onTouchTap={this.handleAccountClick}
          primaryText={`${user.first_name} ${user.last_name}`}
          secondaryText={user.email}/>
        <MUI.ListDivider/>
        <MUI.ListItem
          onTouchTap={this.handleInstancesListClick}
          leftIcon={instancesListIcon}
          primaryText="Instances list"/>
        <MUI.ListItem
          onTouchTap={this.handleBillingClick}
          leftIcon={billingIcon}
          primaryText="Billing"/>
        <MUI.ListItem
          onTouchTap={this.handleLogout}
          style={styles.logoutDropdownItem}
          leftIcon={logoutIcon}
          primaryText="Logout"/>
      </MUI.List>
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

  handleSolutionsClick() {
    this.transitionTo('solutions');
  },

  renderIconButton() {
    return (
      <MUI.Avatar
        src={this.getGravatarUrl()}
        onError={this.onAvatarError}/>
    );
  },

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles.main}>
        <MUI.Toolbar style={styles.topToolbar}>
          <MUI.ToolbarGroup style={styles.logotypeContainer}>
            <Router.Link to="app">
              <Common.Logo
                style={styles.logo}
                className="logo-white"/>
            </Router.Link>
          </MUI.ToolbarGroup>
          <MUI.ToolbarGroup
            float="left"
            style={{marginLeft: '-5', height: '100%'}}>
            <ul
              className="toolbar-list"
              style={styles.toolbarList}>
              <li
                id="menu-solutions"
                style={styles.toolbarListItem}>
                <a onClick={this.handleSolutionsClick}>Solutions Market</a>
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
          </MUI.ToolbarGroup>
          <MUI.ToolbarGroup
            float="right"
            style={{marginLeft: 100, height: '100%'}}>
            <ul
              className="toolbar-list"
              style={styles.toolbarList}>
              <li id="menu-account">
                <MUI.IconMenu id="menu-account--dropdown" iconButtonElement={this.renderIconButton()}>
                  {this.getDropdownItems()}
                </MUI.IconMenu>
              </li>
              <li
                id="menu-notifications"
                style={styles.toolbarListItem}>
                <HeaderNotificationsDropdown id="menu-notifications--dropdown"/>
              </li>
            </ul>
          </MUI.ToolbarGroup>
        </MUI.Toolbar>
      </div>
    );
  }
}));
