import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import Router from 'react-router';

// Stores & Actions
import HeaderActions from './HeaderActions';
import HeaderStore from './HeaderStore';
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import InstancesActions from '../Instances/InstancesActions';
import InstancesStore from '../Instances/InstancesStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Logo from '../../common/Logo/Logo.react';

import HeaderMenu from './HeaderMenu.react';
import HeaderInstancesDropdown from './HeaderInstancesDropdown.react';
import HeaderNotificationsDropdown from './HeaderNotificationsDropdown.react';
import HeaderInstanceMenu from './HeaderInstanceMenu.react';

require('./Header.sass');

export default Radium(React.createClass({

  displayName: 'Header',

  mixins: [
    Reflux.connect(HeaderStore),
    Reflux.connect(InstancesStore),
    Router.Navigation,
    Router.State,
    MUI.Mixins.StylePropable
  ],

  contextTypes: {
    router: React.PropTypes.func.isRequired,
    muiTheme: React.PropTypes.object
  },

  componentDidMount() {
    SessionStore.getInstance();
  },

  handleTabActive(tab) {
    this.transitionTo(tab.props.route, tab.props.params);
  },

  handleAccountClick(event) {
    this.transitionTo('profile-settings');
    event.stopPropagation();
  },

  handleLogout() {
    SessionActions.logout();
  },

  handleBillingClick(event) {
    this.transitionTo('profile-billing');
    event.stopPropagation();
  },

  getStyles() {
    return {
      topToolbar: {
        background: this.context.muiTheme.palette.primary1Color,
        height: 64,
        padding: '0 32px'
      },
      logotypeContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
      },
      logo: {
        width: 120
      },
      toolbarList: {
        display: 'flex'
      },
      toolbarListItem: {
        display: 'inline-flex',
        alignItems: 'center'
      },
      bottomToolbar: {
        display: 'flex',
        fontSize: 17,
        fontWeight: 500,
        height: 56,
        background: this.context.muiTheme.palette.primary2Color,
        padding: '0 32px'
      },
      bottomToolbarGroup: {
        display: 'flex',
        float: 'none',
        alignItems: 'center',
        justifyContent: 'center'
      },
      bottomToolbarGroupIcon: {
        color: '#fff'
      }
    }
  },

  getDropdownItems() {
    return [{
      leftIcon: {
        name: 'synicon-credit-card',
        style: {}
      },
      content: {
        text: 'Billing',
        style: {}
      },
      name: 'billing',
      handleItemClick: this.handleBillingClick
    }, {
      leftIcon: {
        name: 'synicon-power',
        style: {
          color: '#f50057'
        }
      },
      content: {
        text: 'Logout',
        style: {
          color: '#f50057'
        }
      },
      name: 'logout',
      handleItemClick: this.handleLogout

    }]
  },

  getDropdownHeaderItems() {
    return {
      userFullName: this.state.user.first_name + ' ' + this.state.user.last_name,
      userEmail: this.state.user.email,
      clickable: true,
      handleItemClick: this.handleAccountClick
    }
  },

  render() {
    let styles = this.getStyles(),
      currentInstance = SessionStore.getInstance();

    return (
      <div>
        <MUI.Toolbar style={styles.topToolbar}>
          <MUI.ToolbarGroup style={styles.logotypeContainer}>
            <Router.Link to="app">
              <Common.Logo
                style={styles.logo}
                className="logo-white"/>
            </Router.Link>
          </MUI.ToolbarGroup>
          <MUI.ToolbarGroup
            float="right"
            style={{height: '100%'}}>
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
              <li>
                <Common.Dropdown.Material
                  items={this.getDropdownItems()}
                  headerContent={this.getDropdownHeaderItems()}
                  iconStyle={styles.bottomToolbarGroupIcon}>
                  Account
                </Common.Dropdown.Material>
              </li>
            </ul>
          </MUI.ToolbarGroup>
        </MUI.Toolbar>
        <MUI.Paper>
          <MUI.Toolbar style={styles.bottomToolbar}>
            <Common.Show if={currentInstance !== null}>
              <HeaderInstancesDropdown />
            </Common.Show>

            <MUI.ToolbarGroup
              className="col-flex-1"
              style={styles.bottomToolbarGroup}>
              <HeaderMenu />
            </MUI.ToolbarGroup>
            <MUI.ToolbarGroup style={styles.bottomToolbarGroup}>
              <HeaderNotificationsDropdown />
              <Common.Show if={currentInstance !== null}>
                <HeaderInstanceMenu />
              </Common.Show>
            </MUI.ToolbarGroup>
          </MUI.Toolbar>
        </MUI.Paper>
      </div>
    )
  }
}));
