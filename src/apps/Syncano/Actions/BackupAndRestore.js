export default {
  listFullBackups() {
    this.NewLibConnection
      .FullBackup
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  listPartialBackups() {
    this.NewLibConnection
      .PartialBackup
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  }
};
