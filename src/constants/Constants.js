var host, api;
host = 'https://api.syncano.rocks';
api = host + '/v1';

module.exports = {

  HOST: host,
  API: api,

  // Views constrains
  VIEW_MODES: ['cards', 'stream'],
  SORT_MODES: [
      'sortByName',
      'sortByDate',
      'sortByFullName',
      'sortByEmail',
      'sortByCodeBoxName',
      'sortByWebHookName',
      'sortByScheduleCreateDate',
      'sortByScheduleName',
      'sortByTriggerName',
      'sortByTriggerCreateDate',
      'sortByAPIKeyDescription',
      'sortByAPIKeyCreationDate',
      'sortByClassCreateDate',
      'sortByClassName'

  ],

  VIEW_ACTIONS_MAP: {
    sortByName: 'id',
    sortByDate: 'data.created_at',
    switchToListView: 'stream',
    switchToCardView: 'cards',
    sortByFullName: 'fullname',
    sortByEmail: 'data.email',
    sortByCodeBoxName: 'data.name',
    sortByWebHookName: 'data.slug',
    sortByScheduleCreateDate: 'data.created_at',
    sortByScheduleName: 'data.name',
    sortByTriggerName: 'data.name',
    sortByTriggerCreateDate: 'data.created_at',
    sortByAPIKeyCreationDate: 'data.created_at',
    sortByAPIKeyDescription: 'data.description',
    sortByClassCreateDate: 'data.created_at',
    sortByClassName: 'data.name'
  }
};
