import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import Store from './CodeBoxStore';

import MUI from 'syncano-material-ui';
import Common from '../../common';

let RouteHandler = Router.RouteHandler;

export default React.createClass({

  displayName: 'CodeBox',

  mixins: [
    Router.State,
    Router.Navigation,
    LinkedStateMixin,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin
  ],

  componentWillUnmount() {
    Store.clearCurrentCodeBox();
  },

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
    };
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

  getCodeBoxLabel() {
    if (this.state.currentCodeBox !== null) {
      return this.state.currentCodeBox.label;
    }

    return null;
  },

  getToolbarTitleText() {
    let codeBoxLabel = this.getCodeBoxLabel();

    if (this.state.currentCodeBox) {
      return `CodeBox: ${codeBoxLabel} (id: ${this.getParams().codeboxId})`;
    }

    return '';
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

  renderTabs() {
    let styles = this.getStyles();
    let codeBox = this.state.currentCodeBox;

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
    let toolbarTitleText = this.getToolbarTitleText();

    if (!this.isActive('codebox-traces')) {
      return (
        <MUI.ToolbarGroup>
          <MUI.ToolbarTitle text={toolbarTitleText}/>
        </MUI.ToolbarGroup>
      );
    }
  },

  render() {
    return (
      <div>
        <Common.InnerToolbar>
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
        </Common.InnerToolbar>
        <div style={{margin: '65px auto', width: '100%'}}>
          <div style={{paddingTop: 32}}>
            {this.renderTabs()}
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  }
});
