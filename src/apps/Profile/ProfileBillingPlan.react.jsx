var React                      = require('react'),
    Reflux                     = require('reflux'),

    FormMixin                  = require('../../mixins/FormMixin'),

    Store             = require('./ProfileBillingPlanStore'),
    Actions           = require('./ProfileBillingPlanActions'),

    MUI                        = require('material-ui');

module.exports = React.createClass({

  displayName: 'ProfileBillingAddress',

  mixins: [
    Reflux.connect(Store),
    React.addons.LinkedStateMixin,
    FormMixin
  ],

  componentDidMount: function() {
    Actions.fetch()
  },

  //handleSuccessfullValidation: function () {
  //  ProfileActions.updateBillingProfile(this.state);
  //},

  render: function() {
    return (
      <div>test</div>
    );
  }
});