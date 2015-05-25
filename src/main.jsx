var React = require('react');
var Director = require('director');
var classNames = require('classnames');

//var Hello         = require('hellojs');
//
//var App           = require('./App');


//
//var ServerActions = require('./actions/ServerActions');
//var ViewActions   = require('./actions/ViewActions');
//
//var AccountStore  = require('./stores/AccountStore');
//
//require('../css/main');
//

//
//var localAccount = JSON.parse(localStorage.getItem('account'));
//
//if (localAccount && "account_key" in localAccount) {
//  AccountStore.setAccount(localAccount);
//}
//
//var oauthConfig = {};
//
//if (__DEVEL__) {
//  oauthConfig = {
//    facebook : '786501338055478',
//    google : '866327430159-v0355mggnegip8h2stbr1eop1oar7dv8.apps.googleusercontent.com',
//    github : 'ae31b5f69788a4d1d94e',
//  };
//  oauthProxyURL = 'https://auth-server.herokuapp.com/proxy';
//} else if (__STAGING__) {
//  oauthConfig = {
//    facebook : '854409187931751',
//    google : '242072477675-5gs36pj4pbvi890n91rq48q3c0e8qc2t.apps.googleusercontent.com',
//    github : '0732b34ff319b57889b2',
//  };
//  oauthProxyURL = 'https://api.syncano.rocks/v1/account/auth/backend/github/proxy';
//} else if (__PRODUCTION__) {
//  oauthConfig = {
//    facebook : '1440315139599182',
//    google : '242072477675-soq6a2k3cl2s1ndjvcmv78god4etv3eg.apps.googleusercontent.com',
//    github : 'e313522b8967cdeac8a2',
//  };
//  oauthProxyURL = 'https://api.syncano.io/account/auth/backend/github/proxy';
//}
//
//Hello.init(oauthConfig, {
//    redirect_uri: location.protocol + '//' + location.host,
//    scope: 'email',
//    oauth_proxy: oauthProxyURL
//});
//
//Hello.on('auth', function(auth){
//  if (auth.network === "facebook") {
//    var token = auth.authResponse.access_token;
//    ServerActions.facebookSignIn(token);
//  } else if (auth.network === "google") {
//    var token = auth.authResponse.access_token;
//    ServerActions.googleSignIn(token);
//  } else if (auth.network === "github") {
//    var token = auth.authResponse.access_token;
//    ServerActions.githubSignIn(token);
//  }
//});
//
//var renderView = function(component, params) {
//  if ("account_key" in AccountStore.getAccount()) {
//    React.render(component, appContainer);
//  } else {
//    window.location.href = '#login';
//  };
//};



require('./main.css');

//Pages
var Examples = require('./examples/Examples.react');


//Pages
var Signup = require('./pages/signup.react');
var Login = require('./pages/login.react');
var AdminPageWrapper = require('./pages/admin.react');

// Internal Apps
var Instances = require('./apps/Instances/Instances.react');
var AuthUtils = require('./apps/Auth/utils');
var AuthStore = require('./apps/Auth/store');

var SyncanoLib = require('./lib/syncano4.js');
Syncano = new SyncanoLib();

var appContainer = document.getElementById('app');

var MainWrapper = React.createClass({

  componentWillMount: function () {
    var token = AuthStore.getToken();

    if (token) {
      if (!Syncano.getInfo().account.account_key) {
          Syncano.connect(token);
      }
    }
  },

  render: function () {

    // Different components have different notifications CSS
    var notificationStyles = {};
    notificationStyles[this.props.children.props.notificationGroup] = true;
    var notificationCss = classNames(notificationStyles);

    return (
      <div className="app-group">
        <div className="notification-field">
          <div className={notificationCss} ref="notificationGroup" id="test"></div>
        </div>
        {this.props.children}
        <div className="snackbar-group" ref="snackbarGroup"></div>

        <div className="search-group" ref="searchGroup"></div>
      </div>
    );
  }
});


var router = Director.Router({

  '/': function () {
    React.render(<MainWrapper><Login /></MainWrapper>, appContainer);
  },

  'signup': function () {
    React.render(<MainWrapper><Signup /></MainWrapper>, appContainer);
  },

  'login': function () {
    React.render(<MainWrapper><Login /></MainWrapper>, appContainer);
  },

  'instances': function () {
    AuthUtils.checkAuth(<AdminPageWrapper title="Instances"><Instances /></AdminPageWrapper>, appContainer);
  },

  'examples': function () {
    React.render(<Examples />, appContainer);
  },



}).configure({

  'notfound': function () {
    React.render(<App viewType="notfound"/>, appContainer);
  }

});

router.init('/login');
