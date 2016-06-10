import Reflux from 'reflux';

// Utils & Mixins
import {CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin} from '../../../mixins';

// Stores & Actions
import SessionActions from '../../Session/SessionActions';
import Actions from './PartialBackupsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('PartialBackupsStore::refreshData');
    Actions.fetchPartialBackups();
  },

  onFetchPartialBackupsCompleted(items) {
    console.debug('PartialBackupsStore::onFetchPartialBackupsCompleted');
    this.data.items = items;
    this.trigger(this.data);
  },

  onRemovePartialBackupsCompleted() {
    console.debug('PartialBackupsStore::onRemovePartialBackupsCompleted');
    this.refreshData();
  }
});
