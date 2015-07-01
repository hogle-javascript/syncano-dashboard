var React                 = require('react'),
    Reflux                = require('reflux'),
    Router                = require('react-router'),
    Radium                = require('radium'),

    // Utils
    HeaderMixin           = require('../Header/HeaderMixin'),
    ButtonActionMixin     = require('../../mixins/ButtonActionMixin'),
    DialogsMixin          = require('../../mixins/DialogsMixin'),
    Show                  = require('../../common/Show/Show.react'),

    // Stores and Actions
    SessionActions        = require('../Session/SessionActions'),
    SessionStore          = require('../Session/SessionStore'),
    InstancesActions      = require('./InstancesActions'),
    InstancesStore        = require('./InstancesStore'),

    // Components
    mui                   = require('material-ui'),
    Dialog                = mui.Dialog,
    Container             = require('../../common/Container/Container.react'),
    FabList               = require('../../common/Fab/FabList.react'),
    FabListItem           = require('../../common/Fab/FabListItem.react'),
    Loading               = require('../../common/Loading/Loading.react'),
    ColorIconPickerDialog = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    InstancesList         = require('./InstancesList.react'),
    InstanceDialog        = require('./InstanceDialog.react');


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
      dialog: ColorIconPickerDialog,
      params: {
        key          : "pickColorIconDialog",
        ref          : "pickColorIconDialog",
        mode         : "add",
        initialColor : checkedItemIconColor.color,
        initialIcon  : checkedItemIconColor.icon,
        handleClick  : this.handleChangePalette
      }
    },{
      dialog: Dialog,
      params: {
        key:    "deleteInstanceDialog",
        ref:    "deleteInstanceDialog",
        title:  "Delete an Instance",
        actions: [
          {text: 'Cancel', onClick: this.handleCancel},
          {text: "Confirm", onClick: this.handleDelete}
        ],
        modal: true,
        children: ['Do you really want to delete ' + InstancesStore.getCheckedItems().length +' Instance(s)?', <Loading type="linear" position="bottom" show={this.state.isLoading} /> ]
      }
     }]
  },

  componentWillMount: function() {
    console.info('Instances::componentWillMount');
    SessionStore.removeInstance();
    InstancesStore.fetch();
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
        route : 'solutions'
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
    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName: instanceName});
  },

  showInstanceDialog: function () {
    InstancesActions.showDialog();
  },

  showInstanceEditDialog: function () {
    InstancesActions.showDialog(InstancesStore.getCheckedItem());
  },

  render: function () {
    var checkedInstances = InstancesStore.getNumberOfChecked();

    return (
      <Container id="instances">
        <InstanceDialog />
        {this.getDialogs()}

        <Show if={checkedInstances > 0}>
          <FabList position="top">

            <FabListItem
              label         = "Click here to unselect Instances"
              mini          = {true}
              onClick       = {InstancesActions.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline" />

            <FabListItem
              label         = "Click here to delete Instances"
              mini          = {true}
              onClick       = {this.showDialog('deleteInstanceDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit Instance"
              mini          = {true}
              disabled      = {checkedInstances > 1}
              onClick       = {this.showInstanceEditDialog}
              iconClassName = "synicon-pencil" />

            <FabListItem
              label         = "Click here to customize Instances"
              secondary     = {true}
              mini          = {true}
              disabled      = {checkedInstances > 1}
              onClick       = {this.showDialog('pickColorIconDialog')}
              iconClassName = "synicon-palette" />

          </FabList>
        </Show>

        <FabList>
          <FabListItem
            label         = "Click here to add Instances"
            onClick       = {this.showInstanceDialog}
            iconClassName = "synicon-plus" />
        </FabList>

        <InstancesList
          name                 = "My instances"
          items                = {InstancesStore.getMyInstances()}
          listType             = "myInstances"
          viewMode             = "stream"
          emptyItemHandleClick = {this.showDialog('addInstanceDialog')}
          emptyItemContent     = "Create an instance" />

        <Show if={InstancesStore.getOtherInstances().length && !this.state.isLoading}>
        <InstancesList
          name                 = "Shared with me"
          items                = {InstancesStore.getOtherInstances()}
          listType             = "sharedInstances"
          viewMode             = "stream" />
        </Show>

      </Container>
    );
  }

}));
