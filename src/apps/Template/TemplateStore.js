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
      renderedTemplate: '',
      isRendering: false,
      isLoading: true,
      successValidationAction: null,
      dataSource: null
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
    this.data.renderedTemplate = '';
  },

  setFlag(flagName, callback) {
    this.data.successValidationAction = flagName;
    this.trigger(this.data);
    if (typeof callback === 'function') {
      callback();
    }
  },

  resetFlag() {
    this.data.successValidationAction = 'update';
    this.trigger(this.data);
  },

  setDataSource(dataSource) {
    this.data.dataSource = dataSource;
  },

  saveRenderedTemplate(renderedTemplate) {
    console.debug('TemplateStore::saveRenderedTemplate');
    this.data.isRendering = false;
    this.data.renderedTemplate = renderedTemplate;
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
    this.saveRenderedTemplate(renderedTemplate);
    Actions.resetFlag();
  },

  onRenderTemplateFailure() {
    console.debug('TemplateStore::onRenderTemplateFailure');
    this.saveRenderedTemplate('');
    Actions.resetFlag();
  },

  onRenderFromEndpointCompleted(renderedTemplate) {
    console.debug('TemplateStore::onRenderFromEndpointCompleted');
    this.saveRenderedTemplate(renderedTemplate);
  },

  onRenderFromEndpointFailure(renderedTemplateError) {
    console.debug('TemplateStore::onRenderFromEndpointFailure');
    this.saveRenderedTemplate(renderedTemplateError);
  },

  onUpdateTemplateCompleted(template) {
    this.data.template = template;
    this.dismissSnackbarNotification();
    if (this.data.successValidationAction === 'tabRender') {
      const apiKey = SessionStore.getToken();
      const dataSource = this.data.dataSource;

      window.open(`${dataSource}?template_response=${template.name}&api_key=${apiKey}`, '_blank');
    }
    this.refreshData();
    Actions.resetFlag();
  },

  onUpdateTemplateFailure() {
    this.dismissSnackbarNotification();
    Actions.resetFlag();
  }
});
