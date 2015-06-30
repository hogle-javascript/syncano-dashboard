var React       = require('react'),
    State       = require('react-router').State,
    
    HeaderMixin = require('../Header/HeaderMixin');

module.exports = React.createClass({

  displayName: 'Schedules',

  mixins: [
    HeaderMixin,
    State
  ],

  render: function () {
    return (
      <div>Schedules</div>
    );
  }

});