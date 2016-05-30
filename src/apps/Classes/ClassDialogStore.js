import Reflux from 'reflux';

import {StoreFormMixin, DialogStoreMixin, WaitForStoreMixin} from '../../mixins';

import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Actions from './ClassesActions';

export default Reflux.createStore({
  listenables: [
    Actions,
    SessionActions
  ],

  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      name: null,
      group_permissions: 'create_objects',
      other_permissions: 'create_objects',
      fields: [],
      metadata: {}
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
    Actions.fetchClasses();
  },

  onSetInstance() {
    this.refreshData();
  },

  onGetClassCompleted(payload) {
    this.trigger(payload);
  },

  onCreateClassCompleted() {
    console.debug('ClassDialogStore::onCreateClassCompleted');
    this.dismissDialog();
    this.refreshData();
    SessionStore.getRouter().push({name: 'classes', params: SessionStore.getParams()});
  },

  onUpdateClassCompleted() {
    console.debug('ClassDialogStore::onUpdateClassCompleted');
    this.dismissDialog();
    this.refreshData();
    SessionStore.getRouter().push({name: 'classes', params: SessionStore.getParams()});
  }
});
