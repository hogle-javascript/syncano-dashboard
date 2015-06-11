var React       = require('react'),
    State       = require('react-router').State,
    
    HeaderMixin = require('../Header/HeaderMixin');

module.exports = React.createClass({

  displayName: 'ApiKeys',

  mixins: [
    State,
    HeaderMixin,
  ],

  headerBreadcrumbs: function () {
    
    return [{
      route: 'instances',
      label: 'Instances',
    }, {
      route: 'instance',
      label: this.getParams().instanceName,
      params: {instanceName: this.getParams().instanceName}
    }, {
      route: 'api-keys',
      params: {instanceName: this.getParams().instanceName},
      label: 'API Keys',
    }];
  },

  render: function () {
    return (
      <div>Classes</div>
    );
  }

});