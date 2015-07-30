import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import SchedulesActions from './SchedulesActions';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';
import CodeBoxesStore from '../CodeBoxes/CodeBoxesStore';

export default Reflux.createStore({
  listenables : SchedulesActions,
  mixins      : [
    Mixins.StoreForm,
    Mixins.DialogStore
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
      label     : null,
      crontab   : null,
      codebox   : null,
      codeboxes : [
        {payload: '', text: 'Loading...'}
      ]
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(CodeBoxesActions.setCodeBoxes, this.getCodeBoxesDropdown);
  },

  getCodeBoxesDropdown() {
    console.debug('ScheduleDialogStore::getCodeBoxesDropdown');
    let codeboxes = CodeBoxesStore.getCodeBoxesDropdown();

    if (codeboxes.length === 0) {
      codeboxes = [{payload: '', text: 'No codeboxes, add one first'}];
    }

    this.trigger({codeboxes: codeboxes});
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
