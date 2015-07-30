import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import SessionActions from '../Session/SessionActions';

import DataViewsActions from '../Data/DataViewsActions';
import WebhooksActions from '../Data/WebhooksActions';
import ClassesActions from '../Classes/ClassesActions';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';
import TriggersActions from '../Tasks/TriggersActions';
import SchedulesActions from '../Tasks/SchedulesActions';
import ChannelsActions from '../Channels/ChannelsActions';

import SolutionEditActions from './SolutionEditActions';
import SolutionVersionDialogActions from './SolutionVersionDialogActions';

export default Reflux.createStore({
  listenables : SolutionVersionDialogActions,
  mixins      : [
    Mixins.StoreForm,
    Mixins.DialogStore
  ],

  getInitialState() {
    return {
      name        : null,
      description : null,
      exportSpec  : {
        //data      : {},
        classes   : {},
        codeboxes : {},
        triggers  : {},
        schedules : {},
        channels  : {}
      }
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(SessionActions.fetchInstance.completed, this.fetchInstanceData);
    this.listenTo(SolutionEditActions.createVersion.completed, this.onCreateVersionCompleted);
  },

  fetchInstanceData() {
    console.debug('SolutionVersionDialogStore::fetchInstanceData');
    //ClassesActions.fetch();
    //DataViewsActions.fetch();
    //WebhooksActions.fetch();
    //CodeBoxesActions.fetch();
    //TriggersActions.fetch();
    //SchedulesActions.fetch();
    //ChannelsActions.fetch();
  },

  onCreateVersionCompleted() {
    console.debug('SolutionVersionDialogStore::onCreateSolutionCompleted');
    this.dismissDialog();
    SolutionEditActions.fetch();
  }
});
