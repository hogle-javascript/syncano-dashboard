import 'babel-core/polyfill';
import 'normalize.css';
import './raven';
import './stripe';
import './app.sass';

import React from 'react';
import Router from 'react-router';
import routes from './routes';
import tapPlugin from 'react-tap-event-plugin';
import analytics from './segment';

let container  = document.getElementById('app');
tapPlugin();

Router.run(routes, function (Root, state) {
  if (!window.opener) {
    var pathname = decodeURIComponent(state.pathname).replace('//', '/');

    // Remove trailing slash
    if (pathname.match('/$') !== null) {
      pathname = pathname.slice(0, -1);
    }

    if (pathname !== state.pathname) {
      location.hash = pathname;
    }
  }

  if (state.query.distinct_id !== undefined) {
    analytics.identify(state.query.distinct_id);
  }

  var name  = 'app',
      names = state.routes.map(function (route) {
        return route.name;
      }).filter(function(name) {
        return name !== undefined;
      });

  if (names.length > 0) {
    name = names[names.length-1];
  }

  analytics.page(name, {path: state.pathname});
  React.render(<Root/>, container);
});