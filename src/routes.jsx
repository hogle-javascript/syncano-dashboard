var React                       = require('react'),
    Router                      = require('react-router'),
    Route                       = Router.Route,
    NotFoundRoute               = Router.NotFoundRoute,

    // Pages
    App                         = require('./pages/app.react'),
    Dashboard                   = require('./pages/dashboard.react'),
    NotFound                    = require('./pages/notfound.react'),

    // Account
    AccountLogin                = require('./apps/Account/AccountLogin.react'),
    AccountSignup               = require('./apps/Account/AccountSignup.react'),
    AccountActivate             = require('./apps/Account/AccountActivate.react'),
    AccountPasswordReset        = require('./apps/Account/AccountPasswordReset.react'),
    AccountPasswordResetConfirm = require('./apps/Account/AccountPasswordResetConfirm.react'),

    Instances                   = require('./apps/Instances/Instances.react'),
    Classes                     = require('./apps/Classes/Classes.react'),
    DataObjects                 = require('./apps/DataObjects/DataObjects.react'),

    // Examples
    Examples                    = require('./examples/Examples.react');


module.exports = (
  <Route name="app" handler={App} path="/">
    <Route name="login" handler={AccountLogin}/>
    <Route name="signup" handler={AccountSignup} />
    <Route name="activate" handler={AccountActivate} path="/activate/:uid-:token" />
    <Route name="password-reset" handler={AccountPasswordReset} path="/password/reset" />
    <Route name="password-reset-confirm" handler={AccountPasswordResetConfirm} path="/password/reset/:uid-:token" />

    <Route name="dashboard" handler={Dashboard} path="/">
      <Route name="instances" handler={Instances} path="/instances" />
      <Route name="classes" handler={Classes} path="/instances/:instanceName/classes" />
      <Route name="data-objects" handler={DataObjects} path="/instances/:instanceName/objects" />
    </Route>

    <Route name="examples" handler={Examples}/>
    <NotFoundRoute handler={NotFound} />
  </Route>
)