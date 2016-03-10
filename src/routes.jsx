/* eslint-disable */
import React from 'react';
import Router from 'react-router';

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
import Classes from './apps/Classes';
import CodeBoxes from './apps/CodeBoxes';
import Script from './apps/Script';
import Scripts from './apps/Scripts';
import DataObjects from './apps/DataObjects/DataObjects';
import Data from './apps/Data';
import Users from './apps/Users/Users';
import Channels from './apps/Channels/Channels';
import Sockets from './apps/Sockets';
import Template from './apps/Template';
import Templates from './apps/Templates';
import Triggers from './apps/Triggers';
import Schedules from './apps/Schedules';
import PushNotifications from './apps/PushNotifications';
import PushDevices from './apps/PushDevices';

const Route = Router.Route;
const Redirect = Router.Redirect;
const NotFoundRoute = Router.NotFoundRoute;
const DefaultRoute = Router.DefaultRoute;

export default (
  <Route
    name="app"
    handler={AppPage}
    path="/">

    <NotFoundRoute handler={NotFoundPage}/>
    <Route
      name="login"
      handler={Account.Login}/>
    <Route
      name="signup"
      handler={Account.Signup}/>
    <Route
      name="activate"
      handler={Account.Activate}
      path="/activate/:uid/:token"/>
    <Route
      name="password-update"
      handler={Account.PasswordUpdate}
      path="/password/update"/>
    <Route
      name="password-reset"
      handler={Account.PasswordReset}
      path="/password/reset"/>
    <Route
      name="password-reset-confirm"
      handler={Account.PasswordResetConfirm}
      path="/password/reset/:uid/:token"/>

    {/* Dashboard */}
    <Route
      name="dashboard"
      handler={DashboardPage}
      path="/">
      <Route
        name="instances"
        handler={Instances}
        path="instances"/>

      <Route
        name="instance"
        handler={InstancePage}
        path="instances/:instanceName">

        <Redirect
          from="/instances/:instanceName"
          to="sockets"/>

        {/* Prolong */}
        <Route
          name="prolong"
          path="prolong">


          <Redirect
            from="/instances/:instanceName/prolong"
            to="sockets"/>

        </Route>

        {/* Sockets */}
        <Route
          name="sockets"
          path="sockets">


          <DefaultRoute handler={Sockets}/>

        </Route>

        {/* Data */}
        <Route
          name="data"
          path="data"
          handler={Data}/>

        {/* Admins */}
        <Route
          name="admins"
          handler={Admins}
          path="admins"/>

        {/* API keys */}
        <Route
          name="api-keys"
          handler={ApiKeys}
          path="api_keys"/>

        {/* General */}
        <Route
          name="instance-edit"
          handler={InstanceEdit}
          path="edit"/>

        {/* Classes */}
        <Route
          name="classes"
          handler={ClassesPage}
          path="classes">

          <Route
            name="classes-data-objects"
            handler={DataObjects}
            path=":className/objects"/>

          <DefaultRoute handler={Classes}/>
        </Route>

        {/* Push Notifications */}
        <Route
          name="push-notifications"
          path="push-notifications">

          {/* Push Notification Devices */}
          <Route
            name="push-notification-config"
            path="config"
            handler={PushNotifications}/>

          <Route
            name="push-notification-devices"
            path="devices"
            handler={PushDevicesPage}>
            <Route
              name="all-push-notification-devices"
              path="all"
              handler={PushDevices.AllDevices}/>
            <Route
              name="apns-devices"
              path="apns"
              handler={PushDevices.APNS}/>
            <Route
              name="gcm-devices"
              path="gcm"
              handler={PushDevices.GCM}/>
            <Redirect
              from="/instances/:instanceName/push-notifications/devices"
              to="all-push-notification-devices"/>
          </Route>

          <Redirect
            from="/instances/:instanceName/push-notifications"
            to="push-notification-config"/>
        </Route>

        {/* CodeBoxes */}
        <Route
          name="codeBoxes"
          path="codeboxes">


          {/* CodeBox Traces */}
          <Route
            name='codeBox-traces'
            handler={CodeBoxes.Traces}
            path=':codeBoxName/traces'/>

          <DefaultRoute handler={CodeBoxes}/>

        </Route>

        {/* Templates */}
        <Route
          name="templates"
          path="templates">
          <Route
            name="template"
            handler={Template}
            path=":templateName">
            <Route
              name="template-edit"
              handler={Template.Edit}
              path="edit"/>
            <DefaultRoute handler={Template.Edit}/>
          </Route>
          <DefaultRoute handler={Templates}/>
        </Route>

        {/* Scripts */}
        <Route
          name="scripts"
          handler={ScriptsPage}
          path="scripts">
          <Route
            name="script"
            handler={Script}
            path=":scriptId"/>
          <DefaultRoute handler={Scripts}/>
        </Route>
        <Route
          name="scripts-add"
          handler={Scripts}
          path="scripts/:action"
          />

        {/* Data Objects */}
        <Route
          name="data-objects"
          handler={DataObjects}
          path="objects"/>

        {/* Triggers */}
        <Route
          name="triggers"
          path="triggers">

          <Route
            name='trigger-traces'
            handler={Triggers.Traces}
            path=':triggerId/traces'/>

          <DefaultRoute handler={Triggers}/>
        </Route>

        {/* Schedules */}
        <Route
          name="schedules"
          path="schedules">

          <Route
            name='schedule-traces'
            handler={Schedules.Traces}
            path=':scheduleId/traces'/>

          <DefaultRoute handler={Schedules}/>
        </Route>

        {/* Channels */}
        <Route
          name="channels"
          path="channels">
          <Route
            name='channel-history'
            handler={Channels.HistoryMessages}
            path=':channelName/history'/>

          <DefaultRoute handler={Channels}/>
        </Route>

        {/* Users */}
        <Route
          name="users"
          handler={Users}
          path="users"/>

      </Route>

      {/* Profile Billing */}
      <Route
        name="profile"
        handler={ProfilePage}
        path="/account">

        <Route
          name="profile-billing-plan"
          handler={Profile.BillingPlan}
          path="plan"/>
        <Route
          name="profile-billing-address"
          handler={Profile.BillingAddress}
          path="address"/>
        <Route
          name="profile-billing-payment"
          handler={Profile.BillingPayment}
          path="payment-methods"/>
        <Route
          name="profile-billing-invoices"
          handler={Profile.BillingInvoices}
          path="invoices"/>
        <Route
          name="profile-settings"
          handler={Profile.Settings}
          path="/account"/>
        <Route
          name="profile-authentication"
          handler={Profile.Authentication}
          path="/account/authentication"/>
        <Route
          name="profile-invitations"
          handler={Profile.Invitations}
          path="/account/invitations"/>
        <DefaultRoute handler={Profile.BillingPlan}/>
      </Route>

      {/* Solutions */}
      <Route
        name="solutions"
        path="/solutions">
        <Route
          name="solutions-list"
          handler={Solutions.ListView}
          path="list"/>
        <Route
          name="solutions-install"
          handler={Solutions.EditView}
          path="/solutions/:solutionId/:action"/>
        <Route
          name="solutions-edit"
          handler={Solutions.EditView}
          path="/solutions/:solutionId/edit"/>
        <Route
          name="solutions-add-version"
          handler={Solutions.AddVersionView}
          path="/solutions/:solutionId/versions/add"/>
        <Redirect
          from="/solutions"
          to="solutions-list"/>
        <DefaultRoute handler={Solutions.ListView}/>
      </Route>

      <DefaultRoute handler={Instances}/>
    </Route>
  </Route>
);

