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
   return [{
      route: 'instances',
      label: 'Instances',
      params: {instanceName: this.getParams().instanceName}
    },{
      route: 'instance',
      label: this.getParams().instanceName,
      params: {instanceName: this.getParams().instanceName}
    },{
      route: 'schedules',
      label: 'Schedules',
      params: {instanceName: this.getParams().instanceName}
    }]
  },

  render: function () {
    return (
      <div>Classes</div>
    );
  }

});