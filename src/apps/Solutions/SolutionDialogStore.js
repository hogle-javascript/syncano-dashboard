import Reflux from 'reflux';

// Utils & Mixins
import StoreFormMixin from '../../mixins/StoreFormMixin';
import DialogStoreMixin from '../../mixins/DialogStoreMixin';

//Stores & Actions
import SessionStore from '../Session/SessionStore';
import SolutionsActions from './SolutionsActions';

export default Reflux.createStore({
  listenables : SolutionsActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
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
    SolutionsActions.fetchSolutions();
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
    SolutionsActions.fetchSolutions();
  }

});
