/* eslint-disable */
import React from 'react';
import Router from 'react-router';

// Pages
import AppPage from './pages/app';
import ClassesPage from './pages/classes';
import DashboardPage from './pages/dashboard';
import InstancePage from './pages/instance';
import ProfilePage from './pages/profile';
import CodeBoxesPage from './pages/codeBoxes';
import NotFoundPage from './pages/notfound';

// Apps
import Account from './apps/Account';
import Classes from './apps/Classes';
import Profile from './apps/Profile';

// Apps for authenticated users
import Instances from './apps/Instances/Instances';
import InstanceEdit from './apps/Instances/InstanceEdit';
import Solutions from './apps/Solutions';

// Instance Apps
import Admins from './apps/Admins/Admins';
import ApiKeys from './apps/ApiKeys/ApiKeys';
import CodeBox from './apps/CodeBox';
import CodeBoxes from './apps/CodeBoxes';
import Webhooks from './apps/Webhooks';
import DataObjects from './apps/DataObjects/DataObjects';
import Data from './apps/Data';
import Tasks from './apps/Tasks';
import Users from './apps/Users/Users';
import Channels from './apps/Channels/Channels';
import Sockets from './apps/Sockets';
import Triggers from './apps/Tasks/Triggers';
import Schedules from './apps/Tasks/Schedules';

const Route = Router.Route;
const Redirect = Router.Redirect;
const NotFoundRoute = Router.NotFoundRoute;
const DefaultRoute = Router.DefaultRoute;

export default (
  <Route
    name="app"
    handler={AppPage}
    path="/"
    >
    <NotFoundRoute handler={NotFoundPage}/>
    <Route
      name="login"
      handler={Account.Login}
      />
    <Route
      name="signup"
      handler={Account.Signup}
      />
    <Route
      name="activate"
      handler={Account.Activate}
      path="/activate/:uid/:token"
      />
    <Route
      name="password-update"
      handler={Account.PasswordUpdate}
      path="/password/update"
      />
    <Route
      name="password-reset"
      handler={Account.PasswordReset}
      path="/password/reset"
      />
    <Route
      name="password-reset-confirm"
      handler={Account.PasswordResetConfirm}
      path="/password/reset/:uid/:token"
      />

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

        <Redirect from="/instances/:instanceName" to="sockets" />

        {/* Sockets */}
        <Route
          name="sockets"
          path="sockets"
          >

          <DefaultRoute handler={Sockets}/>

        </Route>

        {/* Data */}
        <Route
          name="data"
          path="data"
          handler={Data}
        />

        {/* Admins */}
        <Route
          name="admins"
          handler={Admins}
          path="admins"
          />

        {/* API keys */}
        <Route
          name="api-keys"
          handler={ApiKeys}
          path="api_keys"
          />

        {/* General */}
        <Route
          name="instance-edit"
          handler={InstanceEdit}
          path="edit"
          />

        {/* Classes */}
        <Route
          name="classes"
          handler={ClassesPage}
          path="classes">

          <Route
            name="classes-add"
            handler={Classes.FormView}
            path="add" />

          <Route
            name = "classes-edit"
            handler = {Classes.FormView}
            path = ":className/edit" />

          {/* Classes - Data Objects */}
          <Route
            name="classes-data-objects"
            handler={DataObjects}
            path=":className/objects" />

          <DefaultRoute handler={Classes}/>
        </Route>

        {/* WebHooks */}
        <Route
          name="webhooks"
          path="webhooks"
          >

          {/* Webhook Traces */}
          <Route
            name='webhook-traces'
            handler={Data.WebhookTraces}
            path='webhook/:webhookName/traces'
            />

          <DefaultRoute handler={Webhooks}/>

        </Route>

        {/* CodeBoxes */}
        <Route
          name="codeboxes"
          handler={CodeBoxesPage}
          path="codeboxes">
          <Route
            name="codebox"
            handler={CodeBox}
            path=":codeboxId">
            <Route
              name="codebox-traces"
              handler={CodeBox.Traces}
              path="traces"
              />
            <Route
              name="codebox-edit"
              handler={CodeBox.Edit}
              path="edit"
              />
            <Route
              name="codebox-config"
              handler={CodeBox.Config}
              path="config"/>
            <DefaultRoute handler={CodeBox.Edit}/>
          </Route>
          <DefaultRoute handler={CodeBoxes}/>
        </Route>
        <Route
          name="codeboxes-add"
          handler={CodeBoxes}
          path="codeboxes/:action"
          />

        {/* Data Objects */}
        <Route
          name="data-objects"
          handler={DataObjects}
          path="objects"
          />

        {/* Tasks */}
        <Route
          name="tasks"
          path="tasks"
          >

          <Route
            name='schedule-traces'
            handler={Tasks.ScheduleTraces}
            path='schedule/:scheduleId/traces'
            />

          <Route
            name='trigger-traces'
            handler={Tasks.TriggerTraces}
            path='trigger/:triggerId/traces'
            />

          <DefaultRoute handler={Tasks}/>

        </Route>

        {/* Triggers */}
        <Route
          name="triggers"
          handler={Triggers}
          path="triggers"
          />

        {/* Schedules */}
        <Route
          name="schedules"
          handler={Schedules}
          path="schedules"
          />

        {/* Channels */}
        <Route
          name="channels"
          handler={Channels}
          path="channels"
          />

        {/* Users */}
        <Route
          name="users"
          handler={Users}
          path="users"
          />

      </Route>

      {/* Profile Billing */}
      <Route
        name="profile"
        handler={ProfilePage}
        path="/account"
        >
        <Route
          name="profile-billing-plan"
          handler={Profile.BillingPlan}
          path="plan"
          />
        <Route
          name="profile-billing-address"
          handler={Profile.BillingAddress}
          path="address"
          />
        <Route
          name="profile-billing-payment"
          handler={Profile.BillingPayment}
          path="payment-methods"
          />
        <Route
          name="profile-billing-invoices"
          handler={Profile.BillingInvoices}
          path="invoices"
          />
        <Route
          name="profile-settings"
          handler={Profile.Settings}
          path="/account"/>
        <Route
          name="profile-authentication"
          handler={Profile.Authentication}
          path="/account/authentication"
          />
        <Route
          name="profile-invitations"
          handler={Profile.Invitations}
          path="/account/invitations"
          />
        <DefaultRoute handler={Profile.BillingPlan}/>
      </Route>

      {/* Solutions */}
      <Route
        name="solutions"
        path="/solutions"
        >
        <Route
          name="solutions-list"
          handler={Solutions.ListView}
          path="list"
          />
        <Route
          name="solutions-install"
          handler={Solutions.EditView}
          path="/solutions/:solutionId/:action"
          />
        <Route
          name="solutions-edit"
          handler={Solutions.EditView}
          path="/solutions/:solutionId/edit"
          />
        <Route
          name="solutions-add-version"
          handler={Solutions.AddVersionView}
          path="/solutions/:solutionId/versions/add"
          />
        <Redirect
          from="/solutions"
          to="solutions-list"
          />
        <DefaultRoute handler={Solutions.ListView}/>
      </Route>

      <DefaultRoute handler={Instances}/>
    </Route>
  </Route>
);

