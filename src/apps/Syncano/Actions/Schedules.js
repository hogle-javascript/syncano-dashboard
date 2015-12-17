import _ from 'lodash';

export default {
  create(payload) {
    this.Connection
      .Schedules
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  get(scheduleId) {
    this.Connection
      .Schedules
      .get(scheduleId)
      .then(this.completed)
      .catch(this.failure);
  },

  list(params = {}) {
    if (!_.keys(params).includes('ordering')) {
      _.assign(params, {ordering: 'desc'});
    }
    this.Connection
      .Schedules
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, payload) {
    this.Connection
      .Schedules
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(schedules) {
    let promises = schedules.map((schedule) => {
      return this.Connection.Schedules.remove(schedule.id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  listTraces(scheduleId) {
    this.Connection
      .Schedules
      .traces(scheduleId, {ordering: 'desc'})
      .then(this.completed)
      .catch(this.failure);
  }
};
