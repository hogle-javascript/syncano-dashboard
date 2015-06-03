var React         = require('react'),
    HeaderActions = require('../Header/HeaderActions'),
    HeaderStore   = require('../Header/HeaderStore');

module.exports = React.createClass({

  displayName: 'Instances',

  componentDidMount: function () {
    HeaderActions.setBreadcrumbs([{
      route: 'instances',
      label: 'Instances'
    }]);
  },

  componentWillUnmount: function () {
    HeaderActions.clearBreadcrumbs();
  },

  render: function () {

    return (
      <div>Instances</div>
    );
  }

});