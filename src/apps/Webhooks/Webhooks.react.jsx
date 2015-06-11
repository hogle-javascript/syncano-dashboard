var React       = require('react'),
    State       = require('react-router').State,
    
    HeaderMixin = require('../Header/HeaderMixin');


module.exports = React.createClass({

  displayName: 'Webhooks',

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
      route: 'webhooks',
      label: 'Webhooks',
      params: {instanceName: this.getParams().instanceName}
    }]
  },

  render: function () {
    return (
      <div>Webhooks</div>
    );
  }

});