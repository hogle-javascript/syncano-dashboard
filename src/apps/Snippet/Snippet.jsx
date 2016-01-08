import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

import HeaderMixin from '../Header/HeaderMixin';
import {InstanceTabsMixin} from '../../mixins';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import Store from './SnippetStore';

import {Tabs, Tab} from 'syncano-material-ui';
import {InnerToolbar} from '../../common';

let RouteHandler = Router.RouteHandler;

export default React.createClass({

  displayName: 'Snippet',

  mixins: [
    Router.State,
    Router.Navigation,
    LinkedStateMixin,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin
  ],

  componentWillUnmount() {
    Store.clearCurrentSnippet();
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
        route: 'snippet-edit'
      }, {
        label: 'Config',
        route: 'snippet-config'
      }, {
        label: 'Traces',
        route: 'snippet-traces'
      }
    ];
  },

  getSnippetLabel() {
    if (this.state.currentSnippet !== null) {
      return this.state.currentSnippet.label;
    }

    return null;
  },

  getToolbarTitle() {
    let toolbarTitleText = this.getToolbarTitleText();

    return !this.isActive('snippet-traces') ? toolbarTitleText : null;
  },

  getToolbarTitleText() {
    let snippetLabel = this.getSnippetLabel();

    if (this.state.currentSnippet) {
      return `Snippet: ${snippetLabel} (id: ${this.getParams().snippetId})`;
    }

    return '';
  },

  handleTabActive(tab) {
    this.transitionTo(tab.props.route,
      {
        snippetId: this.state.currentSnippet.id,
        instanceName: this.getParams().instanceName
      }
    );
  },

  handleBackClick() {
    this.transitionTo('snippets', this.getParams());
  },

  renderTabs() {
    let styles = this.getStyles();
    let snippet = this.state.currentSnippet;

    if (snippet !== null) {
      return (
        <Tabs
          initialSelectedIndex={this.getActiveSubTabIndex()}
          tabItemContainerStyle={styles.subTabsHeader}
          style={styles.tabs}>
          <Tab
            style={styles.tab}
            label="Edit"
            route="snippet-edit"
            onActive={this.handleTabActive}/>
          <Tab
            style={styles.tab}
            label="Config"
            route="snippet-config"
            onActive={this.handleTabActive}/>
          <Tab
            style={styles.tab}
            label="Traces"
            route="snippet-traces"
            onActive={this.handleTabActive}/>
        </Tabs>
      );
    }
  },

  render() {
    return (
      <div>
        <InnerToolbar
          title={this.getToolbarTitle()}
          backFallback={this.handleBackClick}
          forceBackFallback={true}
          backButtonTooltip="Go back to Snippets list"/>

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
