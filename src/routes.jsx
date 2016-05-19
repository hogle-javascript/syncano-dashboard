/* eslint-disable no-inline-comments */
import React from 'react';
import {Route, Redirect, IndexRedirect, IndexRoute} from 'react-router';
import auth from './apps/Account/auth';
import URI from 'urijs';
import _ from 'lodash';

import SessionStore from './apps/Session/SessionStore';

// Pages
import AppPage from './pages/app';
import ClassesPage from './pages/classes';
import DashboardPage from './pages/dashboard';
import InstancePage from './pages/instance';
import ProfilePage from './pages/profile';
import ScriptsPage from './pages/scripts';
import NotFoundPage from './pages/notfound';
import PushDevicesPage from './pages/pushDevices';

// Apps
import Account from './apps/Account';
import Profile from './apps/Profile';

// Apps for authenticated users
import Instances from './apps/Instances/Instances';
import InstanceEdit from './apps/Instances/InstanceEdit';
import Solutions from './apps/Solutions';

// Instance Apps
import Admins from './apps/Admins/Admins';
import ApiKeys from './apps/ApiKeys/ApiKeys';
import ChannelHistory from './apps/ChannelHistory';
import Channels from './apps/Channels';
import Classes from './apps/Classes';
import ScriptEndpoints from './apps/ScriptEndpoints';
import Script from './apps/Script';
import Scripts from './apps/Scripts';
import DataObjects from './apps/DataObjects/DataObjects';
import DataEndpoints from './apps/DataEndpoints';
import Users from './apps/Users/Users';
import Sockets from './apps/Sockets';
import Snippets from './apps/Snippets';
import Template from './apps/Template';
import Templates from './apps/Templates';
import Triggers from './apps/Triggers';
import Schedules from './apps/Schedules';
import PushNotifications from './apps/PushNotifications';
import PushDevices from './apps/PushDevices';

function redirectToLogin(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    });
  }
}

function redirectToDashboard(nextState, replace) {
  if (auth.loggedIn()) {
    replace('/');
  }
}

function onRootEnter(nextState, replace) {
  let uri = new URI();
  let originalUri = uri.normalize().toString();
  let pathname = decodeURIComponent(nextState.location.pathname).replace('//', '/');
  let query = _.extend({}, uri.search(true), nextState.location.query);

  SessionStore.setUTMData(nextState.location.query);

  if (nextState.location.query.token) {
    SessionStore.setToken(nextState.location.query.token);
    replace('/');
  }

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
  let names = nextState.routes.map((route) => route.name).filter((routeName) => typeof routeName !== 'undefined');

  if (names.length > 0) {
    name = names[names.length - 1];
  }

  if (name === 'login' || name === 'signup') {
    window.analytics.page(`Dashboard ${_.capitalize(name)}`, {
      path: nextState.location.pathname
    });
  } else {
    window.analytics.page('Dashboard', {
      Page: name,
      path: nextState.location.pathname
    });
  }
}

