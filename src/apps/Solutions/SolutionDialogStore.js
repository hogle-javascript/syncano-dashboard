import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import SessionStore from '../Session/SessionStore';
import Actions from './SolutionsActions';

export default Reflux.createStore({
  listenables : Actions,
  mixins      : [
    Mixins.StoreForm,
    Mixins.DialogStore
  ],

  getInitialState() {
    return {
      name        : null,
      description : null
    };
  },

  init() {
    this.listenToForms();
  },

  onCreateSolutionCompleted(solution) {
    console.debug('SolutionDialogStore::onCreateSolutionCompleted');
    this.dismissDialog();
    Actions.fetchSolutions();
    SessionStore.getRouter().transitionTo(
      'solutions-edit',
      {
        solutionId : solution.id
      }
    );
  },

  onUpdateSolutionCompleted() {
    console.debug('SolutionDialogStore::onUpdateSolutionCompleted');
    this.dismissDialog();
    Actions.fetchSolutions();
  }
});
