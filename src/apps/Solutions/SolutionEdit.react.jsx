var React            = require('react'),
    Reflux           = require('reflux'),
    Router           = require('react-router'),

    // Utils
    HeaderMixin      = require('../Header/HeaderMixin'),
    DialogsMixin     = require('../../mixins/DialogsMixin'),

    // Stores and Actions
    SessionActions      = require('../Session/SessionActions'),
    InstancesActions    = require('../Instances/InstancesActions'),
    SessionStore        = require('../Session/SessionStore'),
    SolutionsActions    = require('./SolutionsActions'),

    SolutionEditActions = require('./SolutionEditActions'),
    SolutionEditStore   = require('./SolutionEditStore'),

    // Components
    mui              = require('material-ui'),
    Avatar           = mui.Avatar,
    Toolbar          = mui.Toolbar,
    ToolbarGroup     = mui.ToolbarGroup,
    ToolbarTitle     = mui.ToolbarTitle,
    IconButton       = mui.IconButton,
    FontIcon         = mui.FontIcon,
    Tabs             = mui.Tabs,
    Dialog           = mui.Dialog,
    Tab              = mui.Tab,
    Container        = require('../../common/Container/Container.react'),
    FabList          = require('../../common/Fab/FabList.react'),
    FabListItem      = require('../../common/Fab/FabListItem.react'),

    SolutionVersionsList   = require('./SolutionVersionsList.react'),
    SolutionDialog         = require('./SolutionDialog.react'),
    SolutionVersionDialog = require('./SolutionVersionDialog.react'),

    SolutionStar          = require('../../common/SolutionStar/SolutionStar.react');

module.exports = React.createClass({

  displayName: 'SolutionEdit',

  mixins: [
    Router.State,
    Router.Navigation,

    DialogsMixin,
    HeaderMixin,

    Reflux.connect(SolutionEditStore)
  ],

  componentDidMount: function() {
    console.info('SolutionEdit::componentDidMount');
    InstancesActions.fetch();
    SolutionEditActions.fetch();
  },

  //Dialogs config
  initDialogs: function() {
    return [{
      dialog: Dialog,
      params: {
        key:    'deleteSolutionDialog',
        ref:    'deleteSolutionDialog',
        title:  'Delete a Solution',
        actions: [
          {text: 'Cancel', onClick: this.handleCancel},
          {text: 'Confirm', onClick: this.handleDelete}
        ],
        modal: true,
        children: 'Do you really want to delete this Solution?'
      }
    }]
  },

  handleDelete: function() {
    console.info('SolutionEdit::handleDelete');
    SolutionEditActions.removeSolution(this.state.item.id).then(
      SessionStore.getRouter().transitionTo('solutions-my')
    );
  },

  showSolutionDialog: function() {
    SolutionEditActions.showDialog();
  },

  headerMenuItems: function() {
    return [
      {
        label  : 'Instances',
        route  : 'instances'
      },
      {
        label : 'Solutions',
        route : 'solutions'
      }
    ];
  },

  getStyles: function() {
    return {
      margin: '65px auto',
      width: '80%',
      maxWidth: '1140px'
    };
  },

  handleBackClick: function() {
  },

  showAddSolutionVersionDialog: function() {
    SolutionEditActions.showDialog();
  },

  render: function() {
    return (
      <Container id='solutions'>
        {this.getDialogs()}

        <SolutionVersionDialog />

        <FabList>
          <FabListItem
            label         = "Click here to create Solution"
            onClick       = {this.showSolutionDialog}
            iconClassName = "synicon-plus" />
        </FabList>

        <Toolbar style={{background: 'transparent', padding: '0px'}}>

            <ToolbarGroup float="left" style={{padding: '0px'}}>

              <FontIcon
                style     = {{paddingLeft: 10, paddingTop: 4, paddingRight: 10}}
                className = "synicon-arrow-left"
                onClick   = {this.handleBackClick} />

              <ToolbarTitle text={'Solution: ' + this.state.item.label} />
            </ToolbarGroup>

            <ToolbarGroup float="right">

              <IconButton
                style            = {{fontSize: 25, marginTop: 5}}
                iconClassName    = "synicon-delete"
                tooltip          = "Delete Solution"
                tooltipAlignment = "bottom-left"
                onClick          = {this.showDialog('deleteSolutionDialog')} />

            </ToolbarGroup>

          </Toolbar>

        <div className="container" style={{clear: 'both'}}>

        <div className="row" style={this.getStyles()}>
            <div className="col-flex-1">
              <h5>{this.state.item.label}</h5>
              <div>{this.state.item.description}</div>
               <SolutionStar solution={this.state.item} />
            </div>
            <div className="col-flex-1">
              <div className="row">
                 <div className="col-flex-1">
                    <div>Maciej Kucharz</div>
                    <div>maciej.kucharz@syncano.com</div>
                 </div>

                 <div className="col-flex-1">
                    <Avatar>MK</Avatar>
                 </div>
              </div>
            </div>

          </div>

          <SolutionVersionsList
            name                 = "Versions"
            emptyItemHandleClick = {this.showAddSolutionVersionDialog}
            emptyItemContent     = "Add new Version"/>

        </div>
      </Container>
    );
  }
});
