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
    MUI              = require('material-ui'),
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

  getStyles: function() {
    return {
      container: {
        width  : '90%',
        margin : '40px auto'
      },
      sidebar: {
        minWidth: 230
      }
    }
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div id='solutions'>
        <SolutionDialog />

        <FabList>
          <FabListItem
            label         = "Click here to create Solution"
            onClick       = {this.showSolutionDialog}
            iconClassName = "synicon-plus"
          />
        </FabList>

        <div style={styles.container}>
          <div className="row">
            <div style={styles.sidebar}>
              <MUI.List zDepth={1} className="vm-6-b">
                <MUI.ListItem primaryText="All solutions" />
                <MUI.ListItem primaryText="Favorite" />
                <MUI.ListItem primaryText="My solutions" />
              </MUI.List>

              <MUI.List zDepth={1} subheader="Tags">
                <MUI.ListItem primaryText="python" />
                <MUI.ListItem primaryText="socialmedia" />
                <MUI.ListItem primaryText="localization" />
                <MUI.ListItem primaryText="ruby" />
                <MUI.ListItem primaryText="smartphone" />
                <MUI.ListItem primaryText="IoT" />
              </MUI.List>
            </div>
            <div className="col-flex-1">
              <SolutionsList items={this.state.items}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
