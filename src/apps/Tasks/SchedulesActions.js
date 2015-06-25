var Reflux     = require('reflux'),

    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;


var SchedulesActions = Reflux.createActions({
  checkItem    : {},
  uncheckAll   : {},
  fetch        : {},
  getSchedules : {},
  setSchedules : {},

  fetchSchedules: {
      asyncResult : true,
      children    : ['completed', 'failure']
  },
  createSchedule: {
      asyncResult : true,
      asyncForm   : true,
      children    : ['completed', 'failure']
  },
  updateSchedule: {
      asyncResult : true,
      asyncForm   : true,
      children    : ['completed', 'failure']
  },
  removeSchedules: {
      asyncResult : true,
      children    : ['completed', 'failure']
  }


});

SchedulesActions.createSchedule.listen( function(payload) {
  console.info('SchedulesActions::createSchedule', payload);
  Connection
    .Schedules
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});

SchedulesActions.fetchSchedules.listen( function(payload) {
  console.info('SchedulesActions::fetchSchedules');
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
  console.info('SchedulesActions::removeSchedules');
  var promises = schedules.map(function (schedule) {
    return Connection.Schedules.remove(schedule.id);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

module.exports = SchedulesActions;