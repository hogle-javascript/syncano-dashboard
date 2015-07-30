import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import SnackbarNotificationMixin from '../../common/SnackbarNotification/SnackbarNotificationMixin';
import InstancesActions from '../Instances/InstancesActions';

import Actions from './InstallDialogActions';

export default Reflux.createStore({
  listenables : Actions,
  mixins      : [
    Mixins.StoreForm,
    Mixins.DialogStore,
    SnackbarNotificationMixin
  ],

  getInitialState() {
    return {
      instances : null,
      versions : [
        {payload: '', text: 'Loading...'}
      ]
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
  },

  refreshState() {
    this.trigger(this)
  },

  getVersionsDropdown() {
    if (!this.data.versions) {
      return [];
    }
    return this.data.versions.map(item => {
      return {
        payload : item.id,
        text    : item.number
      }
    });
  },

  getInstancesDropdown() {
    if (this.data.instances === null) {
      return [{payload: '', text: 'Loading...'}]
    }
    return this.data.instances.map(item => {
      return {
        payload : item.name,
        text    : item.name
      }
    });
  },

  setSolutionId(solutionId) {
    this.data.solutionId = solutionId;
  },

  setInstances(instances) {
    console.debug('SolutionInstallDialogStore::setInstances');
    this.data.instances = Object.keys(instances).map(key => instances[key]);

    if (instances && instances.length === 1) {
      this.data.instance = instances._items[0].name;
    }

    this.trigger(this.data);
  },

  setSolutionVersions(versions) {
    console.debug('SolutionInstallDialogStore::setInstances');
    this.data.versions = Object.keys(versions).map(key => versions[key]);
    this.data.versions.reverse();
    this.data.version = this.data.versions[0].id ;
    this.trigger(this.data);
  },

  getDefaultVersion() {
    if (this.data.versions)
      return this.data.versions[0].number;
  },

  onFetchInstancesCompleted(items) {
    console.debug('SolutionInstallDialogStore::onFetchInstancesCompleted');
    Actions.setInstances(items);
  },

  onFetchSolutionVersions() {
    console.debug('SolutionInstallDialogStore::onFetchSolutionVersions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionVersionsCompleted(versions) {
    console.debug('SolutionInstallDialogStore::onFetchSolutionVersionsCompleted');
    this.data.isLoading = false;
    Actions.setSolutionVersions(versions);
  },

  onFetchSolutionVersionsFailure() {
    console.debug('SolutionInstallDialogStore::onFetchSolutionVersionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onShowDialogWithPreFetch(solutionId, versionId) {
    console.debug('SolutionInstallDialogStore::onShowDialogWithPreFetch', solutionId);
    this.data = this.getInitialState();
    Actions.setSolutionId(solutionId);

    if (versionId) {
      this.data.version = versionId;
      this.data.hideVersionPicker = true;
    } else {
      Actions.fetchSolutionVersions(solutionId);
    }

    Actions.fetchInstances();
    Actions.showDialog();
  },

  onInstallSolution() {
    console.debug('SolutionInstallDialogStore::onInstallSolution');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onInstallSolutionCompleted(payload) {
    console.debug('SolutionInstallDialogStore::onFetchSolutionVersionsCompleted');
    this.data.isLoading = false;
    SessionStore.getRouter().transitionTo('instance', {instanceName: payload.instance});
    this.setSnackbarNotification({
      delay: true,
      message: 'Solution installed successful',
      action: 'dismiss',
      onActionTouchTap() {
        this.refs.snackbar.dismiss();
      }
    });
  },

  onInstallSolutionFailure() {
    console.debug('SolutionInstallDialogStore::onFetchSolutionVersionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  }
});
