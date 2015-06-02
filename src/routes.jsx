var React                       = require('react'),
    Router                      = require('react-router'),
    Route                       = Router.Route,
    NotFoundRoute               = Router.NotFoundRoute,

    // Pages
    App                         = require('./pages/app.react'),
    Dashboard                   = require('./pages/dashboard.react'),
    NotFound                    = require('./pages/notfound.react'),

    // Apps
    AccountLogin                = require('./apps/Account/AccountLogin.react'),
    AccountSignup               = require('./apps/Account/AccountSignup.react'),
    AccountActivate             = require('./apps/Account/AccountActivate.react'),
    AccountPasswordReset        = require('./apps/Account/AccountPasswordReset.react'),
    AccountPasswordResetConfirm = require('./apps/Account/AccountPasswordResetConfirm.react'),

    Instances                   = require('./apps/Instances/Instances.react'),
    Admins                      = require('./apps/Admins/Admins.react'),
    ApiKeys                     = require('./apps/ApiKeys/ApiKeys.react'),
    Classes                     = require('./apps/Classes/Classes.react'),
    Codeboxes                   = require('./apps/Codeboxes/Codeboxes.react'),
    DataObjects                 = require('./apps/DataObjects/DataObjects.react'),
    Schedules                   = require('./apps/Schedules/Schedules.react'),
    Tasks                       = require('./apps/Tasks/Tasks.react'),
    Users                       = require('./apps/Users/Users.react'),
    Webhooks                    = require('./apps/Webhooks/Webhooks.react'),

    // Examples
    Examples                    = require('./examples/Examples.react'),
    ListExamples                = require('./examples/ListExamples.react');



module.exports = (
  <Route name="app" handler={App} path="/">
    <Route name="login" handler={AccountLogin}/>
    <Route name="signup" handler={AccountSignup} />
    <Route name="activate" handler={AccountActivate} path="/activate/:uid-:token" />
    <Route name="password-reset" handler={AccountPasswordReset} path="/password/reset" />
    <Route name="password-reset-confirm" handler={AccountPasswordResetConfirm} path="/password/reset/:uid-:token" />

    <Route name="dashboard" handler={Dashboard} path="/">
      <Route name="instances" handler={Instances} path="/instances" />
      <Route name="admins" handler={Admins} path="/instances/:instanceName/admins" />
      <Route name="api-keys" handler={ApiKeys} path="/instances/:instanceName/api_keys" />
      <Route name="classes" handler={Classes} path="/instances/:instanceName/classes" />
      <Route name="codeboxes" handler={Codeboxes} path="/instances/:instanceName/codeboxes" />
      <Route name="data-objects" handler={DataObjects} path="/instances/:instanceName/objects" />
      <Route name="schedules" handler={Schedules} path="/instances/:instanceName/schedules" />
      <Route name="tasks" handler={Tasks} path="/instances/:instanceName/tasks" />
      <Route name="users" handler={Users} path="/instances/:instanceName/users" />
      <Route name="webhooks" handler={Webhooks} path="/instances/:instanceName/webhooks" />
    </Route>

    <Route name="examples" handler={Examples}/>
    <Route name="listsexamples" handler={ListExamples}/>
    <NotFoundRoute handler={NotFound} />
  </Route>
)