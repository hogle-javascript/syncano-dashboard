import React from 'react';
import Router from 'react-router';

// Pages
import App from './pages/app.react';
import Dashboard from './pages/dashboard.react';
import Instance from './pages/instance.react';
import Billing from './pages/billing.react';
import CodeBoxesPage from './pages/codeBoxes.react';
import NotFound from './pages/notfound.react';

// Apps
import Profile from './apps/Profile';
import Account from './apps/Account';

// Apps for authenticated users
import Instances from './apps/Instances/Instances.react';
import Solutions from './apps/Solutions/Solutions.react';
import SolutionEdit from './apps/Solutions/SolutionEdit.react';

// Instance Apps
import Admins from './apps/Admins/Admins.react';
import ApiKeys from './apps/ApiKeys/ApiKeys.react';
import Classes from './apps/Classes/Classes.react';
import CodeBoxes from './apps/CodeBoxes';
import DataObjects from './apps/DataObjects/DataObjects.react';
import Data from './apps/Data/Data.react';
import Tasks from './apps/Tasks/Tasks.react';
import Users from './apps/Users/Users.react';
import Channels from './apps/Channels/Channels.react';

// Examples
import Examples from './examples/Examples.react';
import ListExamples from './examples/ListExamples.react';

let Route         = Router.Route;
let Redirect      = Router.Redirect;
let NotFoundRoute = Router.NotFoundRoute;
let DefaultRoute  = Router.DefaultRoute;

module.exports = (
  <Route
    name    = "app"
    handler = {App}
    path    = "/"
  >
    <NotFoundRoute handler={NotFound} />
    <Route
      name    = "login"
      handler = {Account.Login}
    />
    <Route
      name    = "signup"
      handler = {Account.Signup}
    />
    <Route
      name    = "activate"
      handler = {Account.Activate}
      path    = "/activate/:uid/:token"
    />
    <Route
      name    = "password-update"
      handler = {Account.PasswordUpdate}
      path    = "/password/update"
    />
    <Route
      name    = "password-reset"
      handler = {Account.PasswordReset}
      path    = "/password/reset"
    />
    <Route
      name    = "password-reset-confirm"
      handler = {Account.PasswordResetConfirm}
      path    = "/password/reset/:uid/:token"
    />

    {/* Dashboard */}
    <Route
      name    = "dashboard"
      handler = {Dashboard}
      path    = "/"
    >
      <Route
        name    = "instances"
        handler = {Instance}
        path    = "/instances">
        <Redirect
          name  = "instance"
          from  = "instance"
          to    = "data"
          path  = ":instanceName"
        />
        <DefaultRoute handler={Instances} />

        {/* Data */}
        <Route
          name    = "data"
          handler = {Data}
          path    = ":instanceName/data"
          />

        {/* Admins */}
        <Route
          name    = "admins"
          handler = {Admins}
          path    = ":instanceName/admins"
        />

        {/* API keys */}
        <Route
          name    = "api-keys"
          handler = {ApiKeys}
          path    = ":instanceName/api_keys"
        />

        {/* Classes */}
        <Route
          name    = "classes"
          handler = {Classes}
          path    = ":instanceName/classes"
        />

        {/* Classes - Data Objects */}
        <Route
          name    = "classes-data-objects"
          handler = {DataObjects}
          path    = ":instanceName/classes/:className/objects"
        />

        {/* CodeBoxes */}
        <Route
          name    = "codeboxes"
          handler = {CodeBoxesPage}
          path    = ":instanceName/codeboxes">
          <Route
            name    = "codebox"
            handler = {CodeBoxes.Details}
            path    = ":codeboxId">
            <Route
              name    = "codebox-traces"
              handler = {CodeBoxes.Traces}
              path    = "traces"
            />
            <Route
              name    = "codebox-edit"
              handler = {CodeBoxes.Edit}
              path    = "edit"
            />
            <Route
              name    = "codebox-config"
              handler = {CodeBoxes.Config}
              path    = "config" />
            <DefaultRoute handler={CodeBoxes.Edit} />
          </Route>
          <DefaultRoute handler={CodeBoxes} />
        </Route>
        <Route
          name    = "codeboxes-add"
          handler = {CodeBoxes}
          path    = ":instanceName/codeboxes/:action"
        />

        {/* Data Objects */}
        <Route
          name    = "data-objects"
          handler = {DataObjects}
          path    = ":instanceName/objects"
        />

        {/* Tasks */}
        <Route
          name    = "tasks"
          handler = {Tasks}
          path    = ":instanceName/tasks"
        />

        {/* Channels */}
        <Route
          name    = "channels"
          handler = {Channels}
          path    = ":instanceName/channels"
        />

        {/* Users */}
        <Route
          name    = "users"
          handler = {Users}
          path    = ":instanceName/users"
        />

      </Route>

      {/* Profile Billing */}
      <Route
        name    = "profile-billing"
        handler = {Billing}
        path    = "/account/billing"
      >
        <Route
          name    = "profile-billing-plan"
          handler = {Profile.BillingPlan}
          path    = "plan"
        />
        <Route
          name    = "profile-billing-address"
          handler = {Profile.BillingAddress}
          path    = "address"
        />
        <Route
          name    = "profile-billing-payment"
          handler = {Profile.BillingPayment}
          path    = "payment-methods"
        />
        <Route
          name    = "profile-billing-invoices"
          handler = {Profile.BillingInvoices}
          path    = "invoices"
        />
        <DefaultRoute handler={Profile.BillingPlan} />
      </Route>

      {/* Solutions */}
      <Route
        name    = "solutions"
        handler = {Solutions}
        path    = "/solutions"
      />
      <Route
        name    = "solutions-install"
        handler = {SolutionEdit}
        path    = "/solutions/:solutionId/:action"
      />
      <Route
        name    = "solutions-edit"
        handler = {SolutionEdit}
        path    = "/solutions/:solutionId/edit"
      />
      <Route
        name    = "profile-settings"
        handler = {Profile.Settings}
        path    = "/account" />
      <Route
        name    = "profile-authentication"
        handler = {Profile.Authentication}
        path    = "/account/authentication"
      />
      <Route
        name    = "profile-invitations"
        handler = {Profile.Invitations}
        path    = "/account/invitations"
      />
      <DefaultRoute handler = {Instances}/>
    </Route>

    {/* Examples */}
    <Route
      name    = "examples"
      handler = {Examples}
    />
    <Route
      name    = "listsexamples"
      handler = {ListExamples}
    />
  </Route>
);
