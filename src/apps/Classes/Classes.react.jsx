var React       = require('react'),
    State       = require('react-router').State,
    
    HeaderMixin = require('../Header/HeaderMixin');


module.exports = React.createClass({

  displayName: 'Classes',

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
      route: 'classes',
      label: 'Classes',
      params: {instanceName: this.getParams().instanceName}
    }]
  },

  render: function () {
    return (
      <div>Classes</div>
    );
  }

});