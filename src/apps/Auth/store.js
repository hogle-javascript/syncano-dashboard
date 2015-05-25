//var Request = require('superagent');
var assign = require('object-assign');


var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../../dispatcher/AppDispatcher');
//var Hello = require('hellojs');


//var ErrorStore = require('./ErrorStore');
//
//var ViewActions = require('../actions/ViewActions');
//var Constants = require('../../Constants/constants');



var CHANGE_EVENT = 'change';

var account = {};

var AuthStore = assign(EventEmitter.prototype, {

  setAccount: function (data) {
    account = data;
  },
  getAccountInfo: function (key) {
    return sessionStorage.getItem(key);
  },

  getToken: function () {
    return account.token || sessionStorage.getItem('account_key');
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },
});

AuthStore.dispatchToken = AppDispatcher.register(function (payload) {

  var action = payload.action;
  var data = action.data;
  var token = action.token;

  var successLogin = function(accountInfo) {
    console.log('Setting account key:', accountInfo);
    for (var key in accountInfo) {
      sessionStorage.setItem(key, accountInfo[key]);
    }
    // TODO
    window.location.href = '#instances';
  };

  var failedLogin = function(){
    console.log('Login falied!');
  };

  //var onRegisterAccountEnd = function (error, response) {
  //  if (response.badRequest) {
  //    var text = JSON.parse(response.text);
  //    Object.keys(text).forEach(function (key) {
  //      ViewActions.showNotification({
  //        text: text[key],
  //        status: "warning",
  //      });
  //    });
  //  } else if (error) {
  //    ViewActions.showNotification({
  //      text: "Sorry, something goes wrong",
  //      status: "error"
  //    });
  //  } else if (!error && response.ok) {
  //    ViewActions.showNotification({
  //      text: 'Sign up successful. Check your e-mail for activation link',
  //      status: "info"
  //    });
  //    account = response.body;
  //    window.location.href = '#login';
  //  }
  //};
  //
  //var onLoginAccountEnd = function (error, response) {
  //  if (response.statusType == 4) {
  //    var text = JSON.parse(response.text);
  //    Object.keys(text).forEach(function (key) {
  //      ViewActions.showNotification({
  //        text: text[key],
  //        status: "warning",
  //      });
  //    });
  //  } else if (error) {
  //    ViewActions.showNotification({
  //      text: "Sorry, something goes wrong",
  //      status: "error"
  //    });
  //  } else if (!error && response.ok) {
  //    account = response.body;
  //    localStorage.setItem('account', JSON.stringify(account));
  //    window.location.href = '#instances';
  //  }
  //};
  //
  //var onActivationEnd = function (error, response) {
  //  var responseText;
  //  if (response.badRequest) {
  //    var text = JSON.parse(response.text);
  //    Object.keys(text).forEach(function (key) {
  //      responseText = 'Activation failed. ' + text[key];
  //    });
  //  } else if (error) {
  //    responseText = 'Sorry, but something goes wrong. Activation failed.\n' + 'Error: ' + error;
  //  } else if (!error && response.ok) {
  //    account = response.body;
  //    localStorage.setItem('account', JSON.stringify(account));
  //    responseText = 'Activation successful! You will be redirected to admin panel in 3 seconds...';
  //    setTimeout(function () {
  //      window.location.href = window.location.origin + window.location.pathname + '#instances';
  //    }, 3000);
  //  }
  //  if (typeof action.callback == 'function') {
  //    action.callback(responseText);
  //  }
  //};
  //
  //var onFacebookSignInEnd = function (error, response) {
  //  if (response.ok) {
  //    account = response.body;
  //    localStorage.setItem('account', JSON.stringify(account));
  //    window.location.href = '#instances';
  //  }
  //};
  //
  //var onGoogleSignInEnd = function (error, response) {
  //  if (response.ok) {
  //    account = response.body;
  //    localStorage.setItem('account', JSON.stringify(account));
  //    window.location.href = '#instances';
  //  }
  //};
  //
  //var onGithubSignInEnd = function (error, response) {
  //  if (response.ok) {
  //    account = response.body;
  //    localStorage.setItem('account', JSON.stringify(account));
  //    window.location.href = '#instances';
  //  }
  //};
  //
  //var onGetAccountEnd = function (error, response) {
  //  if (response.ok) {
  //    account.first_name = response.body.first_name;
  //    account.last_name = response.body.last_name;
  //    account.email = response.body.email;
  //  }
  //  AccountStore.emitChange();
  //};
  //
  //var onSaveAccountEnd = function (error, response) {
  //  if (response.ok) {
  //    account.first_name = response.body.first_name;
  //    account.last_name = response.body.last_name;
  //    account.email = response.body.email;
  //  }
  //  AccountStore.emitChange();
  //};
  //
  //var onGetAccountInvitationsEnd = function (error, response) {
  //  console.log(error, response)
  //  if (response.ok) {
  //    invitations = response.body.objects;
  //    console.log(invitations)
  //  }
  //  AccountStore.emitChange();
  //};
  //
  //var onRespondToInvitationEnd = function (error, response) {
  //  if (response.ok) {
  //    invitations = invitations.map(function (storeInvitation) {
  //      if (storeInvitation.id === response.body.id) {
  //        return response.body;
  //      }
  //    });
  //    AccountStore.emitChange();
  //  }
  //};
  //
  //var onGetBillingProfileEnd = function (error, response) {
  //  if (response.ok) {
  //    billing.profile = response.body;
  //    AccountStore.emitChange();
  //  }
  //};
  //
  //var onSetBillingLimitEnd = function (error, response) {
  //  if (response.ok) {
  //    billing.profile = response.body;
  //    ViewActions.closeModal();
  //  } else if (!response.ok) {
  //    ViewActions.showErrors(JSON.parse(response.text));
  //  }
  //  AccountStore.emitChange();
  //};
  //
  //var onSetBillingAlertEnd = function (error, response) {
  //  if (response.ok) {
  //    billing.profile = response.body;
  //    AccountStore.emitChange();
  //  }
  //};
  //
  //var onGetBillingCardEnd = function (error, response) {
  //  if (response.ok) {
  //    billing.card = response.body;
  //    AccountStore.emitChange();
  //  }
  //};
  //
  //var onSetBillingCardEnd = function (error, response) {
  //  if (response.ok) {
  //    billing.card = response.body;
  //    AccountStore.emitChange();
  //  }
  //};
  //
  //var onGetBillingInvoicesEnd = function (error, response) {
  //  if (response.ok) {
  //    billing.invoices = response.body.objects;
  //    billing.invoices.push({
  //      "status": "payment failed",
  //      "amount": "10.00000",
  //      "period": {
  //        "start": "2015-04-01",
  //        "end": "2015-04-30"
  //      },
  //      "created_at": "2015-04-14T10:20:23.763720Z",
  //      "updated_at": "2015-04-14T10:26:48.672858Z",
  //      "items": [
  //        {
  //          "instance_name": "syncano",
  //          "source": 0,
  //          "amount": "2.00000",
  //          "quantity": 1,
  //          "description": "syncano - API requests"
  //        }
  //      ],
  //      "description": "Syncano 2015-04",
  //      "id": 7,
  //      "links": {
  //        "pay": "/v1/billing/invoices/7/pay/",
  //        "self": "/v1/billing/invoices/7/",
  //        "pdf": "/v1/billing/invoices/7/pdf/"
  //      }
  //    })
  //    AccountStore.emitChange();
  //  }
  //};
  //
  //var getParamsFromUrl = function () {
  //  var url = decodeURIComponent(window.location.hash);
  //  var query = url.substring(url.indexOf('?') + 1);
  //  var pairs = query.split('&');
  //  params = {};
  //  for (var i = 0; i < pairs.length; i++) {
  //    var param = pairs[i].split('=');
  //    if (params.hasOwnProperty(param[0])) {
  //      params[param[0]] = params[param[0]].split();
  //      params[param[0]].push(param[1]);
  //    } else {
  //      params[param[0]] = param[1];
  //    }
  //  }
  //  ;
  //  return params;
  //};
  //
  //var onSetBillingAddress = function (error, response) {
  //  if (response.ok) {
  //    billing.profile = response.body;
  //    ViewActions.showSnackbar({text: 'Profile updated successfully.'});
  //    AccountStore.emitChange();
  //  }
  //};

  switch (action.type) {

    //case "ACTIVATE_ACCOUNT":
    //  var url = Constants.API + '/account/activate/';
    //  var headers = {
    //    'Content-Type': 'application/json',
    //  };
    //  Request.post(url).set(headers).send(JSON.stringify(getParamsFromUrl())).end(onActivationEnd);
    //  break;
    //
    //case "REGISTER_ACCOUNT":
    //  var url = Constants.API + '/account/register/';
    //  var headers = {
    //    'Content-Type': 'application/json',
    //  };
    //  Request.post(url).set(headers).send(JSON.stringify(data)).end(onRegisterAccountEnd);
    //  break;

    case "PASSWORD_SIGN_IN":
      Syncano.connect(data.email, data.password).then(successLogin, failedLogin);
      break;

    case "LOGOUT":
      sessionStorage.clear();
      window.location.href = '#login';
      break;


    //case "FACEBOOK_SIGN_IN":
    //  var url = Constants.API + '/account/auth/facebook/';
    //  var headers = {
    //    'Content-Type': 'application/json',
    //    'AUTHORIZATION': 'token ' + token
    //  };
    //  Request.post(url).set(headers).end(onFacebookSignInEnd);
    //  break;
    //
    //case "GOOGLE_SIGN_IN":
    //  var url = Constants.API + '/account/auth/google-oauth2/';
    //  var headers = {
    //    'Content-Type': 'application/json',
    //    'AUTHORIZATION': 'token ' + action.token
    //  };
    //  Request.post(url).set(headers).end(onGoogleSignInEnd);
    //  break;
    //
    //case "GITHUB_SIGN_IN":
    //  var url = Constants.API + '/account/auth/github/';
    //  var headers = {
    //    'Content-Type': 'application/json',
    //    'AUTHORIZATION': 'token ' + action.token
    //  };
    //  Request.post(url).set(headers).end(onGithubSignInEnd);
    //  break;

  }

  AuthStore.emit(CHANGE_EVENT);

});

module.exports = AuthStore;