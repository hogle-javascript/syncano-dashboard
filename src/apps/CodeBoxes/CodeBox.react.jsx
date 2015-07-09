var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),
    RouteHandler      = Router.RouteHandler,

    HeaderMixin       = require('../Header/HeaderMixin'),
    InstanceTabsMixin = require('../../mixins/InstanceTabsMixin'),

    CodeBoxesStore    = require('./CodeBoxesStore'),

    Loading           = require('../../common/Loading/Loading.react'),
    mui               = require('material-ui'),
    Tabs              = mui.Tabs,
    Tab               = mui.Tab;

module.exports = React.createClass({

  displayName: 'CodeBox',

  mixins: [
    Router.State,
    Router.Navigation,
    React.addons.LinkedStateMixin,

    Reflux.connect(CodeBoxesStore),
    HeaderMixin,
    InstanceTabsMixin
  ],

  getActiveSubTabIndex: function() {
    var index = 0;
    this.getTabsData().some(function (item, i) {
      if (this.isActive(item.route, item.params, item.query)) {
        index = i;
      }
    }.bind(this));

    return index;
  },

  handleTabActive: function(tab) {
    this.transitionTo(tab.props.route,
      {
        codeboxId    : this.state.currentCodeBoxId,
        instanceName : this.getParams().instanceName
      });
  },

  getTabsData: function() {
    return [
      {
        label : "Edit",
        route : "codeboxes-edit"
      }, {
        label : "Config",
        route : "codeboxes-config"
      }, {
        label : "Traces",
        route : "codeboxes-traces"
      }
    ];
  },

  renderTabs: function() {
    var tabs = this.getTabsData().map(function(item) {
      return (
      <Tab
        label    = {item.label}
        route    = {item.route}
        onActive = {this.handleTabActive} />
      )
    }.bind(this));
    return tabs;
  },

  render: function() {
    return (
        <div className="container">
          <h4>CodeBox</h4>

          <Loading show={this.state.isLoading}>
          <Tabs initialSelectedIndex={this.getActiveSubTabIndex()}>
            {this.renderTabs()}
          </Tabs>
          </Loading>
          <RouteHandler />
        </div>
    );
  }

});