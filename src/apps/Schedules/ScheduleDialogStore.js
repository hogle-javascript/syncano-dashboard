import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin} from '../../mixins';

// Stores & Actions
import SchedulesActions from './SchedulesActions';
import SnippetsActions from '../Snippets/SnippetsActions';
import SnippetsStore from '../Snippets/SnippetsStore';

export default Reflux.createStore({
  listenables: SchedulesActions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  crontabItems: [
    {
      payload: '*/5 * * * *',
      text: 'Run every 5 minutes'
    },
    {
      payload: '0 * * * *',
      text: 'Run once an hour'
    },
    {
      payload: '0 0 * * *',
      text: 'Run once a day at midnight'
    },
    {
      payload: '0 0 * * 0',
      text: 'Run once a week at midnight'
    },
    {
      payload: '0 0 1 * *',
      text: 'Run once a month at midnight'
    },
    {
      payload: '0 0 1 1 *',
      text: 'Run once a year at midnight'
    }
  ],

  getInitialState() {
    return {
      label: null,
      crontab: null,
      snippet: null,
      snippets: [
        {payload: '', text: 'Loading...'}
      ]
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(SnippetsActions.setSnippets, this.getSnippetsDropdown);
  },

  getSnippetsDropdown() {
    console.debug('ScheduleDialogStore::getSnippetsDropdown');
    let snippets = SnippetsStore.getSnippetsDropdown();

    if (snippets.length === 0) {
      snippets = [{payload: '', text: 'No Snippets, add one first'}];
    }

    this.trigger({snippets});
  },

  getCrontabDropdown() {
    return this.crontabItems;
  },

  onCreateScheduleCompleted() {
    console.debug('ScheduleDialogStore::onCreateScheduleCompleted');
    this.dismissDialog();
    SchedulesActions.fetchSchedules();
  },

  onUpdateScheduleCompleted() {
    console.debug('ScheduleDialogStore::onUpdateScheduleCompleted');
    this.dismissDialog();
    SchedulesActions.fetchSchedules();
  }
});
