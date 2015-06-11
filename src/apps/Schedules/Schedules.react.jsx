var React       = require('react'),
    State       = require('react-router').State,
    
    HeaderMixin = require('../Header/HeaderMixin');

module.exports = React.createClass({

  displayName: 'Schedules',

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
      route: 'schedules',
      label: 'Schedules',
      params: {instanceName: instanceName}
    }]
  },

  render: function () {
    return (
      <div>Schedules</div>
    );
  }

});