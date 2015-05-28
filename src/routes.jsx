var React                       = require('react'),
    Router                      = require('react-router'),
    Route                       = Router.Route,
    NotFoundRoute               = Router.NotFoundRoute,

    AppHandler                  = require('./pages/app.react'),
    PanelHandler                = require('./pages/panel.react'),
    NotFoundHandler             = require('./pages/notfound.react'),
    LoginHandler                = require('./pages/login.react'),
    SignupHandler               = require('./pages/signup.react'),
    ActivateHandler             = require('./pages/activate.react'),
    PasswordResetHandler        = require('./pages/password_reset.react'),
    PasswordResetConfirmHandler = require('./pages/password_reset_confirm.react'),

    InstancesHandler            = require('./pages/instances.react');


module.exports = (
  <Route name="app" handler={AppHandler} path="/">
    <Route name="login" handler={LoginHandler}/>
    <Route name="signup" handler={SignupHandler} />
    <Route name="activate" handler={ActivateHandler} path="/activate/:uid-:token" />
    <Route name="password-reset" handler={PasswordResetHandler} path="/password/reset" />
    <Route name="password-reset-confirm" handler={PasswordResetConfirmHandler} path="/password/reset/:uid-:token" />

    <Route name="panel" handler={PanelHandler} path="/">
      <Route name="instance-list" handler={InstancesHandler} path="/instances" />
    </Route>
    <NotFoundRoute handler={NotFoundHandler} />
  </Route>
)