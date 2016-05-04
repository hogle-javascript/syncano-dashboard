export default {
  create(payload) {
    this.NewLibConnection
      .Schedule
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  get(scheduleId) {
    this.NewLibConnection
      .Schedule
      .please()
      .get({id: scheduleId})
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.NewLibConnection
      .Schedule
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, payload) {
    this.NewLibConnection
      .Schedule
      .please()
      .update({id}, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(schedules) {
    const promises = schedules.map((schedule) => {
      return this.NewLibConnection.Schedule.please().delete({id: schedule.id});
    });

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  listTraces(scheduleId) {
    this.NewLibConnection
      .ScheduleTrace
      .please()
      .list({scheduleId})
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  }
};
