import Reflux from 'reflux';
import Raven from '../../raven';
import Connection from './Connection';
import NewLibConnection from './NewLibConnection';
import _ from 'lodash';

import SessionActions from './SessionActions';
import Colors from 'material-ui/styles/colors';

export default Reflux.createStore({
  listenables: SessionActions,

  init() {
    this.connection = Connection.get();
    this.NewLibConnection = NewLibConnection.get();
    this.token = localStorage.getItem('token') || null;
    this.user = null;
    this.instance = null;
    this.router = null;
    this.params = null;
    this.location = null;
    this.routes = null;
    this.theme = null;
    this.signUpMode = null;
    this.isWelcomeDialogVisible = false;

    if (this.isAuthenticated() && !this.user) {
      SessionActions.fetchUser(this.token);
    }

    if (this.token !== null) {
      this.connection.setApiKey(this.token);
    }
  },

  getConnection(empty) {
    return this.connection || empty || null;
  },

  getToken(empty) {
    return this.token || empty || null;
  },

  getUser(empty) {
    return this.user || empty || null;
  },

  getInstance(empty) {
    return this.instance || empty || null;
  },

  getRouter(empty) {
    return this.router || empty || null;
  },

  getParams(empty) {
    return this.params || empty || null;
  },

  getLocation(empty) {
    return this.location || empty || null;
  },

  getRoutes(empty) {
    return this.routes || empty || null;
  },

  getSignUpMode() {
    return this.signUpMode;
  },

  getTheme(empty) {
    return this.theme || empty || null;
  },

  getInvitationFromUrl() {
    console.info('SessionStore::getInvitationFomUrl');
    return localStorage.getItem('invitationKey');
  },

  getUTMData() {
    return JSON.parse(localStorage.getItem('UTMData'));
  },

  shouldShowWelcomeDialog() {
    return this.isWelcomeDialogVisible;
  },

  showWelcomeDialog() {
    this.isWelcomeDialogVisible = true;
  },

  hideWelcomeDialog() {
    this.isWelcomeDialogVisible = false;
  },

  setAnalyticsIdentifying(user) {
    let UTMData = this.getUTMData();
    let analyticsIdentifyObject = {
      email: user.email,
      'Auth backend': user.network ? user.network : 'password'
    };

    if (!_.isUndefined(UTMData)) {
      _.extend(analyticsIdentifyObject, UTMData);
    }

    if (this.signUpMode) {
      window.analytics.identify(user.email, analyticsIdentifyObject);
    } else {
      window.analytics.identify(user.email);
    }
  },

  setToken(token) {
    console.info('SessionStore::setToken');
    localStorage.setItem('token', token);
  },

  setInvitationFromUrl(invitationKey) {
    console.info('SessionStore::setInvitationFomUrl');
    localStorage.setItem('invitationKey', invitationKey);
  },

  setUser(user) {
    console.info('SessionStore::setUser');
    if (typeof user === 'undefined') {
      return;
    }

    this.user = user;

    if (typeof this.user.account_key === 'undefined') {
      this.user.account_key = this.token;
    } else {
      this.token = user.account_key;
      this.connection.setApiKey(this.token);
      this.NewLibConnection.setAccountKey(this.token);
      localStorage.setItem('token', this.token);
    }

    Raven.setUserContext({
      email: user.email,
      id: user.id
    });

    this.setAnalyticsIdentifying(user);
    this.trigger(this);
  },

  setUTMData(query) {
    let UTMData = {
      'UTM Campaign': query.utm_campaign,
      'UTM Content': query.utm_content,
      'UTM Medium': query.utm_medium,
      'UTM Source': query.utm_source,
      'UTM Term': query.utm_term
    };

    if (query.utm_campaign) {
      localStorage.setItem('UTMData', JSON.stringify(UTMData));
    }
  },

  setInstance(instance) {
    console.info('SessionStore::setInstance');

    this.instance = instance;
    this.trigger(this);
  },

  setRouter(router) {
    console.info('SessionStore::setRouter');
    this.router = router;
  },

  setParams(params) {
    console.info('SessionStore::setParams');
    this.params = params;
  },

  setLocation(location) {
    console.info('SessionStore::setLocation');
    this.location = location;
  },

  setRoutes(routes) {
    console.info('SessionStore::setRoutes');
    this.routes = routes;
  },

  setSignUpMode() {
    this.signUpMode = true;
  },

  setTheme(theme) {
    console.info('SessionStore::setTheme');
    this.theme = theme;
  },

  isFriendlyUser() {
    if (this.getUser()) {
      let email = this.getUser({}).email;
      let endings = ['syncano.rocks', 'syncano.io', 'syncano.com', 'chimeraprime.com'];

      return _.some(endings, (ending) => _.endsWith(email, ending));
    }

    return false;
  },

  onFetchInstanceCompleted(payload) {
    console.info('SessionStore::onFetchInstanceCompleted');
    SessionActions.setInstance(payload);
  },

  onFetchInstanceFailure() {
    this.router.transitionTo('/404');
  },

  onFetchUserCompleted(payload) {
    console.info('SessionStore::onFetchUserCompleted');
    SessionActions.setUser(payload);
  },

  onFetchUserFailure() {
    console.info('SessionStore::onFetchUserFailure');
    this.onLogout();
  },

  removeInstance() {
    this.instance = null;
  },

  removeSignUpMode() {
    this.signUpMode = null;
  },

  makePalette(mainColor, accentColor) {
    return {
      primary1Color: Colors[mainColor + '700'],
      primary2Color: Colors[mainColor + '500'],
      primary3Color: Colors[mainColor + '100'],

      accent1Color: Colors[accentColor + '700'],
      accent2Color: Colors[accentColor + '300'],
      accent3Color: Colors[accentColor + '200']
    };
  },

  onLogin(payload) {
    console.info('SessionStore::onLogin');

    if (typeof payload === 'undefined' || typeof payload.account_key === 'undefined') {
      return;
    }

    this.token = payload.account_key;
    this.connection.setApiKey(this.token);
    localStorage.setItem('token', this.token);
    SessionActions.setUser(payload);
    this.router.push({name: 'dashboard'});
  },

  onLogout() {
    this.token = null;
    this.user = null;
    this.connection = Connection.reset();

    localStorage.removeItem('token');
    localStorage.removeItem('invitationKey');
    this.removeInstance();
    this.trigger(this);

    Raven.setUserContext();
    window.analytics.identify();
    location.reload(true);
  },

  isAuthenticated() {
    if (this.token === 'undefined') {
      return false;
    }
    return this.token !== null;
  },

  isReady() {
    return this.isAuthenticated() && this.user !== null;
  }
});
