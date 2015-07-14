var React            = require('react'),
    Reflux           = require('reflux'),
    Router           = require('react-router'),
    RouteHandler     = Router.RouteHandler,

    // Utils
    HeaderMixin      = require('../Header/HeaderMixin'),

    // Stores and Actions
    SessionActions   = require('../Session/SessionActions'),
    SessionStore     = require('../Session/SessionStore'),
    SolutionsStore   = require('./SolutionsStore'),
    SolutionsActions = require('./SolutionsActions'),

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
    Reflux.connect(SolutionsStore)
  ],

  showSolutionDialog: function() {
    SolutionsActions.showDialog();
  },

  componentWillMount: function() {
    console.info('Solutions::componentWillMount');
    SolutionsActions.fetch();
  },

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

  handleTabActive: function(tab) {
    this.transitionTo(tab.props.route, tab.props.params);
  },

  render: function() {
    return (
      <div id='solutions'>
        <SolutionDialog />

        <FabList>
          <FabListItem
            label         = "Click here to create Solution"
            onClick       = {this.showSolutionDialog}
            iconClassName = "synicon-plus" />
        </FabList>


        <SolutionsList items={this.state.items}/>

      </div>
    );
  }
});
