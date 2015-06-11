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
    
    return [{
      route: 'instances',
      label: 'Instances',
    }, {
      route: 'instance',
      label: this.getParams().instanceName,
      params: {instanceName: this.getParams().instanceName}
    }, {
      route: 'admins',
      params: {instanceName: this.getParams().instanceName},
      label: 'Admins',
    }];
  },

  render: function () {
    return (
      <div>Admins</div>
    );
  }

});