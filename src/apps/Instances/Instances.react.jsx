var React  = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    Radium = require('radium'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),
    DialogsMixin      = require('../../mixins/DialogsMixin'),

    // Stores and Actions
    SessionActions   = require('../Session/SessionActions'),
    SessionStore     = require('../Session/SessionStore'),
    InstancesActions = require('./InstancesActions'),
    InstancesStore   = require('./InstancesStore'),

    // Components
    mui                   = require('material-ui'),
    Dialog                = mui.Dialog,
    Container             = require('../../common/Container/Container.react'),
    FloatingActionButton  = require('../../common/Fab/Fab.react'),
    FabList               = require('../../common/Fab/FabList.react'),
    ColorIconPickerDialog = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    InstancesList = require('./InstancesList.react'),
    AddDialog     = require('./InstancesAddDialog.react');


require('./Instances.sass');


module.exports = Radium(React.createClass({

  displayName: 'Instances',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(InstancesStore),
    HeaderMixin,
    DialogsMixin
  ],


  // Dialogs config
  initDialogs: function () {

    var checkedItemIconColor = InstancesStore.getCheckedItemIconColor();

    return [{
      dialog: AddDialog,
      params: {
        ref  : "addInstanceDialog",
        mode : "add"
      }
    }, {
      dialog: AddDialog,
      params: {
        ref  : "editInstanceDialog",
        mode : "edit"
      }
    },{
      dialog: ColorIconPickerDialog,
      params: {
        ref          : "pickColorIconDialog",
        mode         : "add",
        initialColor : checkedItemIconColor.color,
        initialIcon  : checkedItemIconColor.icon,
        handleClick  : this.handleChangePalette
      }
    },{
      dialog: Dialog,
      params: {
        ref:    "deleteInstanceDialog",
        title:  "Delete an Instance",
        actions: [
          {text: 'Cancel', onClick: this.handleCancel},
          {text: "Confirm", onClick: this.handleDelete}
        ],
        modal: true,
        children: 'Do you really want to delete ' + InstancesStore.getCheckedItems().length +' Instance(s)?'
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
        label  : 'Instances',
        route  : 'instances'
      }, {
        label : 'Solutions',
        route : 'dashboard'
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

  handleDelete: function() {
    console.info('Instances::handleDelete');
    InstancesActions.removeInstances(InstancesStore.getCheckedItems());
  },

  handleItemClick: function(instanceName) {
    // Redirect to main instance screen
    SessionActions.setInstance(instanceName);
    this.transitionTo('instance', {instanceName: instanceName});
  },

  // List filters
  filterMyInstances: function(item) {
    return item.owner.email === SessionStore.user.email;
  },

  filterOtherInstances: function(item) {
    return item.owner.email !== SessionStore.user.email;
  },

  getStyles: function() {
    return {
      fabListTop: {
        top: 200
      },
      fabListTopButton: {
        margin: '5px 0'
      },
      fabListBottom: {
        bottom: 100
      }
    }
  },

  render: function () {

    var checkedInstances = InstancesStore.getNumberOfChecked(),
        styles = this.getStyles();

    return (
      <Container>
        {this.getDialogs()}

        <FabList
          style={[styles.fabListTop, {display: checkedInstances ? 'flex': 'none'}]}>

          <FloatingActionButton
            style         = {styles.fabListTopButton}
            label         = "Click here to unselect Instances" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {InstancesActions.uncheckAll}
            iconClassName = "synicon-checkbox-multiple-marked-outline" />

          <FloatingActionButton
            style         = {styles.fabListTopButton}
            label         = "Click here to delete Instances" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.showDialog('deleteInstanceDialog')}
            iconClassName = "synicon-delete" />

          <FloatingActionButton
            style         = {styles.fabListTopButton}
            label         = "Click here to edit Instance" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            disabled      = {checkedInstances > 1}
            onClick       = {this.showDialog('editInstanceDialog')}
            iconClassName = "synicon-pencil" />

          <FloatingActionButton
            style         = {styles.fabListTopButton}
            label         = "Click here to customize Instances" // TODO: extend component
            color         = "" // TODO: extend component
            secondary     = {true}
            mini          = {true}
            disabled      = {checkedInstances > 1}
            onClick       = {this.showDialog('pickColorIconDialog')}
            iconClassName = "synicon-palette" />

        </FabList>

        <FabList
          style={styles.fabListBottom}>
          <FloatingActionButton
            label         = "Click here to add Instances" // TODO: extend component
            color         = "" // TODO: extend component
            onClick       = {this.showDialog('addInstanceDialog')}
            iconClassName = "synicon-plus" />
        </FabList>

        <InstancesList
          name                 = "My instances"
          items                = {this.state.instances}
          filter               = {this.filterMyInstances}
          listType             = "myInstances"
          viewMode             = "stream"
          emptyItemHandleClick = {this.showDialog('addInstanceDialog')}
          emptyItemContent     = "Create an instance" />

        <InstancesList
          name                 = "Shared with me"
          items                = {this.state.instances}
          filter               = {this.filterOtherInstances}
          listType             = "sharedInstances"
          viewMode             = "stream" />

      </Container>
    );
  }

}));
