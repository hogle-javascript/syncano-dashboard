var React                 = require('react'),
    Reflux                = require('reflux'),
    Router                = require('react-router'),

    // Utils
    HeaderMixin           = require('../Header/HeaderMixin'),
    ButtonActionMixin     = require('../../mixins/ButtonActionMixin'),
    DialogsMixin          = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin     = require('../../mixins/InstanceTabsMixin'),
    Show                  = require('../../common/Show/Show.react'),

    // Stores and Actions
    SessionActions        = require('../Session/SessionActions'),
    SessionStore          = require('../Session/SessionStore'),
    SchedulesActions      = require('./SchedulesActions'),
    SchedulesStore        = require('./SchedulesStore'),
    TriggersActions       = require('./TriggersActions'),
    TriggersStore         = require('./TriggersStore'),

    // Components
    mui                   = require('material-ui'),
    Dialog                = mui.Dialog,
    Container             = require('../../common/Container/Container.react'),
    FabList               = require('../../common/Fab/FabList.react'),
    FabListItem           = require('../../common/Fab/FabListItem.react'),
    ColorIconPickerDialog = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),
    Loading               = require('../../common/Loading/Loading.react'),

    // Local components
    SchedulesList         = require('./SchedulesList.react'),
    TriggersList          = require('./TriggersList.react'),
    ScheduleDialog        = require('./ScheduleDialog.react'),
    TriggerDialog         = require('./TriggerDialog.react');

module.exports = React.createClass({

  displayName: 'Tasks',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(SchedulesStore, 'schedules'),
    Reflux.connect(TriggersStore, 'triggers'),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Tasks::componentWillUpdate');
    // Merging "hideDialogs
    this.hideDialogs(nextState.hideDialogs || nextState.triggers.hideDialogs);
  },

  componentDidMount: function() {
    console.info('Tasks::componentDidMount');
    SchedulesStore.fetch();
    TriggersStore.fetch();
  },

  // Dialogs config
  initDialogs: function() {

    var checkedTriggers  = TriggersStore.getCheckedItems(),
        checkedSchedules = SchedulesStore.getCheckedItems();

    return [
      {
        dialog: Dialog,
        params: {
          ref:    'removeTriggerDialog',
          title:  'Delete Trigger',
          actions: [
            {
              text    : 'Cancel',
              onClick : this.handleCancel},
            {
              text    : 'Yes, I\'m sure',
              onClick : this.handleRemoveTriggers}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedTriggers) + ' Trigger(s)?',
            this.getDialogList(checkedTriggers, 'label'),
            <Loading
              type     = 'linear'
              position = 'bottom'
              show     = {this.state.triggers.isLoading} />
          ]
        }
      },
      {
        dialog: Dialog,
        params: {
          ref:    'removeScheduleDialog',
          title:  'Delete Schedule',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Yes, I\'m sure', onClick: this.handleRemoveSchedules}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedSchedules) + ' Schedule(s)?',
            this.getDialogList(checkedSchedules, 'label'),
            <Loading
              type     = 'linear'
              position = 'bottom'
              show     = {this.state.schedules.items.isLoading} />
          ]
        }
      }
    ]
  },

  handleRemoveTriggers: function() {
    console.info('Tasks::handleDelete');
    TriggersActions.removeTriggers(TriggersStore.getCheckedItems());
  },

  handleRemoveSchedules: function() {
    console.info('Tasks::handleRemoveSchedules');
    SchedulesActions.removeSchedules(SchedulesStore.getCheckedItems());
  },

  uncheckAll: function() {
    console.info('Tasks::uncheckAll');
    SchedulesActions.uncheckAll();
    TriggersActions.uncheckAll();
  },

  checkSchedule: function(id, state) {
    console.info('Tasks::checkSchedule');
    SchedulesActions.checkItem(id, state);
    TriggersActions.uncheckAll();
  },

  checkTrigger: function(id, state) {
    console.info('Tasks::checkSchedule');
    TriggersActions.checkItem(id, state);
    SchedulesActions.uncheckAll();
  },

  showScheduleDialog: function() {
    SchedulesActions.showDialog();
  },

  showScheduleEditDialog: function() {
    SchedulesActions.showDialog(SchedulesStore.getCheckedItem());
  },

  showTriggerDialog: function() {
    TriggersActions.showDialog();
  },

  showTriggerEditDialog: function() {
    TriggersActions.showDialog(TriggersStore.getCheckedItem());
  },

  render: function() {
    var checkedSchedules      = SchedulesStore.getNumberOfChecked(),
        checkedTriggers       = TriggersStore.getNumberOfChecked(),
        isAnyScheduleSelected = checkedSchedules >= 1 && checkedSchedules < (this.state.schedules.items.length),
        isAnyTriggerSelected  = checkedTriggers >= 1 && checkedTriggers < (this.state.triggers.items.length);

    return (
      <Container>
        <TriggerDialog />
        <ScheduleDialog />
        {this.getDialogs()}

        <Show if={checkedSchedules > 0}>
          <FabList position="top">

            <FabListItem
              label         = {isAnyScheduleSelected ? "Click here to select all" : "Click here to unselect all"}
              mini          = {true}
              onClick       = {isAnyScheduleSelected ? SchedulesActions.selectAll : SchedulesActions.uncheckAll}
              iconClassName = {isAnyScheduleSelected ? "synicon-checkbox-multiple-marked-outline" : "synicon-checkbox-multiple-blank-outline"} />

            <FabListItem
              label         = "Click here to delete Schedules"
              mini          = {true}
              onClick       = {this.showDialog('removeScheduleDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit Schedule"
              mini          = {true}
              disabled      = {checkedSchedules > 1}
              onClick       = {this.showScheduleEditDialog}
              iconClassName = "synicon-pencil" />

          </FabList>
        </Show>

        <Show if={checkedTriggers > 0}>

          <FabList position="top">

            <FabListItem
              label         = {isAnyTriggerSelected ? "Click here to select all" : "Click here to unselect all"}
              mini          = {true}
              onClick       = {isAnyTriggerSelected ? TriggersActions.selectAll : TriggersActions.uncheckAll}
              iconClassName = {isAnyTriggerSelected ? "synicon-checkbox-multiple-marked-outline" : "synicon-checkbox-multiple-blank-outline"} />

            <FabListItem
              label         = "Click here to delete Schedules"
              mini          = {true}
              onClick       = {this.showDialog('removeTriggerDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit Trigger"
              mini          = {true}
              disabled      = {checkedSchedules > 1}
              onClick       = {this.showTriggerEditDialog}
              iconClassName = "synicon-pencil" />

          </FabList>
        </Show>

        <FabList>

          <FabListItem
            label         = "Click here to create schedule"
            onClick       = {this.showScheduleDialog}
            iconClassName = "synicon-camera-timer" />

          <FabListItem
            label         = "Click here to create Trigger"
            onClick       = {this.showTriggerDialog}
            iconClassName = "synicon-arrow-up-bold" />

        </FabList>

        <SchedulesList
          name                 = "Schedules"
          checkItem            = {this.checkSchedule}
          isLoading            = {this.state.schedules.isLoading}
          items                = {this.state.schedules.items}
          emptyItemHandleClick = {this.showScheduleDialog}
          emptyItemContent     = "Create a Schedule" />

        <TriggersList
          name                 = "Triggers"
          checkItem            = {this.checkTrigger}
          isLoading            = {this.state.triggers.isLoading}
          items                = {this.state.triggers.items}
          emptyItemHandleClick = {this.showTriggerDialog}
          emptyItemContent     = "Create a Trigger" />

      </Container>
    );
  }

});
