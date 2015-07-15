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
    NotFound                    = require('./pages/notfound.react'),

    // Anonymouns Apps
    Account                     = require('./apps/Account'),

    ProfileSettings             = require('./apps/Profile/ProfileSettings.react'),
    ProfileAuthentication       = require('./apps/Profile/ProfileAuthentication.react'),
    ProfileBillingAddress       = require('./apps/Profile/ProfileBillingAddress.react'),
    ProfileBillingPayment       = require('./apps/Profile/ProfileBillingPayment.react'),
    ProfileBillingInvoices      = require('./apps/Profile/ProfileBillingInvoices.react'),
    ProfileInvitations          = require('./apps/Profile/ProfileInvitations.react'),

    // Apps for authenticated users
    Instances                   = require('./apps/Instances/Instances.react'),
    Solutions                   = require('./apps/Solutions/Solutions.react'),
    SolutionEdit                = require('./apps/Solutions/SolutionEdit.react'),

    // Instance Apps
    Admins                      = require('./apps/Admins/Admins.react'),
    ApiKeys                     = require('./apps/ApiKeys/ApiKeys.react'),
    Classes                     = require('./apps/Classes/Classes.react'),
    CodeBoxes                   = require('./apps/CodeBoxes/CodeBoxes.react'),
    CodeBoxesEdit               = require('./apps/CodeBoxes/CodeBoxesEdit.react'),
    CodeBoxesConfig             = require('./apps/CodeBoxes/CodeBoxesConfig.react'),
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
  <Route name="app" handler={App} path="/" >
    <Route name="login" handler={Account.Login} />
    <Route name="signup" handler={Account.Signup} />
    <Route name="activate" handler={Account.Activate} path="/activate/:uid/:token" />
    <Route name="password-update" handler={Account.PasswordUpdate} path="/password/update" />
    <Route name="password-reset" handler={Account.PasswordReset} path="/password/reset" />
    <Route name="password-reset-confirm" handler={Account.PasswordResetConfirm} path="/password/reset/:uid/:token" />

    <Route name="dashboard" handler={Dashboard} path="/" >
      <Route name="instances" handler={Instance} path="/instances">
        <Redirect name="instance" from="instance" to="data" path=":instanceName" />
        <Route name="data" handler={Data} path=":instanceName/data" />
        <Route name="admins" handler={Admins} path=":instanceName/admins" />
        <Route name="api-keys" handler={ApiKeys} path=":instanceName/api_keys" />
        <Route name="classes" handler={Classes} path=":instanceName/classes" />
        <Route name="classes-data-objects" handler={DataObjects} path=":instanceName/classes/:className/objects" />
        <Route name="codeboxes" handler={CodeBoxes} path=":instanceName/codeboxes" />
        <Route name="codeboxes-traces" handler={Traces} path=":instanceName/codeboxes/:codeboxId/traces" />
        <Route name="codeboxes-add" handler={CodeBoxes} path=":instanceName/codeboxes/:action" />
        <Route name="codeboxes-edit" handler={CodeBoxesEdit} path=":instanceName/codeboxes/:codeboxId/edit" />
        <Route name="codeboxes-config" handler={CodeBoxesConfig} path=":instanceName/codeboxes/:codeboxId/config" />
        <Route name="data-objects" handler={DataObjects} path=":instanceName/objects" />
        <Route name="tasks" handler={Tasks} path=":instanceName/tasks" />
        <Route name="channels" handler={Channels} path=":instanceName/channels" />
        <Route name="users" handler={Users} path=":instanceName/users" />
        <DefaultRoute handler={Instances} />
      </Route>
      <Route name="profile-billing" handler={Billing} path="/account/billing">
        <Route name="profile-billing-address" handler={ProfileBillingAddress} path="address" />
        <Route name="profile-billing-payment" handler={ProfileBillingPayment} path="payment-methods" />
        <Route name="profile-billing-invoices" handler={ProfileBillingInvoices} path="invoices" />
        <DefaultRoute handler={ProfileBillingAddress} />
      </Route>
      <Route name="solutions" handler={Solutions} path="/solutions" />
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
      <Route name="profile-settings" handler={ProfileSettings} path="/account" />
      <Route name="profile-authentication" handler={ProfileAuthentication} path="/account/authentication" />
      <Route name="profile-invitations" handler={ProfileInvitations} path="/account/invitations" />
      <DefaultRoute handler={Instances} />
    </Route>

    <Route name="examples" handler={Examples}/>
    <Route name="listsexamples" handler={ListExamples}/>
    <NotFoundRoute handler={NotFound} />
  </Route>
);
