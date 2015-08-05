import Reflux from 'reflux';

import StoreFormMixin from '../../mixins/StoreFormMixin';
import Mixins from '../../mixins';

import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Actions from './FormViewActions';

export default Reflux.createStore({
  listenables: [Actions, SessionActions],
  mixins: [
    StoreFormMixin,
    Mixins.WaitForStore
  ],

  getInitialState() {
    return {
      description: null,
      name: null,
      fields: []
    };
  },

  init() {
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData() {
    const router = SessionStore.getRouter();
    if(router !== null) {
      Actions.getClass(router.getCurrentParams().className);
    }
  },

  onSetInstance() {
    this.refreshData()
  },

  onGetClassCompleted(payload) {
    this.trigger(payload)
  },

  onCreateClassCompleted() {
    SessionStore.getRouter().transitionTo(
      'classes',
      SessionStore.getRouter().getCurrentParams()
    );
  },

  onUpdateClassCompleted() {
    SessionStore.getRouter().transitionTo(
      'classes',
      SessionStore.getRouter().getCurrentParams()
    );
  }
});
