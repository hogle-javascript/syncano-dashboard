var React  = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),
    DialogsMixin      = require('../../mixins/DialogsMixin'),

    // Stores and Actions
    SessionStore     = require('../Session/SessionStore'),
    SessionActions   = require('../Session/SessionActions'),
    InstancesActions = require('./InstancesActions'),
    InstancesStore   = require('./InstancesStore'),

    // Components
    mui                   = require('material-ui'),
    FloatingActionButton  = mui.FloatingActionButton,
    Dialog                = mui.Dialog,
    Container             = require('../../common/Container/Container.react'),
    FabList               = require('../../common/Fab/FabList.react'),
    ColorIconPickerDialog = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    InstancesList = require('./InstancesList.react'),
    AddDialog     = require('./InstancesAddDialog.react');


module.exports = React.createClass({

  displayName: 'Instances',

  mixins: [
    Reflux.connect(InstancesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation,
    DialogsMixin
  ],


  // Dialogs config
  initDialogs: function () {

    var checkedItemIconColor = InstancesStore.getCheckedItemIconColor();

    return [{
      dialog: AddDialog,
      params: {
        ref  : "addInstanceDialog",
        mode : "add",
      },
    }, {
      dialog: AddDialog,
      params: {
        ref           : "editInstanceDialog",
        mode          : "edit"
      },
    },{
      dialog: ColorIconPickerDialog,
      params: {
        ref          : "pickColorIconDialog",
        mode         : "add",
        initialColor : checkedItemIconColor.color,
        initialIcon  : checkedItemIconColor.icon,
        handleClick  : this.handleChangePalette
      }
    }]
  },

  componentWillMount: function() {
    console.info('Instances::componentWillMount');
    SessionStore.clearInstance();
    InstancesStore.refreshData();
  },

  componentDidMount: function() {
    console.info('Instances::componentDidMount');
    if (this.getParams().action == 'add'){
      // Show Add modal
      this.showDialog('addInstanceDialog');
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Instances::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  headerMenuItems: function () {
    return [
      {
        label: 'Instances',
        route: 'instances',
      }, {
        label: 'Solutions',
        route: 'dashboard',
      }];
  },

  handleChangePalette: function (color, icon) {
    console.info('Instances::handleChangePalette', color, icon);

    InstancesActions.updateInstance(
      InstancesStore.getCheckedItem().name, {
        metadata: JSON.stringify({
          color : color,
          icon  : icon
        })
      }
    );
    InstancesActions.uncheckAll()
  },

  handleItemClick: function(instanceName) {
    // Redirect to main instance screen
    SessionActions.setInstance(instanceName);
    this.transitionTo('instance', {instanceName: instanceName});
  },

  // List filters
  filterMyInstances: function(item) {
    return item.owner.email === SessionStore.getMyEmail();
  },

  filterOtherInstances: function(item) {
    return item.owner.email !== SessionStore.getMyEmail();
  },

  render: function () {

    var checkedInstances = InstancesStore.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <FabList
          style={{top: 200, display: checkedInstances ? 'block': 'none'}}>

          <FloatingActionButton
            label         = "Click here to unselect Instances" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {InstancesActions.uncheckAll}
            iconClassName = "synicon-checkbox-multiple-marked-outline" />

          <FloatingActionButton
            label         = "Click here to delete Instances" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.showDialog('deleteInstanceDialog')}
            iconClassName = "synicon-delete" />

          <FloatingActionButton
            label         = "Click here to edit Instance" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            disabled      = {checkedInstances > 1}
            onClick       = {this.showDialog('editInstanceDialog')}
            iconClassName = "synicon-pencil" />

          <FloatingActionButton
            label         = "Click here to customize Instances" // TODO: extend component
            color         = "" // TODO: extend component
            secondary     = {true}
            mini          = {true}
            disabled      = {checkedInstances > 1}
            onClick       = {this.showDialog('pickColorIconDialog')}
            iconClassName = "synicon-palette" />

        </FabList>

        <FabList
          style={{bottom: 100}}>
          <FloatingActionButton
            label         = "Click here to add Instances" // TODO: extend component
            color         = "" // TODO: extend component
            onClick       = {this.showDialog('addInstanceDialog')}
            iconClassName = "synicon-plus" />
        </FabList>

        <InstancesList
          name     = "My instances"
          items    = {this.state.instances}
          filter   = {this.filterMyInstances}
          listType = "myInstances"
          viewMode = "stream" />

        <InstancesList
          name     = "Other instances"
          items    = {this.state.instances}
          filter   = {this.filterOtherInstances}
          listType = "otherInstances"
          viewMode = "stream" />

      </Container>
    );
  }

});