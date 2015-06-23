var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var SchedulesActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},

  'getSchedules': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'createSchedule': {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure']
  },
  'updateSchedule': {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure']
  },
  'removeSchedules': {
      asyncResult: true,
      children: ['completed', 'failure']
  },


});

SchedulesActions.createSchedule.listen( function(payload) {
  console.info('SchedulesActions::createSchedule', payload);
  Connection
    .Schedules
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});

SchedulesActions.getSchedules.listen( function(payload) {
  console.info('SchedulesActions::getSchedules');
  Connection
    .Schedules
    .list()
    .then(this.completed)
    .catch(this.failure);
});

SchedulesActions.updateSchedule.listen( function(id, payload) {
  console.info('SchedulesActions::updateSchedule');
  Connection
    .Schedules
    .update(id, payload)
    .then(this.completed)
    .catch(this.failure);
});

SchedulesActions.removeSchedules.listen( function(schedules) {
  schedules.map(function(schedule) {
    console.info('SchedulesActions::removeSchedules');
    Connection
      .Schedules
      .remove(schedule.id)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = SchedulesActions;