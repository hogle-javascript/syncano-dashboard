import 'babel-core/polyfill';
import 'normalize.css';
import './lib/localStoragePolyfill';
import './raven';
import './stripe';
import './segment';
import './app.sass';

import React from 'react';
import Router from 'react-router';
import URI from 'URIjs';
import _ from 'lodash';
import routes from './routes';
import tapPlugin from 'react-tap-event-plugin';

import SessionStore from './apps/Session/SessionStore';

let container = document.getElementById('app');

tapPlugin();

Router.run(routes, (Root, state) => {
  let uri = new URI();
  let originalUri = uri.normalize().toString();
  let pathname = decodeURIComponent(state.pathname).replace('//', '/');
  let query = _.extend({}, uri.search(true), state.query);

  SessionStore.setUTMData(state.query);

  // Remove trailing slash
  if (pathname.length > 1 && pathname.match('/$') !== null) {
    pathname = pathname.slice(0, -1);
  }

  uri.search(query);
  uri.hash(`${pathname}${uri.search()}`);
  uri.search('');

  let normalizedUri = uri.normalize().toString();

  if (originalUri !== normalizedUri) {
    location.href = normalizedUri;
    return;
  }

  let name = 'app';
  let names = state.routes.map((route) => route.name).filter((routeName) => typeof routeName !== 'undefined');

  if (names.length > 0) {
    name = names[names.length - 1];
  }

  if (name === 'login' || name === 'signup') {
    window.analytics.page(`Dashboard ${_.capitalize(name)}`, {
      path: state.pathname
    });
  } else {
    window.analytics.page('Dashboard', {
      Page: name,
      path: state.pathname
    });
  }

  React.render(<Root/>, container);
});
