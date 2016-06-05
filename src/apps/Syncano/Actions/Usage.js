export default {
  listTotalDailyUsage() {
    this.NewLibConnection
      .DailyUsage
      .please()
      .list()
      .currentMonth()
      .total()
      .then(this.completed)
      .catch(this.failure);
  }
};