export default (
  <Route
    name="app"
    component={AppPage}
    onEnter={onRootEnter}
    path="/">

    <Route
      name="login"
      path="login"
      component={Account.Login}
      onEnter={redirectToDashboard}/>
    <Route
      name="signup"
      path="signup"
      component={Account.Signup}
      onEnter={redirectToDashboard}/>
    <Route
      name="activate"
      component={Account.Activate}
      path="/activate/:uid/:token"/>
    <Route
      name="password-update"
      component={Account.PasswordUpdate}
      path="/password/update"/>
    <Route
      name="password-reset"
      component={Account.PasswordReset}
      path="/password/reset"/>
    <Route
      name="password-reset-confirm"
      component={Account.PasswordResetConfirm}
      path="/password/reset/:uid/:token"/>

    {/* Dashboard */}
    <Route
      name="dashboard"
      component={DashboardPage}
      onEnter={redirectToLogin}
    >
      <Route
        name="instances"
        component={Instances}
        path="instances"/>

      <Route
        name="instance"
        component={InstancePage}
        path="instances/:instanceName">

        <Redirect
          from="prolong"
          to="sockets"
          query={{showProlongDialog: true}} />

        {/* Sockets */}
        <Route
          name="sockets"
          path="sockets"
          component={Sockets}/>

        {/* Data */}
        <Route
          name="data"
          path="data-endpoints"
          component={DataEndpoints}/>

        {/* Admins */}
        <Route
          name="admins"
          component={Admins}
          path="admins"/>

        {/* API keys */}
        <Route
          name="api-keys"
          component={ApiKeys}
          path="api-keys"/>

        {/* General */}
        <Route
          name="instance-edit"
          component={InstanceEdit}
          path="edit"/>

        {/* Classes */}
        <Route
          name="classes"
          component={ClassesPage}
          path="classes">

          <Route
            name="classes-data-objects"
            component={DataObjects}
            path=":className/objects"/>

          <Route
            name="classEdit"
            component={Classes}
            path=":className/:action"/>

          <IndexRoute component={Classes}/>
        </Route>

        {/* Push Notifications */}
        <Route
          name="push-notifications"
          path="push-notifications">

          {/* Push Notification Devices */}
          <Route
            name="push-notification-config"
            path="config"
            component={PushNotifications}/>

          <Route
            name="push-notification-devices"
            path="devices"
            component={PushDevicesPage}>
            <Route
              name="all-push-notification-devices"
              path="all"
              component={PushDevices.AllDevices}/>
            <Route
              name="apns-devices"
              path="apns"
              component={PushDevices.APNS}/>
            <Route
              name="gcm-devices"
              path="gcm"
              component={PushDevices.GCM}/>
            <Redirect
              from="/instances/:instanceName/push-notifications/devices"
              to="all-push-notification-devices"/>
          </Route>

          <Redirect
            from="/instances/:instanceName/push-notifications"
            to="push-notification-config"/>
        </Route>

        {/* ScriptEndpoints */}
        <Route
          name="script-endpoints"
          path="script-endpoints">


          {/* ScriptEndpoints Traces */}
          <Route
            name="scriptEndpoint-traces"
            component={ScriptEndpoints.Traces}
            path=":scriptEndpointName/traces"/>

          <IndexRoute component={ScriptEndpoints}/>

        </Route>

        <Route
          name="snippets"
          path="snippets"
          component={Snippets} />

        {/* Templates */}
        <Route
          name="templates"
          path="templates">
          <Route
            name="template"
            component={Template}
            path=":templateName"/>
          <IndexRoute component={Templates}/>
        </Route>

        {/* Scripts */}
        <Route
          name="scripts"
          component={ScriptsPage}
          path="scripts">
          <Route
            name="script"
            component={Script}
            path=":scriptId"/>
          <IndexRoute component={Scripts}/>
        </Route>
        <Route
          name="scripts-add"
          component={Scripts}
          path="scripts/:action"/>

        {/* Data Objects */}
        <Route
          name="data-objects"
          component={DataObjects}
          path="objects"/>

        {/* Triggers */}
        <Route
          name="triggers"
          path="triggers">

          <Route
            name='trigger-traces'
            component={Triggers.Traces}
            path=':triggerId/traces'/>

          <IndexRoute component={Triggers}/>
        </Route>

        {/* Schedules */}
        <Route
          name="schedules"
          path="schedules">

          <Route
            name='schedule-traces'
            component={Schedules.Traces}
            path=':scheduleId/traces'/>

          <IndexRoute component={Schedules}/>
        </Route>

        {/* Channels */}
        <Route
          name="channels"
          path="channels">
          <Route
            name='channel-history'
            component={ChannelHistory.Messages}
            path=':channelName/history'/>

          <IndexRoute component={Channels}/>
        </Route>

        {/* Users */}
        <Route
          name="users"
          component={Users}
          path="users"/>

        <IndexRedirect to="sockets"/>
      </Route>

      {/* Profile Billing */}
      <Route
        name="profile"
        component={ProfilePage}
        path="/account">

        <Route
          name="profile-billing-plan"
          component={Profile.BillingPlan}
          path="plan"/>
        <Route
          name="profile-billing-address"
          component={Profile.BillingAddress}
          path="address"/>
        <Route
          name="profile-billing-payment"
          component={Profile.BillingPayment}
          path="payment-methods"/>
        <Route
          name="profile-billing-invoices"
          component={Profile.BillingInvoices}
          path="invoices"/>
        <Route
          name="profile-settings"
          component={Profile.Settings}
          path="/account"/>
        <Route
          name="profile-authentication"
          component={Profile.Authentication}
          path="/account/authentication"/>
        <Route
          name="profile-invitations"
          component={Profile.Invitations}
          path="/account/invitations"/>

        <IndexRoute component={Profile.Settings}/>
      </Route>

      {/* Solutions */}
      <Route
        name="solutions"
        path="/solutions">
        <Route
          name="solutions-list"
          component={Solutions.ListView}
          path="list"/>
        <Route
          name="solutions-install"
          component={Solutions.EditView}
          path="/solutions/:solutionId/:action"/>
        <Route
          name="solutions-edit"
          component={Solutions.EditView}
          path="/solutions/:solutionId/edit"/>
        <Route
          name="solutions-add-version"
          component={Solutions.AddVersionView}
          path="/solutions/:solutionId/versions/add"/>
        <Redirect
          from="/solutions"
          to="solutions-list"/>
        <IndexRoute component={Solutions.ListView}/>
      </Route>

      <IndexRoute component={Instances}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
