var React          = require('react'),
    Reflux         = require('reflux'),
    Router         = require('react-router'),

    // Utils
    HeaderMixin    = require('../Header/HeaderMixin'),

    // Stores and Actions
    SessionActions = require('../Session/SessionActions'),
    SessionStore   = require('../Session/SessionStore'),

    // Components
    Container      = require('../../common/Container/Container.react'),
    SolutionsList  = require('./SolutionsList.react');


module.exports = React.createClass({

  displayName: 'Solutions',

  mixins: [
    Router.State,
    Router.Navigation,

    HeaderMixin
  ],

  headerMenuItems: function() {
    return [
      {
        label  : 'Instances',
        route  : 'instances'
      }, {
        label : 'Solutions',
        route : 'solutions'
      }];
  },

  render: function() {
    return (
      <Container id='solutions'>
        <div className="container">
          <SolutionsList />
        </div>
      </Container>
    );
  }
});
