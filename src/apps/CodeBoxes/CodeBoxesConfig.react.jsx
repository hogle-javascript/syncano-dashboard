var React  = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),

    // Utils
    HeaderMixin      = require('../Header/HeaderMixin'),

    // Stores and Actions
    CodeBoxesActions = require('./CodeBoxesActions'),
    CodeBoxesStore   = require('./CodeBoxesStore'),

    // Components
    mui              = require('material-ui'),
    Paper            = mui.Paper,
    RoundIcon        = require('../../common/Icon/RoundIcon.react'),
    Item             = require('../../common/ColumnList/Item.react'),
    Column           = require('../../common/ColumnList/ItemColumn.react'),
    Header           = require('../../common/ColumnList/Header.react'),
    ColNameDesc      = require('../../common/ColumnList/ColNameDesc.react');


module.exports = React.createClass({

  displayName: 'CodeBoxesConfig',

  mixins: [
    Reflux.connect(CodeBoxesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation,
    //React.addons.LinkedStateMixin,
    //ValidationMixin,
  ],

  componentWillMount: function() {
    var codeboxId = this.getParams().codeboxId;
    CodeBoxesActions.setCurrentCodeBoxId(codeboxId);
    this.setState({
      currentCodeBoxId: codeboxId,
      instanceName: this.getParams().instanceName,
    });
    CodeBoxesStore.refreshData();
  },

  headerBreadcrumbs: function () {
    var routeParams = {
     codeboxId: this.state.currentCodeBoxId,
     instanceName: this.state.instanceName
   };

  return [
      {
        route: 'instances',
        label: 'Instances',
      }, {
        route: 'instance',
        label: this.state.instanceName,
        params: routeParams
      }, {
        route: 'codeboxes',
        label: 'Codeboxes',
        params: routeParams
      }, {
        route: 'codeboxes-edit',
        label: this.state.currentCodeBoxId,
        params: routeParams
      },{
        route: 'codeboxes-traces',
        label: 'Config',
        params: routeParams,
      }]
  },

  headerMenuItems: function () {

   var routeParams = {
     codeboxId: this.state.currentCodeBoxId,
     instanceName: this.state.instanceName
   };

   return [
     {
      label: 'Editor',
      route: 'codeboxes-edit',
      params: routeParams
    },{
      label: 'Config',
      route: 'codeboxes-config',
      params: routeParams,
      active: true,
    },{
      label: 'Traces',
      route: 'codeboxes-traces',
      params: routeParams
    }]
  },

  render: function () {
    var containerStyle = {
      margin: '65px auto',
      width: '80%',
      maxWidth: '1140px'
    };

    return (
      <div className="container" style={containerStyle}>
        CONFIG
      </div>
    );
  }

});