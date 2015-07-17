export default {
  createSchedule(payload) {
    this.Connection
      .Schedules
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchSchedules() {
    this.Connection
      .Schedules
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateSchedule(id, payload) {
    this.Connection
      .Schedules
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeSchedules(schedules) {

    let promises = schedules.map(schedule => {
      this.Connection.Schedules.remove(schedule.id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
