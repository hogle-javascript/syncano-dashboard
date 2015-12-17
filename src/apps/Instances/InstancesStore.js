import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './InstancesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.CheckListStore,
    Mixins.StoreForm,
    Mixins.WaitForStore
  ],

  getInitialState() {
    return {
      clickedItem: null,
      items: [],
      isLoading: true,
      isTourVisible: false,
      reactTourConfig: null,
      currentStep: -1
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData() {
    console.debug('InstancesStore::refreshData');
    Actions.fetchInstances();
  },

  amIOwner(item) {
    if (item) {
      return item.owner.email === SessionStore.getUser({}).email;
    }
  },

  onSetClickedInstance(item) {
    this.data.clickedItem = item;
    this.trigger(this.data);
  },

  onCheckItem(checkId, state) {
    console.debug('InstancesStore::onCheckItem');

    let item = this.getInstanceById(checkId);
    let checkedItems = this.getCheckedItems();

    // Unchecking or no items checked
    if (!state || checkedItems.length === 0) {
      item.checked = state;
      this.trigger(this.data);
      return;
    }

    // Checking if the item is from the same list as other checked
    let newItemFromMyList = this.amIOwner(item);
    let otherItemFromMyList = this.amIOwner(checkedItems[0]);

    item.checked = state;
    if ((!newItemFromMyList && otherItemFromMyList) || (newItemFromMyList && !otherItemFromMyList)) {
      this.data.items.forEach((existingItem) => {
        // Uncheck all other then new one
        if (item.name !== existingItem.name) {
          existingItem.checked = false;
        }
      });
    }

    this.trigger(this.data);
  },

  getClickedItem() {
    return this.data.clickedItem;
  },

  getInstanceById(name) {
    let instance = null;

    this.data.items.some((item) => {
      if (item.name.toString() === name.toString()) {
        instance = item;
        return true;
      }
    });
    return instance;
  },

  isSharedInstanceChecked() {
    let checkedItems = this.getCheckedItems();

    if (checkedItems) {
      return !this.amIOwner(checkedItems[0]);
    }
  },

  // Filters
  filterMyInstances(item) {
    return this.amIOwner(item);
  },

  filterOtherInstances(item) {
    return !this.amIOwner(item);
  },

  getAllInstances() {
    return this.getInstances('all');
  },

  getOtherInstances() {
    return this.getInstances('other');
  },

  getMyInstances() {
    return this.getInstances('user');
  },

  getInstances(ownership) {
    if (this.data.items === null) {
      return this.data.items;
    }
    let filteredItems = {
      user: this.data.items.filter(this.filterMyInstances),
      other: this.data.items.filter(this.filterOtherInstances),
      all: this.data.items
    };

    return filteredItems[ownership];
  },

  getInstancesDropdown() {
    return this.data.items.map((item) => {
      return {
        payload: item.name,
        text: item.name
      };
    });
  },

  setInstances(instances) {
    console.debug('InstancesStore::setInstances');
    this.data.items = Object.keys(instances).map((key) => instances[key]);
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  redirectToInstancesList() {
    let router = SessionStore.getRouter();
    let activeRouteName = router.getCurrentRoutes()[router.getCurrentRoutes().length - 1].name;

    if (typeof activeRouteName !== 'undefined' && activeRouteName !== 'instances') {
      SessionStore.getRouter().transitionTo('instances');
    }
  },

  onSetTourConfig(config) {
    this.data.tourConfig = config;
  },

  onNextStep() {
    let {currentStep, tourConfig, isTourVisible} = this.data;

    if (currentStep + 1 < tourConfig.length) {
      currentStep = (currentStep + 1) % tourConfig.length;
      isTourVisible = true;
    } else if (isTourVisible) {
      isTourVisible = false;
    } else {
      currentStep = 0;
      isTourVisible = true;
    }

    this.data.currentStep = currentStep;
    this.data.isTourVisible = isTourVisible;
    this.trigger(this.data);
  },

  onFetchInstances() {
    console.debug('InstancesStore::onFetchInstances');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchInstancesCompleted(items) {
    console.debug('InstancesStore::onFetchInstancesCompleted');
    Actions.setInstances(items);
  },

  onFetchInstancesFailure(result) {
    console.debug('InstancesStore::onFetchInstancesFailure');
    this.data.blocked = result;
    this.trigger(this.data);
  },

  onRemoveInstancesCompleted() {
    this.data.hideDialogs = true;
    this.data.isLoading = false;
    this.redirectToInstancesList();
    this.refreshData();
  },

  onRemoveSharedInstanceCompleted() {
    this.data.hideDialogs = true;
    this.data.isLoading = false;
    this.redirectToInstancesList();
    this.refreshData();
  },

  onUpdateInstanceCompleted() {
    this.data.hideDialogs = true;
    this.data.isLoading = false;
    this.refreshData();
  },

  getClickedItemIconColor() {
    let clickedItem = this.getClickedItem();

    if (!clickedItem) {
      return {
        color: null,
        icon: null
      };
    }

    return {
      color: clickedItem.metadata.color,
      icon: clickedItem.metadata.icon
    };
  }
});
