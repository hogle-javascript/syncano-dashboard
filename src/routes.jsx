var React                       = require('react'),
    Router                      = require('react-router'),
    Route                       = Router.Route,
    Redirect                    = Router.Redirect,
    NotFoundRoute               = Router.NotFoundRoute,
    DefaultRoute                = Router.DefaultRoute,

    // Pages
    App                         = require('./pages/app.react'),
    Dashboard                   = require('./pages/dashboard.react'),
    Instance                    = require('./pages/instance.react'),
    Billing                     = require('./pages/billing.react'),
    CodeBoxesPage               = require('./pages/codeBoxes.react'),
    NotFound                    = require('./pages/notfound.react'),

    Account                     = require('./apps/Account'),
    Profile                     = require('./apps/Profile'),

    // Apps for authenticated users
    Instances                   = require('./apps/Instances/Instances.react'),
    Solutions                   = require('./apps/Solutions/Solutions.react'),
    SolutionEdit                = require('./apps/Solutions/SolutionEdit.react'),

    // Instance Apps
    Admins                      = require('./apps/Admins/Admins.react'),
    ApiKeys                     = require('./apps/ApiKeys/ApiKeys.react'),
    Classes                     = require('./apps/Classes/Classes.react'),
    CodeBoxes                   = require('./apps/CodeBoxes'),
    Traces                      = require('./apps/Traces/Traces.react'),
    DataObjects                 = require('./apps/DataObjects/DataObjects.react'),
    Data                        = require('./apps/Data/Data.react'),
    Tasks                       = require('./apps/Tasks/Tasks.react'),
    Users                       = require('./apps/Users/Users.react'),
    Channels                    = require('./apps/Channels/Channels.react'),

    // Examples
    Examples                    = require('./examples/Examples.react'),
    ListExamples                = require('./examples/ListExamples.react');

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
            handler = {CodeBoxes}
            path    = ":codeboxId">
            <Route
              name    = "codebox-traces"
              handler = {Traces}
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
          handler = {Profile.BillingInvoices} path="invoices"
        />
        <DefaultRoute handler={Profile.BillingAddress} />
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
