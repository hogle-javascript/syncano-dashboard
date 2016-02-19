import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin} from '../../mixins';

// Stores & Actions
import SchedulesActions from './SchedulesActions';
import ScriptsActions from '../Scripts/ScriptsActions';
import ScriptsStore from '../Scripts/ScriptsStore';

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
      script: null,
      scripts: [
        {payload: '', text: 'Loading...'}
      ]
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(ScriptsActions.setScripts, this.getScriptsDropdown);
  },

  getScriptsDropdown() {
    console.debug('ScheduleDialogStore::getScriptsDropdown');
    let scripts = ScriptsStore.getScriptsDropdown();

    if (scripts.length === 0) {
      scripts = [{payload: '', text: 'No Scripts, add one first'}];
    }

    this.trigger({scripts});
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
