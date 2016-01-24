import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

import HeaderMixin from '../Header/HeaderMixin';
import {InstanceTabsMixin, SnackbarNotificationMixin} from '../../mixins';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import Store from './SnippetStore';
import Actions from './SnippetActions';

import {Tabs, Tab} from 'syncano-material-ui';
import {Socket} from 'syncano-components';
import {InnerToolbar, Container} from '../../common';

let RouteHandler = Router.RouteHandler;

export default React.createClass({

  displayName: 'Snippet',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Router.State,
    Router.Navigation,
    LinkedStateMixin,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin,
    SnackbarNotificationMixin
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
        padding: '0 20%',
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

  handleRunSnippet() {
    if (this.state.isPayloadValid) {
      Actions.runSnippet({
        id: this.state.currentSnippet.id,
        payload: this.state.payloadValue
      });
    } else {
      this.setSnackbarNotification({
        message: "Can't run Snippet with invalid payload",
        autoHideDuration: 3000
      });
    }
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

  renderRunButton() {
    return (
      <Socket
        iconClassName="synicon-play-circle"
        iconStyle={{color: this.context.muiTheme.rawTheme.palette.accent2Color}}
        tooltip="Click here to execute Snippet"
        onTouchTap={this.handleRunSnippet}/>
    );
  },

  render() {
    return (
      <div>
        <InnerToolbar
          title={this.getToolbarTitle()}
          backFallback={this.handleBackClick}
          forceBackFallback={true}
          backButtonTooltip="Go back to Snippets list">
          {this.isActive('snippet-edit') ? this.renderRunButton() : null}
        </InnerToolbar>

        <Container.Tabs tabs={this.renderTabs()}>
          <RouteHandler/>
        </Container.Tabs>
      </div>
    );
  }
});
