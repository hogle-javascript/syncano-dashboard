import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import DataViewsActions from './DataViewsActions';
import ClassesActions from '../Classes/ClassesActions';
import ClassesStore from '../Classes/ClassesStore';

export default Reflux.createStore({
  listenables: DataViewsActions,
  mixins: [
    Mixins.StoreForm,
    Mixins.DialogStore
  ],

  getInitialState() {
    return {
      label: '',
      crontab: '',
      codebox: '',
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
    console.debug('DataViewDialogStore::getClassesDropdown');
    let classes = ClassesStore.getClassesDropdown();

    if (classes.length === 0) {
      classes = [{payload: '', text: 'No classes, add one first'}];
    }

    this.trigger({classes: classes});
  },

  getCrontabDropdown() {
    return this.crontabItems;
  },

  onCreateDataViewCompleted() {
    console.debug('DataViewDialogStore::onCreateDataViewCompleted');
    this.dismissDialog();
    DataViewsActions.fetchDataViews();
  },

  onUpdateDataViewCompleted() {
    console.debug('DataViewDialogStore::onUpdateDataViewCompleted');
    this.dismissDialog();
    DataViewsActions.fetchDataViews();
  }
});
