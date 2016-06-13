import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import {withRouter, Link} from 'react-router';
import Gravatar from 'gravatar';

import {SnackbarNotificationMixin} from '../../mixins';
// Stores & Actions
import SessionActions from '../../apps/Session/SessionActions';
import SessionStore from '../../apps/Session/SessionStore';
import InstancesStore from '../../apps/Instances/InstancesStore';

// Components
import Sticky from 'react-stickydiv';
import {FontIcon, Divider, List, ListItem, Avatar, Toolbar, ToolbarGroup, IconMenu} from 'material-ui';
import {Clipboard} from '../../common/';
import {Logo} from '../';
import HeaderNotificationsDropdown from './HeaderNotificationsDropdown';

import './Header.sass';

const Header = Radium(React.createClass({
  displayName: 'Header',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(InstancesStore),
    SnackbarNotificationMixin
  ],

  componentDidMount() {
    SessionStore.getInstance();
  },

  getStyles() {
    return {
      topToolbar: {
        background: this.context.muiTheme.rawTheme.palette.primary1Color,
        height: 50,
        padding: 0,
        justifyContent: 'flex-start'
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
    const {router} = this.props;
    const styles = this.getStyles();
    const user = SessionStore.getUser() || '';
    const billingIcon = <FontIcon className="synicon-credit-card"/>;
    const instancesListIcon = <FontIcon className="synicon-view-list"/>;
    const accountKeyIcon = <FontIcon className="synicon-key-variant"/>;
    const logoutIcon = (
      <FontIcon
        style={styles.logoutDropdownItem}
        className="synicon-power"/>
    );

    if (!user) {
      return null;
    }

    return (
      <List id="menu-account--dropdown">
        <ListItem
          leftAvatar={this.renderIconButton()}
          onTouchTap={() => router.push('profile-settings')}
          primaryText={`${user.first_name} ${user.last_name}`}
          secondaryText={user.email}/>
        <Divider/>
        <ListItem
          leftIcon={accountKeyIcon}>
          <div>
            <Clipboard
              text={`Copy Account Key: xxx${user.account_key.substr(user.account_key.length - 4)}`}
              copyText={user.account_key}
              onCopy={() => this.setSnackbarNotification({
                message: 'Account Key copied to the clipboard'
              })}
              label="Copy Account Key"
              type="list"/>
          </div>
        </ListItem>
        <ListItem
          onTouchTap={() => router.push('instances')}
          leftIcon={instancesListIcon}
          primaryText="Instances list"/>
        <ListItem
          onTouchTap={() => router.push('profile-billing-plan')}
          leftIcon={billingIcon}
          primaryText="Billing"/>
        <ListItem
          onTouchTap={SessionActions.logout}
          style={styles.logoutDropdownItem}
          leftIcon={logoutIcon}
          primaryText="Logout"/>
      </List>
    );
  },

  getGravatarUrl() {
    const {gravatarUrl} = this.state;
    const userEmail = SessionStore.getUser() ? SessionStore.getUser().email : null;
    const fallBackAvatar = `${location.protocol}//${location.hostname}:${location.port}/img/fox.png`;

    if (gravatarUrl) {
      return gravatarUrl;
    }

    /* eslint-disable */
    const gravatar = Gravatar.url(userEmail, {d: '404'}, true);
    /* eslint-enable */
    return gravatar ? gravatar : fallBackAvatar;
  },

  renderIconButton() {
    return (
      <Avatar
        style={{
          backgroundImage: `url(${this.getGravatarUrl()})`,
          backgroundSize: '40px 40px'
        }} />
    );
  },

  render() {
    const styles = this.getStyles();

    return (
      <Sticky zIndex={12}>
        <Toolbar style={styles.topToolbar}>
          <ToolbarGroup style={styles.logotypeContainer}>
            <Link to="app">
              <Logo
                style={styles.logo}
                className="logo-white"/>
            </Link>
          </ToolbarGroup>
          <ToolbarGroup style={{height: '100%'}}>
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
            </ul>
          </ToolbarGroup>
          <ToolbarGroup style={{marginLeft: -5, height: '100%', flex: 1, justifyContent: 'flex-end'}}>
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
        </Toolbar>
      </Sticky>
    );
  }
}));

export default withRouter(Header);
