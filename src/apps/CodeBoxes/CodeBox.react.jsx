import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

import CodeBoxStore from './CodeBoxStore';
import CodeBoxActions from './CodeBoxActions';

import Common from '../../common';
import MUI from 'material-ui';

let RouteHandler = Router.RouteHandler;

export default React.createClass({

  displayName: 'CodeBox',

  mixins: [
    Router.State,
    Router.Navigation,
    React.addons.LinkedStateMixin,

    Reflux.connect(CodeBoxStore),
    HeaderMixin,
    InstanceTabsMixin
  ],

  getActiveSubTabIndex() {
    var index = 0;
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
        codeboxId    : this.state.currentCodeBox.id,
        instanceName : this.getParams().instanceName
      });
  },

  getStyles() {
    return {
      subTabsHeader: {
        backgroundColor: "transparent"
      },
      tab: {
        color: "#444"
      },
      subTabsContainer: {
        display        : "flex",
        justifyContent : "center",
        marginTop      : 30
      },
      title: {
        color     : "#777",
        fontSize  : 20,
        position  : "absolute",
        left      : 100,
        marginTop : 15,
        width     : "250px"
      }
    }
  },

  getTabsData() {
    return [
      {
        label : "Edit",
        route : "codebox-edit"
      }, {
        label : "Config",
        route : "codebox-config"
      }, {
        label : "Traces",
        route : "codebox-traces"
      }
    ];
  },

  renderTabs() {
    var styles = this.getStyles(),
        codeBox = this.state.currentCodeBox;
    if (codeBox !== null) {
      return (
        <div style={styles.subTabsContainer}>

          <div style={styles.title}>Codebox: {codeBox.label}</div>
          <MUI.Tabs
            initialSelectedIndex  = {this.getActiveSubTabIndex()}
            tabItemContainerStyle = {styles.subTabsHeader}
            tabWidth              = {100}
          >
            <MUI.Tab
              style    = {styles.tab}
              label    = "Edit"
              route    = "codebox-edit"
              onActive = {this.handleTabActive}>
            </MUI.Tab>
            <MUI.Tab
              style    = {styles.tab}
              label    = "Config"
              route    = "codebox-config"
              onActive = {this.handleTabActive}>
            </MUI.Tab>
            <MUI.Tab
              style    = {styles.tab}
              label    = "Traces"
              route    = "codebox-traces"
              onActive = {this.handleTabActive}>
            </MUI.Tab>
          </MUI.Tabs>
        </div>
      );
    }
  },

  render() {
    return (
      <div className="container">
        {this.renderTabs()}
        <RouteHandler/>
      </div>
    );
  }

});