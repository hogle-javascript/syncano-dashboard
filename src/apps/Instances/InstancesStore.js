import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import {
  StoreHelpersMixin,
  CheckListStoreMixin,
  StoreFormMixin,
  WaitForStoreMixin,
  StoreLoadingMixin
} from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './InstancesActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreHelpersMixin,
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      clickedItem: null,
      myInstances: [],
      sharedInstances: [],
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
    this.setLoadingStates();
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

  onSelectAll(key) {
    const uncheckOthers = {
      sharedInstances: () => Actions.uncheckAll('myInstances'),
      myInstances: () => Actions.uncheckAll('sharedInstances')
    };

    uncheckOthers[key]();
    this.data[key].forEach((item) => item.checked = true);
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

  // Filters
  getAllInstances() {
    return this.data.myInstances.concat(this.data.sharedInstances);
  },

  getOtherInstances() {
    return this.data.sharedInstances;
  },

  getMyInstances() {
    return this.data.myInsances;
  },

  getInstancesDropdown() {
    return this.data.items.map((item) => {
      return {
        payload: item.name,
        text: item.name
      };
    });
  },

  fillInstanceDefaultMeta(instances) {
    return _.map(instances, (instance) => {
      if (_.isEmpty(instance.metadata)) {
        instance.metadata = {color: 'indigo', icon: 'cloud'};
      }
      return instance;
    });
  },

  setInstances(items) {
    console.debug('InstancesStore::setInstances');
    const instances = this.fillInstanceDefaultMeta(items);

    this.data.myInstances = _.filter(instances, (instance) => this.amIOwner(instance));
    this.data.sharedInstances = _.filter(instances, (instance) => !this.amIOwner(instance));
    this.trigger(this.data);
  },

  redirectToInstancesList() {
    const router = SessionStore.getRouter();
    const routes = SessionStore.getRoutes();
    const activeRouteName = routes[routes.length - 1].name;

    if (!_.isUndefined(activeRouteName) && activeRouteName !== 'instances' || _.isUndefined(activeRouteName)) {
      router.push('instances');
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
    this.redirectToInstancesList();
    this.refreshData();
  },

  onRemoveSharedInstanceCompleted() {
    this.redirectToInstancesList();
    this.refreshData();
  },

  onUpdateInstanceCompleted() {
    this.refreshData();
  },

  getClickedItemIconColor() {
    const clickedItem = this.getClickedItem();

    if (!clickedItem) {
      return {
        color: 'indigo',
        icon: 'cloud'
      };
    }

    return {
      color: clickedItem.metadata.color ? clickedItem.metadata.color : 'indigo',
      icon: clickedItem.metadata.icon ? clickedItem.metadata.icon : 'cloud'
    };
  }
});
