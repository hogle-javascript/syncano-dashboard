import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin} from '../../mixins';

// Stores & Actions
import Actions from './TemplatesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      name: '',
      content_type: ''
    };
  },

  init() {
    this.listenToForms();
  },

  onCreateTemplateCompleted() {
    console.debug('TemplateDialogStore::onCreateTemplateCompleted');
    this.dismissDialog();
    Actions.fetchTemplates();
  },

  onUpdateTemplateCompleted() {
    console.debug('TemplateDialogStore::onUpdateTemplateCompleted');
    this.dismissDialog();
    Actions.fetchTemplates();
  }
});
