var React       = require('react'),
    State       = require('react-router').State,

    HeaderMixin = require('../Header/HeaderMixin');
    
module.exports = React.createClass({

  displayName: 'Admins',

  mixins: [
    HeaderMixin,
    State,
  ],

  headerBreadcrumbs: function () {
    var instanceName = this.getParams().instanceName;
    return [{
      route: 'instances',
      label: 'Instances',
      params: {instanceName: instanceName}
    },{
      route: 'instance',
      label: instanceName,
      params: {instanceName: instanceName}
    },{
      route: 'admins',
      label: 'Admins',
      params: {instanceName: instanceName}
    }]
  },

  headerMenuItems: function() {
    var instanceName = this.getParams().instanceName;
    return [
      {label: 'Data Browser', route: 'data-objects', params: {instanceName: instanceName}},
      {label: 'Classes', route: 'classes', params: {instanceName: instanceName}},
      {label: 'API Keys', route: 'api-keys', params: {instanceName: instanceName}},
      {label: 'Admins', route: 'admins', params: {instanceName: instanceName}, active: true},
      {label: 'Users', route: 'users', params: {instanceName: instanceName}},
      {label: 'CodeBoxes', route: 'codeboxes', params: {instanceName: instanceName}},
      {label: 'Webhooks', route: 'webhooks', params: {instanceName: instanceName}},
      {label: 'Tasks', route: 'tasks', params: {instanceName: instanceName}},
    ];
  },

  render: function () {
    return (
      <div>Admins</div>
    );
  }

});