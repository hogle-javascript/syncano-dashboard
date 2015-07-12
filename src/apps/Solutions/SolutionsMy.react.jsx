var React            = require('react'),
    Reflux           = require('reflux'),
    Router           = require('react-router'),

    // Utils
    HeaderMixin      = require('../Header/HeaderMixin'),

    // Stores and Actions
    SessionActions   = require('../Session/SessionActions'),
    SessionStore     = require('../Session/SessionStore'),

    SolutionsMyStore     = require('./SolutionsMyStore'),
    SolutionsMyActions = require('./SolutionsMyActions'),

    // Components
    mui              = require('material-ui'),
    Tabs             = mui.Tabs,
    Tab              = mui.Tab,
    Container        = require('../../common/Container/Container.react'),
    FabList          = require('../../common/Fab/FabList.react'),
    FabListItem      = require('../../common/Fab/FabListItem.react'),

    SolutionsList    = require('./SolutionsList.react'),
    SolutionDialog   = require('./SolutionDialog.react');

module.exports = React.createClass({

  displayName: 'Solutions',

  mixins: [
    Router.State,
    Router.Navigation,

    HeaderMixin,
    Reflux.connect(SolutionsMyStore)
  ],

  componentWillMount: function() {
    console.info('SolutionsList::componentWillMount');
    SolutionsMyActions.fetch();
  },

  //showSolutionDialog: function() {
  //  SolutionsActions.showDialog();
  //},

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
      <Container id='mySolutions'>
        <SolutionsList items={this.state.items}/>
      </Container>
    );
  }
});

