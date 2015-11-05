import Reflux from 'reflux';

import SessionStore from '../Session/SessionStore';
import HeaderActions from './HeaderActions';

export default Reflux.createStore({
  listenables: HeaderActions,

  getInitialState() {
    return {
      menuItems: [],
      user: SessionStore.getUser({}),
      expandAccountMenu: false
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData(Session) {
    console.debug('HeaderStore::refreshData');

    if (Session.isReady()) {
      this.trigger({user: Session.getUser()});
    }
  },

  onSetMenuItems(payload) {
    console.debug('HeaderStore::onSetMenuItems');
    this.trigger({menuItems: payload});
  },

  onClearMenuItems() {
    console.debug('HeaderStore::onClearMenuItems');
    this.trigger({menuItems: []});
  },

  onSet(payload) {
    console.debug('HeaderStore::onSet');
    this.trigger(payload);
  },

  onClear() {
    console.debug('HeaderStore::onClear');
    this.trigger({
      menuItems: []
    });
  },

  onToggleAccountMenu() {
    console.debug('HeaderStore::onToggleAccountMenu');
    this.data.expandAccountMenu = !this.data.expandAccountMenu;
    this.trigger({expandAccountMenu: this.data.expandAccountMenu});
  }
});
