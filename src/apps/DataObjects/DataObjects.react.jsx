var React         = require('react'),
    HeaderActions = require('../Header/HeaderActions');


module.exports = React.createClass({

  displayName: 'DataObjects',

  componentDidMount: function () {
    HeaderActions.setBreadcrumbs([
      {
        route: 'dashboard',
        label: 'Home'
      },
      {
        route: 'instances',
        label: 'Instance name'
      }
    ]);

    HeaderActions.setMenuItems([
      {label: 'Data Objects', route: 'instances'},
      {label: 'Classes', route: 'instances'},
    ]);
  },

  componentWillUnmount: function () {
    HeaderActions.clearBreadcrumbs();
    HeaderActions.clearMenuItems();
  },

  render: function () {
    return (
      <div>Data objects</div>
    );
  }

});