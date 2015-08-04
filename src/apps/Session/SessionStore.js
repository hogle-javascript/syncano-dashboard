import Reflux         from 'reflux';
import Raven          from '../../raven';
import analytics      from '../../segment';
import Connection     from './Connection';
import SessionActions from './SessionActions';

import Colors         from 'material-ui/lib/styles/colors';
import ColorStore     from '../../common/Color/ColorStore';
import SyncanoTheme   from '../../common/SyncanoTheme';

export default Reflux.createStore({
  listenables: SessionActions,

  init() {
    this.connection = Connection.get();
    this.token      = sessionStorage.getItem('token') || null;
    this.user       = null;
    this.instance   = null;
    this.router     = null;
    this.theme      = null;

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

  getTheme(empty) {
    return this.theme || empty || null;
  },

  getInvitationFromUrl() {
    console.info('SessionStore::getInvitationFomUrl');
    return sessionStorage.getItem('invitationKey');
  },

  setToken(token) {
    console.info('SessionStore::setToken');
    this.token = token;
  },

  setInvitationFromUrl(invitationKey) {
    console.info('SessionStore::setInvitationFomUrl');
    sessionStorage.setItem('invitationKey', invitationKey);
  },

  setUser(user) {
    console.info('SessionStore::setUser');
    if (user === undefined) {
      return;
    }

    this.user = user;

    if (this.user.account_key === undefined) {
      this.user.account_key = this.token;
    } else {
      this.token = user.account_key;
      this.connection.setApiKey(this.token);
      sessionStorage.setItem('token', this.token);
    }

    Raven.setUserContext({
      email: user.email,
      id: user.id
    });

    analytics.identify(user.email);

    this.trigger(this);
  },

  setInstance(instance) {
    console.info('SessionStore::setInstance');

    // Let's go back to this topic later
    //var colorName       = instance.metadata.color,
    //    secondColorName = 'indigo';
    //
    //if (ColorStore.getColorByName(colorName)) {
    //  this.theme.setPalette(this.makePalette(colorName, secondColorName));
    //}

    this.instance = instance;
    this.trigger(this);
  },

  setRouter(router) {
    console.info('SessionStore::setRouter');
    this.router = router;
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

  makePalette(mainColor, accentColor) {
    return {
      primary1Color : Colors[mainColor + '700'],
      primary2Color : Colors[mainColor + '500'],
      primary3Color : Colors[mainColor + '100'],

      accent1Color  : Colors[accentColor + '700'],
      accent2Color  : Colors[accentColor + '300'],
      accent3Color  : Colors[accentColor + '200']
    }
  },

  onLogin(payload) {
    console.info('SessionStore::onLogin');

    if (payload === undefined || payload.account_key === undefined) {
      return;
    }

    this.token = payload.account_key;
    this.connection.setApiKey(this.token);
    sessionStorage.setItem('token', this.token);
    SessionActions.setUser(payload);
  },

  onLogout() {
    this.token      = null;
    this.user       = null;
    this.connection = Connection.reset();

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('invitationKey');
    this.removeInstance();
    this.router.transitionTo('login');
    this.trigger(this);

    Raven.setUserContext();
    analytics.identify();
  },

  isAuthenticated() {
    if (this.token === 'undefined') {
      return false;
    }
    return this.token ? true : false;
  },

  isReady() {
    return this.isAuthenticated() && this.user !== null;
  }

});
