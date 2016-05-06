import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin} from '../../mixins';

// Stores & Actions
import DataEndpointsActions from './DataEndpointsActions';
import DataEndpointSummaryDialogActions from './DataEndpointSummaryDialogActions';
import ClassesActions from '../Classes/ClassesActions';
import ClassesStore from '../Classes/ClassesStore';

export default Reflux.createStore({
  listenables: DataEndpointsActions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      label: '',
      crontab: '',
      script: '',
      class: '',
      page_size: 50,
      excluded_fields: '',
      expand: '',
      classes: ['Loading...'],
      expandFields: {},
      showFields: {}
    };
  },

  init() {
    this.listenToForms();
    this.listenTo(ClassesActions.setClasses, this.getClassesDropdown);
  },

  getClassesDropdown() {
    console.debug('DataEndpointDialogStore::getClassesDropdown');
    const classes = ClassesStore.getItems().map((item) => item.name);

    this.trigger({classes});
  },

  getCrontabDropdown() {
    return this.crontabItems;
  },

  onCreateDataEndpointCompleted() {
    console.debug('DataEndpointDialogStore::onCreateDataEndpointCompleted');
    DataEndpointsActions.fetchDataEndpoints();
    DataEndpointSummaryDialogActions.showDialog();
    this.dismissDialog();
  },

  onCreateDataEndpointWithClassCompleted() {
    console.debug('DataEndpointDialogStore::onCreateDataEndpointWithClassCompleted');
    DataEndpointsActions.fetchDataEndpoints();
    DataEndpointSummaryDialogActions.showDialog();
    this.dismissDialog();
  },

  onCreateDataEndpointWithClassFailure() {
    ClassesActions.fetchClasses();
  },

  onUpdateDataEndpointCompleted() {
    console.debug('DataEndpointDialogStore::onUpdateDataEndpointCompleted');
    DataEndpointsActions.fetchDataEndpoints();
    this.dismissDialog();
  },

  onUpdateDataEndpointWithClassCompleted() {
    console.debug('DataEndpointDialogStore::onUpdateDataEndpointWithClassCompleted');
    DataEndpointsActions.fetchDataEndpoints();
    this.dismissDialog();
  },

  onUpdateDataEndpointWithClassFailure() {
    ClassesActions.fetchClasses();
  }
});
