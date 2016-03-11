import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

import {SnackbarNotificationMixin} from '../../mixins';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import Store from './TemplateStore';
import Actions from './TemplateActions';

import {Tabs, Tab} from 'syncano-material-ui';
import {Container, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';

let RouteHandler = Router.RouteHandler;

export default React.createClass({

  displayName: 'Template',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Router.State,
    Router.Navigation,
    LinkedStateMixin,

    Reflux.connect(Store),
    SnackbarNotificationMixin
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
        route: 'template-edit'
      }, {
        label: 'Context',
        route: 'template-context'
      }
    ];
  },

  getToolbarTitle() {
    let template = this.state.template;

    return template.name ? `Template: ${template.name}` : '';
  },

  handleTabActive(tab) {
    this.transitionTo(tab.props.route, {
      templateName: this.state.template.name,
      instanceName: this.getParams().instanceName
    });
  },

  handleRenderTemplate() {
    Actions.renderTemplate(this.state.template.name, this.state.context);
    // if (this.state.isPayloadValid) {

    // } else {
    //   this.setSnackbarNotification({
    //     message: "Can't run Snippet with invalid payload",
    //     autoHideDuration: 3000
    //   });
    // }
  },

  renderTabs() {
    let styles = this.getStyles();
    let template = this.state.template;

    if (template.name) {
      return (
        <Tabs
          initialSelectedIndex={this.getActiveSubTabIndex()}
          tabItemContainerStyle={styles.subTabsHeader}
          style={styles.tabs}>
          <Tab
            style={styles.tab}
            label="Edit"
            route="template-edit"
            onActive={this.handleTabActive}/>
        </Tabs>
      );
    }
  },

  renderRenderButton() {
    return (
      <Socket
        iconClassName="synicon-play-circle"
        iconStyle={{color: this.context.muiTheme.rawTheme.palette.accent2Color}}
        tooltip="Click here to render Template"
        onTouchTap={this.handleRenderTemplate}/>
    );
  },

  render() {
    return (
      <div>
        <InnerToolbar
          title={this.getToolbarTitle()}
          backFallback={() => this.transitionTo('templates', this.getParams())}
          forceBackFallback={true}
          backButtonTooltip="Go back to Templates list">
          {this.isActive('template-edit') ? this.renderRenderButton() : null}
        </InnerToolbar>

        <Container.Tabs tabs={this.renderTabs()}>
          <RouteHandler/>
        </Container.Tabs>
      </div>
    );
  }
});
