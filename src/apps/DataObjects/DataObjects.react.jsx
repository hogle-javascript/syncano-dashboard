var React       = require('react'),
    HeaderMixin = require('../Header/HeaderMixin');


module.exports = React.createClass({

  displayName: 'DataObjects',
  mixins: [HeaderMixin],

  headerBreadcrumbs: [{
    route: 'instances',
    label: 'Instances'
  }],

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