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

  removeFullBackups(backups) {
    const promises = backups.map((backup) =>
      this.NewLibConnection
        .FullBackup
        .please()
        .delete({id: backup.id})
    );

    this.Promise.all(promises)
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
  },

  removePartialBackups(backups) {
    const promises = backups.map((backup) =>
      this.NewLibConnection
        .PartialBackup
        .please()
        .delete({id: backup.id})
    );

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  restoreFromBackup(backup) {
    this.NewLibConnection
      .Restore
      .please()
      .restore({}, {backup: backup.id})
      .then(this.completed)
      .catch(this.failure);
  }
};
