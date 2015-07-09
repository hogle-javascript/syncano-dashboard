var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),
    RouteHandler      = Router.RouteHandler,

    HeaderMixin       = require('../Header/HeaderMixin'),
    InstanceTabsMixin = require('../../mixins/InstanceTabsMixin'),

    CodeBoxesStore    = require('./CodeBoxesStore'),

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

  getStyles: function() {
    return {
      subTabsHeader: {
        backgroundColor : "transparent"
      },
      tab: {
        color: "#444"
      },
      subTabsContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: 30
      },
      title: {
        color: "#777",
        fontSize: 20,
        position: "absolute",
        left: 100,
        marginTop: 15,
        width: "250px"
      }
    }
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
    var styles = this.getStyles(),
        tabs   = this.getTabsData().map(function(item) {
      return (
      <Tab
        style    = {styles.tab}
        label    = {item.label}
        route    = {item.route}
        onActive = {this.handleTabActive} />
      )
    }.bind(this));
    return tabs;
  },

  render: function() {
    var styles = this.getStyles(),
        codeBoxName = CodeBoxesStore.getCodeBoxById(this.state.currentCodeBoxId) !== null ? CodeBoxesStore.getCodeBoxById(this.state.currentCodeBoxId).label : "";

    return (
      <div className="container">

        <div style={styles.subTabsContainer}>
        <Loading show={this.state.isLoading}>
          <div style={styles.title}>Codebox: {codeBoxName}</div>
          <Tabs
            initialSelectedIndex  = {this.getActiveSubTabIndex()}
            tabItemContainerStyle = {styles.subTabsHeader}
            tabWidth              = {100}  >
            {this.renderTabs()}
          </Tabs>
        </Loading>
        </div>
        <RouteHandler />
      </div>
    );
  }

});