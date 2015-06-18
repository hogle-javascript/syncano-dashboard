var React                    = require('react'),
    Reflux                   = require('reflux'),
    Router                   = require('react-router'),

    // Utils
    HeaderMixin              = require('../Header/HeaderMixin'),
    ButtonActionMixin        = require('../../mixins/ButtonActionMixin'),
    DialogsMixin             = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin        = require('../../mixins/InstanceTabsMixin'),

    // Stores and Actions
    SessionActions           = require('../Session/SessionActions'),
    SessionStore             = require('../Session/SessionStore'),

    SchedulesActions         = require('./SchedulesActions'),
    SchedulesStore           = require('./SchedulesStore'),
    TriggersActions          = require('./TriggersActions'),
    TriggersStore            = require('./TriggersStore'),

    // Components
    mui                      = require('material-ui'),
    FloatingActionButton     = mui.FloatingActionButton,
    Dialog                   = mui.Dialog,
    Container                = require('../../common/Container/Container.react'),
    FabList                  = require('../../common/Fab/FabList.react'),
    ColorIconPickerDialog    = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    SchedulesList            = require('./SchedulesList.react'),
    TriggersList             = require('./TriggersList.react'),
    SchedulesAddDialog       = require('./SchedulesAddDialog.react'),
    TriggersAddDialog        = require('./TriggersAddDialog.react');


module.exports = React.createClass({

  displayName: 'Tasks',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(SchedulesStore),
    Reflux.connect(TriggersStore, 'invitations'),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Schedules::componentWillUpdate');
    // Merging "hideDialogs
    this.hideDialogs(nextState.hideDialogs || nextState.invitations.hideDialogs);
  },

  componentWillMount: function() {
    console.info('Schedules::componentWillMount');
    SchedulesStore.refreshData();
    TriggersStore.refreshData();
  },

  getStyles: function() {
    return {
      fabListTop: {
        top: 200
      },
      fabListButton: {
        margin: '5px 0'
      },
      fabListBottom: {
        bottom: 100
      }
    }
  },
  // Dialogs config
  initDialogs: function () {

    return [
      // Triggers
      {
        dialog: TriggersAddDialog,
        params: {
          ref  : "addTriggerDialog",
          mode : "add"
        }
      },
      {
        dialog: TriggersAddDialog,
        params: {
          ref  : "editTriggerDialog",
          mode : "edit"
        }
      },
      {
        dialog: Dialog,
        params: {
          ref:    "removeTriggerDialog",
          title:  "Delete Trigger",
          actions: [
            {
              text    : 'Cancel',
              onClick : this.handleCancel},
            {
              text    : "Yes, I'm sure",
              onClick : this.handleRemoveTriggers}
          ],
          modal: true,
          children: 'Do you really want to delete ' + TriggersStore.getCheckedItems().length +' triggers?'
        }
      },

      // Schedules
      {
        dialog: SchedulesAddDialog,
        params: {
          ref  : "addScheduleDialog",
          mode : "add"
        }
      },
      {
        dialog: SchedulesAddDialog,
        params: {
          ref  : "editScheduleDialog",
          mode : "edit"
        }
      },
      {
        dialog: Dialog,
        params: {
          ref:    "removeScheduleDialog",
          title:  "Delete Schedule",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Yes, I'm sure", onClick: this.handleRemoveSchedules}
          ],
          modal: true,
          children: 'Do you really want to delete ' + SchedulesStore.getCheckedItems().length +' schedule?'
        }
      }
    ]
  },

  handleRemoveTriggers: function() {
    console.info('Schedules::handleDelete');
    TriggersActions.removeTriggers(TriggersStore.getCheckedItems());
  },

  handleRemoveSchedules: function() {
    console.info('Schedules::handleRemoveSchedules');
    SchedulesActions.removeSchedules(SchedulesStore.getCheckedItems());
  },

  uncheckAll: function() {
    console.info('Schedules::uncheckAll');
    SchedulesActions.uncheckAll();
    TriggersActions.uncheckAll();
  },

  render: function () {

    var styles = this.getStyles();

    var checkedSchedules      = SchedulesStore.getNumberOfChecked(),
        checkedTriggers       = TriggersStore.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <FabList
          style={{top: 200, display: checkedSchedules ? 'block': 'none'}}>

          <FloatingActionButton
            label         = "Click here to unselect all" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.uncheckAll}
            iconClassName = "synicon-checkbox-multiple-marked-outline" />

          <FloatingActionButton
            label         = "Click here to delete Schedules" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.showDialog('removeScheduleDialog')}
            iconClassName = "synicon-delete" />

          <FloatingActionButton
            label         = "Click here to edit Schedule" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            disabled      = {checkedSchedules > 1}
            onClick       = {this.showDialog('editScheduleDialog')}
            iconClassName = "synicon-pencil" />

        </FabList>

        <FabList
          style={{top: 200, display: checkedTriggers ? 'block': 'none'}}>

          <FloatingActionButton
            label         = "Click here to unselect all" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.uncheckAll}
            iconClassName = "synicon-checkbox-multiple-marked-outline" />

          <FloatingActionButton
            label         = "Click here to delete Schedules" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.showDialog('removeTriggerDialog')}
            iconClassName = "synicon-delete" />

          <FloatingActionButton
            label         = "Click here to edit Trigger" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            disabled      = {checkedSchedules > 1}
            onClick       = {this.showDialog('editTriggerDialog')}
            iconClassName = "synicon-pencil" />

        </FabList>

        <FabList style={styles.fabListBottom}>
          <FloatingActionButton
            label         = "Click here to create schedule" // TODO: extend component
            style         = {styles.fabListButton}
            color         = "" // TODO: extend component
            onClick       = {this.showDialog('addScheduleDialog')}
            iconClassName = "synicon-camera-timer" />
          <FloatingActionButton
            label         = "Click here to create Trigger" // TODO: extend component
            style         = {styles.fabListButton}
            color         = "" // TODO: extend component
            onClick       = {this.showDialog('addTriggerDialog')}
            iconClassName = "synicon-arrow-up-bold" />

        </FabList>

        <SchedulesList
          name                 = "Schedules"
          checkItem            = {SchedulesActions.checkItem}
          isLoading            = {SchedulesActions.isLoading}
          items                = {this.state.items}
          emptyItemHandleClick = {this.showDialog('addScheduleDialog')}
          emptyItemContent     = "Create a Schedule" />

        <TriggersList
          name                 = "Triggers"
          checkItem            = {TriggersActions.checkItem}
          isLoading            = {TriggersActions.isLoading}
          items                = {this.state.invitations.items}
          emptyItemHandleClick = {this.showDialog('addTriggerDialog')}
          emptyItemContent     = "Create a Trigger" />

      </Container>
    );
  }

});