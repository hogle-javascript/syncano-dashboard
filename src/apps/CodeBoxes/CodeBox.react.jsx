import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

import Store from './CodeBoxStore';
import Actions from './CodeBoxActions';

import MUI from 'material-ui';
import Container from '../../common/Container';

let RouteHandler = Router.RouteHandler;

export default React.createClass({

  displayName: 'CodeBox',

  mixins: [
    Router.State,
    Router.Navigation,
    React.addons.LinkedStateMixin,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin
  ],

  getActiveSubTabIndex() {
    let index = 0;
    this.getTabsData().some((item, i) => {
      if (this.isActive(item.route, item.params, item.query)) {
        index = i;
        return true;
      }
    });

    return index;
  },

  handleTabActive(tab) {
    this.transitionTo(tab.props.route,
      {
        codeboxId: this.state.currentCodeBox.id,
        instanceName: this.getParams().instanceName
      }
    );
  },

  getStyles() {
    return {
      subTabsHeader: {
        backgroundColor: 'transparent'
      },
      tabs: {
        padding: '0 250px',
        borderBottom: '1px solid #DDDDDD'
      },
      tab: {
        color: '#444'
      }
    }
  },

  getTabsData() {
    return [
      {
        label: 'Edit',
        route: 'codebox-edit'
      }, {
        label: 'Config',
        route: 'codebox-config'
      }, {
        label: 'Traces',
        route: 'codebox-traces'
      }
    ];
  },

  renderTabs() {
    let styles = this.getStyles(),
      codeBox = this.state.currentCodeBox;

    if (codeBox !== null) {
      return (
        <MUI.Tabs
          initialSelectedIndex={this.getActiveSubTabIndex()}
          tabItemContainerStyle={styles.subTabsHeader}
          style={styles.tabs}>
          <MUI.Tab
            style={styles.tab}
            label="Edit"
            route="codebox-edit"
            onActive={this.handleTabActive}/>
          <MUI.Tab
            style={styles.tab}
            label="Config"
            route="codebox-config"
            onActive={this.handleTabActive}/>
          <MUI.Tab
            style={styles.tab}
            label="Traces"
            route="codebox-traces"
            onActive={this.handleTabActive}/>
        </MUI.Tabs>
      );
    }
  },

  render() {
    let codeBoxLabel = this.state.currentCodeBox !== null ? 'CodeBox: ' + this.state.currentCodeBox.label : null;

    return (
      <Container.Profile headerText={codeBoxLabel}>
        {this.renderTabs()}
        <RouteHandler/>
      </Container.Profile>
    );
  }
});
