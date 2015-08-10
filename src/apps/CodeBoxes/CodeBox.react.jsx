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

  handleBackClick() {
    this.transitionTo('codeboxes', this.getParams());
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

  renderToolbarTitle() {
    if (!this.isActive('codebox-traces')) {
      let codeBoxLabel = this.state.currentCodeBox !== null ? this.state.currentCodeBox.label : null;

      return (
        <MUI.ToolbarGroup>
          <MUI.ToolbarTitle text={`CodeBox: ${codeBoxLabel} (id: ${this.getParams().codeboxId})`}/>
        </MUI.ToolbarGroup>
      )
    }
  },

  render() {
    return (
      <div>
        <MUI.Toolbar style={{
          position: 'fixed',
          top: 64,
          right: 0,
          zIndex: 7,
          paddingLeft: 256,
          background: 'rgba(215,215,215,0.6)',
          padding: '0px 32px 0 24px'}}>
          <MUI.ToolbarGroup>
            <MUI.IconButton
              iconClassName="synicon-arrow-left"
              tooltip="Go back to CodeBoxes list"
              tooltipPosition="bottom-right"
              onClick={this.handleBackClick}
              touch={true}
              style={{marginTop: 4}}
              iconStyle={{color: 'rgba(0,0,0,.4)'}}/>
          </MUI.ToolbarGroup>

          {this.renderToolbarTitle()}
        </MUI.Toolbar>

        <div style={{margin: '65px auto', width: '80%'}}>

          <div style={{paddingTop: 32}}>
            {this.renderTabs()}
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  }
});
