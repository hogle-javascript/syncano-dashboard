var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),
    RouteHandler      = Router.RouteHandler,

    HeaderMixin       = require('../Header/HeaderMixin'),
    InstanceTabsMixin = require('../../mixins/InstanceTabsMixin'),

    CodeBoxStore      = require('./CodeBoxStore'),
    CodeBoxActions    = require('./CodeBoxActions'),

    Loading           = require('../../common/Loading/Loading.react'),
    mui               = require('material-ui'),
    Colors            = mui.Styles.Colors,
    Tabs              = mui.Tabs,
    Tab               = mui.Tab;

module.exports = React.createClass({

  displayName: 'CodeBox',

  mixins: [
    Router.State,
    Router.Navigation,
    React.addons.LinkedStateMixin,

    Reflux.connect(CodeBoxStore),
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
        codeboxId    : this.state.currentCodeBox.id,
        instanceName : this.getParams().instanceName
      });
  },

  getStyles: function() {
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

  getTabsData: function() {
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

  renderTabs: function() {
    var styles = this.getStyles(),
        codeBox = this.state.currentCodeBox;
    if (codeBox !== null) {
      return (
        <div style={styles.subTabsContainer}>

          <div style={styles.title}>Codebox: {codeBox.label}</div>
          <Tabs
            initialSelectedIndex  = {this.getActiveSubTabIndex()}
            tabItemContainerStyle = {styles.subTabsHeader}
            tabWidth              = {100}>
            <Tab
              style    = {styles.tab}
              label    = "Edit"
              route    = "codebox-edit"
              onActive = {this.handleTabActive}>
              </Tab>
            <Tab
              style    = {styles.tab}
              label    = "Config"
              route    = "codebox-config"
              onActive = {this.handleTabActive}>
            </Tab>
            <Tab
              style    = {styles.tab}
              label    = "Traces"
              route    = "codebox-traces"
              onActive = {this.handleTabActive}>
            </Tab>
          </Tabs>
        </div>
      );
    }
  },

  render: function() {
    console.error("XXX", this.state)
    return (
      <div className="container">
        {this.renderTabs()}
        <RouteHandler/>
      </div>
    );
  }

});