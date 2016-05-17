export default {
  listFullBackups() {
    console.error(this.NewLibConnection);
    this.NewLibConnection
      .FullBackup
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  }
};
