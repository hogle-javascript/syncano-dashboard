import moment from 'moment';

export default {
  listTotalDailyUsage(instanceName) {
    const accountKey = this.NewLibConnection.getAccountKey();
    let config = {
      method: 'get',
      baseURL: SYNCANO_BASE_URL,
      url: '/v1.1/usage/daily/',
      params: {
        api_key: accountKey,
        total: true,
        start: moment().startOf('month').format('YYYY-MM-DD'),
        end: moment().endOf('month').format('YYYY-MM-DD')
      }
    };

    if (!instanceName || instanceName !== 'all') {
      config.params.instance = instanceName;
      delete config.params.total;
    }

    this.Promise
      .request(config)
      .then((response) => this.completed(response.data.objects))
      .catch(this.failure);

    // We need to back to library call after DailyUsage will handle custom filtering
    // this.NewLibConnection
    //   .DailyUsage
    //   .please()
    //   .list({}, { instance: 'empty-dream-2074' })
    //   .currentMonth()
    //   .total()
    //   .then(this.completed)
    //   .catch(this.failure);
  }
};
