import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin} from '../../mixins';

// Stores & Actions
import DataEndpointsActions from './DataEndpointsActions';
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
      fields: '',
      expand: '',
      classes: [
        {payload: '', text: 'Loading...'}
      ],
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
    let classes = ClassesStore.getClassesDropdown();

    if (classes.length === 0) {
      classes = [{payload: '', text: 'No classes, add one first'}];
    }

    this.trigger({classes});
  },

  getCrontabDropdown() {
    return this.crontabItems;
  },

  onCreateDataEndpointCompleted() {
    console.debug('DataEndpointDialogStore::onCreateDataEndpointCompleted');
    this.dismissDialog();
    DataEndpointsActions.fetchDataEndpoints();
  },

  onUpdateDataEndpointCompleted() {
    console.debug('DataEndpointDialogStore::onUpdateDataEndpointCompleted');
    this.dismissDialog();
    DataEndpointsActions.fetchDataEndpoints();
  }
});
