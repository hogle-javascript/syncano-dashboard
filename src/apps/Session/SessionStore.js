import Reflux from 'reflux';
import Raven from '../../raven';
import Connection from './Connection';
import _ from 'lodash';

import SessionActions from './SessionActions';

import Colors from 'material-ui/lib/styles/colors';
import SyncanoTheme from '../../common/SyncanoTheme';

export default Reflux.createStore({
  listenables: SessionActions,

  init() {
    this.connection = Connection.get();
    this.token = localStorage.getItem('token') || null;
    this.user = null;
    this.instance = null;
    this.router = null;
    this.theme = null;
    this.signUpMode = null;

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

  setAnalyticsIdentifying(user) {
    let currentQuery = this.getRouter().getCurrentQuery();
    let analyticsIdentifyObject = {
      email: user.email,
      'Auth backend': user.network ? user.network : 'password'
    };
    let analyticsIdentifyCampaign = {
      'UTM Campaign': currentQuery.utm_campaign,
      'UTM Content': currentQuery.utm_content,
      'UTM Medium': currentQuery.utm_medium,
      'UTM Source': currentQuery.utm_source,
      'UTM Term': currentQuery.utm_term
    };

    if (!_.isUndefined(currentQuery.utm_campaign)) {
      _.extend(analyticsIdentifyObject, analyticsIdentifyCampaign);
    }

    window.analytics.identify(analyticsIdentifyObject);
  },

  setToken(token) {
    console.info('SessionStore::setToken');
    this.token = token;
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
      localStorage.setItem('token', this.token);
    }

    Raven.setUserContext({
      email: user.email,
      id: user.id
    });

    this.setAnalyticsIdentifying(user);
    this.trigger(this);
  },

  setInstance(instance) {
    console.info('SessionStore::setInstance');

    // Let's go back to this topic later
    // let colorName       = instance.metadata.color,
    //    secondColorName = 'indigo';
    //
    // if (ColorStore.getColorByName(colorName)) {
    //   this.theme.setPalette(this.makePalette(colorName, secondColorName));
    // }

    this.instance = instance;
    this.trigger(this);
  },

  setRouter(router) {
    console.info('SessionStore::setRouter');
    this.router = router;
  },

  setSignUpMode() {
    this.signUpMode = true;
  },

  setTheme(theme) {
    console.info('SessionStore::setTheme');
    this.theme = theme;
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
    if (this.theme) {
      this.theme.setTheme(SyncanoTheme);
    }
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
    }
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
