var React       = require('react'),
    HeaderMixin = require('../Header/HeaderMixin');


module.exports = React.createClass({

  displayName: 'Instances',
  mixins: [HeaderMixin],
  headerBreadcrumbs: [{
    route: 'instances',
    label: 'Instances'
  }],

  render: function () {

    return (
      <div>Instances</div>
    );
  }

});