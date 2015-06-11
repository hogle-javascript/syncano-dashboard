var React       = require('react'),
    State       = require('react-router').State,
    
    HeaderMixin = require('../Header/HeaderMixin');


module.exports = React.createClass({

  displayName: 'DataObjects',

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
      route: 'data-objects',
      label: 'Data Objects',
      params: {instanceName: this.getParams().instanceName}
    }]
  },

  headerMenuItems: [
    {label: 'Data Objects', route: 'instances'},
    {label: 'Classes', route: 'instances'},
  ],

  render: function () {
    return (
      <div>Data objects</div>
    );
  }

});