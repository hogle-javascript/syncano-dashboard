import Reflux from 'reflux';

import {StoreFormMixin, WaitForStoreMixin, SnackbarNotificationMixin} from '../../mixins';

import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './TemplateActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    WaitForStoreMixin,
    SnackbarNotificationMixin
  ],

  getInitialState() {
    return {
      template: {},
      context: {},
      renderedTemplate: null,
      isRendering: false,
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.waitFor(
      SessionActions.setInstance,
      this.refreshData
    );
  },

  refreshData() {
    console.debug('TemplateStore::refreshData');
    Actions.fetchTemplate(SessionStore.getRouter().getCurrentParams().templateName);
  },

  getTemplate() {
    console.debug('TemplateStore::getTemplate');
    return this.data.template;
  },

  clearTemplate() {
    this.data.template = null;
  },

  setContext(context) {
    this.data.context = context;
    this.trigger(this.data);
  },

  onFetchTemplateCompleted(template) {
    console.debug('TemplateStore::onFetchTemplateCompleted');
    this.data.isLoading = false;
    this.data.template = template;
    this.trigger(this.data);
  },

  onRenderTemplate() {
    console.debug('TemplateStore::onRenderTemplate');
    this.data.isRendering = true;
    this.trigger(this.data);
  },

  onRenderTemplateCompleted(renderedTemplate) {
    console.debug('TemplateStore::onRenderTemplateCompleted');
    this.data.isRendering = false;
    this.data.renderedTemplate = renderedTemplate;
    this.trigger(this.data);
  },

  onRenderTemplateFailure() {
    console.debug('TemplateStore::onRenderTemplateCompleted');
    this.data.isRendering = false;
    this.data.renderedTemplate = null;
    this.trigger(this.data);
  },

  onUpdateTemplateCompleted(template) {
    this.data.template = template;
    this.dismissSnackbarNotification();
    this.refreshData();
  },

  onUpdateTemplateFailure() {
    this.dismissSnackbarNotification();
  }
});
