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
    AccountLogin                = require('./apps/Account/AccountLogin.react'),
    AccountSignup               = require('./apps/Account/AccountSignup.react'),
    AccountActivate             = require('./apps/Account/AccountActivate.react'),
    AccountPasswordUpdate       = require('./apps/Account/AccountPasswordUpdate.react'),
    AccountPasswordReset        = require('./apps/Account/AccountPasswordReset.react'),
    AccountPasswordResetConfirm = require('./apps/Account/AccountPasswordResetConfirm.react'),

    ProfileSettings             = require('./apps/Profile/ProfileSettings.react'),
    ProfileAuthentication       = require('./apps/Profile/ProfileAuthentication.react'),
    ProfileBillingAddress       = require('./apps/Profile/ProfileBillingAddress.react'),
    ProfileInvitations          = require('./apps/Profile/ProfileInvitations.react'),

    // Apps for authenticated users
    Instances                   = require('./apps/Instances/Instances.react'),

    // Instance Apps
    Admins                      = require('./apps/Admins/Admins.react'),
    ApiKeys                     = require('./apps/ApiKeys/ApiKeys.react'),
    Classes                     = require('./apps/Classes/Classes.react'),
    CodeBox                     = require('./apps/CodeBoxes/CodeBox.react'),
    CodeBoxes                   = require('./apps/CodeBoxes/CodeBoxes.react'),
    CodeBoxesEdit               = require('./apps/CodeBoxes/CodeBoxesEdit.react'),
    DataObjects                 = require('./apps/DataObjects/DataObjects.react'),
    Data                        = require('./apps/Data/Data.react'),
    Tasks                       = require('./apps/Tasks/Tasks.react'),
    Traces                      = require('./apps/Traces/Traces.react'),
    Users                       = require('./apps/Users/Users.react'),
    Channels                    = require('./apps/Channels/Channels.react'),

    // Examples
    Examples                    = require('./examples/Examples.react'),
    ListExamples                = require('./examples/ListExamples.react');

module.exports = (
  <Route name="app" handler={App} path="/" >
    <Route name="login" handler={AccountLogin} />
    <Route name="signup" handler={AccountSignup} />
    <Route name="activate" handler={AccountActivate} path="/activate/:uid/:token" />
    <Route name="password-update" handler={AccountPasswordUpdate} path="/password/update" />
    <Route name="password-reset" handler={AccountPasswordReset} path="/password/reset" />
    <Route name="password-reset-confirm" handler={AccountPasswordResetConfirm} path="/password/reset/:uid/:token" />

    <Route name="dashboard" handler={Dashboard} path="/" >
      <Route name="instances" handler={Instance} path="/instances">
        <Redirect name="instance" from="instance" to="data" path=":instanceName" />
        <Route name="data" handler={Data} path=":instanceName/data" />
        <Route name="admins" handler={Admins} path=":instanceName/admins" />
        <Route name="api-keys" handler={ApiKeys} path=":instanceName/api_keys" />
        <Route name="classes" handler={Classes} path=":instanceName/classes" />
        <Route name="classes-data-objects" handler={DataObjects} path=":instanceName/classes/:className/objects" />
        <Route name="codeboxes" handler={CodeBoxes} path=":instanceName/codeboxes" />
        <Route name="codeboxes-add" handler={CodeBoxes} path=":instanceName/codeboxes/:action" />
        <Route name="codebox" handler={CodeBox} path=":instanceName/codeboxes/:codeboxId">
          <Route name="codeboxes-traces" handler={Traces} path="traces" />
          <Route name="codeboxes-edit" handler={CodeBoxesEdit} path="edit" />
          <Route name="codeboxes-config" handler={CodeBoxesEdit} path="config" />
          <DefaultRoute handler={CodeBoxesEdit} />
        </Route>
        <Route name="data-objects" handler={DataObjects} path=":instanceName/objects" />
        <Route name="tasks" handler={Tasks} path=":instanceName/tasks" />
        <Route name="channels" handler={Channels} path=":instanceName/channels" />
        <Route name="users" handler={Users} path=":instanceName/users" />
        <DefaultRoute handler={Instances} />
      </Route>

      <Route name="profile-billing" handler={Billing} path="/account/billing">
        <Route name="profile-billing-address" handler={ProfileBillingAddress} path="address" />
        <DefaultRoute handler={ProfileBillingAddress} />
      </Route>
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