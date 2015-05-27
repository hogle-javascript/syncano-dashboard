webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var Director = __webpack_require__(261);
	var classNames = __webpack_require__(262);

	// var Hello         = require('hellojs');


	// var App           = require('./App');



	// var ServerActions = require('./actions/ServerActions');
	// var ViewActions   = require('./actions/ViewActions');

	// var AccountStore  = require('./stores/AccountStore');

	// require('../css/main');


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



	__webpack_require__(263);

	//Pages
	var Examples = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./examples/Examples.react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));


	//Pages
	var Signup = __webpack_require__(436);
	var Login = __webpack_require__(246);
	var AdminPageWrapper = __webpack_require__(437);

	// Internal Apps
	var Instances = __webpack_require__(479);
	var AuthUtils = __webpack_require__(499);
	var AuthStore = __webpack_require__(255);

	var SyncanoLib = __webpack_require__(500);
	Syncano = new SyncanoLib();

	var appContainer = document.getElementById('app');

	var MainWrapper = React.createClass({displayName: "MainWrapper",

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
	      React.createElement("div", {className: "app-group"}, 
	        React.createElement("div", {className: "notification-field"}, 
	          React.createElement("div", {className: notificationCss, ref: "notificationGroup", id: "test"})
	        ), 
	        this.props.children, 
	        React.createElement("div", {className: "snackbar-group", ref: "snackbarGroup"}), 

	        React.createElement("div", {className: "search-group", ref: "searchGroup"})
	      )
	    );
	  }
	});


	var router = Director.Router({

	  '/': function () {
	    React.render(React.createElement(MainWrapper, null, React.createElement(Login, null)), appContainer);
	  },

	  'signup': function () {
	    React.render(React.createElement(MainWrapper, null, React.createElement(Signup, null)), appContainer);
	  },

	  'login': function () {
	    React.render(React.createElement(MainWrapper, null, React.createElement(Login, null)), appContainer);
	  },

	  'instances': function () {
	    AuthUtils.checkAuth(React.createElement(AdminPageWrapper, {title: "Instances"}, React.createElement(Instances, null)), appContainer);
	  },

	  'examples': function () {
	    React.render(React.createElement(Examples, null), appContainer);
	  },



	}).configure({

	  'notfound': function () {
	    React.render(React.createElement(App, {viewType: "notfound"}), appContainer);
	  }

	});

	router.init('/login');


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var Hello = __webpack_require__(253);
	//var DocumentTitle = require('react-document-title');

	var AuthStore = __webpack_require__(255);

	var AuthActions = __webpack_require__(247);
	var ButtonSocialAuthList = __webpack_require__(508);

	__webpack_require__(257);

	module.exports = React.createClass({

	  displayName: 'Login',

	  getDefaultProps: function () {
	    return {
	      notificationGroup: 'notification-group-login'
	    };
	  },

	  componentWillMount: function () {
	    // TODO
	    if (Syncano.getInfo().account.account_key) {
	      window.location = "#instances";
	    }
	  },

	  componentDidMount: function () {
	    this.refs.email.getDOMNode().focus();
	  },

	  getFormData: function () {
	    return {
	      email: this.refs.email.getDOMNode().value,
	      password: this.refs.password.getDOMNode().value,
	    };
	  },

	  handleLogIn: function (e) {

	    if (e.keyCode === 13 || e.type === "click") {
	      var data = this.getFormData();
	      AuthActions.passwordSignIn(data);
	    }
	  },

	  handleSocialButtonClick: function (button) {
	    Hello(button).login();
	  },

	  render: function () {
	    return (
	      React.createElement("div", {className: "login-page", ref: "loginPage"}, 
	        React.createElement("div", {className: "login"}, 
	          React.createElement("div", {className: "login-logo"}, 
	            React.createElement("img", {src: "/img/syncano-logo.png"})
	          ), 
	          React.createElement("div", {className: "login-content"}, 

	            React.createElement("div", {className: "login-header"}, 
	              React.createElement("h1", null, "Sign in and start creating your apps right away.")
	            ), 

	            React.createElement("form", {className: "login-input-group", acceptCharset: "UTF-8", action: "/action", method: "post"}, 
	              React.createElement("label", {htmlFor: "email"}, "Email"), 
	              React.createElement("input", {type: "email", placeholder: "Your email", ref: "email", name: "email", autoComplete: "email", 
	                     onKeyUp: this.handleLogIn}), 
	              React.createElement("label", {htmlFor: "password"}, "Password"), 
	              React.createElement("input", {type: "password", placeholder: "Password", ref: "password", name: "password", autoComplete: "password", 
	                     onKeyUp: this.handleLogIn})
	            ), 

	            React.createElement("div", {className: "login-options-group"}, 
	              React.createElement("div", {className: "login-button", onClick: this.handleLogIn}, 
	                React.createElement("span", null, "Sign in")
	              ), 
	              React.createElement("div", {className: "separator"}, "or"), 
	              React.createElement(ButtonSocialAuthList, {handleClick: this.handleSocialButtonClick})
	            ), 

	            React.createElement("div", {className: "login-disclaimer"}, 
	              React.createElement("p", null, React.createElement("span", null, "Don't have an account? "), React.createElement("a", {href: "#signup"}, "Sign up here"), React.createElement("span", null, "."))
	            )

	          )
	        )
	      )
	    );
	  }

	});

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(248);

	module.exports = {

	  registerAccount: function (data) {
	    AppDispatcher.handleAuthAction({
	      type: 'REGISTER_ACCOUNT',
	      data: data,
	    });
	  },

	  passwordSignIn: function (data) {
	    AppDispatcher.handleAuthAction({
	      type: 'PASSWORD_SIGN_IN',
	      data: data,
	    });
	  },

	  facebookSignIn: function (token) {
	    AppDispatcher.handleAuthAction({
	      type: 'FACEBOOK_SIGN_IN',
	      token: token,
	    });
	  },

	  googleSignIn: function (token) {
	    AppDispatcher.handleAuthAction({
	      type: 'GOOGLE_SIGN_IN',
	      token: token,
	    });
	  },

	  githubSignIn: function (token) {
	    AppDispatcher.handleAuthAction({
	      type: 'GITHUB_SIGN_IN',
	      token: token,
	    });
	  },

	  logOut: function () {
	    AppDispatcher.handleAuthAction({
	      type: 'LOGOUT',
	    });
	  },


	};

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	var Dispatcher = __webpack_require__(249).Dispatcher;
	var assign = __webpack_require__(252);

	var AppDispatcher = assign(new Dispatcher(), {

	  handleInstancesAppAction: function(action) {
	    this.dispatch({
	      source: 'INSTANCES_APP_ACTION',
	      action: action
	    });
	  },


	  handleAuthAction: function(action) {
	    this.dispatch({
	      source: 'AUTH_ACTION',
	      action: action
	    });
	  },

	  handleServerAction: function(action) {
	    this.dispatch({
	      source: 'SERVER_ACTION',
	      action: action
	    });
	  },

	  handleViewAction: function(action) {
	    this.dispatch({
	      source: 'VIEW_ACTION',
	      action: action
	    });
	  }

	});

	module.exports = AppDispatcher;


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(250)


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */

	"use strict";

	var invariant = __webpack_require__(251);

	var _lastID = 1;
	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };


	module.exports = Dispatcher;


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, setImmediate) {/*! hellojs v1.6.0 | (c) 2012-2015 Andrew Dodson | MIT https://adodson.com/hello.js/LICENSE */
	// ES5 Object.create
	if (!Object.create) {

		// Shim, Object create
		// A shim for Object.create(), it adds a prototype to a new object
		Object.create = (function() {

			function F() {}

			return function(o) {

				if (arguments.length != 1) {
					throw new Error('Object.create implementation only accepts one parameter.');
				}

				F.prototype = o;
				return new F();
			};

		})();

	}

	// ES5 [].indexOf
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(s) {

			for (var j = 0; j < this.length; j++) {
				if (this[j] === s) {
					return j;
				}
			}

			return -1;
		};
	}

	// ES5 [].forEach
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(fun/*, thisArg*/) {

			if (this === void 0 || this === null) {
				throw new TypeError();
			}

			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== 'function') {
				throw new TypeError();
			}

			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++) {
				if (i in t) {
					fun.call(thisArg, t[i], i, t);
				}
			}

			return this;
		};
	}

	// ES5 [].filter
	if (!Array.prototype.filter) {
		Array.prototype.filter = function(fun, thisArg) {

			var a = [];
			this.forEach(function(val, i, t) {
				if (fun.call(thisArg || void 0, val, i, t)) {
					a.push(val);
				}
			});

			return a;
		};
	}

	// Production steps of ECMA-262, Edition 5, 15.4.4.19
	// Reference: http://es5.github.io/#x15.4.4.19
	if (!Array.prototype.map) {

		Array.prototype.map = function(fun, thisArg) {

			var a = [];
			this.forEach(function(val, i, t) {
				a.push(fun.call(thisArg || void 0, val, i, t));
			});

			return a;
		};
	}

	// ES5 isArray
	if (!Array.isArray) {

		// Function Array.isArray
		Array.isArray = function(o) {
			return Object.prototype.toString.call(o) === '[object Array]';
		};

	}

	// Test for location.assign
	if (typeof window === 'object' && typeof window.location === 'object' && !window.location.assign) {

		window.location.assign = function(url) {
			window.location = url;
		};

	}

	// Test for Function.bind
	if (!Function.prototype.bind) {

		// MDN
		// Polyfill IE8, does not support native Function.bind
		Function.prototype.bind = function(b) {

			if (typeof this !== 'function') {
				throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
			}

			function C() {}

			var a = [].slice;
			var f = a.call(arguments, 1);
			var _this = this;
			var D = function() {
				return _this.apply(this instanceof C ? this : b || window, f.concat(a.call(arguments)));
			};

			C.prototype = this.prototype;
			D.prototype = new C();

			return D;
		};

	}

	/**
	 * @hello.js
	 *
	 * HelloJS is a client side Javascript SDK for making OAuth2 logins and subsequent REST calls.
	 *
	 * @author Andrew Dodson
	 * @website https://adodson.com/hello.js/
	 *
	 * @copyright Andrew Dodson, 2012 - 2015
	 * @license MIT: You are free to use and modify this code for any use, on the condition that this copyright notice remains.
	 */

	var hello = function(name) {
		return hello.use(name);
	};

	hello.utils = {

		// Extend the first object with the properties and methods of the second
		extend: function(r /*, a[, b[, ...]] */) {

			// Get the arguments as an array but ommit the initial item
			Array.prototype.slice.call(arguments, 1).forEach(function(a) {
				if (r instanceof Object && a instanceof Object && r !== a) {
					for (var x in a) {
						r[x] = hello.utils.extend(r[x], a[x]);
					}
				}
				else {
					r = a;
				}
			});

			return r;
		}
	};

	// Core library
	hello.utils.extend(hello, {

		settings: {

			// OAuth2 authentication defaults
			redirect_uri: window.location.href.split('#')[0],
			response_type: 'token',
			display: 'popup',
			state: '',

			// OAuth1 shim
			// The path to the OAuth1 server for signing user requests
			// Want to recreate your own? Checkout https://github.com/MrSwitch/node-oauth-shim
			oauth_proxy: 'https://auth-server.herokuapp.com/proxy',

			// API timeout in milliseconds
			timeout: 20000,

			// Default service / network
			default_service: null,

			// Force authentication
			// When hello.login is fired.
			// (null): ignore current session expiry and continue with login
			// (true): ignore current session expiry and continue with login, ask for user to reauthenticate
			// (false): if the current session looks good for the request scopes return the current session.
			force: null,

			// Page URL
			// When 'display=page' this property defines where the users page should end up after redirect_uri
			// Ths could be problematic if the redirect_uri is indeed the final place,
			// Typically this circumvents the problem of the redirect_url being a dumb relay page.
			page_uri: window.location.href
		},

		// Service configuration objects
		services: {},

		// Use
		// Define a new instance of the HelloJS library with a default service
		use: function(service) {

			// Create self, which inherits from its parent
			var self = Object.create(this);

			// Inherit the prototype from its parent
			self.settings = Object.create(this.settings);

			// Define the default service
			if (service) {
				self.settings.default_service = service;
			}

			// Create an instance of Events
			self.utils.Event.call(self);

			return self;
		},

		// Initialize
		// Define the client_ids for the endpoint services
		// @param object o, contains a key value pair, service => clientId
		// @param object opts, contains a key value pair of options used for defining the authentication defaults
		// @param number timeout, timeout in seconds
		init: function(services, options) {

			var utils = this.utils;

			if (!services) {
				return this.services;
			}

			// Define provider credentials
			// Reformat the ID field
			for (var x in services) {if (services.hasOwnProperty(x)) {
				if (typeof (services[x]) !== 'object') {
					services[x] = {id: services[x]};
				}
			}}

			// Merge services if there already exists some
			utils.extend(this.services, services);

			// Format the incoming
			for (x in this.services) {
				if (this.services.hasOwnProperty(x)) {
					this.services[x].scope = this.services[x].scope || {};
				}
			}

			//
			// Update the default settings with this one.
			if (options) {
				utils.extend(this.settings, options);

				// Do this immediatly incase the browser changes the current path.
				if ('redirect_uri' in options) {
					this.settings.redirect_uri = utils.url(options.redirect_uri).href;
				}
			}

			return this;
		},

		// Login
		// Using the endpoint
		// @param network stringify       name to connect to
		// @param options object    (optional)  {display mode, is either none|popup(default)|page, scope: email,birthday,publish, .. }
		// @param callback  function  (optional)  fired on signin
		login: function() {

			// Create an object which inherits its parent as the prototype and constructs a new event chain.
			var _this = this;
			var utils = _this.utils;
			var error = utils.error;
			var promise = utils.Promise();

			// Get parameters
			var p = utils.args({network: 's', options: 'o', callback: 'f'}, arguments);

			// Local vars
			var url;

			// Merge/override options with app defaults
			var opts = p.options = utils.merge(_this.settings, p.options || {});

			// Network
			p.network = p.network || _this.settings.default_service;

			// Bind callback to both reject and fulfill states
			promise.proxy.then(p.callback, p.callback);

			// Trigger an event on the global listener
			function emit(s, value) {
				hello.emit(s, value);
			}

			promise.proxy.then(emit.bind(this, 'auth.login auth'), emit.bind(this, 'auth.failed auth'));

			// Is our service valid?
			if (typeof (p.network) !== 'string' || !(p.network in _this.services)) {
				// Trigger the default login.
				// Ahh we dont have one.
				return promise.reject(error('invalid_network', 'The provided network was not recognized'));
			}

			var provider = _this.services[p.network];

			// Create a global listener to capture events triggered out of scope
			var callbackId = utils.globalEvent(function(str) {

				// The responseHandler returns a string, lets save this locally
				var obj;

				if (str) {
					obj = JSON.parse(str);
				}
				else {
					obj = error('cancelled', 'The authentication was not completed');
				}

				// Handle these response using the local
				// Trigger on the parent
				if (!obj.error) {

					// Save on the parent window the new credentials
					// This fixes an IE10 bug i think... atleast it does for me.
					utils.store(obj.network, obj);

					// Fulfill a successful login
					promise.fulfill({
						network: obj.network,
						authResponse: obj
					});
				}
				else {
					// Reject a successful login
					promise.reject(obj);
				}
			});

			var redirectUri = utils.url(opts.redirect_uri).href;

			// May be a space-delimited list of multiple, complementary types
			var responseType = provider.oauth.response_type || opts.response_type;

			// Fallback to token if the module hasn't defined a grant url
			if (/\bcode\b/.test(responseType) && !provider.oauth.grant) {
				responseType = responseType.replace(/\bcode\b/, 'token');
			}

			// Query string parameters, we may pass our own arguments to form the querystring
			p.qs = {
				client_id: encodeURIComponent(provider.id),
				response_type: encodeURIComponent(responseType),
				redirect_uri: encodeURIComponent(redirectUri),
				display: opts.display,
				scope: 'basic',
				state: {
					client_id: provider.id,
					network: p.network,
					display: opts.display,
					callback: callbackId,
					state: opts.state,
					redirect_uri: redirectUri
				}
			};

			// Get current session for merging scopes, and for quick auth response
			var session = utils.store(p.network);

			// Scopes (authentication permisions)
			// Convert any array, or falsy value to a string.
			var scope = (opts.scope || '').toString();

			scope = (scope ? scope + ',' : '') + p.qs.scope;

			// Append scopes from a previous session.
			// This helps keep app credentials constant,
			// Avoiding having to keep tabs on what scopes are authorized
			if (session && 'scope' in session && session.scope instanceof String) {
				scope += ',' + session.scope;
			}

			// Save in the State
			// Convert to a string because IE, has a problem moving Arrays between windows
			p.qs.state.scope = utils.unique(scope.split(/[,\s]+/)).join(',');

			// Map replace each scope with the providers default scopes
			p.qs.scope = scope.replace(/[^,\s]+/ig, function(m) {
				// Does this have a mapping?
				if (m in provider.scope) {
					return provider.scope[m];
				}
				else {
					// Loop through all services and determine whether the scope is generic
					for (var x in _this.services) {
						var serviceScopes = _this.services[x].scope;
						if (serviceScopes && m in serviceScopes) {
							// Found an instance of this scope, so lets not assume its special
							return '';
						}
					}

					// This is a unique scope to this service so lets in it.
					return m;
				}

			}).replace(/[,\s]+/ig, ',');

			// Remove duplication and empty spaces
			p.qs.scope = utils.unique(p.qs.scope.split(/,+/)).join(provider.scope_delim || ',');

			// Is the user already signed in with the appropriate scopes, valid access_token?
			if (opts.force === false) {

				if (session && 'access_token' in session && session.access_token && 'expires' in session && session.expires > ((new Date()).getTime() / 1e3)) {
					// What is different about the scopes in the session vs the scopes in the new login?
					var diff = utils.diff(session.scope || [], p.qs.state.scope || []);
					if (diff.length === 0) {

						// OK trigger the callback
						promise.fulfill({
							unchanged: true,
							network: p.network,
							authResponse: session
						});

						// Nothing has changed
						return promise;
					}
				}
			}

			// Page URL
			if (opts.display === 'page' && opts.page_uri) {
				// Add a page location, place to endup after session has authenticated
				p.qs.state.page_uri = utils.url(opts.page_uri).href;
			}

			// Bespoke
			// Override login querystrings from auth_options
			if ('login' in provider && typeof (provider.login) === 'function') {
				// Format the paramaters according to the providers formatting function
				provider.login(p);
			}

			// Add OAuth to state
			// Where the service is going to take advantage of the oauth_proxy
			if (!/\btoken\b/.test(responseType) ||
			parseInt(provider.oauth.version, 10) < 2 ||
			(opts.display === 'none' && provider.oauth.grant && session && session.refresh_token)) {

				// Add the oauth endpoints
				p.qs.state.oauth = provider.oauth;

				// Add the proxy url
				p.qs.state.oauth_proxy = opts.oauth_proxy;

			}

			// Convert state to a string
			p.qs.state = encodeURIComponent(JSON.stringify(p.qs.state));

			// URL
			if (parseInt(provider.oauth.version, 10) === 1) {

				// Turn the request to the OAuth Proxy for 3-legged auth
				url = utils.qs(opts.oauth_proxy, p.qs, encodeFunction);
			}

			// Refresh token
			else if (opts.display === 'none' && provider.oauth.grant && session && session.refresh_token) {

				// Add the refresh_token to the request
				p.qs.refresh_token = session.refresh_token;

				// Define the request path
				url = utils.qs(opts.oauth_proxy, p.qs, encodeFunction);
			}
			else {
				url = utils.qs(provider.oauth.auth, p.qs, encodeFunction);
			}

			// Execute
			// Trigger how we want self displayed
			if (opts.display === 'none') {
				// Sign-in in the background, iframe
				utils.iframe(url);
			}

			// Triggering popup?
			else if (opts.display === 'popup') {

				var popup = utils.popup(url, redirectUri, opts.window_width || 500, opts.window_height || 550);

				var timer = setInterval(function() {
					if (!popup || popup.closed) {
						clearInterval(timer);
						if (!promise.state) {

							var response = error('cancelled', 'Login has been cancelled');

							if (!popup) {
								response = error('blocked', 'Popup was blocked');
							}

							response.network = p.network;

							promise.reject(response);
						}
					}
				}, 100);
			}

			else {
				window.location = url;
			}

			return promise.proxy;

			function encodeFunction(s) {return s;}
		},

		// Remove any data associated with a given service
		// @param string name of the service
		// @param function callback
		logout: function() {

			var _this = this;
			var utils = _this.utils;
			var error = utils.error;

			// Create a new promise
			var promise = utils.Promise();

			var p = utils.args({name:'s', options: 'o', callback: 'f'}, arguments);

			p.options = p.options || {};

			// Add callback to events
			promise.proxy.then(p.callback, p.callback);

			// Trigger an event on the global listener
			function emit(s, value) {
				hello.emit(s, value);
			}

			promise.proxy.then(emit.bind(this, 'auth.logout auth'), emit.bind(this, 'error'));

			// Network
			p.name = p.name || this.settings.default_service;

			if (p.name && !(p.name in _this.services)) {

				promise.reject(error('invalid_network', 'The network was unrecognized'));

			}
			else if (p.name && utils.store(p.name)) {

				// Define the callback
				var callback = function(opts) {

					// Remove from the store
					utils.store(p.name, '');

					// Emit events by default
					promise.fulfill(hello.utils.merge({network:p.name}, opts || {}));
				};

				// Run an async operation to remove the users session
				var _opts = {};
				if (p.options.force) {
					var logout = _this.services[p.name].logout;
					if (logout) {
						// Convert logout to URL string,
						// If no string is returned, then this function will handle the logout async style
						if (typeof (logout) === 'function') {
							logout = logout(callback);
						}

						// If logout is a string then assume URL and open in iframe.
						if (typeof (logout) === 'string') {
							utils.iframe(logout);
							_opts.force = null;
							_opts.message = 'Logout success on providers site was indeterminate';
						}
						else if (logout === undefined) {
							// The callback function will handle the response.
							return promise.proxy;
						}
					}
				}

				// Remove local credentials
				callback(_opts);
			}
			else {
				promise.reject(error('invalid_session', 'There was no session to remove'));
			}

			return promise.proxy;
		},

		// Returns all the sessions that are subscribed too
		// @param string optional, name of the service to get information about.
		getAuthResponse: function(service) {

			// If the service doesn't exist
			service = service || this.settings.default_service;

			if (!service || !(service in this.services)) {
				return null;
			}

			return this.utils.store(service) || null;
		},

		// Events: placeholder for the events
		events: {}
	});

	// Core utilities
	hello.utils.extend(hello.utils, {

		// Error
		error: function(code, message) {
			return {
				error: {
					code: code,
					message: message
				}
			};
		},

		// Append the querystring to a url
		// @param string url
		// @param object parameters
		qs: function(url, params, formatFunction) {
			if (params) {
				var reg;
				for (var x in params) {
					if (url.indexOf(x) > -1) {
						var str = '[\\?\\&]' + x + '=[^\\&]*';
						reg = new RegExp(str);
						url = url.replace(reg, '');
					}
				}
			}

			return url + (!this.isEmpty(params) ? (url.indexOf('?') > -1 ? '&' : '?') + this.param(params, formatFunction) : '');
		},

		// Param
		// Explode/encode the parameters of an URL string/object
		// @param string s, string to decode
		param: function(s, formatFunction) {
			var b;
			var a = {};
			var m;

			if (typeof (s) === 'string') {

				formatFunction = formatFunction || decodeURIComponent;

				m = s.replace(/^[\#\?]/, '').match(/([^=\/\&]+)=([^\&]+)/g);
				if (m) {
					for (var i = 0; i < m.length; i++) {
						b = m[i].match(/([^=]+)=(.*)/);
						a[b[1]] = formatFunction(b[2]);
					}
				}

				return a;
			}
			else {

				formatFunction = formatFunction || encodeURIComponent;

				var o = s;

				a = [];

				for (var x in o) {if (o.hasOwnProperty(x)) {
					if (o.hasOwnProperty(x)) {
						a.push([x, o[x] === '?' ? '?' : formatFunction(o[x])].join('='));
					}
				}}

				return a.join('&');
			}
		},

		// Local storage facade
		store: (function(localStorage) {

			var a = [localStorage, window.sessionStorage];
			var i = 0;

			// Set LocalStorage
			localStorage = a[i++];

			while (localStorage) {
				try {
					localStorage.setItem(i, i);
					localStorage.removeItem(i);
					break;
				}
				catch (e) {
					localStorage = a[i++];
				}
			}

			if (!localStorage) {
				localStorage = {
					getItem: function(prop) {
						prop = prop + '=';
						var m = document.cookie.split(';');
						for (var i = 0; i < m.length; i++) {
							var _m = m[i].replace(/(^\s+|\s+$)/, '');
							if (_m && _m.indexOf(prop) === 0) {
								return _m.substr(prop.length);
							}
						}

						return null;
					},

					setItem: function(prop, value) {
						document.cookie = prop + '=' + value;
					}
				};
			}

			function get() {
				var json = {};
				try {
					json = JSON.parse(localStorage.getItem('hello')) || {};
				}
				catch (e) {}

				return json;
			}

			function set(json) {
				localStorage.setItem('hello', JSON.stringify(json));
			}

			// Check if the browser support local storage
			return function(name, value, days) {

				// Local storage
				var json = get();

				if (name && value === undefined) {
					return json[name] || null;
				}
				else if (name && value === null) {
					try {
						delete json[name];
					}
					catch (e) {
						json[name] = null;
					}
				}
				else if (name) {
					json[name] = value;
				}
				else {
					return json;
				}

				set(json);

				return json || null;
			};

		})(window.localStorage),

		// Create and Append new DOM elements
		// @param node string
		// @param attr object literal
		// @param dom/string
		append: function(node, attr, target) {

			var n = typeof (node) === 'string' ? document.createElement(node) : node;

			if (typeof (attr) === 'object') {
				if ('tagName' in attr) {
					target = attr;
				}
				else {
					for (var x in attr) {if (attr.hasOwnProperty(x)) {
						if (typeof (attr[x]) === 'object') {
							for (var y in attr[x]) {if (attr[x].hasOwnProperty(y)) {
								n[x][y] = attr[x][y];
							}}
						}
						else if (x === 'html') {
							n.innerHTML = attr[x];
						}

						// IE doesn't like us setting methods with setAttribute
						else if (!/^on/.test(x)) {
							n.setAttribute(x, attr[x]);
						}
						else {
							n[x] = attr[x];
						}
					}}
				}
			}

			if (target === 'body') {
				(function self() {
					if (document.body) {
						document.body.appendChild(n);
					}
					else {
						setTimeout(self, 16);
					}
				})();
			}
			else if (typeof (target) === 'object') {
				target.appendChild(n);
			}
			else if (typeof (target) === 'string') {
				document.getElementsByTagName(target)[0].appendChild(n);
			}

			return n;
		},

		// An easy way to create a hidden iframe
		// @param string src
		iframe: function(src) {
			this.append('iframe', {src: src, style: {position:'absolute', left: '-1000px', bottom: 0, height: '1px', width: '1px'}}, 'body');
		},

		// Recursive merge two objects into one, second parameter overides the first
		// @param a array
		merge: function(/* Args: a, b, c, .. n */) {
			var args = Array.prototype.slice.call(arguments);
			args.unshift({});
			return this.extend.apply(null, args);
		},

		// Makes it easier to assign parameters, where some are optional
		// @param o object
		// @param a arguments
		args: function(o, args) {

			var p = {};
			var i = 0;
			var t = null;
			var x = null;

			// 'x' is the first key in the list of object parameters
			for (x in o) {if (o.hasOwnProperty(x)) {
				break;
			}}

			// Passing in hash object of arguments?
			// Where the first argument can't be an object
			if ((args.length === 1) && (typeof (args[0]) === 'object') && o[x] != 'o!') {

				// Could this object still belong to a property?
				// Check the object keys if they match any of the property keys
				for (x in args[0]) {if (o.hasOwnProperty(x)) {
					// Does this key exist in the property list?
					if (x in o) {
						// Yes this key does exist so its most likely this function has been invoked with an object parameter
						// Return first argument as the hash of all arguments
						return args[0];
					}
				}}
			}

			// Else loop through and account for the missing ones.
			for (x in o) {if (o.hasOwnProperty(x)) {

				t = typeof (args[i]);

				if ((typeof (o[x]) === 'function' && o[x].test(args[i])) || (typeof (o[x]) === 'string' && (
				(o[x].indexOf('s') > -1 && t === 'string') ||
				(o[x].indexOf('o') > -1 && t === 'object') ||
				(o[x].indexOf('i') > -1 && t === 'number') ||
				(o[x].indexOf('a') > -1 && t === 'object') ||
				(o[x].indexOf('f') > -1 && t === 'function')
				))
				) {
					p[x] = args[i++];
				}

				else if (typeof (o[x]) === 'string' && o[x].indexOf('!') > -1) {
					return false;
				}
			}}

			return p;
		},

		// Returns a URL instance
		url: function(path) {

			// If the path is empty
			if (!path) {
				return window.location;
			}

			// Chrome and FireFox support new URL() to extract URL objects
			else if (window.URL && URL instanceof Function && URL.length !== 0) {
				return new URL(path, window.location);
			}

			// Ugly shim, it works!
			else {
				var a = document.createElement('a');
				a.href = path;
				return a;
			}
		},

		diff: function(a, b) {
			return b.filter(function(item) {
				return a.indexOf(item) === -1;
			});
		},

		// Unique
		// Remove duplicate and null values from an array
		// @param a array
		unique: function(a) {
			if (!Array.isArray(a)) { return []; }

			return a.filter(function(item, index) {
				// Is this the first location of item
				return a.indexOf(item) === index;
			});
		},

		isEmpty: function(obj) {

			// Scalar
			if (!obj)
				return true;

			// Array
			if (Array.isArray(obj)) {
				return !obj.length;
			}
			else if (typeof (obj) === 'object') {
				// Object
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						return false;
					}
				}
			}

			return true;
		},

		//jscs:disable

		/*!
		 **  Thenable -- Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
		 **  Copyright (c) 2013-2014 Ralf S. Engelschall <http://engelschall.com>
		 **  Licensed under The MIT License <http://opensource.org/licenses/MIT>
		 **  Source-Code distributed on <http://github.com/rse/thenable>
		 */
		Promise: (function(){
			/*  promise states [Promises/A+ 2.1]  */
			var STATE_PENDING   = 0;                                         /*  [Promises/A+ 2.1.1]  */
			var STATE_FULFILLED = 1;                                         /*  [Promises/A+ 2.1.2]  */
			var STATE_REJECTED  = 2;                                         /*  [Promises/A+ 2.1.3]  */

			/*  promise object constructor  */
			var api = function (executor) {
				/*  optionally support non-constructor/plain-function call  */
				if (!(this instanceof api))
					return new api(executor);

				/*  initialize object  */
				this.id           = "Thenable/1.0.6";
				this.state        = STATE_PENDING; /*  initial state  */
				this.fulfillValue = undefined;     /*  initial value  */     /*  [Promises/A+ 1.3, 2.1.2.2]  */
				this.rejectReason = undefined;     /*  initial reason */     /*  [Promises/A+ 1.5, 2.1.3.2]  */
				this.onFulfilled  = [];            /*  initial handlers  */
				this.onRejected   = [];            /*  initial handlers  */

				/*  provide optional information-hiding proxy  */
				this.proxy = {
					then: this.then.bind(this)
				};

				/*  support optional executor function  */
				if (typeof executor === "function")
					executor.call(this, this.fulfill.bind(this), this.reject.bind(this));
			};

			/*  promise API methods  */
			api.prototype = {
				/*  promise resolving methods  */
				fulfill: function (value) { return deliver(this, STATE_FULFILLED, "fulfillValue", value); },
				reject:  function (value) { return deliver(this, STATE_REJECTED,  "rejectReason", value); },

				/*  "The then Method" [Promises/A+ 1.1, 1.2, 2.2]  */
				then: function (onFulfilled, onRejected) {
					var curr = this;
					var next = new api();                                    /*  [Promises/A+ 2.2.7]  */
					curr.onFulfilled.push(
						resolver(onFulfilled, next, "fulfill"));             /*  [Promises/A+ 2.2.2/2.2.6]  */
					curr.onRejected.push(
						resolver(onRejected,  next, "reject" ));             /*  [Promises/A+ 2.2.3/2.2.6]  */
					execute(curr);
					return next.proxy;                                       /*  [Promises/A+ 2.2.7, 3.3]  */
				}
			};

			/*  deliver an action  */
			var deliver = function (curr, state, name, value) {
				if (curr.state === STATE_PENDING) {
					curr.state = state;                                      /*  [Promises/A+ 2.1.2.1, 2.1.3.1]  */
					curr[name] = value;                                      /*  [Promises/A+ 2.1.2.2, 2.1.3.2]  */
					execute(curr);
				}
				return curr;
			};

			/*  execute all handlers  */
			var execute = function (curr) {
				if (curr.state === STATE_FULFILLED)
					execute_handlers(curr, "onFulfilled", curr.fulfillValue);
				else if (curr.state === STATE_REJECTED)
					execute_handlers(curr, "onRejected",  curr.rejectReason);
			};

			/*  execute particular set of handlers  */
			var execute_handlers = function (curr, name, value) {
				/* global process: true */
				/* global setImmediate: true */
				/* global setTimeout: true */

				/*  short-circuit processing  */
				if (curr[name].length === 0)
					return;

				/*  iterate over all handlers, exactly once  */
				var handlers = curr[name];
				curr[name] = [];                                             /*  [Promises/A+ 2.2.2.3, 2.2.3.3]  */
				var func = function () {
					for (var i = 0; i < handlers.length; i++)
						handlers[i](value);                                  /*  [Promises/A+ 2.2.5]  */
				};

				/*  execute procedure asynchronously  */                     /*  [Promises/A+ 2.2.4, 3.1]  */
				if (typeof process === "object" && typeof process.nextTick === "function")
					process.nextTick(func);
				else if (typeof setImmediate === "function")
					setImmediate(func);
				else
					setTimeout(func, 0);
			};

			/*  generate a resolver function  */
			var resolver = function (cb, next, method) {
				return function (value) {
					if (typeof cb !== "function")                            /*  [Promises/A+ 2.2.1, 2.2.7.3, 2.2.7.4]  */
						next[method].call(next, value);                      /*  [Promises/A+ 2.2.7.3, 2.2.7.4]  */
					else {
						var result;
						try { result = cb(value); }                          /*  [Promises/A+ 2.2.2.1, 2.2.3.1, 2.2.5, 3.2]  */
						catch (e) {
							next.reject(e);                                  /*  [Promises/A+ 2.2.7.2]  */
							return;
						}
						resolve(next, result);                               /*  [Promises/A+ 2.2.7.1]  */
					}
				};
			};

			/*  "Promise Resolution Procedure"  */                           /*  [Promises/A+ 2.3]  */
			var resolve = function (promise, x) {
				/*  sanity check arguments  */                               /*  [Promises/A+ 2.3.1]  */
				if (promise === x || promise.proxy === x) {
					promise.reject(new TypeError("cannot resolve promise with itself"));
					return;
				}

				/*  surgically check for a "then" method
					(mainly to just call the "getter" of "then" only once)  */
				var then;
				if ((typeof x === "object" && x !== null) || typeof x === "function") {
					try { then = x.then; }                                   /*  [Promises/A+ 2.3.3.1, 3.5]  */
					catch (e) {
						promise.reject(e);                                   /*  [Promises/A+ 2.3.3.2]  */
						return;
					}
				}

				/*  handle own Thenables    [Promises/A+ 2.3.2]
					and similar "thenables" [Promises/A+ 2.3.3]  */
				if (typeof then === "function") {
					var resolved = false;
					try {
						/*  call retrieved "then" method */                  /*  [Promises/A+ 2.3.3.3]  */
						then.call(x,
							/*  resolvePromise  */                           /*  [Promises/A+ 2.3.3.3.1]  */
							function (y) {
								if (resolved) return; resolved = true;       /*  [Promises/A+ 2.3.3.3.3]  */
								if (y === x)                                 /*  [Promises/A+ 3.6]  */
									promise.reject(new TypeError("circular thenable chain"));
								else
									resolve(promise, y);
							},

							/*  rejectPromise  */                            /*  [Promises/A+ 2.3.3.3.2]  */
							function (r) {
								if (resolved) return; resolved = true;       /*  [Promises/A+ 2.3.3.3.3]  */
								promise.reject(r);
							}
						);
					}
					catch (e) {
						if (!resolved)                                       /*  [Promises/A+ 2.3.3.3.3]  */
							promise.reject(e);                               /*  [Promises/A+ 2.3.3.3.4]  */
					}
					return;
				}

				/*  handle other values  */
				promise.fulfill(x);                                          /*  [Promises/A+ 2.3.4, 2.3.3.4]  */
			};

			/*  export API  */
			return api;
		})(),

		//jscs:enable

		// Event
		// A contructor superclass for adding event menthods, on, off, emit.
		Event: function() {

			var separator = /[\s\,]+/;

			// If this doesn't support getPrototype then we can't get prototype.events of the parent
			// So lets get the current instance events, and add those to a parent property
			this.parent = {
				events: this.events,
				findEvents: this.findEvents,
				parent: this.parent,
				utils: this.utils
			};

			this.events = {};

			// On, subscribe to events
			// @param evt   string
			// @param callback  function
			this.on = function(evt, callback) {

				if (callback && typeof (callback) === 'function') {
					var a = evt.split(separator);
					for (var i = 0; i < a.length; i++) {

						// Has this event already been fired on this instance?
						this.events[a[i]] = [callback].concat(this.events[a[i]] || []);
					}
				}

				return this;
			};

			// Off, unsubscribe to events
			// @param evt   string
			// @param callback  function
			this.off = function(evt, callback) {

				this.findEvents(evt, function(name, index) {
					if (!callback || this.events[name][index] === callback) {
						this.events[name][index] = null;
					}
				});

				return this;
			};

			// Emit
			// Triggers any subscribed events
			this.emit = function(evt /*, data, ... */) {

				// Get arguments as an Array, knock off the first one
				var args = Array.prototype.slice.call(arguments, 1);
				args.push(evt);

				// Handler
				var handler = function(name, index) {

					// Replace the last property with the event name
					args[args.length - 1] = (name === '*' ? evt : name);

					// Trigger
					this.events[name][index].apply(this, args);
				};

				// Find the callbacks which match the condition and call
				var _this = this;
				while (_this && _this.findEvents) {

					// Find events which match
					_this.findEvents(evt + ',*', handler);
					_this = _this.parent;
				}

				return this;
			};

			//
			// Easy functions
			this.emitAfter = function() {
				var _this = this;
				var args = arguments;
				setTimeout(function() {
					_this.emit.apply(_this, args);
				}, 0);

				return this;
			};

			this.findEvents = function(evt, callback) {

				var a = evt.split(separator);

				for (var name in this.events) {if (this.events.hasOwnProperty(name)) {

					if (a.indexOf(name) > -1) {

						for (var i = 0; i < this.events[name].length; i++) {

							// Does the event handler exist?
							if (this.events[name][i]) {
								// Emit on the local instance of this
								callback.call(this, name, i);
							}
						}
					}
				}}
			};

			return this;
		},

		// Global Events
		// Attach the callback to the window object
		// Return its unique reference
		globalEvent: function(callback, guid) {
			// If the guid has not been supplied then create a new one.
			guid = guid || '_hellojs_' + parseInt(Math.random() * 1e12, 10).toString(36);

			// Define the callback function
			window[guid] = function() {
				// Trigger the callback
				try {
					bool = callback.apply(this, arguments);
				}
				catch (e) {
					console.error(e);
				}

				if (bool) {
					// Remove this handler reference
					try {
						delete window[guid];
					}
					catch (e) {}
				}
			};

			return guid;
		},

		// Trigger a clientside popup
		// This has been augmented to support PhoneGap
		popup: function(url, redirectUri, windowWidth, windowHeight) {

			var documentElement = document.documentElement;

			// Multi Screen Popup Positioning (http://stackoverflow.com/a/16861050)
			// Credit: http://www.xtf.dk/2011/08/center-new-popup-window-even-on.html
			// Fixes dual-screen position                         Most browsers      Firefox
			var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
			var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

			var width = window.innerWidth || documentElement.clientWidth || screen.width;
			var height = window.innerHeight || documentElement.clientHeight || screen.height;

			var left = ((width - windowWidth) / 2) + dualScreenLeft;
			var top = ((height - windowHeight) / 2) + dualScreenTop;

			// Create a function for reopening the popup, and assigning events to the new popup object
			// This is a fix whereby triggering the
			var open = function(url) {

				// Trigger callback
				var popup = window.open(
					url,
					'_blank',
					'resizeable=true,height=' + windowHeight + ',width=' + windowWidth + ',left=' + left + ',top=' + top
				);

				// PhoneGap support
				// Add an event listener to listen to the change in the popup windows URL
				// This must appear before popup.focus();
				if (popup && popup.addEventListener) {

					// Get the origin of the redirect URI

					var a = hello.utils.url(redirectUri);
					var redirectUriOrigin = a.origin || (a.protocol + '//' + a.hostname);

					// Listen to changes in the InAppBrowser window

					popup.addEventListener('loadstart', function(e) {

						var url = e.url;

						// Is this the path, as given by the redirectUri?
						// Check the new URL agains the redirectUriOrigin.
						// According to #63 a user could click 'cancel' in some dialog boxes ....
						// The popup redirects to another page with the same origin, yet we still wish it to close.

						if (url.indexOf(redirectUriOrigin) !== 0) {
							return;
						}

						// Split appart the URL
						var a = hello.utils.url(url);

						// We dont have window operations on the popup so lets create some
						// The location can be augmented in to a location object like so...

						var _popup = {
							location: {
								// Change the location of the popup
								assign: function(location) {

									// Unfourtunatly an app is may not change the location of a InAppBrowser window.
									// So to shim this, just open a new one.

									popup.addEventListener('exit', function() {

										// For some reason its failing to close the window if a new window opens too soon.

										setTimeout(function() {
											open(location);
										}, 1000);
									});
								},

								search: a.search,
								hash: a.hash,
								href: a.href
							},
							close: function() {
								if (popup.close) {
									popup.close();
								}
							}
						};

						// Then this URL contains information which HelloJS must process
						// URL string
						// Window - any action such as window relocation goes here
						// Opener - the parent window which opened this, aka this script

						hello.utils.responseHandler(_popup, window);

						// Always close the popup regardless of whether the hello.utils.responseHandler detects a state parameter or not in the querystring.
						// Such situations might arise such as those in #63

						_popup.close();

					});
				}

				if (popup && popup.focus) {
					popup.focus();
				}

				return popup;
			};

			// Call the open() function with the initial path
			//
			// OAuth redirect, fixes URI fragments from being lost in Safari
			// (URI Fragments within 302 Location URI are lost over HTTPS)
			// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
			//
			// Firefox  decodes URL fragments when calling location.hash.
			//  - This is bad if the value contains break points which are escaped
			//  - Hence the url must be encoded twice as it contains breakpoints.
			if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
				url = redirectUri + '#oauth_redirect=' + encodeURIComponent(encodeURIComponent(url));
			}

			return open(url);
		},

		// OAuth and API response handler
		responseHandler: function(window, parent) {

			var _this = this;
			var p;
			var location = window.location;

			// Is this an auth relay message which needs to call the proxy?
			p = _this.param(location.search);

			// OAuth2 or OAuth1 server response?
			if (p && ((p.code && p.state) || (p.oauth_token && p.proxy_url))) {

				var state = JSON.parse(p.state);

				// Add this path as the redirect_uri
				p.redirect_uri = state.redirect_uri || location.href.replace(/[\?\#].*$/, '');

				// Redirect to the host
				var path = (state.oauth_proxy || p.proxy_url) + '?' + _this.param(p);

				location.assign(path);

				return;
			}

			// Save session, from redirected authentication
			// #access_token has come in?
			//
			// FACEBOOK is returning auth errors within as a query_string... thats a stickler for consistency.
			// SoundCloud is the state in the querystring and the token in the hashtag, so we'll mix the two together

			p = _this.merge(_this.param(location.search || ''), _this.param(location.hash || ''));

			// If p.state
			if (p && 'state' in p) {

				// Remove any addition information
				// E.g. p.state = 'facebook.page';
				try {
					var a = JSON.parse(p.state);
					_this.extend(p, a);
				}
				catch (e) {
					console.error('Could not decode state parameter');
				}

				// Access_token?
				if (('access_token' in p && p.access_token) && p.network) {

					if (!p.expires_in || parseInt(p.expires_in, 10) === 0) {
						// If p.expires_in is unset, set to 0
						p.expires_in = 0;
					}

					p.expires_in = parseInt(p.expires_in, 10);
					p.expires = ((new Date()).getTime() / 1e3) + (p.expires_in || (60 * 60 * 24 * 365));

					// Lets use the "state" to assign it to one of our networks
					authCallback(p, window, parent);
				}

				// Error=?
				// &error_description=?
				// &state=?
				else if (('error' in p && p.error) && p.network) {

					p.error = {
						code: p.error,
						message: p.error_message || p.error_description
					};

					// Let the state handler handle it
					authCallback(p, window, parent);
				}

				// API call, or a cancelled login
				// Result is serialized JSON string
				else if (p.callback && p.callback in parent) {

					// Trigger a function in the parent
					var res = 'result' in p && p.result ? JSON.parse(p.result) : false;

					// Trigger the callback on the parent
					parent[p.callback](res);
					closeWindow();
				}

				// If this page is still open
				if (p.page_uri) {
					location.assign(p.page_uri);
				}
			}

			// OAuth redirect, fixes URI fragments from being lost in Safari
			// (URI Fragments within 302 Location URI are lost over HTTPS)
			// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
			else if ('oauth_redirect' in p) {

				location.assign(decodeURIComponent(p.oauth_redirect));
				return;
			}

			// Trigger a callback to authenticate
			function authCallback(obj, window, parent) {

				// Trigger the callback on the parent
				_this.store(obj.network, obj);

				// If this is a page request it has no parent or opener window to handle callbacks
				if (('display' in obj) && obj.display === 'page') {
					return;
				}

				if (parent) {
					// Call the generic listeners
					// Win.hello.emit(network+":auth."+(obj.error?'failed':'login'), obj);

					// TODO: remove from session object
					var cb = obj.callback;
					try {
						delete obj.callback;
					}
					catch (e) {}

					// Update store
					_this.store(obj.network, obj);

					// Call the globalEvent function on the parent
					if (cb in parent) {

						// It's safer to pass back a string to the parent,
						// Rather than an object/array (better for IE8)
						var str = JSON.stringify(obj);

						try {
							parent[cb](str);
						}
						catch (e) {
							// Error thrown whilst executing parent callback
						}
					}
				}

				closeWindow();
			}

			function closeWindow() {

				// Close this current window
				try {
					window.close();
				}
				catch (e) {}

				// IOS bug wont let us close a popup if still loading
				if (window.addEventListener) {
					window.addEventListener('load', function() {
						window.close();
					});
				}
			}
		}
	});

	// Events

	// Extend the hello object with its own event instance
	hello.utils.Event.call(hello);

	/////////////////////////////////////
	//
	// Save any access token that is in the current page URL
	// Handle any response solicited through iframe hash tag following an API request
	//
	/////////////////////////////////////

	hello.utils.responseHandler(window, window.opener || window.parent);

	///////////////////////////////////
	// Monitoring session state
	// Check for session changes
	///////////////////////////////////

	(function(hello) {

		// Monitor for a change in state and fire
		var oldSessions = {};

		// Hash of expired tokens
		var expired = {};

		// Listen to other triggers to Auth events, use these to update this
		hello.on('auth.login, auth.logout', function(auth) {
			if (auth && typeof (auth) === 'object' && auth.network) {
				oldSessions[auth.network] = hello.utils.store(auth.network) || {};
			}
		});

		(function self() {

			var CURRENT_TIME = ((new Date()).getTime() / 1e3);
			var emit = function(eventName) {
				hello.emit('auth.' + eventName, {
					network: name,
					authResponse: session
				});
			};

			// Loop through the services
			for (var name in hello.services) {if (hello.services.hasOwnProperty(name)) {

				if (!hello.services[name].id) {
					// We haven't attached an ID so dont listen.
					continue;
				}

				// Get session
				var session = hello.utils.store(name) || {};
				var provider = hello.services[name];
				var oldSess = oldSessions[name] || {};

				// Listen for globalEvents that did not get triggered from the child
				if (session && 'callback' in session) {

					// To do remove from session object...
					var cb = session.callback;
					try {
						delete session.callback;
					}
					catch (e) {}

					// Update store
					// Removing the callback
					hello.utils.store(name, session);

					// Emit global events
					try {
						window[cb](session);
					}
					catch (e) {}
				}

				// Refresh token
				if (session && ('expires' in session) && session.expires < CURRENT_TIME) {

					// If auto refresh is possible
					// Either the browser supports
					var refresh = provider.refresh || session.refresh_token;

					// Has the refresh been run recently?
					if (refresh && (!(name in expired) || expired[name] < CURRENT_TIME)) {
						// Try to resignin
						hello.emit('notice', name + ' has expired trying to resignin');
						hello.login(name, {display: 'none', force: false});

						// Update expired, every 10 minutes
						expired[name] = CURRENT_TIME + 600;
					}

					// Does this provider not support refresh
					else if (!refresh && !(name in expired)) {
						// Label the event
						emit('expired');
						expired[name] = true;
					}

					// If session has expired then we dont want to store its value until it can be established that its been updated
					continue;
				}

				// Has session changed?
				else if (oldSess.access_token === session.access_token &&
				oldSess.expires === session.expires) {
					continue;
				}

				// Access_token has been removed
				else if (!session.access_token && oldSess.access_token) {
					emit('logout');
				}

				// Access_token has been created
				else if (session.access_token && !oldSess.access_token) {
					emit('login');
				}

				// Access_token has been updated
				else if (session.expires !== oldSess.expires) {
					emit('update');
				}

				// Updated stored session
				oldSessions[name] = session;

				// Remove the expired flags
				if (name in expired) {
					delete expired[name];
				}
			}}

			// Check error events
			setTimeout(self, 1000);
		})();

	})(hello);

	// EOF CORE lib
	//////////////////////////////////

	/////////////////////////////////////////
	// API
	// @param path    string
	// @param query   object (optional)
	// @param method  string (optional)
	// @param data    object (optional)
	// @param timeout integer (optional)
	// @param callback  function (optional)

	hello.api = function() {

		// Shorthand
		var _this = this;
		var utils = _this.utils;
		var error = utils.error;

		// Construct a new Promise object
		var promise = utils.Promise();

		// Arguments
		var p = utils.args({path: 's!', query: 'o', method: 's', data: 'o', timeout: 'i', callback: 'f'}, arguments);

		// Method
		p.method = (p.method || 'get').toLowerCase();

		// Headers
		p.headers = p.headers || {};

		// Query
		p.query = p.query || {};

		// If get, put all parameters into query
		if (p.method === 'get' || p.method === 'delete') {
			utils.extend(p.query, p.data);
			p.data = {};
		}

		var data = p.data = p.data || {};

		// Completed event callback
		promise.then(p.callback, p.callback);

		// Remove the network from path, e.g. facebook:/me/friends
		// Results in { network : facebook, path : me/friends }
		if (!p.path) {
			return promise.reject(error('invalid_path', 'Missing the path parameter from the request'));
		}

		p.path = p.path.replace(/^\/+/, '');
		var a = (p.path.split(/[\/\:]/, 2) || [])[0].toLowerCase();

		if (a in _this.services) {
			p.network = a;
			var reg = new RegExp('^' + a + ':?\/?');
			p.path = p.path.replace(reg, '');
		}

		// Network & Provider
		// Define the network that this request is made for
		p.network = _this.settings.default_service = p.network || _this.settings.default_service;
		var o = _this.services[p.network];

		// INVALID
		// Is there no service by the given network name?
		if (!o) {
			return promise.reject(error('invalid_network', 'Could not match the service requested: ' + p.network));
		}

		// PATH
		// As long as the path isn't flagged as unavaiable, e.g. path == false

		if (!(!(p.method in o) || !(p.path in o[p.method]) || o[p.method][p.path] !== false)) {
			return promise.reject(error('invalid_path', 'The provided path is not available on the selected network'));
		}

		// PROXY
		// OAuth1 calls always need a proxy

		if (!p.oauth_proxy) {
			p.oauth_proxy = _this.settings.oauth_proxy;
		}

		if (!('proxy' in p)) {
			p.proxy = p.oauth_proxy && o.oauth && parseInt(o.oauth.version, 10) === 1;
		}

		// TIMEOUT
		// Adopt timeout from global settings by default

		if (!('timeout' in p)) {
			p.timeout = _this.settings.timeout;
		}

		//
		// Get the current session
		// Append the access_token to the query
		var session = _this.getAuthResponse(p.network);
		if (session && session.access_token) {
			p.query.access_token = session.access_token;
		}

		var url = p.path;
		var m;

		// Store the query as options
		// This is used to populate the request object before the data is augmented by the prewrap handlers.
		p.options = utils.clone(p.query);

		// Clone the data object
		// Prevent this script overwriting the data of the incoming object.
		// Ensure that everytime we run an iteration the callbacks haven't removed some data
		p.data = utils.clone(data);

		// URL Mapping
		// Is there a map for the given URL?
		var actions = o[{'delete': 'del'}[p.method] || p.method] || {};

		// Extrapolate the QueryString
		// Provide a clean path
		// Move the querystring into the data
		if (p.method === 'get') {

			var query = url.split(/[\?#]/)[1];
			if (query) {
				utils.extend(p.query, utils.param(query));

				// Remove the query part from the URL
				url = url.replace(/\?.*?(#|$)/, '$1');
			}
		}

		// Is the hash fragment defined
		if ((m = url.match(/#(.+)/, ''))) {
			url = url.split('#')[0];
			p.path = m[1];
		}
		else if (url in actions) {
			p.path = url;
			url = actions[url];
		}
		else if ('default' in actions) {
			url = actions['default'];
		}

		// Redirect Handler
		// This defines for the Form+Iframe+Hash hack where to return the results too.
		p.redirect_uri = _this.settings.redirect_uri;

		// Set OAuth settings
		p.oauth = o.oauth;

		// Define FormatHandler
		// The request can be procesed in a multitude of ways
		// Here's the options - depending on the browser and endpoint
		p.xhr = o.xhr;
		p.jsonp = o.jsonp;
		p.form = o.form;

		// Make request
		if (typeof (url) === 'function') {
			// Does self have its own callback?
			url(p, getPath);
		}
		else {
			// Else the URL is a string
			getPath(url);
		}

		return promise.proxy;

		// If url needs a base
		// Wrap everything in
		function getPath(url) {

			// Format the string if it needs it
			url = url.replace(/\@\{([a-z\_\-]+)(\|.+?)?\}/gi, function(m, key, defaults) {
				var val = defaults ? defaults.replace(/^\|/, '') : '';
				if (key in p.query) {
					val = p.query[key];
					delete p.query[key];
				}
				else if (!defaults) {
					promise.reject(error('missing_attribute', 'The attribute ' + key + ' is missing from the request'));
				}

				return val;
			});

			// Add base
			if (!url.match(/^https?:\/\//)) {
				url = o.base + url;
			}

			// Define the request URL
			p.url = url;

			// Make the HTTP request with the curated request object
			// CALLBACK HANDLER
			// @ response object
			// @ statusCode integer if available
			utils.request(p, function(r, headers) {

				// Should this be an object
				if (r === true) {
					r = {success:true};
				}
				else if (!r) {
					r = {};
				}

				// The delete callback needs a better response
				if (p.method === 'delete') {
					r = (!r || utils.isEmpty(r)) ? {success:true} : r;
				}

				// FORMAT RESPONSE?
				// Does self request have a corresponding formatter
				if (o.wrap && ((p.path in o.wrap) || ('default' in o.wrap))) {
					var wrap = (p.path in o.wrap ? p.path : 'default');
					var time = (new Date()).getTime();

					// FORMAT RESPONSE
					var b = o.wrap[wrap](r, headers, p);

					// Has the response been utterly overwritten?
					// Typically self augments the existing object.. but for those rare occassions
					if (b) {
						r = b;
					}
				}

				// Is there a next_page defined in the response?
				if (r && 'paging' in r && r.paging.next) {

					// Add the relative path if it is missing from the paging/next path
					if (r.paging.next[0] === '?') {
						r.paging.next = p.path + r.paging.next;
					}

					// The relative path has been defined, lets markup the handler in the HashFragment
					else {
						r.paging.next += '#' + p.path;
					}
				}

				// Dispatch to listeners
				// Emit events which pertain to the formatted response
				if (!r || 'error' in r) {
					promise.reject(r);
				}
				else {
					promise.fulfill(r);
				}
			});
		}
	};

	// API utilities
	hello.utils.extend(hello.utils, {

		// Make an HTTP request
		request: function(p, callback) {

			var _this = this;
			var error = _this.error;

			// This has to go through a POST request
			if (!_this.isEmpty(p.data) && !('FileList' in window) && _this.hasBinary(p.data)) {

				// Disable XHR and JSONP
				p.xhr = false;
				p.jsonp = false;
			}

			// Check if the browser and service support CORS
			if (
				'withCredentials' in new XMLHttpRequest() &&
				(!('xhr' in p) || (p.xhr && (typeof (p.xhr) !== 'function' || p.xhr(p, p.query))))
			) {

				formatUrl(p, function(url) {

					var x = _this.xhr(p.method, url, p.headers, p.data, callback);
					x.onprogress = p.onprogress || null;

					// Windows Phone does not support xhr.upload, see #74
					// Feature detect
					if (x.upload && p.onuploadprogress) {
						x.upload.onprogress = p.onuploadprogress;
					}

				});

				return;
			}

			// Clone the query object
			// Each request modifies the query object and needs to be tared after each one.
			var _query = p.query;

			p.query = _this.clone(p.query);

			// Assign a new callbackID
			p.callbackID = _this.globalEvent();

			// JSONP
			if (p.jsonp !== false) {

				// Clone the query object
				p.query.callback = p.callbackID;

				// If the JSONP is a function then run it
				if (typeof (p.jsonp) === 'function') {
					p.jsonp(p, p.query);
				}

				// Lets use JSONP if the method is 'get'
				if (p.method === 'get') {

					formatUrl(p, function(url) {
						_this.jsonp(url, callback, p.callbackID, p.timeout);
					});

					return;
				}
				else {
					// It's not compatible reset query
					p.query = _query;
				}

			}

			// Otherwise we're on to the old school, iframe hacks and JSONP
			if (p.form !== false) {

				// Add some additional query parameters to the URL
				// We're pretty stuffed if the endpoint doesn't like these
				p.query.redirect_uri = p.redirect_uri;
				p.query.state = JSON.stringify({callback:p.callbackID});

				var opts;

				if (typeof (p.form) === 'function') {

					// Format the request
					opts = p.form(p, p.query);
				}

				if (p.method === 'post' && opts !== false) {

					formatUrl(p, function(url) {
						_this.post(url, p.data, opts, callback, p.callbackID, p.timeout);
					});

					return;
				}
			}

			// None of the methods were successful throw an error
			callback(error('invalid_request', 'There was no mechanism for handling this request'));

			return;

			// Format URL
			// Constructs the request URL, optionally wraps the URL through a call to a proxy server
			// Returns the formatted URL
			function formatUrl(p, callback) {

				// Are we signing the request?
				var sign;

				// OAuth1
				// Remove the token from the query before signing
				if (p.oauth && parseInt(p.oauth.version, 10) === 1) {

					// OAUTH SIGNING PROXY
					sign = p.query.access_token;

					// Remove the access_token
					delete p.query.access_token;

					// Enfore use of Proxy
					p.proxy = true;
				}

				// POST body to querystring
				if (p.data && (p.method === 'get' || p.method === 'delete')) {
					// Attach the p.data to the querystring.
					_this.extend(p.query, p.data);
					p.data = null;
				}

				// Construct the path
				var path = _this.qs(p.url, p.query);

				// Proxy the request through a server
				// Used for signing OAuth1
				// And circumventing services without Access-Control Headers
				if (p.proxy) {
					// Use the proxy as a path
					path = _this.qs(p.oauth_proxy, {
						path: path,
						access_token: sign || '',

						// This will prompt the request to be signed as though it is OAuth1
						then: p.proxy_response_type || (p.method.toLowerCase() === 'get' ? 'redirect' : 'proxy'),
						method: p.method.toLowerCase(),
						suppress_response_codes: true
					});
				}

				callback(path);
			}
		},

		// Return the type of DOM object
		domInstance: function(type, data) {
			var test = 'HTML' + (type || '').replace(
				/^[a-z]/,
				function(m) {
					return m.toUpperCase();
				}

			) + 'Element';

			if (!data) {
				return false;
			}

			if (window[test]) {
				return data instanceof window[test];
			}
			else if (window.Element) {
				return data instanceof window.Element && (!type || (data.tagName && data.tagName.toLowerCase() === type));
			}
			else {
				return (!(data instanceof Object || data instanceof Array || data instanceof String || data instanceof Number) && data.tagName && data.tagName.toLowerCase() === type);
			}
		},

		// Create a clone of an object
		clone: function(obj) {
			// Does not clone DOM elements, nor Binary data, e.g. Blobs, Filelists
			if (obj === null || typeof (obj) !== 'object' || obj instanceof Date || 'nodeName' in obj || this.isBinary(obj)) {
				return obj;
			}

			if (Array.isArray(obj)) {
				// Clone each item in the array
				return obj.map(this.clone);
			}

			// But does clone everything else.
			var clone = {};
			for (var x in obj) {
				clone[x] = this.clone(obj[x]);
			}

			return clone;
		},

		// XHR: uses CORS to make requests
		xhr: function(method, url, headers, data, callback) {

			var r = new XMLHttpRequest();
			var error = this.error;

			// Binary?
			var binary = false;
			if (method === 'blob') {
				binary = method;
				method = 'GET';
			}

			method = method.toUpperCase();

			// Xhr.responseType 'json' is not supported in any of the vendors yet.
			r.onload = function(e) {
				var json = r.response;
				try {
					json = JSON.parse(r.responseText);
				}
				catch (_e) {
					if (r.status === 401) {
						json = error('access_denied', r.statusText);
					}
				}

				var headers = headersToJSON(r.getAllResponseHeaders());
				headers.statusCode = r.status;

				callback(json || (method === 'GET' ? error('empty_response', 'Could not get resource') : {}), headers);
			};

			r.onerror = function(e) {
				var json = r.responseText;
				try {
					json = JSON.parse(r.responseText);
				}
				catch (_e) {}

				callback(json || error('access_denied', 'Could not get resource'));
			};

			var x;

			// Should we add the query to the URL?
			if (method === 'GET' || method === 'DELETE') {
				data = null;
			}
			else if (data && typeof (data) !== 'string' && !(data instanceof FormData) && !(data instanceof File) && !(data instanceof Blob)) {
				// Loop through and add formData
				var f = new FormData();
				for (x in data) if (data.hasOwnProperty(x)) {
					if (data[x] instanceof HTMLInputElement) {
						if ('files' in data[x] && data[x].files.length > 0) {
							f.append(x, data[x].files[0]);
						}
					}
					else if (data[x] instanceof Blob) {
						f.append(x, data[x], data.name);
					}
					else {
						f.append(x, data[x]);
					}
				}

				data = f;
			}

			// Open the path, async
			r.open(method, url, true);

			if (binary) {
				if ('responseType' in r) {
					r.responseType = binary;
				}
				else {
					r.overrideMimeType('text/plain; charset=x-user-defined');
				}
			}

			// Set any bespoke headers
			if (headers) {
				for (x in headers) {
					r.setRequestHeader(x, headers[x]);
				}
			}

			r.send(data);

			return r;

			// Headers are returned as a string
			function headersToJSON(s) {
				var r = {};
				var reg = /([a-z\-]+):\s?(.*);?/gi;
				var m;
				while ((m = reg.exec(s))) {
					r[m[1]] = m[2];
				}

				return r;
			}
		},

		// JSONP
		// Injects a script tag into the DOM to be executed and appends a callback function to the window object
		// @param string/function pathFunc either a string of the URL or a callback function pathFunc(querystringhash, continueFunc);
		// @param function callback a function to call on completion;
		jsonp: function(url, callback, callbackID, timeout) {

			var _this = this;
			var error = _this.error;

			// Change the name of the callback
			var bool = 0;
			var head = document.getElementsByTagName('head')[0];
			var operaFix;
			var result = error('server_error', 'server_error');
			var cb = function() {
				if (!(bool++)) {
					window.setTimeout(function() {
						callback(result);
						head.removeChild(script);
					}, 0);
				}

			};

			// Add callback to the window object
			callbackID = _this.globalEvent(function(json) {
				result = json;
				return true;

				// Mark callback as done
			}, callbackID);

			// The URL is a function for some cases and as such
			// Determine its value with a callback containing the new parameters of this function.
			url = url.replace(new RegExp('=\\?(&|$)'), '=' + callbackID + '$1');

			// Build script tag
			var script = _this.append('script', {
				id: callbackID,
				name: callbackID,
				src: url,
				async: true,
				onload: cb,
				onerror: cb,
				onreadystatechange: function() {
					if (/loaded|complete/i.test(this.readyState)) {
						cb();
					}
				}
			});

			// Opera fix error
			// Problem: If an error occurs with script loading Opera fails to trigger the script.onerror handler we specified
			//
			// Fix:
			// By setting the request to synchronous we can trigger the error handler when all else fails.
			// This action will be ignored if we've already called the callback handler "cb" with a successful onload event
			if (window.navigator.userAgent.toLowerCase().indexOf('opera') > -1) {
				operaFix = _this.append('script', {
					text: 'document.getElementById(\'' + callbackId + '\').onerror();'
				});
				script.async = false;
			}

			// Add timeout
			if (timeout) {
				window.setTimeout(function() {
					result = error('timeout', 'timeout');
					cb();
				}, timeout);
			}

			// TODO: add fix for IE,
			// However: unable recreate the bug of firing off the onreadystatechange before the script content has been executed and the value of "result" has been defined.
			// Inject script tag into the head element
			head.appendChild(script);

			// Append Opera Fix to run after our script
			if (operaFix) {
				head.appendChild(operaFix);
			}
		},

		// Post
		// Send information to a remote location using the post mechanism
		// @param string uri path
		// @param object data, key value data to send
		// @param function callback, function to execute in response
		post: function(url, data, options, callback, callbackID, timeout) {

			var _this = this;
			var error = _this.error;
			var doc = document;

			// This hack needs a form
			var form = null;
			var reenableAfterSubmit = [];
			var newform;
			var i = 0;
			var x = null;
			var bool = 0;
			var cb = function(r) {
				if (!(bool++)) {
					callback(r);
				}
			};

			// What is the name of the callback to contain
			// We'll also use this to name the iframe
			_this.globalEvent(cb, callbackID);

			// Build the iframe window
			var win;
			try {
				// IE7 hack, only lets us define the name here, not later.
				win = doc.createElement('<iframe name="' + callbackID + '">');
			}
			catch (e) {
				win = doc.createElement('iframe');
			}

			win.name = callbackID;
			win.id = callbackID;
			win.style.display = 'none';

			// Override callback mechanism. Triggger a response onload/onerror
			if (options && options.callbackonload) {
				// Onload is being fired twice
				win.onload = function() {
					cb({
						response: 'posted',
						message: 'Content was posted'
					});
				};
			}

			if (timeout) {
				setTimeout(function() {
					cb(error('timeout', 'The post operation timed out'));
				}, timeout);
			}

			doc.body.appendChild(win);

			// If we are just posting a single item
			if (_this.domInstance('form', data)) {
				// Get the parent form
				form = data.form;

				// Loop through and disable all of its siblings
				for (i = 0; i < form.elements.length; i++) {
					if (form.elements[i] !== data) {
						form.elements[i].setAttribute('disabled', true);
					}
				}

				// Move the focus to the form
				data = form;
			}

			// Posting a form
			if (_this.domInstance('form', data)) {
				// This is a form element
				form = data;

				// Does this form need to be a multipart form?
				for (i = 0; i < form.elements.length; i++) {
					if (!form.elements[i].disabled && form.elements[i].type === 'file') {
						form.encoding = form.enctype = 'multipart/form-data';
						form.elements[i].setAttribute('name', 'file');
					}
				}
			}
			else {
				// Its not a form element,
				// Therefore it must be a JSON object of Key=>Value or Key=>Element
				// If anyone of those values are a input type=file we shall shall insert its siblings into the form for which it belongs.
				for (x in data) if (data.hasOwnProperty(x)) {
					// Is this an input Element?
					if (_this.domInstance('input', data[x]) && data[x].type === 'file') {
						form = data[x].form;
						form.encoding = form.enctype = 'multipart/form-data';
					}
				}

				// Do If there is no defined form element, lets create one.
				if (!form) {
					// Build form
					form = doc.createElement('form');
					doc.body.appendChild(form);
					newform = form;
				}

				var input;

				// Add elements to the form if they dont exist
				for (x in data) if (data.hasOwnProperty(x)) {

					// Is this an element?
					var el = (_this.domInstance('input', data[x]) || _this.domInstance('textArea', data[x]) || _this.domInstance('select', data[x]));

					// Is this not an input element, or one that exists outside the form.
					if (!el || data[x].form !== form) {

						// Does an element have the same name?
						var inputs = form.elements[x];
						if (input) {
							// Remove it.
							if (!(inputs instanceof NodeList)) {
								inputs = [inputs];
							}

							for (i = 0; i < inputs.length; i++) {
								inputs[i].parentNode.removeChild(inputs[i]);
							}

						}

						// Create an input element
						input = doc.createElement('input');
						input.setAttribute('type', 'hidden');
						input.setAttribute('name', x);

						// Does it have a value attribute?
						if (el) {
							input.value = data[x].value;
						}
						else if (_this.domInstance(null, data[x])) {
							input.value = data[x].innerHTML || data[x].innerText;
						}
						else {
							input.value = data[x];
						}

						form.appendChild(input);
					}

					// It is an element, which exists within the form, but the name is wrong
					else if (el && data[x].name !== x) {
						data[x].setAttribute('name', x);
						data[x].name = x;
					}
				}

				// Disable elements from within the form if they weren't specified
				for (i = 0; i < form.elements.length; i++) {

					input = form.elements[i];

					// Does the same name and value exist in the parent
					if (!(input.name in data) && input.getAttribute('disabled') !== true) {
						// Disable
						input.setAttribute('disabled', true);

						// Add re-enable to callback
						reenableAfterSubmit.push(input);
					}
				}
			}

			// Set the target of the form
			form.setAttribute('method', 'POST');
			form.setAttribute('target', callbackID);
			form.target = callbackID;

			// Update the form URL
			form.setAttribute('action', url);

			// Submit the form
			// Some reason this needs to be offset from the current window execution
			setTimeout(function() {
				form.submit();

				setTimeout(function() {
					try {
						// Remove the iframe from the page.
						//win.parentNode.removeChild(win);
						// Remove the form
						if (newform) {
							newform.parentNode.removeChild(newform);
						}
					}
					catch (e) {
						try {
							console.error('HelloJS: could not remove iframe');
						}
						catch (ee) {}
					}

					// Reenable the disabled form
					for (var i = 0; i < reenableAfterSubmit.length; i++) {
						if (reenableAfterSubmit[i]) {
							reenableAfterSubmit[i].setAttribute('disabled', false);
							reenableAfterSubmit[i].disabled = false;
						}
					}
				}, 0);
			}, 100);
		},

		// Some of the providers require that only multipart is used with non-binary forms.
		// This function checks whether the form contains binary data
		hasBinary: function(data) {
			for (var x in data) if (data.hasOwnProperty(x)) {
				if (this.isBinary(data[x])) {
					return true;
				}
			}

			return false;
		},

		// Determines if a variable Either Is or like a FormInput has the value of a Blob

		isBinary: function(data) {

			return data instanceof Object && (
			(this.domInstance('input', data) && data.type === 'file') ||
			('FileList' in window && data instanceof window.FileList) ||
			('File' in window && data instanceof window.File) ||
			('Blob' in window && data instanceof window.Blob));

		},

		// Convert Data-URI to Blob string
		toBlob: function(dataURI) {
			var reg = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;
			var m = dataURI.match(reg);
			if (!m) {
				return dataURI;
			}

			var binary = atob(dataURI.replace(reg, ''));
			var array = [];
			for (var i = 0; i < binary.length; i++) {
				array.push(binary.charCodeAt(i));
			}

			return new Blob([new Uint8Array(array)], {type: m[1]});
		}

	});

	// EXTRA: Convert FormElement to JSON for POSTing
	// Wrappers to add additional functionality to existing functions
	(function(hello) {

		// Copy original function
		var api = hello.api;
		var utils = hello.utils;

		utils.extend(utils, {

			// DataToJSON
			// This takes a FormElement|NodeList|InputElement|MixedObjects and convers the data object to JSON.
			dataToJSON: function(p) {

				var _this = this;
				var w = window;
				var data = p.data;

				// Is data a form object
				if (_this.domInstance('form', data)) {
					data = _this.nodeListToJSON(data.elements);
				}
				else if ('NodeList' in w && data instanceof NodeList) {
					data = _this.nodeListToJSON(data);
				}
				else if (_this.domInstance('input', data)) {
					data = _this.nodeListToJSON([data]);
				}

				// Is data a blob, File, FileList?
				if (('File' in w && data instanceof w.File) ||
					('Blob' in w && data instanceof w.Blob) ||
					('FileList' in w && data instanceof w.FileList)) {
					data = {file: data};
				}

				// Loop through data if it's not form data it must now be a JSON object
				if (!('FormData' in w && data instanceof w.FormData)) {

					for (var x in data) if (data.hasOwnProperty(x)) {

						if ('FileList' in w && data[x] instanceof w.FileList) {
							if (data[x].length === 1) {
								data[x] = data[x][0];
							}
						}
						else if (_this.domInstance('input', data[x]) && data[x].type === 'file') {
							continue;
						}
						else if (_this.domInstance('input', data[x]) ||
							_this.domInstance('select', data[x]) ||
							_this.domInstance('textArea', data[x])) {
							data[x] = data[x].value;
						}
						else if (_this.domInstance(null, data[x])) {
							data[x] = data[x].innerHTML || data[x].innerText;
						}
					}
				}

				p.data = data;
				return data;
			},

			// NodeListToJSON
			// Given a list of elements extrapolate their values and return as a json object
			nodeListToJSON: function(nodelist) {

				var json = {};

				// Create a data string
				for (var i = 0; i < nodelist.length; i++) {

					var input = nodelist[i];

					// If the name of the input is empty or diabled, dont add it.
					if (input.disabled || !input.name) {
						continue;
					}

					// Is this a file, does the browser not support 'files' and 'FormData'?
					if (input.type === 'file') {
						json[input.name] = input;
					}
					else {
						json[input.name] = input.value || input.innerHTML;
					}
				}

				return json;
			}
		});

		// Replace it
		hello.api = function() {

			// Get arguments
			var p = utils.args({path: 's!', method: 's', data:'o', timeout: 'i', callback: 'f'}, arguments);

			// Change for into a data object
			if (p.data) {
				utils.dataToJSON(p);
			}

			return api.call(this, p);
		};

	})(hello);

	(function(hello) {

		hello.init({

			dropbox: {

				name: 'Dropbox',

				oauth: {
					version: '1.0',
					auth: 'https://www.dropbox.com/1/oauth/authorize',
					request: 'https://api.dropbox.com/1/oauth/request_token',
					token: 'https://api.dropbox.com/1/oauth/access_token'
				},

				login: function(p) {
					// The dropbox login window is a different size
					p.options.window_width = 1000;
					p.options.window_height = 1000;
				},

				/*
					Dropbox does not allow insecure HTTP URI's in the redirect_uri field
					...otherwise I'd love to use OAuth2

					Follow request https://forums.dropbox.com/topic.php?id=106505

					p.qs.response_type = 'code';
					oauth: {
						version: 2,
						auth: 'https://www.dropbox.com/1/oauth2/authorize',
						grant: 'https://api.dropbox.com/1/oauth2/token'
					}
				*/

				// API Base URL
				base: 'https://api.dropbox.com/1/',

				// Bespoke setting: this is states whether to use the custom environment of Dropbox or to use their own environment
				// Because it's notoriously difficult for Dropbox too provide access from other webservices, this defaults to Sandbox
				root: 'sandbox',

				// Map GET requests
				get: {
					me: 'account/info',

					// Https://www.dropbox.com/developers/core/docs#metadata
					'me/files': req('metadata/@{root|sandbox}/@{parent}'),
					'me/folder': req('metadata/@{root|sandbox}/@{id}'),
					'me/folders': req('metadata/@{root|sandbox}/'),

					'default': function(p, callback) {
						if (p.path.match('https://api-content.dropbox.com/1/files/')) {
							// This is a file, return binary data
							p.method = 'blob';
						}

						callback(p.path);
					}
				},

				post: {
					'me/files': function(p, callback) {

						var path = p.data.parent;
						var fileName = p.data.name;

						p.data = {
							file: p.data.file
						};

						// Does this have a data-uri to upload as a file?
						if (typeof (p.data.file) === 'string') {
							p.data.file = hello.utils.toBlob(p.data.file);
						}

						callback('https://api-content.dropbox.com/1/files_put/@{root|sandbox}/' + path + '/' + fileName);
					},

					'me/folders': function(p, callback) {

						var name = p.data.name;
						p.data = {};

						callback('fileops/create_folder?root=@{root|sandbox}&' + hello.utils.param({
							path: name
						}));
					}
				},

				// Map DELETE requests
				del: {
					'me/files': 'fileops/delete?root=@{root|sandbox}&path=@{id}',
					'me/folder': 'fileops/delete?root=@{root|sandbox}&path=@{id}'
				},

				wrap: {
					me: function(o) {
						formatError(o);
						if (!o.uid) {
							return o;
						}

						o.name = o.display_name;
						o.first_name = o.name.split(' ')[0];
						o.last_name = o.name.split(' ')[1];
						o.id = o.uid;
						delete o.uid;
						delete o.display_name;
						return o;
					},

					'default': function(o, headers, req) {
						formatError(o);
						if (o.is_dir && o.contents) {
							o.data = o.contents;
							delete o.contents;

							o.data.forEach(function(item) {
								item.root = o.root;
								formatFile(item, headers, req);
							});
						}

						formatFile(o, headers, req);

						if (o.is_deleted) {
							o.success = true;
						}

						return o;
					}
				},

				// Doesn't return the CORS headers
				xhr: function(p) {

					// The proxy supports allow-cross-origin-resource
					// Alas that's the only thing we're using.
					if (p.data && p.data.file) {
						var file = p.data.file;
						if (file) {
							if (file.files) {
								p.data = file.files[0];
							}
							else {
								p.data = file;
							}
						}
					}

					if (p.method === 'delete') {
						p.method = 'post';
					}

					return true;
				},

				form: function(p, qs) {
					delete qs.state;
					delete qs.redirect_uri;
				}
			}
		});

		function formatError(o) {
			if (o && 'error' in o) {
				o.error = {
					code: 'server_error',
					message: o.error.message || o.error
				};
			}
		}

		function formatFile(o, headers, req) {

			if (typeof o !== 'object' ||
				(typeof Blob !== 'undefined' && o instanceof Blob) ||
				(typeof ArrayBuffer !== 'undefined' && o instanceof ArrayBuffer)) {
				// This is a file, let it through unformatted
				return;
			}

			if ('error' in o) {
				return;
			}

			var path = o.root + o.path.replace(/\&/g, '%26');
			if (o.thumb_exists) {
				o.thumbnail = hello.settings.oauth_proxy + '?path=' +
				encodeURIComponent('https://api-content.dropbox.com/1/thumbnails/' + path + '?format=jpeg&size=m') + '&access_token=' + req.query.access_token;
			}

			o.type = (o.is_dir ? 'folder' : o.mime_type);
			o.name = o.path.replace(/.*\//g, '');
			if (o.is_dir) {
				o.files = 'metadata/' + path;
			}
			else {
				o.downloadLink = hello.settings.oauth_proxy + '?path=' +
				encodeURIComponent('https://api-content.dropbox.com/1/files/' + path) + '&access_token=' + req.query.access_token;
				o.file = 'https://api-content.dropbox.com/1/files/' + path;
			}

			if (!o.id) {
				o.id = o.path.replace(/^\//, '');
			}

			// O.media = 'https://api-content.dropbox.com/1/files/' + path;
		}

		function req(str) {
			return function(p, cb) {
				delete p.query.limit;
				cb(str);
			};
		}

	})(hello);

	(function(hello) {

		hello.init({

			facebook: {

				name: 'Facebook',

				// SEE https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/v2.1
				oauth: {
					version: 2,
					auth: 'https://www.facebook.com/dialog/oauth/',
					grant: 'https://graph.facebook.com/oauth/access_token'
				},

				// Authorization scopes
				scope: {
					basic: 'public_profile',
					email: 'email',
					birthday: 'user_birthday',
					events: 'user_events',
					photos: 'user_photos,user_videos',
					videos: 'user_photos,user_videos',
					friends: 'user_friends',
					files: 'user_photos,user_videos',
					publish_files: 'user_photos,user_videos,publish_actions',
					publish: 'publish_actions',

					// Deprecated in v2.0
					// Create_event	: 'create_event',

					offline_access: 'offline_access'
				},

				// Refresh the access_token
				refresh: true,

				login: function(p) {

					// Reauthenticate
					// https://developers.facebook.com/docs/facebook-login/reauthentication
					if (p.options.force) {
						p.qs.auth_type = 'reauthenticate';
					}

					// Support Facebook's unique auth_type parameter
					if (p.options.auth_type) {
						p.qs.auth_type = p.options.auth_type;
					}

					// The facebook login window is a different size.
					p.options.window_width = 580;
					p.options.window_height = 400;
				},

				logout: function(callback) {
					// Assign callback to a global handler
					var callbackID = hello.utils.globalEvent(callback);
					var redirect = encodeURIComponent(hello.settings.redirect_uri + '?' + hello.utils.param({callback:callbackID, result: JSON.stringify({force:true}), state: '{}'}));
					var token = (hello.utils.store('facebook') || {}).access_token;
					hello.utils.iframe('https://www.facebook.com/logout.php?next=' + redirect + '&access_token=' + token);

					// Possible responses:
					// String URL	- hello.logout should handle the logout
					// Undefined	- this function will handle the callback
					// True - throw a success, this callback isn't handling the callback
					// False - throw a error
					if (!token) {
						// If there isn't a token, the above wont return a response, so lets trigger a response
						return false;
					}
				},

				// API Base URL
				base: 'https://graph.facebook.com/',

				// Map GET requests
				get: {
					me: 'me',
					'me/friends': 'me/friends',
					'me/following': 'me/friends',
					'me/followers': 'me/friends',
					'me/share': 'me/feed',
					'me/like': 'me/likes',
					'me/files': 'me/albums',
					'me/albums': 'me/albums',
					'me/album': '@{id}/photos',
					'me/photos': 'me/photos',
					'me/photo': '@{id}',
					'friend/albums': '@{id}/albums',
					'friend/photos': '@{id}/photos'

					// Pagination
					// Https://developers.facebook.com/docs/reference/api/pagination/
				},

				// Map POST requests
				post: {
					'me/share': 'me/feed',
					'me/photo': '@{id}'

					// Https://developers.facebook.com/docs/graph-api/reference/v2.2/object/likes/
				},

				wrap: {
					me: formatUser,
					'me/friends': formatFriends,
					'me/following': formatFriends,
					'me/followers': formatFriends,
					'me/albums': format,
					'me/files': format,
					'default': format
				},

				// Special requirements for handling XHR
				xhr: function(p, qs) {
					if (p.method === 'get' || p.method === 'post') {
						qs.suppress_response_codes = true;
					}

					// Is this a post with a data-uri?
					if (p.method === 'post' && p.data && typeof (p.data.file) === 'string') {
						// Convert the Data-URI to a Blob
						p.data.file = hello.utils.toBlob(p.data.file);
					}

					return true;
				},

				// Special requirements for handling JSONP fallback
				jsonp: function(p, qs) {
					var m = p.method;
					if (m !== 'get' && !hello.utils.hasBinary(p.data)) {
						p.data.method = m;
						p.method = 'get';
					}
					else if (p.method === 'delete') {
						qs.method = 'delete';
						p.method = 'post';
					}
				},

				// Special requirements for iframe form hack
				form: function(p) {
					return {
						// Fire the callback onload
						callbackonload: true
					};
				}
			}
		});

		var base = 'https://graph.facebook.com/';

		function formatUser(o) {
			if (o.id) {
				o.thumbnail = o.picture = 'https://graph.facebook.com/' + o.id + '/picture';
			}

			return o;
		}

		function formatFriends(o) {
			if ('data' in o) {
				o.data.forEach(formatUser);
			}

			return o;
		}

		function format(o, headers, req) {
			if (typeof o === 'boolean') {
				o = {success: o};
			}

			if (o && 'data' in o) {
				var token = req.query.access_token;
				o.data.forEach(function(d) {
					if (d.picture) {
						d.thumbnail = d.picture;
					}

					if (d.cover_photo) {
						d.thumbnail = base + d.cover_photo + '/picture?access_token=' + token;
					}

					if (d.type === 'album') {
						d.files = d.photos = base + d.id + '/photos';
					}

					if (d.can_upload) {
						d.upload_location = base + d.id + '/photos';
					}
				});
			}

			return o;
		}

	})(hello);

	(function(hello) {

		hello.init({

			flickr: {

				name: 'Flickr',

				// Ensure that you define an oauth_proxy
				oauth: {
					version: '1.0a',
					auth: 'https://www.flickr.com/services/oauth/authorize?perms=read',
					request: 'https://www.flickr.com/services/oauth/request_token',
					token: 'https://www.flickr.com/services/oauth/access_token'
				},

				// API base URL
				base: 'https://api.flickr.com/services/rest',

				// Map GET resquests
				get: {
					me: sign('flickr.people.getInfo'),
					'me/friends': sign('flickr.contacts.getList', {per_page:'@{limit|50}'}),
					'me/following': sign('flickr.contacts.getList', {per_page:'@{limit|50}'}),
					'me/followers': sign('flickr.contacts.getList', {per_page:'@{limit|50}'}),
					'me/albums': sign('flickr.photosets.getList', {per_page:'@{limit|50}'}),
					'me/photos': sign('flickr.people.getPhotos', {per_page:'@{limit|50}'})
				},

				wrap: {
					me: function(o) {
						formatError(o);
						o = checkResponse(o, 'person');
						if (o.id) {
							if (o.realname) {
								o.name = o.realname._content;
								var m = o.name.split(' ');
								o.first_name = m[0];
								o.last_name = m[1];
							}

							o.thumbnail = getBuddyIcon(o, 'l');
							o.picture = getBuddyIcon(o, 'l');
						}

						return o;
					},

					'me/friends': formatFriends,
					'me/followers': formatFriends,
					'me/following': formatFriends,
					'me/albums': function(o) {
						formatError(o);
						o = checkResponse(o, 'photosets');
						paging(o);
						if (o.photoset) {
							o.data = o.photoset;
							o.data.forEach(function(item) {
								item.name = item.title._content;
								item.photos = 'https://api.flickr.com/services/rest' + getApiUrl('flickr.photosets.getPhotos', {photoset_id: item.id}, true);
							});

							delete o.photoset;
						}

						return o;
					},

					'me/photos': function(o) {
						formatError(o);
						return formatPhotos(o);
					},

					'default': function(o) {
						formatError(o);
						return formatPhotos(o);
					}
				},

				xhr: false,

				jsonp: function(p, qs) {
					if (p.method == 'get') {
						delete qs.callback;
						qs.jsoncallback = p.callbackID;
					}
				}
			}
		});

		function getApiUrl(method, extraParams, skipNetwork) {
			var url = ((skipNetwork) ? '' : 'flickr:') +
				'?method=' + method +
				'&api_key=' + hello.services.flickr.id +
				'&format=json';
			for (var param in extraParams) {
				if (extraParams.hasOwnProperty(param)) {
					url += '&' + param + '=' + extraParams[param];
				}
			}

			return url;
		}

		// This is not exactly neat but avoid to call
		// The method 'flickr.test.login' for each api call

		function withUser(cb) {
			var auth = hello.getAuthResponse('flickr');
			cb(auth && auth.user_nsid ? auth.user_nsid : null);
		}

		function sign(url, params) {
			if (!params) {
				params = {};
			}

			return function(p, callback) {
				withUser(function(userId) {
					params.user_id = userId;
					callback(getApiUrl(url, params, true));
				});
			};
		}

		function getBuddyIcon(profile, size) {
			var url = 'https://www.flickr.com/images/buddyicon.gif';
			if (profile.nsid && profile.iconserver && profile.iconfarm) {
				url = 'https://farm' + profile.iconfarm + '.staticflickr.com/' +
					profile.iconserver + '/' +
					'buddyicons/' + profile.nsid +
					((size) ? '_' + size : '') + '.jpg';
			}

			return url;
		}

		function getPhoto(id, farm, server, secret, size) {
			size = (size) ? '_' + size : '';
			return 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + size + '.jpg';
		}

		function formatUser(o) {
		}

		function formatError(o) {
			if (o && o.stat && o.stat.toLowerCase() != 'ok') {
				o.error = {
					code: 'invalid_request',
					message: o.message
				};
			}
		}

		function formatPhotos(o) {
			if (o.photoset || o.photos) {
				var set = ('photoset' in o) ? 'photoset' : 'photos';
				o = checkResponse(o, set);
				paging(o);
				o.data = o.photo;
				delete o.photo;
				for (var i = 0; i < o.data.length; i++) {
					var photo = o.data[i];
					photo.name = photo.title;
					photo.picture = getPhoto(photo.id, photo.farm, photo.server, photo.secret, '');
					photo.source = getPhoto(photo.id, photo.farm, photo.server, photo.secret, 'b');
					photo.thumbnail = getPhoto(photo.id, photo.farm, photo.server, photo.secret, 'm');
				}
			}

			return o;
		}

		function checkResponse(o, key) {

			if (key in o) {
				o = o[key];
			}
			else if (!('error' in o)) {
				o.error = {
					code: 'invalid_request',
					message: o.message || 'Failed to get data from Flickr'
				};
			}

			return o;
		}

		function formatFriends(o) {
			formatError(o);
			if (o.contacts) {
				o = checkResponse(o, 'contacts');
				paging(o);
				o.data = o.contact;
				delete o.contact;
				for (var i = 0; i < o.data.length; i++) {
					var item = o.data[i];
					item.id = item.nsid;
					item.name = item.realname || item.username;
					item.thumbnail = getBuddyIcon(item, 'm');
				}
			}

			return o;
		}

		function paging(res) {
			if (res.page && res.pages && res.page !== res.pages) {
				res.paging = {
					next: '?page=' + (++res.page)
				};
			}
		}

	})(hello);

	(function(hello) {

		hello.init({

			foursquare: {

				name: 'Foursquare',

				oauth: {
					// See: https://developer.foursquare.com/overview/auth
					version: 2,
					auth: 'https://foursquare.com/oauth2/authenticate',
					grant: 'https://foursquare.com/oauth2/access_token'
				},

				// Refresh the access_token once expired
				refresh: true,

				base: 'https://api.foursquare.com/v2/',

				get: {
					me: 'users/self',
					'me/friends': 'users/self/friends',
					'me/followers': 'users/self/friends',
					'me/following': 'users/self/friends'
				},

				wrap: {
					me: function(o) {
						formatError(o);
						if (o && o.response) {
							o = o.response.user;
							formatUser(o);
						}

						return o;
					},

					'default': function(o) {
						formatError(o);

						// Format friends
						if (o && 'response' in o && 'friends' in o.response && 'items' in o.response.friends) {
							o.data = o.response.friends.items;
							o.data.forEach(formatUser);
							delete o.response;
						}

						return o;
					}
				},

				xhr: formatRequest,
				jsonp: formatRequest
			}
		});

		function formatError(o) {
			if (o.meta && (o.meta.code === 400 || o.meta.code === 401)) {
				o.error = {
					code: 'access_denied',
					message: o.meta.errorDetail
				};
			}
		}

		function formatUser(o) {
			if (o && o.id) {
				o.thumbnail = o.photo.prefix + '100x100' + o.photo.suffix;
				o.name = o.firstName + ' ' + o.lastName;
				o.first_name = o.firstName;
				o.last_name = o.lastName;
				if (o.contact) {
					if (o.contact.email) {
						o.email = o.contact.email;
					}
				}
			}
		}

		function formatRequest(p, qs) {
			var token = qs.access_token;
			delete qs.access_token;
			qs.oauth_token = token;
			qs.v = 20121125;
			return true;
		}

	})(hello);

	(function(hello) {

		hello.init({

			github: {

				name: 'GitHub',

				oauth: {
					version: 2,
					auth: 'https://github.com/login/oauth/authorize',
					grant: 'https://github.com/login/oauth/access_token',
					response_type: 'code'
				},

				scope: {
					basic: '',
					email: 'user:email'
				},

				base: 'https://api.github.com/',

				get: {
					me: 'user',
					'me/friends': 'user/following?per_page=@{limit|100}',
					'me/following': 'user/following?per_page=@{limit|100}',
					'me/followers': 'user/followers?per_page=@{limit|100}',
					'me/like': 'user/starred?per_page=@{limit|100}'
				},

				wrap: {
					me: function(o, headers) {

						formatError(o, headers);
						formatUser(o);

						return o;
					},

					'default': function(o, headers, req) {

						formatError(o, headers);

						if (Array.isArray(o)) {
							o = {data:o};
						}

						if (o.data) {
							paging(o, headers, req);
							o.data.forEach(formatUser);
						}

						return o;
					}
				},

				xhr: function(p) {

					if (p.method !== 'get' && p.data) {

						// Serialize payload as JSON
						p.headers = p.headers || {};
						p.headers['Content-Type'] = 'application/json';
						if (typeof (p.data) === 'object') {
							p.data = JSON.stringify(p.data);
						}
					}

					return true;
				}
			}
		});

		function formatError(o, headers) {
			var code = headers ? headers.statusCode : (o && 'meta' in o && 'status' in o.meta && o.meta.status);
			if ((code === 401 || code === 403)) {
				o.error = {
					code: 'access_denied',
					message: o.message || (o.data ? o.data.message : 'Could not get response')
				};
				delete o.message;
			}
		}

		function formatUser(o) {
			if (o.id) {
				o.thumbnail = o.picture = o.avatar_url;
				o.name = o.login;
			}
		}

		function paging(res, headers, req) {
			if (res.data && res.data.length && headers && headers.Link) {
				var next = headers.Link.match(/<(.*?)>;\s*rel=\"next\"/);
				if (next) {
					res.paging = {
						next: next[1]
					};
				}
			}
		}

	})(hello);

	(function(hello) {

		// URLs
		var contactsUrl = 'https://www.google.com/m8/feeds/contacts/default/full?v=3.0&alt=json&max-results=@{limit|1000}&start-index=@{start|1}';

		hello.init({

			google: {

				name: 'Google Plus',

				// REF: http://code.google.com/apis/accounts/docs/OAuth2UserAgent.html
				oauth: {
					version: 2,
					auth: 'https://accounts.google.com/o/oauth2/auth',
					grant: 'https://accounts.google.com/o/oauth2/token'
				},

				// Authorization scopes
				scope: {
					basic: 'https://www.googleapis.com/auth/plus.me profile',
					email: 'email',
					birthday: '',
					events: '',
					photos: 'https://picasaweb.google.com/data/',
					videos: 'http://gdata.youtube.com',
					friends: 'https://www.google.com/m8/feeds, https://www.googleapis.com/auth/plus.login',
					files: 'https://www.googleapis.com/auth/drive.readonly',
					publish: '',
					publish_files: 'https://www.googleapis.com/auth/drive',
					create_event: '',
					offline_access: ''
				},

				scope_delim: ' ',

				// Login
				login: function(p) {
					if (p.qs.display === 'none') {
						// Google doesn't like display=none
						p.qs.display = '';
					}

					if (p.qs.response_type === 'code') {

						// Lets set this to an offline access to return a refresh_token
						p.qs.access_type = 'offline';
					}

					// Reauthenticate
					// https://developers.google.com/identity/protocols/
					if (p.options.force) {
						p.qs.approval_prompt = 'force';
					}
				},

				// API base URI
				base: 'https://www.googleapis.com/',

				// Map GET requests
				get: {
					me: 'plus/v1/people/me',

					// Deprecated Sept 1, 2014
					//'me': 'oauth2/v1/userinfo?alt=json',

					// See: https://developers.google.com/+/api/latest/people/list
					'me/friends': 'plus/v1/people/me/people/visible?maxResults=@{limit|100}',
					'me/following': contactsUrl,
					'me/followers': contactsUrl,
					'me/contacts': contactsUrl,
					'me/share': 'plus/v1/people/me/activities/public?maxResults=@{limit|100}',
					'me/feed': 'plus/v1/people/me/activities/public?maxResults=@{limit|100}',
					'me/albums': 'https://picasaweb.google.com/data/feed/api/user/default?alt=json&max-results=@{limit|100}&start-index=@{start|1}',
					'me/album': function(p, callback) {
						var key = p.query.id;
						delete p.query.id;
						callback(key.replace('/entry/', '/feed/'));
					},

					'me/photos': 'https://picasaweb.google.com/data/feed/api/user/default?alt=json&kind=photo&max-results=@{limit|100}&start-index=@{start|1}',

					// See: https://developers.google.com/drive/v2/reference/files/list
					'me/files': 'drive/v2/files?q=%22@{parent|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}',

					// See: https://developers.google.com/drive/v2/reference/files/list
					'me/folders': 'drive/v2/files?q=%22@{id|root}%22+in+parents+and+mimeType+=+%22application/vnd.google-apps.folder%22+and+trashed=false&maxResults=@{limit|100}',

					// See: https://developers.google.com/drive/v2/reference/files/list
					'me/folder': 'drive/v2/files?q=%22@{id|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}'
				},

				// Map POST requests
				post: {

					// Google Drive
					'me/files': uploadDrive,
					'me/folders': function(p, callback) {
						p.data = {
							title: p.data.name,
							parents: [{id: p.data.parent || 'root'}],
							mimeType: 'application/vnd.google-apps.folder'
						};
						callback('drive/v2/files');
					}
				},

				// Map PUT requests
				put: {
					'me/files': uploadDrive
				},

				// Map DELETE requests
				del: {
					'me/files': 'drive/v2/files/@{id}',
					'me/folder': 'drive/v2/files/@{id}'
				},

				wrap: {
					me: function(o) {
						if (o.id) {
							o.last_name = o.family_name || (o.name ? o.name.familyName : null);
							o.first_name = o.given_name || (o.name ? o.name.givenName : null);

							if (o.emails && o.emails.length) {
								o.email = o.emails[0].value;
							}

							formatPerson(o);
						}

						return o;
					},

					'me/friends': function(o) {
						if (o.items) {
							paging(o);
							o.data = o.items;
							o.data.forEach(formatPerson);
							delete o.items;
						}

						return o;
					},

					'me/contacts': formatFriends,
					'me/followers': formatFriends,
					'me/following': formatFriends,
					'me/share': formatFeed,
					'me/feed': formatFeed,
					'me/albums': gEntry,
					'me/photos': gEntry,
					'default': gEntry
				},

				xhr: function(p) {

					if (p.method === 'post' || p.method === 'put') {
						toJSON(p);
					}

					return true;
				},

				// Don't even try submitting via form.
				// This means no POST operations in <=IE9
				form: false
			}
		});

		function toInt(s) {
			return parseInt(s, 10);
		}

		function formatFeed(o) {
			paging(o);
			o.data = o.items;
			delete o.items;
			return o;
		}

		// Format: ensure each record contains a name, id etc.
		function formatItem(o) {
			if (o.error) {
				return;
			}

			if (!o.name) {
				o.name = o.title || o.message;
			}

			if (!o.picture) {
				o.picture = o.thumbnailLink;
			}

			if (!o.thumbnail) {
				o.thumbnail = o.thumbnailLink;
			}

			if (o.mimeType === 'application/vnd.google-apps.folder') {
				o.type = 'folder';
				o.files = 'https://www.googleapis.com/drive/v2/files?q=%22' + o.id + '%22+in+parents';
			}

			return o;
		}

		function formatImage(item) {
			return {
				source: item.url,
				width: item.width,
				height: item.height
			};
		}

		// Google has a horrible JSON API
		function gEntry(o) {
			paging(o);

			if ('feed' in o && 'entry' in o.feed) {
				o.data = o.feed.entry.map(formatEntry);
				delete o.feed;
			}

			// Old style, Picasa, etc...
			else if ('entry' in o) {
				return formatEntry(o.entry);
			}

			// New Style, Google Drive & Plus
			else if ('items' in o) {
				o.data = o.items.map(formatItem);
				delete o.items;
			}
			else {
				formatItem(o);
			}

			return o;
		}

		function formatPerson(o) {
			o.name = o.displayName || o.name;
			o.picture = o.picture || (o.image ? o.image.url : null);
			o.thumbnail = o.picture;
		}

		function formatFriends(o, headers, req) {
			paging(o);
			var r = [];
			if ('feed' in o && 'entry' in o.feed) {
				var token = req.query.access_token;
				for (var i = 0; i < o.feed.entry.length; i++) {
					var a = o.feed.entry[i];

					a.id	= a.id.$t;
					a.name	= a.title.$t;
					delete a.title;
					if (a.gd$email) {
						a.email	= (a.gd$email && a.gd$email.length > 0) ? a.gd$email[0].address : null;
						a.emails = a.gd$email;
						delete a.gd$email;
					}

					if (a.updated) {
						a.updated = a.updated.$t;
					}

					if (a.link) {
						var pic = (a.link.length > 0) ? a.link[0].href + '?access_token=' + token : null;
						if (pic) {
							a.picture = pic;
							a.thumbnail = pic;
						}

						delete a.link;
					}

					if (a.category) {
						delete a.category;
					}
				}

				o.data = o.feed.entry;
				delete o.feed;
			}

			return o;
		}

		function formatEntry(a) {

			var group = a.media$group;
			var media = group.media$content.length ? group.media$content[0] : {};
			var i = 0;
			var _a;
			var p = {
				id: a.id.$t,
				name: a.title.$t,
				description: a.summary.$t,
				updated_time: a.updated.$t,
				created_time: a.published.$t,
				picture: media ? media.url : null,
				images: [],
				thumbnail: media ? media.url : null,
				width: media.width,
				height: media.height
			};

			// Get feed/children
			if ('link' in a) {
				for (i = 0; i < a.link.length; i++) {
					var d = a.link[i];
					if (d.rel.match(/\#feed$/)) {
						p.upload_location = p.files = p.photos = d.href;
						break;
					}
				}
			}

			// Get images of different scales
			if ('category' in a && a.category.length) {
				_a = a.category;
				for (i = 0; i < _a.length; i++) {
					if (_a[i].scheme && _a[i].scheme.match(/\#kind$/)) {
						p.type = _a[i].term.replace(/^.*?\#/, '');
					}
				}
			}

			// Get images of different scales
			if ('media$thumbnail' in group && group.media$thumbnail.length) {
				_a = group.media$thumbnail;
				p.thumbnail = _a[0].url;
				p.images = _a.map(formatImage);
			}

			_a = group.media$content;

			if (_a && _a.length) {
				p.images.push(formatImage(_a[0]));
			}

			return p;
		}

		function paging(res) {

			// Contacts V2
			if ('feed' in res && res.feed.openSearch$itemsPerPage) {
				var limit = toInt(res.feed.openSearch$itemsPerPage.$t);
				var start = toInt(res.feed.openSearch$startIndex.$t);
				var total = toInt(res.feed.openSearch$totalResults.$t);

				if ((start + limit) < total) {
					res.paging = {
						next: '?start=' + (start + limit)
					};
				}
			}
			else if ('nextPageToken' in res) {
				res.paging = {
					next: '?pageToken=' + res.nextPageToken
				};
			}
		}

		// Construct a multipart message
		function Multipart() {

			// Internal body
			var body = [];
			var boundary = (Math.random() * 1e10).toString(32);
			var counter = 0;
			var lineBreak = '\r\n';
			var delim = lineBreak + '--' + boundary;
			var ready = function() {};

			var dataUri = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;

			// Add file
			function addFile(item) {
				var fr = new FileReader();
				fr.onload = function(e) {
					addContent(btoa(e.target.result), item.type + lineBreak + 'Content-Transfer-Encoding: base64');
				};

				fr.readAsBinaryString(item);
			}

			// Add content
			function addContent(content, type) {
				body.push(lineBreak + 'Content-Type: ' + type + lineBreak + lineBreak + content);
				counter--;
				ready();
			}

			// Add new things to the object
			this.append = function(content, type) {

				// Does the content have an array
				if (typeof (content) === 'string' || !('length' in Object(content))) {
					// Converti to multiples
					content = [content];
				}

				for (var i = 0; i < content.length; i++) {

					counter++;

					var item = content[i];

					// Is this a file?
					// Files can be either Blobs or File types
					if (
						(typeof (File) !== 'undefined' && item instanceof File) ||
						(typeof (Blob) !== 'undefined' && item instanceof Blob)
					) {
						// Read the file in
						addFile(item);
					}

					// Data-URI?
					// Data:[<mime type>][;charset=<charset>][;base64],<encoded data>
					// /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i
					else if (typeof (item) === 'string' && item.match(dataUri)) {
						var m = item.match(dataUri);
						addContent(item.replace(dataUri, ''), m[1] + lineBreak + 'Content-Transfer-Encoding: base64');
					}

					// Regular string
					else {
						addContent(item, type);
					}
				}
			};

			this.onready = function(fn) {
				ready = function() {
					if (counter === 0) {
						// Trigger ready
						body.unshift('');
						body.push('--');
						fn(body.join(delim), boundary);
						body = [];
					}
				};

				ready();
			};
		}

		// Upload to Drive
		// If this is PUT then only augment the file uploaded
		// PUT https://developers.google.com/drive/v2/reference/files/update
		// POST https://developers.google.com/drive/manage-uploads
		function uploadDrive(p, callback) {

			var data = {};

			// Test for DOM element
			if (p.data &&
				(typeof (HTMLInputElement) !== 'undefined' && p.data instanceof HTMLInputElement)
			) {
				p.data = {file: p.data};
			}

			if (!p.data.name && Object(Object(p.data.file).files).length && p.method === 'post') {
				p.data.name = p.data.file.files[0].name;
			}

			if (p.method === 'post') {
				p.data = {
					title: p.data.name,
					parents: [{id: p.data.parent || 'root'}],
					file: p.data.file
				};
			}
			else {

				// Make a reference
				data = p.data;
				p.data = {};

				// Add the parts to change as required
				if (data.parent) {
					p.data.parents = [{id: p.data.parent || 'root'}];
				}

				if (data.file) {
					p.data.file = data.file;
				}

				if (data.name) {
					p.data.title = data.name;
				}
			}

			// Extract the file, if it exists from the data object
			// If the File is an INPUT element lets just concern ourselves with the NodeList
			var file;
			if ('file' in p.data) {
				file = p.data.file;
				delete p.data.file;

				if (typeof (file) === 'object' && 'files' in file) {
					// Assign the NodeList
					file = file.files;
				}

				if (!file || !file.length) {
					callback({
						error: {
							code: 'request_invalid',
							message: 'There were no files attached with this request to upload'
						}
					});
					return;
				}
			}

			// Set type p.data.mimeType = Object(file[0]).type || 'application/octet-stream';

			// Construct a multipart message
			var parts = new Multipart();
			parts.append(JSON.stringify(p.data), 'application/json');

			// Read the file into a  base64 string... yep a hassle, i know
			// FormData doesn't let us assign our own Multipart headers and HTTP Content-Type
			// Alas GoogleApi need these in a particular format
			if (file) {
				parts.append(file);
			}

			parts.onready(function(body, boundary) {

				p.headers['content-type'] = 'multipart/related; boundary="' + boundary + '"';
				p.data = body;

				callback('upload/drive/v2/files' + (data.id ? '/' + data.id : '') + '?uploadType=multipart');
			});

		}

		function toJSON(p) {
			if (typeof (p.data) === 'object') {
				// Convert the POST into a javascript object
				try {
					p.data = JSON.stringify(p.data);
					p.headers['content-type'] = 'application/json';
				}
				catch (e) {}
			}
		}

	})(hello);

	(function(hello) {

		hello.init({

			instagram: {

				name: 'Instagram',

				oauth: {
					// SEE http://instagram.com/developer/authentication/
					version: 2,
					auth: 'https://instagram.com/oauth/authorize/',
					grant: 'https://api.instagram.com/oauth/access_token'
				},

				// Refresh the access_token once expired
				refresh: true,

				scope: {
					basic: 'basic',
					friends: 'relationships',
					publish: 'likes comments'
				},

				scope_delim: ' ',

				login: function(p) {
					// Instagram throws errors like 'Javascript API is unsupported' if the display is 'popup'.
					// Make the display anything but 'popup'
					p.qs.display = '';
				},

				base: 'https://api.instagram.com/v1/',

				get: {
					me: 'users/self',
					'me/feed': 'users/self/feed?count=@{limit|100}',
					'me/photos': 'users/self/media/recent?min_id=0&count=@{limit|100}',
					'me/friends': 'users/self/follows?count=@{limit|100}',
					'me/following': 'users/self/follows?count=@{limit|100}',
					'me/followers': 'users/self/followed-by?count=@{limit|100}',
					'friend/photos': 'users/@{id}/media/recent?min_id=0&count=@{limit|100}'
				},

				post: {
					'me/like': function(p, callback) {
						var id = p.data.id;
						p.data = {};
						callback('media/' + id + '/likes');
					}
				},

				del: {
					'me/like': 'media/@{id}/likes'
				},

				wrap: {
					me: function(o) {

						formatError(o);

						if ('data' in o) {
							o.id = o.data.id;
							o.thumbnail = o.data.profile_picture;
							o.name = o.data.full_name || o.data.username;
						}

						return o;
					},

					'me/friends': formatFriends,
					'me/following': formatFriends,
					'me/followers': formatFriends,
					'me/photos': function(o) {

						formatError(o);
						paging(o);

						if ('data' in o) {
							o.data = o.data.filter(function(d) {
								return d.type === 'image';
							});

							o.data.forEach(function(d) {
								d.thumbnail = d.images.thumbnail.url;
								d.picture = d.images.standard_resolution.url;
								d.name = d.caption ? d.caption.text : null;
							});
						}

						return o;
					},

					'default': function(o) {
						paging(o);
						return o;
					}
				},

				// Instagram does not return any CORS Headers
				// So besides JSONP we're stuck with proxy
				xhr: function(p, qs) {

					var method = p.method;
					var proxy = method !== 'get';

					if (proxy) {

						if ((method === 'post' || method === 'put') && p.query.access_token) {
							p.data.access_token = p.query.access_token;
							delete p.query.access_token;
						}

						// No access control headers
						// Use the proxy instead
						p.proxy = proxy;
					}

					return proxy;
				},

				// No form
				form: false
			}
		});

		function formatError(o) {
			if (o && 'meta' in o && 'error_type' in o.meta) {
				o.error = {
					code: o.meta.error_type,
					message: o.meta.error_message
				};
			}
		}

		function formatFriends(o) {
			paging(o);
			if (o && 'data' in o) {
				o.data.forEach(formatFriend);
			}

			return o;
		}

		function formatFriend(o) {
			if (o.id) {
				o.thumbnail = o.profile_picture;
				o.name = o.full_name || o.username;
			}
		}

		// See: http://instagram.com/developer/endpoints/
		function paging(res) {
			if ('pagination' in res) {
				res.paging = {
					next: res.pagination.next_url
				};
				delete res.pagination;
			}
		}

	})(hello);

	(function(hello) {

		hello.init({

			linkedin: {

				oauth: {
					version: 2,
					response_type: 'code',
					auth: 'https://www.linkedin.com/uas/oauth2/authorization',
					grant: 'https://www.linkedin.com/uas/oauth2/accessToken'
				},

				// Refresh the access_token once expired
				refresh: true,

				scope: {
					basic: 'r_basicprofile',
					email: 'r_emailaddress',
					friends: 'r_network',
					publish: 'rw_nus'
				},
				scope_delim: ' ',

				base: 'https://api.linkedin.com/v1/',

				get: {
					me: 'people/~:(picture-url,first-name,last-name,id,formatted-name,email-address)',
					'me/friends': 'people/~/connections?count=@{limit|500}',
					'me/followers': 'people/~/connections?count=@{limit|500}',
					'me/following': 'people/~/connections?count=@{limit|500}',

					// See: http://developer.linkedin.com/documents/get-network-updates-and-statistics-api
					'me/share': 'people/~/network/updates?count=@{limit|250}'
				},

				post: {

					// See: https://developer.linkedin.com/documents/api-requests-json
					'me/share': function(p, callback) {
						var data = {
							visibility: {
								code: 'anyone'
							}
						};

						if (p.data.id) {

							data.attribution = {
								share: {
									id: p.data.id
								}
							};

						}
						else {
							data.comment = p.data.message;
							if (p.data.picture && p.data.link) {
								data.content = {
									'submitted-url': p.data.link,
									'submitted-image-url': p.data.picture
								};
							}
						}

						p.data = JSON.stringify(data);

						callback('people/~/shares?format=json');
					},

					'me/like': like
				},

				del:{
					'me/like': like
				},

				wrap: {
					me: function(o) {
						formatError(o);
						formatUser(o);
						return o;
					},

					'me/friends': formatFriends,
					'me/following': formatFriends,
					'me/followers': formatFriends,
					'me/share': function(o) {
						formatError(o);
						paging(o);
						if (o.values) {
							o.data = o.values.map(formatUser);
							o.data.forEach(function(item) {
								item.message = item.headline;
							});

							delete o.values;
						}

						return o;
					},

					'default': function(o, headers) {
						formatError(o);
						empty(o, headers);
						paging(o);
					}
				},

				jsonp: function(p, qs) {
					formatQuery(qs);
					if (p.method === 'get') {
						qs.format = 'jsonp';
						qs['error-callback'] = p.callbackID;
					}
				},

				xhr: function(p, qs) {
					if (p.method !== 'get') {
						formatQuery(qs);
						p.headers['Content-Type'] = 'application/json';

						// Note: x-li-format ensures error responses are not returned in XML
						p.headers['x-li-format'] = 'json';
						p.proxy = true;
						return true;
					}

					return false;
				}
			}
		});

		function formatError(o) {
			if (o && 'errorCode' in o) {
				o.error = {
					code: o.status,
					message: o.message
				};
			}
		}

		function formatUser(o) {
			if (o.error) {
				return;
			}

			o.first_name = o.firstName;
			o.last_name = o.lastName;
			o.name = o.formattedName || (o.first_name + ' ' + o.last_name);
			o.thumbnail = o.pictureUrl;
			o.email = o.emailAddress;
			return o;
		}

		function formatFriends(o) {
			formatError(o);
			paging(o);
			if (o.values) {
				o.data = o.values.map(formatUser);
				delete o.values;
			}

			return o;
		}

		function paging(res) {
			if ('_count' in res && '_start' in res && (res._count + res._start) < res._total) {
				res.paging = {
					next: '?start=' + (res._start + res._count) + '&count=' + res._count
				};
			}
		}

		function empty(o, headers) {
			if (JSON.stringify(o) === '{}' && headers.statusCode === 200) {
				o.success = true;
			}
		}

		function formatQuery(qs) {
			// LinkedIn signs requests with the parameter 'oauth2_access_token'
			// ... yeah another one who thinks they should be different!
			if (qs.access_token) {
				qs.oauth2_access_token = qs.access_token;
				delete qs.access_token;
			}
		}

		function like(p, callback) {
			p.headers['x-li-format'] = 'json';
			var id = p.data.id;
			p.data = (p.method !== 'delete').toString();
			p.method = 'put';
			callback('people/~/network/updates/key=' + id + '/is-liked');
		}

	})(hello);

	// See: https://developers.soundcloud.com/docs/api/reference
	(function(hello) {

		hello.init({

			soundcloud: {
				name: 'SoundCloud',

				oauth: {
					version: 2,
					auth: 'https://soundcloud.com/connect',
					grant: 'https://soundcloud.com/oauth2/token'
				},

				// Request path translated
				base: 'https://api.soundcloud.com/',
				get: {
					me: 'me.json',

					// Http://developers.soundcloud.com/docs/api/reference#me
					'me/friends': 'me/followings.json',
					'me/followers': 'me/followers.json',
					'me/following': 'me/followings.json',

					// See: http://developers.soundcloud.com/docs/api/reference#activities
					'default': function(p, callback) {

						// Include '.json at the end of each request'
						callback(p.path + '.json');
					}
				},

				// Response handlers
				wrap: {
					me: function(o) {
						formatUser(o);
						return o;
					},

					'default': function(o) {
						if (Array.isArray(o)) {
							o = {
								data: o.map(formatUser)
							};
						}

						paging(o);
						return o;
					}
				},

				xhr: formatRequest,
				jsonp: formatRequest
			}
		});

		function formatRequest(p, qs) {
			// Alter the querystring
			var token = qs.access_token;
			delete qs.access_token;
			qs.oauth_token = token;
			qs['_status_code_map[302]'] = 200;
			return true;
		}

		function formatUser(o) {
			if (o.id) {
				o.picture = o.avatar_url;
				o.thumbnail = o.avatar_url;
				o.name = o.username || o.full_name;
			}

			return o;
		}

		// See: http://developers.soundcloud.com/docs/api/reference#activities
		function paging(res) {
			if ('next_href' in res) {
				res.paging = {
					next: res.next_href
				};
			}
		}

	})(hello);

	(function(hello) {

		var base = 'https://api.twitter.com/';

		hello.init({

			twitter: {

				// Ensure that you define an oauth_proxy
				oauth: {
					version: '1.0a',
					auth: base + 'oauth/authenticate',
					request: base + 'oauth/request_token',
					token: base + 'oauth/access_token'
				},

				login: function(p) {
					// Reauthenticate
					// https://dev.twitter.com/oauth/reference/get/oauth/authenticate
					var prefix = '?force_login=true';
					this.oauth.auth = this.oauth.auth.replace(prefix, '') + (p.options.force ? prefix : '');
				},

				base: base + '1.1/',

				get: {
					me: 'account/verify_credentials.json',
					'me/friends': 'friends/list.json?count=@{limit|200}',
					'me/following': 'friends/list.json?count=@{limit|200}',
					'me/followers': 'followers/list.json?count=@{limit|200}',

					// Https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
					'me/share': 'statuses/user_timeline.json?count=@{limit|200}',

					// Https://dev.twitter.com/rest/reference/get/favorites/list
					'me/like': 'favorites/list.json?count=@{limit|200}'
				},

				post: {
					'me/share': function(p, callback) {

						var data = p.data;
						p.data = null;

						// Tweet media
						if (data.file) {
							p.data = {
								status: data.message,
								'media[]': data.file
							};
							callback('statuses/update_with_media.json');
						}

						// Retweet?
						else if (data.id) {
							callback('statuses/retweet/' + data.id + '.json');
						}

						// Tweet
						else {
							callback('statuses/update.json?include_entities=1&status=' + data.message);
						}
					},

					// See: https://dev.twitter.com/rest/reference/post/favorites/create
					'me/like': function(p, callback) {
						var id = p.data.id;
						p.data = null;
						callback('favorites/create.json?id=' + id);
					}
				},

				del: {

					// See: https://dev.twitter.com/rest/reference/post/favorites/destroy
					'me/like': function() {
						p.method = 'post';
						var id = p.data.id;
						p.data = null;
						callback('favorites/destroy.json?id=' + id);
					}
				},

				wrap: {
					me: function(res) {
						formatError(res);
						formatUser(res);
						return res;
					},

					'me/friends': formatFriends,
					'me/followers': formatFriends,
					'me/following': formatFriends,

					'me/share': function(res) {
						formatError(res);
						paging(res);
						if (!res.error && 'length' in res) {
							return {data: res};
						}

						return res;
					},

					'default': function(res) {
						res = arrayToDataResponse(res);
						paging(res);
						return res;
					}
				},
				xhr: function(p) {

					// Rely on the proxy for non-GET requests.
					return (p.method !== 'get');
				}
			}
		});

		function formatUser(o) {
			if (o.id) {
				if (o.name) {
					var m = o.name.split(' ');
					o.first_name = m[0];
					o.last_name = m[1];
				}

				// See: https://dev.twitter.com/overview/general/user-profile-images-and-banners
				o.thumbnail = o.profile_image_url_https || o.profile_image_url;
			}

			return o;
		}

		function formatFriends(o) {
			formatError(o);
			paging(o);
			if (o.users) {
				o.data = o.users.map(formatUser);
				delete o.users;
			}

			return o;
		}

		function formatError(o) {
			if (o.errors) {
				var e = o.errors[0];
				o.error = {
					code: 'request_failed',
					message: e.message
				};
			}
		}

		// Take a cursor and add it to the path
		function paging(res) {
			// Does the response include a 'next_cursor_string'
			if ('next_cursor_str' in res) {
				// See: https://dev.twitter.com/docs/misc/cursoring
				res.paging = {
					next: '?cursor=' + res.next_cursor_str
				};
			}
		}

		function arrayToDataResponse(res) {
			return Array.isArray(res) ? {data: res} : res;
		}

		/**
		// The documentation says to define user in the request
		// Although its not actually required.

		var user_id;

		function withUserId(callback){
			if(user_id){
				callback(user_id);
			}
			else{
				hello.api('twitter:/me', function(o){
					user_id = o.id;
					callback(o.id);
				});
			}
		}

		function sign(url){
			return function(p, callback){
				withUserId(function(user_id){
					callback(url+'?user_id='+user_id);
				});
			};
		}
		*/

	})(hello);

	(function(hello) {

		hello.init({
			windows: {
				name: 'Windows live',

				// REF: http://msdn.microsoft.com/en-us/library/hh243641.aspx
				oauth: {
					version: 2,
					auth: 'https://login.live.com/oauth20_authorize.srf',
					grant: 'https://login.live.com/oauth20_token.srf'
				},

				// Refresh the access_token once expired
				refresh: true,

				logout: function() {
					return 'http://login.live.com/oauth20_logout.srf?ts=' + (new Date()).getTime();
				},

				// Authorization scopes
				scope: {
					basic: 'wl.signin,wl.basic',
					email: 'wl.emails',
					birthday: 'wl.birthday',
					events: 'wl.calendars',
					photos: 'wl.photos',
					videos: 'wl.photos',
					friends: 'wl.contacts_emails',
					files: 'wl.skydrive',
					publish: 'wl.share',
					publish_files: 'wl.skydrive_update',
					create_event: 'wl.calendars_update,wl.events_create',
					offline_access: 'wl.offline_access'
				},

				// API base URL
				base: 'https://apis.live.net/v5.0/',

				// Map GET requests
				get: {

					// Friends
					me: 'me',
					'me/friends': 'me/friends',
					'me/following': 'me/contacts',
					'me/followers': 'me/friends',
					'me/contacts': 'me/contacts',

					'me/albums': 'me/albums',

					// Include the data[id] in the path
					'me/album': '@{id}/files',
					'me/photo': '@{id}',

					// Files
					'me/files': '@{parent|me/skydrive}/files',
					'me/folders': '@{id|me/skydrive}/files',
					'me/folder': '@{id|me/skydrive}/files'
				},

				// Map POST requests
				post: {
					'me/albums': 'me/albums',
					'me/album': '@{id}/files/',

					'me/folders': '@{id|me/skydrive/}',
					'me/files': '@{parent|me/skydrive/}/files'
				},

				// Map DELETE requests
				del: {
					// Include the data[id] in the path
					'me/album': '@{id}',
					'me/photo': '@{id}',
					'me/folder': '@{id}',
					'me/files': '@{id}'
				},

				wrap: {
					me: formatUser,

					'me/friends': formatFriends,
					'me/contacts': formatFriends,
					'me/followers': formatFriends,
					'me/following': formatFriends,
					'me/albums': function(o) {
						if ('data' in o) {
							o.data.forEach(function(d) {
								d.photos = d.files = 'https://apis.live.net/v5.0/' + d.id + '/photos';
							});
						}

						return o;
					},

					'default': function(o) {
						if ('data' in o) {
							o.data.forEach(function(d) {
								if (d.picture) {
									d.thumbnail = d.picture;
								}
							});
						}

						return o;
					}
				},

				xhr: function(p) {
					if (p.method !== 'get' && p.method !== 'delete' && !hello.utils.hasBinary(p.data)) {

						// Does this have a data-uri to upload as a file?
						if (typeof (p.data.file) === 'string') {
							p.data.file = hello.utils.toBlob(p.data.file);
						}
						else {
							p.data = JSON.stringify(p.data);
							p.headers = {
								'Content-Type': 'application/json'
							};
						}
					}

					return true;
				},

				jsonp: function(p) {
					if (p.method !== 'get' && !hello.utils.hasBinary(p.data)) {
						p.data.method = p.method;
						p.method = 'get';
					}
				}
			}
		});

		function formatUser(o, headers, req) {
			if (o.id) {
				var token = req.query.access_token;
				if (o.emails) {
					o.email = o.emails.preferred;
				}

				// If this is not an non-network friend
				if (o.is_friend !== false) {
					// Use the id of the user_id if available
					var id = (o.user_id || o.id);
					o.thumbnail = o.picture = 'https://apis.live.net/v5.0/' + id + '/picture?access_token=' + token;
				}
			}

			return o;
		}

		function formatFriends(o, headers, req) {
			if ('data' in o) {
				o.data.forEach(function(d) {
					formatUser(d, headers, req);
				});
			}

			return o;
		}

	})(hello);

	(function(hello) {

		hello.init({

			yahoo: {

				// Ensure that you define an oauth_proxy
				oauth: {
					version: '1.0a',
					auth: 'https://api.login.yahoo.com/oauth/v2/request_auth',
					request: 'https://api.login.yahoo.com/oauth/v2/get_request_token',
					token: 'https://api.login.yahoo.com/oauth/v2/get_token'
				},

				// Login handler
				login: function(p) {
					// Change the default popup window to be at least 560
					// Yahoo does dynamically change it on the fly for the signin screen (only, what if your already signed in)
					p.options.window_width = 560;

					// Yahoo throws an parameter error if for whatever reason the state.scope contains a comma, so lets remove scope
					try {delete p.qs.state.scope;}
					catch (e) {}
				},

				base: 'https://social.yahooapis.com/v1/',

				get: {
					me: yql('select * from social.profile(0) where guid=me'),
					'me/friends': yql('select * from social.contacts(0) where guid=me'),
					'me/following': yql('select * from social.contacts(0) where guid=me')
				},
				wrap: {
					me: formatUser,

					// Can't get IDs
					// It might be better to loop through the social.relationship table with has unique IDs of users.
					'me/friends': formatFriends,
					'me/following': formatFriends,
					'default': function(res) {
						paging(res);
						return res;
					}
				}
			}
		});

		/*
			// Auto-refresh fix: bug in Yahoo can't get this to work with node-oauth-shim
			login : function(o){
				// Is the user already logged in
				var auth = hello('yahoo').getAuthResponse();

				// Is this a refresh token?
				if(o.options.display==='none'&&auth&&auth.access_token&&auth.refresh_token){
					// Add the old token and the refresh token, including path to the query
					// See http://developer.yahoo.com/oauth/guide/oauth-refreshaccesstoken.html
					o.qs.access_token = auth.access_token;
					o.qs.refresh_token = auth.refresh_token;
					o.qs.token_url = 'https://api.login.yahoo.com/oauth/v2/get_token';
				}
			},
		*/

		function formatError(o) {
			if (o && 'meta' in o && 'error_type' in o.meta) {
				o.error = {
					code: o.meta.error_type,
					message: o.meta.error_message
				};
			}
		}

		function formatUser(o) {

			formatError(o);
			if (o.query && o.query.results && o.query.results.profile) {
				o = o.query.results.profile;
				o.id = o.guid;
				o.last_name = o.familyName;
				o.first_name = o.givenName || o.nickname;
				var a = [];
				if (o.first_name) {
					a.push(o.first_name);
				}

				if (o.last_name) {
					a.push(o.last_name);
				}

				o.name = a.join(' ');
				o.email = (o.emails && o.emails[0]) ? o.emails[0].handle : null;
				o.thumbnail = o.image ? o.image.imageUrl : null;
			}

			return o;
		}

		function formatFriends(o, headers, request) {
			formatError(o);
			paging(o, headers, request);
			var contact;
			var field;
			if (o.query && o.query.results && o.query.results.contact) {
				o.data = o.query.results.contact;
				delete o.query;

				if (!Array.isArray(o.data)) {
					o.data = [o.data];
				}

				o.data.forEach(formatFriend);
			}

			return o;
		}

		function formatFriend(contact) {
			contact.id = null;
			contact.fields.forEach(function(field) {
				if (field.type === 'email') {
					contact.email = field.value;
				}

				if (field.type === 'name') {
					contact.first_name = field.value.givenName;
					contact.last_name = field.value.familyName;
					contact.name = field.value.givenName + ' ' + field.value.familyName;
				}

				if (field.type === 'yahooid') {
					contact.id = field.value;
				}
			});
		}

		function paging(res, headers, request) {

			// See: http://developer.yahoo.com/yql/guide/paging.html#local_limits
			if (res.query && res.query.count && request.options) {
				res.paging = {
					next: '?start=' + (res.query.count + (+request.options.start || 1))
				};
			}
		}

		function yql(q) {
			return 'https://query.yahooapis.com/v1/yql?q=' + (q + ' limit @{limit|100} offset @{start|0}').replace(/\s/g, '%20') + '&format=json';
		}

	})(hello);

	// Register as anonymous AMD module
	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return hello;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	// CommonJS module for browserify
	if (typeof module === 'object' && module.exports) {
		module.exports = hello;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(254).setImmediate))

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(6).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(254).setImmediate, __webpack_require__(254).clearImmediate))

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	//var Request = require('superagent');
	var assign = __webpack_require__(252);


	var EventEmitter = __webpack_require__(256).EventEmitter;

	var AppDispatcher = __webpack_require__(248);
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

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(258);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/pages/signup.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/pages/signup.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, ".login-page,\n.signup-page {\n  width: 100%;\n  height: 100%;\n}\n\n.login,\n.signup {\n  margin: 150px auto 0;\n  width: 495px;\n}\n\n.login-logo,\n.signup-logo {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.login h1,\n.signup h1 {\n  font-weight: 400;\n  font-size: 24px;\n  color: #0091EA;\n  text-align: center;\n  margin: 0 0 1em 0;\n  line-height: 1.2em;\n}\n\n.login p,\n.signup p {\n  font-size: 14px;\n  color: #9E9E9E;\n  text-align: center;\n  margin: 1em 0 1em 0;\n  font-weight: 300;\n}\n\n.login-disclaimer p,\n.signup-disclaimer p {\n  font-size: 12px;\n}\n\n.login a,\n.signup a {\n  color: #0091EA;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.login a:visited,\n.signup a:visited {\n  color: #0091EA;\n}\n\n.login a:hover,\n.signup a:hover {\n  text-decoration: underline;\n}\n\n.login-input-group,\n.signup-input-group {\n  margin: 1em 0;\n}\n\n.login-input-group label,\n.signup-input-group label {\n  display: none;\n}\n\n.login-input-group input,\n.signup-input-group input {\n  border: none;\n  border-bottom: 1px solid #ccc;\n  display: block;\n  width: 100%;\n  margin-bottom: 1em;\n  padding: 0.5em;\n  color: #929292;\n  font-size: 16px;\n  transition: 150ms all;\n  font-family: 'Roboto';\n  font-weight: 300;\n}\n\n.login ::-webkit-input-placeholder,\n.signup ::-webkit-input-placeholder {\n  color: #929292;\n  font-weight: 300;\n}\n\n.login-input-group input:focus,\n.signup-input-group input:focus {\n  outline: none;\n  color: #0091EA;\n  border-bottom: 1px solid #0091EA;\n}\n\n.login-input-group input:focus::-webkit-input-placeholder,\n.signup-input-group input:focus::-webkit-input-placeholder {\n  color: #0091EA;\n}\n\n.login-content,\n.signup-content {\n  padding: 40px;\n  background-color: white;\n  border-radius: 3px;\n  margin-top: 40px;\n  box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.10);\n}\n\n.login-header,\n.signup-header {\n  margin-bottom: 2em;\n}\n\n.login-button,\n.signup-button {\n  background-color: #FF2D6F;\n  color: white;\n  text-transform: uppercase;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  transition: all 150ms;\n  letter-spacing: 0.1em;\n  height: 50px;\n  font-size: 14px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-radius: 3px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  padding: 0 2em;\n}\n\n.login-button:hover,\n.signup-button:hover {\n  border: 1px solid #FF2D6F;\n  background-color: transparent;\n  color: #FF2D6F;\n}\n\n.login-options-group .separator,\n.signup-options-group .separator {\n  font-family: serif;\n  font-style: italic;\n  text-align: center;\n  margin: 1em 0;\n  color: #ccc;\n}\n\n.login-options-group,\n.signup-options-group {\n  margin: 2em 0;\n}", ""]);

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	

	//
	// Generated on Tue Dec 16 2014 12:13:47 GMT+0100 (CET) by Charlie Robbins, Paolo Fragomeni & the Contributors (Using Codesurgeon).
	// Version 1.2.6
	//

	(function (exports) {

	/*
	 * browser.js: Browser specific functionality for director.
	 *
	 * (C) 2011, Charlie Robbins, Paolo Fragomeni, & the Contributors.
	 * MIT LICENSE
	 *
	 */

	var dloc = document.location;

	function dlocHashEmpty() {
	  // Non-IE browsers return '' when the address bar shows '#'; Director's logic
	  // assumes both mean empty.
	  return dloc.hash === '' || dloc.hash === '#';
	}

	var listener = {
	  mode: 'modern',
	  hash: dloc.hash,
	  history: false,

	  check: function () {
	    var h = dloc.hash;
	    if (h != this.hash) {
	      this.hash = h;
	      this.onHashChanged();
	    }
	  },

	  fire: function () {
	    if (this.mode === 'modern') {
	      this.history === true ? window.onpopstate() : window.onhashchange();
	    }
	    else {
	      this.onHashChanged();
	    }
	  },

	  init: function (fn, history) {
	    var self = this;
	    this.history = history;

	    if (!Router.listeners) {
	      Router.listeners = [];
	    }

	    function onchange(onChangeEvent) {
	      for (var i = 0, l = Router.listeners.length; i < l; i++) {
	        Router.listeners[i](onChangeEvent);
	      }
	    }

	    //note IE8 is being counted as 'modern' because it has the hashchange event
	    if ('onhashchange' in window && (document.documentMode === undefined
	      || document.documentMode > 7)) {
	      // At least for now HTML5 history is available for 'modern' browsers only
	      if (this.history === true) {
	        // There is an old bug in Chrome that causes onpopstate to fire even
	        // upon initial page load. Since the handler is run manually in init(),
	        // this would cause Chrome to run it twise. Currently the only
	        // workaround seems to be to set the handler after the initial page load
	        // http://code.google.com/p/chromium/issues/detail?id=63040
	        setTimeout(function() {
	          window.onpopstate = onchange;
	        }, 500);
	      }
	      else {
	        window.onhashchange = onchange;
	      }
	      this.mode = 'modern';
	    }
	    else {
	      //
	      // IE support, based on a concept by Erik Arvidson ...
	      //
	      var frame = document.createElement('iframe');
	      frame.id = 'state-frame';
	      frame.style.display = 'none';
	      document.body.appendChild(frame);
	      this.writeFrame('');

	      if ('onpropertychange' in document && 'attachEvent' in document) {
	        document.attachEvent('onpropertychange', function () {
	          if (event.propertyName === 'location') {
	            self.check();
	          }
	        });
	      }

	      window.setInterval(function () { self.check(); }, 50);

	      this.onHashChanged = onchange;
	      this.mode = 'legacy';
	    }

	    Router.listeners.push(fn);

	    return this.mode;
	  },

	  destroy: function (fn) {
	    if (!Router || !Router.listeners) {
	      return;
	    }

	    var listeners = Router.listeners;

	    for (var i = listeners.length - 1; i >= 0; i--) {
	      if (listeners[i] === fn) {
	        listeners.splice(i, 1);
	      }
	    }
	  },

	  setHash: function (s) {
	    // Mozilla always adds an entry to the history
	    if (this.mode === 'legacy') {
	      this.writeFrame(s);
	    }

	    if (this.history === true) {
	      window.history.pushState({}, document.title, s);
	      // Fire an onpopstate event manually since pushing does not obviously
	      // trigger the pop event.
	      this.fire();
	    } else {
	      dloc.hash = (s[0] === '/') ? s : '/' + s;
	    }
	    return this;
	  },

	  writeFrame: function (s) {
	    // IE support...
	    var f = document.getElementById('state-frame');
	    var d = f.contentDocument || f.contentWindow.document;
	    d.open();
	    d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
	    d.close();
	  },

	  syncHash: function () {
	    // IE support...
	    var s = this._hash;
	    if (s != dloc.hash) {
	      dloc.hash = s;
	    }
	    return this;
	  },

	  onHashChanged: function () {}
	};

	var Router = exports.Router = function (routes) {
	  if (!(this instanceof Router)) return new Router(routes);

	  this.params   = {};
	  this.routes   = {};
	  this.methods  = ['on', 'once', 'after', 'before'];
	  this.scope    = [];
	  this._methods = {};

	  this._insert = this.insert;
	  this.insert = this.insertEx;

	  this.historySupport = (window.history != null ? window.history.pushState : null) != null

	  this.configure();
	  this.mount(routes || {});
	};

	Router.prototype.init = function (r) {
	  var self = this
	    , routeTo;
	  this.handler = function(onChangeEvent) {
	    var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
	    var url = self.history === true ? self.getPath() : newURL.replace(/.*#/, '');
	    self.dispatch('on', url.charAt(0) === '/' ? url : '/' + url);
	  };

	  listener.init(this.handler, this.history);

	  if (this.history === false) {
	    if (dlocHashEmpty() && r) {
	      dloc.hash = r;
	    } else if (!dlocHashEmpty()) {
	      self.dispatch('on', '/' + dloc.hash.replace(/^(#\/|#|\/)/, ''));
	    }
	  }
	  else {
	    if (this.convert_hash_in_init) {
	      // Use hash as route
	      routeTo = dlocHashEmpty() && r ? r : !dlocHashEmpty() ? dloc.hash.replace(/^#/, '') : null;
	      if (routeTo) {
	        window.history.replaceState({}, document.title, routeTo);
	      }
	    }
	    else {
	      // Use canonical url
	      routeTo = this.getPath();
	    }

	    // Router has been initialized, but due to the chrome bug it will not
	    // yet actually route HTML5 history state changes. Thus, decide if should route.
	    if (routeTo || this.run_in_init === true) {
	      this.handler();
	    }
	  }

	  return this;
	};

	Router.prototype.explode = function () {
	  var v = this.history === true ? this.getPath() : dloc.hash;
	  if (v.charAt(1) === '/') { v=v.slice(1) }
	  return v.slice(1, v.length).split("/");
	};

	Router.prototype.setRoute = function (i, v, val) {
	  var url = this.explode();

	  if (typeof i === 'number' && typeof v === 'string') {
	    url[i] = v;
	  }
	  else if (typeof val === 'string') {
	    url.splice(i, v, s);
	  }
	  else {
	    url = [i];
	  }

	  listener.setHash(url.join('/'));
	  return url;
	};

	//
	// ### function insertEx(method, path, route, parent)
	// #### @method {string} Method to insert the specific `route`.
	// #### @path {Array} Parsed path to insert the `route` at.
	// #### @route {Array|function} Route handlers to insert.
	// #### @parent {Object} **Optional** Parent "routes" to insert into.
	// insert a callback that will only occur once per the matched route.
	//
	Router.prototype.insertEx = function(method, path, route, parent) {
	  if (method === "once") {
	    method = "on";
	    route = function(route) {
	      var once = false;
	      return function() {
	        if (once) return;
	        once = true;
	        return route.apply(this, arguments);
	      };
	    }(route);
	  }
	  return this._insert(method, path, route, parent);
	};

	Router.prototype.getRoute = function (v) {
	  var ret = v;

	  if (typeof v === "number") {
	    ret = this.explode()[v];
	  }
	  else if (typeof v === "string"){
	    var h = this.explode();
	    ret = h.indexOf(v);
	  }
	  else {
	    ret = this.explode();
	  }

	  return ret;
	};

	Router.prototype.destroy = function () {
	  listener.destroy(this.handler);
	  return this;
	};

	Router.prototype.getPath = function () {
	  var path = window.location.pathname;
	  if (path.substr(0, 1) !== '/') {
	    path = '/' + path;
	  }
	  return path;
	};
	function _every(arr, iterator) {
	  for (var i = 0; i < arr.length; i += 1) {
	    if (iterator(arr[i], i, arr) === false) {
	      return;
	    }
	  }
	}

	function _flatten(arr) {
	  var flat = [];
	  for (var i = 0, n = arr.length; i < n; i++) {
	    flat = flat.concat(arr[i]);
	  }
	  return flat;
	}

	function _asyncEverySeries(arr, iterator, callback) {
	  if (!arr.length) {
	    return callback();
	  }
	  var completed = 0;
	  (function iterate() {
	    iterator(arr[completed], function(err) {
	      if (err || err === false) {
	        callback(err);
	        callback = function() {};
	      } else {
	        completed += 1;
	        if (completed === arr.length) {
	          callback();
	        } else {
	          iterate();
	        }
	      }
	    });
	  })();
	}

	function paramifyString(str, params, mod) {
	  mod = str;
	  for (var param in params) {
	    if (params.hasOwnProperty(param)) {
	      mod = params[param](str);
	      if (mod !== str) {
	        break;
	      }
	    }
	  }
	  return mod === str ? "([._a-zA-Z0-9-%()]+)" : mod;
	}

	function regifyString(str, params) {
	  var matches, last = 0, out = "";
	  while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
	    last = matches.index + matches[0].length;
	    matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
	    out += str.substr(0, matches.index) + matches[0];
	  }
	  str = out += str.substr(last);
	  var captures = str.match(/:([^\/]+)/ig), capture, length;
	  if (captures) {
	    length = captures.length;
	    for (var i = 0; i < length; i++) {
	      capture = captures[i];
	      if (capture.slice(0, 2) === "::") {
	        str = capture.slice(1);
	      } else {
	        str = str.replace(capture, paramifyString(capture, params));
	      }
	    }
	  }
	  return str;
	}

	function terminator(routes, delimiter, start, stop) {
	  var last = 0, left = 0, right = 0, start = (start || "(").toString(), stop = (stop || ")").toString(), i;
	  for (i = 0; i < routes.length; i++) {
	    var chunk = routes[i];
	    if (chunk.indexOf(start, last) > chunk.indexOf(stop, last) || ~chunk.indexOf(start, last) && !~chunk.indexOf(stop, last) || !~chunk.indexOf(start, last) && ~chunk.indexOf(stop, last)) {
	      left = chunk.indexOf(start, last);
	      right = chunk.indexOf(stop, last);
	      if (~left && !~right || !~left && ~right) {
	        var tmp = routes.slice(0, (i || 1) + 1).join(delimiter);
	        routes = [ tmp ].concat(routes.slice((i || 1) + 1));
	      }
	      last = (right > left ? right : left) + 1;
	      i = 0;
	    } else {
	      last = 0;
	    }
	  }
	  return routes;
	}

	var QUERY_SEPARATOR = /\?.*/;

	Router.prototype.configure = function(options) {
	  options = options || {};
	  for (var i = 0; i < this.methods.length; i++) {
	    this._methods[this.methods[i]] = true;
	  }
	  this.recurse = options.recurse || this.recurse || false;
	  this.async = options.async || false;
	  this.delimiter = options.delimiter || "/";
	  this.strict = typeof options.strict === "undefined" ? true : options.strict;
	  this.notfound = options.notfound;
	  this.resource = options.resource;
	  this.history = options.html5history && this.historySupport || false;
	  this.run_in_init = this.history === true && options.run_handler_in_init !== false;
	  this.convert_hash_in_init = this.history === true && options.convert_hash_in_init !== false;
	  this.every = {
	    after: options.after || null,
	    before: options.before || null,
	    on: options.on || null
	  };
	  return this;
	};

	Router.prototype.param = function(token, matcher) {
	  if (token[0] !== ":") {
	    token = ":" + token;
	  }
	  var compiled = new RegExp(token, "g");
	  this.params[token] = function(str) {
	    return str.replace(compiled, matcher.source || matcher);
	  };
	  return this;
	};

	Router.prototype.on = Router.prototype.route = function(method, path, route) {
	  var self = this;
	  if (!route && typeof path == "function") {
	    route = path;
	    path = method;
	    method = "on";
	  }
	  if (Array.isArray(path)) {
	    return path.forEach(function(p) {
	      self.on(method, p, route);
	    });
	  }
	  if (path.source) {
	    path = path.source.replace(/\\\//ig, "/");
	  }
	  if (Array.isArray(method)) {
	    return method.forEach(function(m) {
	      self.on(m.toLowerCase(), path, route);
	    });
	  }
	  path = path.split(new RegExp(this.delimiter));
	  path = terminator(path, this.delimiter);
	  this.insert(method, this.scope.concat(path), route);
	};

	Router.prototype.path = function(path, routesFn) {
	  var self = this, length = this.scope.length;
	  if (path.source) {
	    path = path.source.replace(/\\\//ig, "/");
	  }
	  path = path.split(new RegExp(this.delimiter));
	  path = terminator(path, this.delimiter);
	  this.scope = this.scope.concat(path);
	  routesFn.call(this, this);
	  this.scope.splice(length, path.length);
	};

	Router.prototype.dispatch = function(method, path, callback) {
	  var self = this, fns = this.traverse(method, path.replace(QUERY_SEPARATOR, ""), this.routes, ""), invoked = this._invoked, after;
	  this._invoked = true;
	  if (!fns || fns.length === 0) {
	    this.last = [];
	    if (typeof this.notfound === "function") {
	      this.invoke([ this.notfound ], {
	        method: method,
	        path: path
	      }, callback);
	    }
	    return false;
	  }
	  if (this.recurse === "forward") {
	    fns = fns.reverse();
	  }
	  function updateAndInvoke() {
	    self.last = fns.after;
	    self.invoke(self.runlist(fns), self, callback);
	  }
	  after = this.every && this.every.after ? [ this.every.after ].concat(this.last) : [ this.last ];
	  if (after && after.length > 0 && invoked) {
	    if (this.async) {
	      this.invoke(after, this, updateAndInvoke);
	    } else {
	      this.invoke(after, this);
	      updateAndInvoke();
	    }
	    return true;
	  }
	  updateAndInvoke();
	  return true;
	};

	Router.prototype.invoke = function(fns, thisArg, callback) {
	  var self = this;
	  var apply;
	  if (this.async) {
	    apply = function(fn, next) {
	      if (Array.isArray(fn)) {
	        return _asyncEverySeries(fn, apply, next);
	      } else if (typeof fn == "function") {
	        fn.apply(thisArg, (fns.captures || []).concat(next));
	      }
	    };
	    _asyncEverySeries(fns, apply, function() {
	      if (callback) {
	        callback.apply(thisArg, arguments);
	      }
	    });
	  } else {
	    apply = function(fn) {
	      if (Array.isArray(fn)) {
	        return _every(fn, apply);
	      } else if (typeof fn === "function") {
	        return fn.apply(thisArg, fns.captures || []);
	      } else if (typeof fn === "string" && self.resource) {
	        self.resource[fn].apply(thisArg, fns.captures || []);
	      }
	    };
	    _every(fns, apply);
	  }
	};

	Router.prototype.traverse = function(method, path, routes, regexp, filter) {
	  var fns = [], current, exact, match, next, that;
	  function filterRoutes(routes) {
	    if (!filter) {
	      return routes;
	    }
	    function deepCopy(source) {
	      var result = [];
	      for (var i = 0; i < source.length; i++) {
	        result[i] = Array.isArray(source[i]) ? deepCopy(source[i]) : source[i];
	      }
	      return result;
	    }
	    function applyFilter(fns) {
	      for (var i = fns.length - 1; i >= 0; i--) {
	        if (Array.isArray(fns[i])) {
	          applyFilter(fns[i]);
	          if (fns[i].length === 0) {
	            fns.splice(i, 1);
	          }
	        } else {
	          if (!filter(fns[i])) {
	            fns.splice(i, 1);
	          }
	        }
	      }
	    }
	    var newRoutes = deepCopy(routes);
	    newRoutes.matched = routes.matched;
	    newRoutes.captures = routes.captures;
	    newRoutes.after = routes.after.filter(filter);
	    applyFilter(newRoutes);
	    return newRoutes;
	  }
	  if (path === this.delimiter && routes[method]) {
	    next = [ [ routes.before, routes[method] ].filter(Boolean) ];
	    next.after = [ routes.after ].filter(Boolean);
	    next.matched = true;
	    next.captures = [];
	    return filterRoutes(next);
	  }
	  for (var r in routes) {
	    if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && typeof routes[r] === "object" && !Array.isArray(routes[r]))) {
	      current = exact = regexp + this.delimiter + r;
	      if (!this.strict) {
	        exact += "[" + this.delimiter + "]?";
	      }
	      match = path.match(new RegExp("^" + exact));
	      if (!match) {
	        continue;
	      }
	      if (match[0] && match[0] == path && routes[r][method]) {
	        next = [ [ routes[r].before, routes[r][method] ].filter(Boolean) ];
	        next.after = [ routes[r].after ].filter(Boolean);
	        next.matched = true;
	        next.captures = match.slice(1);
	        if (this.recurse && routes === this.routes) {
	          next.push([ routes.before, routes.on ].filter(Boolean));
	          next.after = next.after.concat([ routes.after ].filter(Boolean));
	        }
	        return filterRoutes(next);
	      }
	      next = this.traverse(method, path, routes[r], current);
	      if (next.matched) {
	        if (next.length > 0) {
	          fns = fns.concat(next);
	        }
	        if (this.recurse) {
	          fns.push([ routes[r].before, routes[r].on ].filter(Boolean));
	          next.after = next.after.concat([ routes[r].after ].filter(Boolean));
	          if (routes === this.routes) {
	            fns.push([ routes["before"], routes["on"] ].filter(Boolean));
	            next.after = next.after.concat([ routes["after"] ].filter(Boolean));
	          }
	        }
	        fns.matched = true;
	        fns.captures = next.captures;
	        fns.after = next.after;
	        return filterRoutes(fns);
	      }
	    }
	  }
	  return false;
	};

	Router.prototype.insert = function(method, path, route, parent) {
	  var methodType, parentType, isArray, nested, part;
	  path = path.filter(function(p) {
	    return p && p.length > 0;
	  });
	  parent = parent || this.routes;
	  part = path.shift();
	  if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
	    part = regifyString(part, this.params);
	  }
	  if (path.length > 0) {
	    parent[part] = parent[part] || {};
	    return this.insert(method, path, route, parent[part]);
	  }
	  if (!part && !path.length && parent === this.routes) {
	    methodType = typeof parent[method];
	    switch (methodType) {
	     case "function":
	      parent[method] = [ parent[method], route ];
	      return;
	     case "object":
	      parent[method].push(route);
	      return;
	     case "undefined":
	      parent[method] = route;
	      return;
	    }
	    return;
	  }
	  parentType = typeof parent[part];
	  isArray = Array.isArray(parent[part]);
	  if (parent[part] && !isArray && parentType == "object") {
	    methodType = typeof parent[part][method];
	    switch (methodType) {
	     case "function":
	      parent[part][method] = [ parent[part][method], route ];
	      return;
	     case "object":
	      parent[part][method].push(route);
	      return;
	     case "undefined":
	      parent[part][method] = route;
	      return;
	    }
	  } else if (parentType == "undefined") {
	    nested = {};
	    nested[method] = route;
	    parent[part] = nested;
	    return;
	  }
	  throw new Error("Invalid route context: " + parentType);
	};



	Router.prototype.extend = function(methods) {
	  var self = this, len = methods.length, i;
	  function extend(method) {
	    self._methods[method] = true;
	    self[method] = function() {
	      var extra = arguments.length === 1 ? [ method, "" ] : [ method ];
	      self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
	    };
	  }
	  for (i = 0; i < len; i++) {
	    extend(methods[i]);
	  }
	};

	Router.prototype.runlist = function(fns) {
	  var runlist = this.every && this.every.before ? [ this.every.before ].concat(_flatten(fns)) : _flatten(fns);
	  if (this.every && this.every.on) {
	    runlist.push(this.every.on);
	  }
	  runlist.captures = fns.captures;
	  runlist.source = fns.source;
	  return runlist;
	};

	Router.prototype.mount = function(routes, path) {
	  if (!routes || typeof routes !== "object" || Array.isArray(routes)) {
	    return;
	  }
	  var self = this;
	  path = path || [];
	  if (!Array.isArray(path)) {
	    path = path.split(self.delimiter);
	  }
	  function insertOrMount(route, local) {
	    var rename = route, parts = route.split(self.delimiter), routeType = typeof routes[route], isRoute = parts[0] === "" || !self._methods[parts[0]], event = isRoute ? "on" : rename;
	    if (isRoute) {
	      rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [ "" ])[0].length);
	      parts.shift();
	    }
	    if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
	      local = local.concat(parts);
	      self.mount(routes[route], local);
	      return;
	    }
	    if (isRoute) {
	      local = local.concat(rename.split(self.delimiter));
	      local = terminator(local, self.delimiter);
	    }
	    self.insert(event, local, routes[route]);
	  }
	  for (var route in routes) {
	    if (routes.hasOwnProperty(route)) {
	      insertOrMount(route, path.slice(0));
	    }
	  }
	};



	}(true ? exports : window));

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	function classNames() {
		var classes = '';
		var arg;

		for (var i = 0; i < arguments.length; i++) {
			arg = arguments[i];
			if (!arg) {
				continue;
			}

			if ('string' === typeof arg || 'number' === typeof arg) {
				classes += ' ' + arg;
			} else if (Object.prototype.toString.call(arg) === '[object Array]') {
				classes += ' ' + classNames.apply(null, arg);
			} else if ('object' === typeof arg) {
				for (var key in arg) {
					if (!arg.hasOwnProperty(key) || !arg[key]) {
						continue;
					}
					classes += ' ' + key;
				}
			}
		}
		return classes.substr(1);
	}

	// safely export classNames for node / browserify
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	}

	// safely export classNames for RequireJS
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}


/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(264);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/main.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nhtml {\n  height: 100%;\n}\n\nbody {\n  min-width: 960px;\n  height: 100%;\n  background-color: #fafafa;\n  font-family: 'Roboto', sans-serif;\n  min-width: 360px;\n}\n\nul {\n  list-style: none;\n}\n\nul li {\n  list-style: none;\n}\n\ni {\n  display: block;\n}\n\ni svg {\n  display: block;\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.ellipsis {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.clickable {\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.button-group {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.button-group.align-left {\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.button-group.align-left .button:first-child {\n  margin-left: 0;\n}\n\n.button-group.align-right .button:last-child {\n  margin-right: 0;\n}\n\n#app {\n  height: 100%;\n}\n\n.app-group {\n  height: 100%;\n}\n\n.account-view .content-group {\n  margin: 65px auto;\n  width: 80%;\n  max-width: 800px;\n}\n\n@media only screen and (max-width: 1024px)  {\n\n  .account-view {\n    height: 100%;\n  }\n\n  .account-view .content-group {\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    max-width: none;\n  }\n\n  .settings-card-header-text {\n    padding: 30px 30px 20px 30px;\n  }\n\n  .settings-card-header .tabs-group {\n    padding: 0 30px 0 20px;\n    border-bottom: 1px solid #f2f2f2;\n    margin-bottom: 20px;\n  }\n\n  .settings-card {\n    height: 100%;\n  }\n\n  .settings-card-content {\n    padding: 0 30px 30px 30px;\n  }\n}\n\n.instance-view {\n  height: 100%;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.instance-view .header-group {\n}\n\n.instance-view .content-group {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n\n.content-group {\n  margin: 65px auto;\n  width: 80%;\n  max-width: 1140px;\n}\n\n.content-group.content-browser {\n  margin: 0;\n  width: 100%;\n  max-width: none;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  height: 100%;\n}\n\n.content-group.content-group-users {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.content-group.content-group-users .accordion {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-right: 50px;\n  margin-bottom: 50px;\n}\n\n.content-group.content-group-users .list-group {\n  -webkit-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n}\n\n.content-browser .browser-switcher {\n  -webkit-flex: 0 0 240px;\n      -ms-flex: 0 0 240px;\n          flex: 0 0 240px;\n  background-color: white;\n  box-shadow: 2px 0px 2px rgba(0,0,0,0.15);\n  z-index: 99;\n}\n\n.content-browser .list-objects {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin: 50px 25px;\n}\n\n.content-browser .list-objects .data-object {\n  float: left;\n}\n\n.content-browser .browser-classes-list {\n  padding: 15px 0;\n}\n\n.content-browser .browser-classes-list-item {\n  padding: 15px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  position: relative;\n  border-left: 3px solid transparent;\n}\n\n.content-browser .browser-classes-list-item:hover,\n.content-browser .browser-classes-list-item.browser-classes-list-item-selected {\n  background-color: #E6F4FD;\n  border-left: 3px solid #4A90E2;\n}\n\n.content-browser .browser-classes-list-item:hover .browser-classes-list-item-extras,\n.content-browser .browser-classes-list-item.browser-classes-list-item-selected .browser-classes-list-item-extras {\n  visibility: visible;\n  opacity: 1;\n}\n\n.content-browser .browser-classes-list-item-extras {\n  position: absolute;\n  top: 10px;\n  right: 5px;\n  visibility: hidden;\n  opacity: 0;\n  transition: all 100ms;\n}\n\n.content-browser .browser-classes-list-item-text {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline;\n}\n\n.content-browser .browser-classes-list-item-icon {\n  margin-right: 15px;\n}\n\n.content-browser .browser-classes-list-item-icon i {\n  width: 40px;\n  height: 40px;\n  fill: white;\n  border-radius: 100%;\n  padding: 10px;\n}\n\n.content-browser .browser-classes-list-item-name {\n  font-size: 14px;\n  color: #656565;\n  margin-right: 10px;\n}\n\n.content-browser .browser-classes-list-item-count {\n  font-size: 12px;\n  color: #AAAAAA;\n}\n\n.list-group {\n  margin-bottom: 50px;\n}\n\n.list-group .list-header {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  margin-bottom: 25px;\n  font-size: 16px;\n  line-height: 1em;\n  color: #929292;\n}\n\n.list-column-heading-name {\n  -webkit-flex: 11;\n      -ms-flex: 11;\n          flex: 11;\n  padding: 0 5px 0 10px;\n}\n\n.list-column-heading-id {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-align: left;\n  padding: 0 5px;\n}\n\n.list-column-heading-description {\n  -webkit-flex: 4;\n      -ms-flex: 4;\n          flex: 4;\n  text-align: left;\n  padding: 0 5px;\n}\n\n.list-column-heading-date {\n  padding: 0 5px;\n  -webkit-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n}\n\n.list-column-heading-dropdown {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 0 10px 0 5px;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.list-heading-dropdown {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 0 10px 0 5px;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n\n.list-group .list-heading {\n  font-size: 16px;\n  line-height: 1em;\n  color: #929292;\n}\n\n.list-header span {\n  padding-left: 10px;\n}\n\n.table {\n  font-size: 14px;\n  color: #A4A4A4;\n}\n\n.table.table-read-only .table-row {\n  border-left: none;\n}\n\n.table-body,\n.table-header {\n  width: 100%;\n}\n\n.table-body {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.table-header {\n  color: #848484;\n}\n\n.table-header .table-data {\n  border-bottom: 1px solid #E3E3E3;\n}\n\n.table-row {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  height: 60px;\n  border-left: 3px solid transparent;\n}\n\n.table-data {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex: 0 0 auto;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  padding: 10px 20px;\n  position: relative;\n}\n\n.table-data span {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.table-data.table-data-options span {\n  overflow: visible;\n}\n\n.table-data i {\n  width: 20px;\n  height: 20px;\n  fill: #B0B0B0;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.table-data.table-data-id {\n  -webkit-flex: 0 0 80px;\n      -ms-flex: 0 0 80px;\n          flex: 0 0 80px;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.table-data.table-data-options {\n  -webkit-flex: 0 0 60px;\n      -ms-flex: 0 0 60px;\n          flex: 0 0 60px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.table-data.table-data-string {\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.table-data.table-data-integer {\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.content-browser .table {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  background-color: white;\n  width: 100%;\n}\n\n.content-browser .table .table-data {\n  -webkit-flex: 0 0 240px;\n      -ms-flex: 0 0 240px;\n          flex: 0 0 240px;\n}\n\n.content-browser .table-body .table-row:hover {\n  background-color: #E6F4FD;\n  border-left: 3px solid #4A90E2;\n}\n\n.content-browser .table .dropdown-menu {\n  left: auto;\n  right: 0px;\n}\n\n.content-browser .table-wrapper {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  background-color: white;\n  overflow: scroll;\n}\n\n.items-list.view-cards {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.list-item-card-view {\n  -webkit-flex: 0 1 23%;\n      -ms-flex: 0 1 23%;\n          flex: 0 1 23%;\n  margin: 1%;\n  border-bottom: none;\n  transition: all .2s cubic-bezier(.4,0,.2,1);\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  position: relative;\n  fill: white;\n}\n\n.list-item-card-view.list-item-no-color .card-title,\n.list-item-card-view.list-item-no-color .card-description {\n  color: #999;\n}\n\n.list-item-card-view.list-item-no-color .dropdown-button path {\n  fill: #999;\n}\n\n.list-item-card-view:hover {\n  box-shadow: 0 5px 40px 5px rgba(0,0,0,0.2), 0 0px 15px 0px rgba(0,0,0,0.3);\n  box-shadow: 0 5px 20px 5px rgba(0,0,0,0.1), 0 0px 10px 0px rgba(0,0,0,0.2);\n}\n\n.list-item-card-view:hover .card-icon {\n  -webkit-transform: translate3d(0, -15px, 0);\n          transform: translate3d(0, -15px, 0);\n}\n\n.list-item-card-view:hover .card-title {\n  -webkit-transform: translate3d(0,0,0);\n          transform: translate3d(0,0,0);\n}\n\n.list-item-card-view:hover .card-description {\n  transition-delay: 0.05s;\n  transition-duration: 0.35s;\n  -webkit-transform: translate3d(0,0,0);\n          transform: translate3d(0,0,0);\n  opacity: 1;\n}\n\n.list-item-card-view .card-title {\n  color: white;\n  font-weight: 300;\n  font-size: 20px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  transition: -webkit-transform 0.35s;\n  transition: transform 0.35s;\n  transition-delay: 0.025s;\n  -webkit-transform: translate3d(0, 30px, 0);\n          transform: translate3d(0, 30px, 0);\n}\n\n.list-item-card-view .card-description {\n  color: rgba(255,255,255,0.8);\n  -webkit-transform: translate3d(0, 30px, 0);\n          transform: translate3d(0, 30px, 0);\n  transition: opacity 0.2s, -webkit-transform 0.35s;\n  transition: opacity 0.2s, transform 0.35s;\n  opacity: 0;\n}\n\n.list-item-card-view .card-header {\n  display: block;\n  height: 200px;\n}\n\n.list-item-card-view.animate-ink .card-header {\n  overflow: hidden;\n}\n\n.list-item-card-view .card-details {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  height: 100%;\n\n}\n\n.list-item-card-view .card-icon {\n  margin-top: -15px;\n  transition: -webkit-transform 0.35s;\n  transition: transform 0.35s;\n}\n\n.list-item-card-view .card-icon i {\n  width: 60px !important;\n  height: 60px !important;\n}\n\n.list-item-card-view .card-text {\n  position: absolute;\n  bottom: 30px;\n  left: 15px;\n  right: 15px;\n  color: white;\n  padding: 0;\n  height: 47px;\n  display: block;\n\n}\n\n.list-item-card-view .card-title span:hover {\n  text-decoration: none;\n}\n\n.list-item-card-view .dropdown-button path {\n  fill: white;\n}\n\n.ink {\n  display: block;\n  position: absolute;\n  background: rgba(255,255,255,0.5);\n  border-radius: 100%;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n\n.list-item.animate-ink .ink {\n  -webkit-animation: ripple 400ms linear;\n          animation: ripple 400ms linear;\n}\n\n@-webkit-keyframes ripple {\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(2.5);\n            transform: scale(2.5);\n  }\n}\n\n@keyframes ripple {\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(2.5);\n            transform: scale(2.5);\n  }\n}\n\n.switch-field {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  padding-top: 15px;\n  border-bottom: 1px solid #E5E5E5;\n  min-height: 100px;\n}\n\n.switch-field:last-child {\n  border-bottom: none;\n}\n\n.switch-field-text {\n  -webkit-flex: 2;\n      -ms-flex: 2;\n          flex: 2;\n}\n\n.switch-field-heading {\n  margin-bottom: 0.5em;\n}\n\n.switch-field-input {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.switch-field-heading {\n  font-size: 14px;\n  color: #444444;\n}\n\n.switch-field-description {\n  font-size: 13px;\n  color: #999999;\n}\n\n.switch-input {\n  position: relative;\n  width: 40px;\n  height: 20px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n}\n\n.switch-input-track {\n  width: 34px;\n  height: 14px;\n  border-radius: 10px;\n  box-sizing: content-box;\n}\n\n.switch-input-enabled .switch-input-track {\n  background-color: #7FCBC4;\n}\n\n.switch-input-disabled .switch-input-track {\n  background-color: #C6C5C5;\n}\n\n.switch-input-handle {\n  position: absolute;\n  top: 0;\n  border-radius: 100%;\n  width: 20px;\n  height: 20px;\n  transition: all 300ms;\n  box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24);\n}\n\n.switch-input-enabled .switch-input-handle {\n  right: 0px;\n  background-color: #009688;\n}\n\n.switch-input-disabled .switch-input-handle {\n  right: 20px;\n  background-color: #F1F1F1;\n}\n\n.action-link {\n  color: #0091EA;\n  cursor: pointer;\n}\n\n.action-link:hover {\n  text-decoration: underline;\n}", ""]);

/***/ },
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(276);


/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactWithAddons
	 */

	/**
	 * This module exists purely in the open source project, and is meant as a way
	 * to create a separate standalone build of React. This build has "addons", or
	 * functionality we've built and think might be useful but doesn't have a good
	 * place to live inside React core.
	 */

	'use strict';

	var LinkedStateMixin = __webpack_require__(277);
	var React = __webpack_require__(5);
	var ReactComponentWithPureRenderMixin =
	  __webpack_require__(280);
	var ReactCSSTransitionGroup = __webpack_require__(281);
	var ReactFragment = __webpack_require__(13);
	var ReactTransitionGroup = __webpack_require__(282);
	var ReactUpdates = __webpack_require__(27);

	var cx = __webpack_require__(290);
	var cloneWithProps = __webpack_require__(284);
	var update = __webpack_require__(291);

	React.addons = {
	  CSSTransitionGroup: ReactCSSTransitionGroup,
	  LinkedStateMixin: LinkedStateMixin,
	  PureRenderMixin: ReactComponentWithPureRenderMixin,
	  TransitionGroup: ReactTransitionGroup,

	  batchedUpdates: ReactUpdates.batchedUpdates,
	  classSet: cx,
	  cloneWithProps: cloneWithProps,
	  createFragment: ReactFragment.create,
	  update: update
	};

	if ("production" !== process.env.NODE_ENV) {
	  React.addons.Perf = __webpack_require__(153);
	  React.addons.TestUtils = __webpack_require__(292);
	}

	module.exports = React;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule LinkedStateMixin
	 * @typechecks static-only
	 */

	'use strict';

	var ReactLink = __webpack_require__(278);
	var ReactStateSetters = __webpack_require__(279);

	/**
	 * A simple mixin around ReactLink.forState().
	 */
	var LinkedStateMixin = {
	  /**
	   * Create a ReactLink that's linked to part of this component's state. The
	   * ReactLink will have the current value of this.state[key] and will call
	   * setState() when a change is requested.
	   *
	   * @param {string} key state key to update. Note: you may want to use keyOf()
	   * if you're using Google Closure Compiler advanced mode.
	   * @return {ReactLink} ReactLink instance linking to the state.
	   */
	  linkState: function(key) {
	    return new ReactLink(
	      this.state[key],
	      ReactStateSetters.createStateKeySetter(this, key)
	    );
	  }
	};

	module.exports = LinkedStateMixin;


/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactLink
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * ReactLink encapsulates a common pattern in which a component wants to modify
	 * a prop received from its parent. ReactLink allows the parent to pass down a
	 * value coupled with a callback that, when invoked, expresses an intent to
	 * modify that value. For example:
	 *
	 * React.createClass({
	 *   getInitialState: function() {
	 *     return {value: ''};
	 *   },
	 *   render: function() {
	 *     var valueLink = new ReactLink(this.state.value, this._handleValueChange);
	 *     return <input valueLink={valueLink} />;
	 *   },
	 *   this._handleValueChange: function(newValue) {
	 *     this.setState({value: newValue});
	 *   }
	 * });
	 *
	 * We have provided some sugary mixins to make the creation and
	 * consumption of ReactLink easier; see LinkedValueUtils and LinkedStateMixin.
	 */

	var React = __webpack_require__(5);

	/**
	 * @param {*} value current value of the link
	 * @param {function} requestChange callback to request a change
	 */
	function ReactLink(value, requestChange) {
	  this.value = value;
	  this.requestChange = requestChange;
	}

	/**
	 * Creates a PropType that enforces the ReactLink API and optionally checks the
	 * type of the value being passed inside the link. Example:
	 *
	 * MyComponent.propTypes = {
	 *   tabIndexLink: ReactLink.PropTypes.link(React.PropTypes.number)
	 * }
	 */
	function createLinkTypeChecker(linkType) {
	  var shapes = {
	    value: typeof linkType === 'undefined' ?
	      React.PropTypes.any.isRequired :
	      linkType.isRequired,
	    requestChange: React.PropTypes.func.isRequired
	  };
	  return React.PropTypes.shape(shapes);
	}

	ReactLink.PropTypes = {
	  link: createLinkTypeChecker
	};

	module.exports = ReactLink;


/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactStateSetters
	 */

	'use strict';

	var ReactStateSetters = {
	  /**
	   * Returns a function that calls the provided function, and uses the result
	   * of that to set the component's state.
	   *
	   * @param {ReactCompositeComponent} component
	   * @param {function} funcReturningState Returned callback uses this to
	   *                                      determine how to update state.
	   * @return {function} callback that when invoked uses funcReturningState to
	   *                    determined the object literal to setState.
	   */
	  createStateSetter: function(component, funcReturningState) {
	    return function(a, b, c, d, e, f) {
	      var partialState = funcReturningState.call(component, a, b, c, d, e, f);
	      if (partialState) {
	        component.setState(partialState);
	      }
	    };
	  },

	  /**
	   * Returns a single-argument callback that can be used to update a single
	   * key in the component's state.
	   *
	   * Note: this is memoized function, which makes it inexpensive to call.
	   *
	   * @param {ReactCompositeComponent} component
	   * @param {string} key The key in the state that you should update.
	   * @return {function} callback of 1 argument which calls setState() with
	   *                    the provided keyName and callback argument.
	   */
	  createStateKeySetter: function(component, key) {
	    // Memoize the setters.
	    var cache = component.__keySetters || (component.__keySetters = {});
	    return cache[key] || (cache[key] = createStateKeySetter(component, key));
	  }
	};

	function createStateKeySetter(component, key) {
	  // Partial state is allocated outside of the function closure so it can be
	  // reused with every call, avoiding memory allocation when this function
	  // is called.
	  var partialState = {};
	  return function stateKeySetter(value) {
	    partialState[key] = value;
	    component.setState(partialState);
	  };
	}

	ReactStateSetters.Mixin = {
	  /**
	   * Returns a function that calls the provided function, and uses the result
	   * of that to set the component's state.
	   *
	   * For example, these statements are equivalent:
	   *
	   *   this.setState({x: 1});
	   *   this.createStateSetter(function(xValue) {
	   *     return {x: xValue};
	   *   })(1);
	   *
	   * @param {function} funcReturningState Returned callback uses this to
	   *                                      determine how to update state.
	   * @return {function} callback that when invoked uses funcReturningState to
	   *                    determined the object literal to setState.
	   */
	  createStateSetter: function(funcReturningState) {
	    return ReactStateSetters.createStateSetter(this, funcReturningState);
	  },

	  /**
	   * Returns a single-argument callback that can be used to update a single
	   * key in the component's state.
	   *
	   * For example, these statements are equivalent:
	   *
	   *   this.setState({x: 1});
	   *   this.createStateKeySetter('x')(1);
	   *
	   * Note: this is memoized function, which makes it inexpensive to call.
	   *
	   * @param {string} key The key in the state that you should update.
	   * @return {function} callback of 1 argument which calls setState() with
	   *                    the provided keyName and callback argument.
	   */
	  createStateKeySetter: function(key) {
	    return ReactStateSetters.createStateKeySetter(this, key);
	  }
	};

	module.exports = ReactStateSetters;


/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule ReactComponentWithPureRenderMixin
	*/

	'use strict';

	var shallowEqual = __webpack_require__(140);

	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) ||
	           !shallowEqual(this.state, nextState);
	  }
	};

	module.exports = ReactComponentWithPureRenderMixin;


/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * @providesModule ReactCSSTransitionGroup
	 */

	'use strict';

	var React = __webpack_require__(5);

	var assign = __webpack_require__(16);

	var ReactTransitionGroup = React.createFactory(
	  __webpack_require__(282)
	);
	var ReactCSSTransitionGroupChild = React.createFactory(
	  __webpack_require__(287)
	);

	var ReactCSSTransitionGroup = React.createClass({
	  displayName: 'ReactCSSTransitionGroup',

	  propTypes: {
	    transitionName: React.PropTypes.string.isRequired,
	    transitionAppear: React.PropTypes.bool,
	    transitionEnter: React.PropTypes.bool,
	    transitionLeave: React.PropTypes.bool
	  },

	  getDefaultProps: function() {
	    return {
	      transitionAppear: false,
	      transitionEnter: true,
	      transitionLeave: true
	    };
	  },

	  _wrapChild: function(child) {
	    // We need to provide this childFactory so that
	    // ReactCSSTransitionGroupChild can receive updates to name, enter, and
	    // leave while it is leaving.
	    return ReactCSSTransitionGroupChild(
	      {
	        name: this.props.transitionName,
	        appear: this.props.transitionAppear,
	        enter: this.props.transitionEnter,
	        leave: this.props.transitionLeave
	      },
	      child
	    );
	  },

	  render: function() {
	    return (
	      ReactTransitionGroup(
	        assign({}, this.props, {childFactory: this._wrapChild})
	      )
	    );
	  }
	});

	module.exports = ReactCSSTransitionGroup;


/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactTransitionGroup
	 */

	'use strict';

	var React = __webpack_require__(5);
	var ReactTransitionChildMapping = __webpack_require__(283);

	var assign = __webpack_require__(16);
	var cloneWithProps = __webpack_require__(284);
	var emptyFunction = __webpack_require__(19);

	var ReactTransitionGroup = React.createClass({
	  displayName: 'ReactTransitionGroup',

	  propTypes: {
	    component: React.PropTypes.any,
	    childFactory: React.PropTypes.func
	  },

	  getDefaultProps: function() {
	    return {
	      component: 'span',
	      childFactory: emptyFunction.thatReturnsArgument
	    };
	  },

	  getInitialState: function() {
	    return {
	      children: ReactTransitionChildMapping.getChildMapping(this.props.children)
	    };
	  },

	  componentWillMount: function() {
	    this.currentlyTransitioningKeys = {};
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	  },

	  componentDidMount: function() {
	    var initialChildMapping = this.state.children;
	    for (var key in initialChildMapping) {
	      if (initialChildMapping[key]) {
	        this.performAppear(key);
	      }
	    }
	  },

	  componentWillReceiveProps: function(nextProps) {
	    var nextChildMapping = ReactTransitionChildMapping.getChildMapping(
	      nextProps.children
	    );
	    var prevChildMapping = this.state.children;

	    this.setState({
	      children: ReactTransitionChildMapping.mergeChildMappings(
	        prevChildMapping,
	        nextChildMapping
	      )
	    });

	    var key;

	    for (key in nextChildMapping) {
	      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
	      if (nextChildMapping[key] && !hasPrev &&
	          !this.currentlyTransitioningKeys[key]) {
	        this.keysToEnter.push(key);
	      }
	    }

	    for (key in prevChildMapping) {
	      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
	      if (prevChildMapping[key] && !hasNext &&
	          !this.currentlyTransitioningKeys[key]) {
	        this.keysToLeave.push(key);
	      }
	    }

	    // If we want to someday check for reordering, we could do it here.
	  },

	  componentDidUpdate: function() {
	    var keysToEnter = this.keysToEnter;
	    this.keysToEnter = [];
	    keysToEnter.forEach(this.performEnter);

	    var keysToLeave = this.keysToLeave;
	    this.keysToLeave = [];
	    keysToLeave.forEach(this.performLeave);
	  },

	  performAppear: function(key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];

	    if (component.componentWillAppear) {
	      component.componentWillAppear(
	        this._handleDoneAppearing.bind(this, key)
	      );
	    } else {
	      this._handleDoneAppearing(key);
	    }
	  },

	  _handleDoneAppearing: function(key) {
	    var component = this.refs[key];
	    if (component.componentDidAppear) {
	      component.componentDidAppear();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(
	      this.props.children
	    );

	    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
	      // This was removed before it had fully appeared. Remove it.
	      this.performLeave(key);
	    }
	  },

	  performEnter: function(key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];

	    if (component.componentWillEnter) {
	      component.componentWillEnter(
	        this._handleDoneEntering.bind(this, key)
	      );
	    } else {
	      this._handleDoneEntering(key);
	    }
	  },

	  _handleDoneEntering: function(key) {
	    var component = this.refs[key];
	    if (component.componentDidEnter) {
	      component.componentDidEnter();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(
	      this.props.children
	    );

	    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
	      // This was removed before it had fully entered. Remove it.
	      this.performLeave(key);
	    }
	  },

	  performLeave: function(key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];
	    if (component.componentWillLeave) {
	      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
	    } else {
	      // Note that this is somewhat dangerous b/c it calls setState()
	      // again, effectively mutating the component before all the work
	      // is done.
	      this._handleDoneLeaving(key);
	    }
	  },

	  _handleDoneLeaving: function(key) {
	    var component = this.refs[key];

	    if (component.componentDidLeave) {
	      component.componentDidLeave();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(
	      this.props.children
	    );

	    if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
	      // This entered again before it fully left. Add it again.
	      this.performEnter(key);
	    } else {
	      var newChildren = assign({}, this.state.children);
	      delete newChildren[key];
	      this.setState({children: newChildren});
	    }
	  },

	  render: function() {
	    // TODO: we could get rid of the need for the wrapper node
	    // by cloning a single child
	    var childrenToRender = [];
	    for (var key in this.state.children) {
	      var child = this.state.children[key];
	      if (child) {
	        // You may need to apply reactive updates to a child as it is leaving.
	        // The normal React way to do it won't work since the child will have
	        // already been removed. In case you need this behavior you can provide
	        // a childFactory function to wrap every child, even the ones that are
	        // leaving.
	        childrenToRender.push(cloneWithProps(
	          this.props.childFactory(child),
	          {ref: key, key: key}
	        ));
	      }
	    }
	    return React.createElement(
	      this.props.component,
	      this.props,
	      childrenToRender
	    );
	  }
	});

	module.exports = ReactTransitionGroup;


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 * @providesModule ReactTransitionChildMapping
	 */

	'use strict';

	var ReactChildren = __webpack_require__(11);
	var ReactFragment = __webpack_require__(13);

	var ReactTransitionChildMapping = {
	  /**
	   * Given `this.props.children`, return an object mapping key to child. Just
	   * simple syntactic sugar around ReactChildren.map().
	   *
	   * @param {*} children `this.props.children`
	   * @return {object} Mapping of key to child
	   */
	  getChildMapping: function(children) {
	    if (!children) {
	      return children;
	    }
	    return ReactFragment.extract(ReactChildren.map(children, function(child) {
	      return child;
	    }));
	  },

	  /**
	   * When you're adding or removing children some may be added or removed in the
	   * same render pass. We want to show *both* since we want to simultaneously
	   * animate elements in and out. This function takes a previous set of keys
	   * and a new set of keys and merges them with its best guess of the correct
	   * ordering. In the future we may expose some of the utilities in
	   * ReactMultiChild to make this easy, but for now React itself does not
	   * directly have this concept of the union of prevChildren and nextChildren
	   * so we implement it here.
	   *
	   * @param {object} prev prev children as returned from
	   * `ReactTransitionChildMapping.getChildMapping()`.
	   * @param {object} next next children as returned from
	   * `ReactTransitionChildMapping.getChildMapping()`.
	   * @return {object} a key set that contains all keys in `prev` and all keys
	   * in `next` in a reasonable order.
	   */
	  mergeChildMappings: function(prev, next) {
	    prev = prev || {};
	    next = next || {};

	    function getValueForKey(key) {
	      if (next.hasOwnProperty(key)) {
	        return next[key];
	      } else {
	        return prev[key];
	      }
	    }

	    // For each key of `next`, the list of keys to insert before that key in
	    // the combined list
	    var nextKeysPending = {};

	    var pendingKeys = [];
	    for (var prevKey in prev) {
	      if (next.hasOwnProperty(prevKey)) {
	        if (pendingKeys.length) {
	          nextKeysPending[prevKey] = pendingKeys;
	          pendingKeys = [];
	        }
	      } else {
	        pendingKeys.push(prevKey);
	      }
	    }

	    var i;
	    var childMapping = {};
	    for (var nextKey in next) {
	      if (nextKeysPending.hasOwnProperty(nextKey)) {
	        for (i = 0; i < nextKeysPending[nextKey].length; i++) {
	          var pendingNextKey = nextKeysPending[nextKey][i];
	          childMapping[nextKeysPending[nextKey][i]] = getValueForKey(
	            pendingNextKey
	          );
	        }
	      }
	      childMapping[nextKey] = getValueForKey(nextKey);
	    }

	    // Finally, add the keys which didn't appear before any key in `next`
	    for (i = 0; i < pendingKeys.length; i++) {
	      childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	    }

	    return childMapping;
	  }
	};

	module.exports = ReactTransitionChildMapping;


/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 * @providesModule cloneWithProps
	 */

	'use strict';

	var ReactElement = __webpack_require__(14);
	var ReactPropTransferer = __webpack_require__(285);

	var keyOf = __webpack_require__(42);
	var warning = __webpack_require__(18);

	var CHILDREN_PROP = keyOf({children: null});

	/**
	 * Sometimes you want to change the props of a child passed to you. Usually
	 * this is to add a CSS class.
	 *
	 * @param {ReactElement} child child element you'd like to clone
	 * @param {object} props props you'd like to modify. className and style will be
	 * merged automatically.
	 * @return {ReactElement} a clone of child with props merged in.
	 */
	function cloneWithProps(child, props) {
	  if ("production" !== process.env.NODE_ENV) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      !child.ref,
	      'You are calling cloneWithProps() on a child with a ref. This is ' +
	      'dangerous because you\'re creating a new child which will not be ' +
	      'added as a ref to its parent.'
	    ) : null);
	  }

	  var newProps = ReactPropTransferer.mergeProps(props, child.props);

	  // Use `child.props.children` if it is provided.
	  if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
	      child.props.hasOwnProperty(CHILDREN_PROP)) {
	    newProps.children = child.props.children;
	  }

	  // The current API doesn't retain _owner and _context, which is why this
	  // doesn't use ReactElement.cloneAndReplaceProps.
	  return ReactElement.createElement(child.type, newProps);
	}

	module.exports = cloneWithProps;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTransferer
	 */

	'use strict';

	var assign = __webpack_require__(16);
	var emptyFunction = __webpack_require__(19);
	var joinClasses = __webpack_require__(286);

	/**
	 * Creates a transfer strategy that will merge prop values using the supplied
	 * `mergeStrategy`. If a prop was previously unset, this just sets it.
	 *
	 * @param {function} mergeStrategy
	 * @return {function}
	 */
	function createTransferStrategy(mergeStrategy) {
	  return function(props, key, value) {
	    if (!props.hasOwnProperty(key)) {
	      props[key] = value;
	    } else {
	      props[key] = mergeStrategy(props[key], value);
	    }
	  };
	}

	var transferStrategyMerge = createTransferStrategy(function(a, b) {
	  // `merge` overrides the first object's (`props[key]` above) keys using the
	  // second object's (`value`) keys. An object's style's existing `propA` would
	  // get overridden. Flip the order here.
	  return assign({}, b, a);
	});

	/**
	 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
	 * NOTE: if you add any more exceptions to this list you should be sure to
	 * update `cloneWithProps()` accordingly.
	 */
	var TransferStrategies = {
	  /**
	   * Never transfer `children`.
	   */
	  children: emptyFunction,
	  /**
	   * Transfer the `className` prop by merging them.
	   */
	  className: createTransferStrategy(joinClasses),
	  /**
	   * Transfer the `style` prop (which is an object) by merging them.
	   */
	  style: transferStrategyMerge
	};

	/**
	 * Mutates the first argument by transferring the properties from the second
	 * argument.
	 *
	 * @param {object} props
	 * @param {object} newProps
	 * @return {object}
	 */
	function transferInto(props, newProps) {
	  for (var thisKey in newProps) {
	    if (!newProps.hasOwnProperty(thisKey)) {
	      continue;
	    }

	    var transferStrategy = TransferStrategies[thisKey];

	    if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
	      transferStrategy(props, thisKey, newProps[thisKey]);
	    } else if (!props.hasOwnProperty(thisKey)) {
	      props[thisKey] = newProps[thisKey];
	    }
	  }
	  return props;
	}

	/**
	 * ReactPropTransferer are capable of transferring props to another component
	 * using a `transferPropsTo` method.
	 *
	 * @class ReactPropTransferer
	 */
	var ReactPropTransferer = {

	  /**
	   * Merge two props objects using TransferStrategies.
	   *
	   * @param {object} oldProps original props (they take precedence)
	   * @param {object} newProps new props to merge in
	   * @return {object} a new object containing both sets of props merged.
	   */
	  mergeProps: function(oldProps, newProps) {
	    return transferInto(assign({}, oldProps), newProps);
	  }

	};

	module.exports = ReactPropTransferer;


/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	function joinClasses(className/*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;


/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * @providesModule ReactCSSTransitionGroupChild
	 */

	'use strict';

	var React = __webpack_require__(5);

	var CSSCore = __webpack_require__(288);
	var ReactTransitionEvents = __webpack_require__(289);

	var onlyChild = __webpack_require__(159);
	var warning = __webpack_require__(18);

	// We don't remove the element from the DOM until we receive an animationend or
	// transitionend event. If the user screws up and forgets to add an animation
	// their node will be stuck in the DOM forever, so we detect if an animation
	// does not start and if it doesn't, we just call the end listener immediately.
	var TICK = 17;
	var NO_EVENT_TIMEOUT = 5000;

	var noEventListener = null;


	if ("production" !== process.env.NODE_ENV) {
	  noEventListener = function() {
	    ("production" !== process.env.NODE_ENV ? warning(
	      false,
	      'transition(): tried to perform an animation without ' +
	      'an animationend or transitionend event after timeout (' +
	      '%sms). You should either disable this ' +
	      'transition in JS or add a CSS animation/transition.',
	      NO_EVENT_TIMEOUT
	    ) : null);
	  };
	}

	var ReactCSSTransitionGroupChild = React.createClass({
	  displayName: 'ReactCSSTransitionGroupChild',

	  transition: function(animationType, finishCallback) {
	    var node = this.getDOMNode();
	    var className = this.props.name + '-' + animationType;
	    var activeClassName = className + '-active';
	    var noEventTimeout = null;

	    var endListener = function(e) {
	      if (e && e.target !== node) {
	        return;
	      }
	      if ("production" !== process.env.NODE_ENV) {
	        clearTimeout(noEventTimeout);
	      }

	      CSSCore.removeClass(node, className);
	      CSSCore.removeClass(node, activeClassName);

	      ReactTransitionEvents.removeEndEventListener(node, endListener);

	      // Usually this optional callback is used for informing an owner of
	      // a leave animation and telling it to remove the child.
	      if (finishCallback) {
	        finishCallback();
	      }
	    };

	    ReactTransitionEvents.addEndEventListener(node, endListener);

	    CSSCore.addClass(node, className);

	    // Need to do this to actually trigger a transition.
	    this.queueClass(activeClassName);

	    if ("production" !== process.env.NODE_ENV) {
	      noEventTimeout = setTimeout(noEventListener, NO_EVENT_TIMEOUT);
	    }
	  },

	  queueClass: function(className) {
	    this.classNameQueue.push(className);

	    if (!this.timeout) {
	      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
	    }
	  },

	  flushClassNameQueue: function() {
	    if (this.isMounted()) {
	      this.classNameQueue.forEach(
	        CSSCore.addClass.bind(CSSCore, this.getDOMNode())
	      );
	    }
	    this.classNameQueue.length = 0;
	    this.timeout = null;
	  },

	  componentWillMount: function() {
	    this.classNameQueue = [];
	  },

	  componentWillUnmount: function() {
	    if (this.timeout) {
	      clearTimeout(this.timeout);
	    }
	  },

	  componentWillAppear: function(done) {
	    if (this.props.appear) {
	      this.transition('appear', done);
	    } else {
	      done();
	    }
	  },

	  componentWillEnter: function(done) {
	    if (this.props.enter) {
	      this.transition('enter', done);
	    } else {
	      done();
	    }
	  },

	  componentWillLeave: function(done) {
	    if (this.props.leave) {
	      this.transition('leave', done);
	    } else {
	      done();
	    }
	  },

	  render: function() {
	    return onlyChild(this.props.children);
	  }
	});

	module.exports = ReactCSSTransitionGroupChild;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSCore
	 * @typechecks
	 */

	var invariant = __webpack_require__(10);

	/**
	 * The CSSCore module specifies the API (and implements most of the methods)
	 * that should be used when dealing with the display of elements (via their
	 * CSS classes and visibility on screen. It is an API focused on mutating the
	 * display and not reading it as no logical state should be encoded in the
	 * display of elements.
	 */

	var CSSCore = {

	  /**
	   * Adds the class passed in to the element if it doesn't already have it.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  addClass: function(element, className) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !/\s/.test(className),
	      'CSSCore.addClass takes only a single class name. "%s" contains ' +
	      'multiple classes.', className
	    ) : invariant(!/\s/.test(className)));

	    if (className) {
	      if (element.classList) {
	        element.classList.add(className);
	      } else if (!CSSCore.hasClass(element, className)) {
	        element.className = element.className + ' ' + className;
	      }
	    }
	    return element;
	  },

	  /**
	   * Removes the class passed in from the element
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  removeClass: function(element, className) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !/\s/.test(className),
	      'CSSCore.removeClass takes only a single class name. "%s" contains ' +
	      'multiple classes.', className
	    ) : invariant(!/\s/.test(className)));

	    if (className) {
	      if (element.classList) {
	        element.classList.remove(className);
	      } else if (CSSCore.hasClass(element, className)) {
	        element.className = element.className
	          .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
	          .replace(/\s+/g, ' ') // multiple spaces to one
	          .replace(/^\s*|\s*$/g, ''); // trim the ends
	      }
	    }
	    return element;
	  },

	  /**
	   * Helper to add or remove a class from an element based on a condition.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @param {*} bool condition to whether to add or remove the class
	   * @return {DOMElement} the element passed in
	   */
	  conditionClass: function(element, className, bool) {
	    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
	  },

	  /**
	   * Tests whether the element has the class specified.
	   *
	   * @param {DOMNode|DOMWindow} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {boolean} true if the element has the class, false if not
	   */
	  hasClass: function(element, className) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !/\s/.test(className),
	      'CSS.hasClass takes only a single class name.'
	    ) : invariant(!/\s/.test(className)));
	    if (element.classList) {
	      return !!className && element.classList.contains(className);
	    }
	    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	  }

	};

	module.exports = CSSCore;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactTransitionEvents
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(54);

	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },

	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};

	var endEvents = [];

	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}

	if (ExecutionEnvironment.canUseDOM) {
	  detectEvents();
	}

	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.

	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}

	var ReactTransitionEvents = {
	  addEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },

	  removeEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};

	module.exports = ReactTransitionEvents;


/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cx
	 */

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */

	'use strict';
	var warning = __webpack_require__(18);

	var warned = false;

	function cx(classNames) {
	  if ("production" !== process.env.NODE_ENV) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      warned,
	      'React.addons.classSet will be deprecated in a future version. See ' +
	      'http://fb.me/react-addons-classset'
	    ) : null);
	    warned = true;
	  }

	  if (typeof classNames == 'object') {
	    return Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}

	module.exports = cx;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule update
	 */

	 /* global hasOwnProperty:true */

	'use strict';

	var assign = __webpack_require__(16);
	var keyOf = __webpack_require__(42);
	var invariant = __webpack_require__(10);
	var hasOwnProperty = {}.hasOwnProperty;

	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return assign(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}

	var COMMAND_PUSH = keyOf({$push: null});
	var COMMAND_UNSHIFT = keyOf({$unshift: null});
	var COMMAND_SPLICE = keyOf({$splice: null});
	var COMMAND_SET = keyOf({$set: null});
	var COMMAND_MERGE = keyOf({$merge: null});
	var COMMAND_APPLY = keyOf({$apply: null});

	var ALL_COMMANDS_LIST = [
	  COMMAND_PUSH,
	  COMMAND_UNSHIFT,
	  COMMAND_SPLICE,
	  COMMAND_SET,
	  COMMAND_MERGE,
	  COMMAND_APPLY
	];

	var ALL_COMMANDS_SET = {};

	ALL_COMMANDS_LIST.forEach(function(command) {
	  ALL_COMMANDS_SET[command] = true;
	});

	function invariantArrayCase(value, spec, command) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    Array.isArray(value),
	    'update(): expected target of %s to be an array; got %s.',
	    command,
	    value
	  ) : invariant(Array.isArray(value)));
	  var specValue = spec[command];
	  ("production" !== process.env.NODE_ENV ? invariant(
	    Array.isArray(specValue),
	    'update(): expected spec of %s to be an array; got %s. ' +
	    'Did you forget to wrap your parameter in an array?',
	    command,
	    specValue
	  ) : invariant(Array.isArray(specValue)));
	}

	function update(value, spec) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    typeof spec === 'object',
	    'update(): You provided a key path to update() that did not contain one ' +
	    'of %s. Did you forget to include {%s: ...}?',
	    ALL_COMMANDS_LIST.join(', '),
	    COMMAND_SET
	  ) : invariant(typeof spec === 'object'));

	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      Object.keys(spec).length === 1,
	      'Cannot have more than one key in an object with %s',
	      COMMAND_SET
	    ) : invariant(Object.keys(spec).length === 1));

	    return spec[COMMAND_SET];
	  }

	  var nextValue = shallowCopy(value);

	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    ("production" !== process.env.NODE_ENV ? invariant(
	      mergeObj && typeof mergeObj === 'object',
	      'update(): %s expects a spec of type \'object\'; got %s',
	      COMMAND_MERGE,
	      mergeObj
	    ) : invariant(mergeObj && typeof mergeObj === 'object'));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      nextValue && typeof nextValue === 'object',
	      'update(): %s expects a target of type \'object\'; got %s',
	      COMMAND_MERGE,
	      nextValue
	    ) : invariant(nextValue && typeof nextValue === 'object'));
	    assign(nextValue, spec[COMMAND_MERGE]);
	  }

	  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function(item) {
	      nextValue.push(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function(item) {
	      nextValue.unshift(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      Array.isArray(value),
	      'Expected %s target to be an array; got %s',
	      COMMAND_SPLICE,
	      value
	    ) : invariant(Array.isArray(value)));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      Array.isArray(spec[COMMAND_SPLICE]),
	      'update(): expected spec of %s to be an array of arrays; got %s. ' +
	      'Did you forget to wrap your parameters in an array?',
	      COMMAND_SPLICE,
	      spec[COMMAND_SPLICE]
	    ) : invariant(Array.isArray(spec[COMMAND_SPLICE])));
	    spec[COMMAND_SPLICE].forEach(function(args) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        Array.isArray(args),
	        'update(): expected spec of %s to be an array of arrays; got %s. ' +
	        'Did you forget to wrap your parameters in an array?',
	        COMMAND_SPLICE,
	        spec[COMMAND_SPLICE]
	      ) : invariant(Array.isArray(args)));
	      nextValue.splice.apply(nextValue, args);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      typeof spec[COMMAND_APPLY] === 'function',
	      'update(): expected spec of %s to be a function; got %s.',
	      COMMAND_APPLY,
	      spec[COMMAND_APPLY]
	    ) : invariant(typeof spec[COMMAND_APPLY] === 'function'));
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }

	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }

	  return nextValue;
	}

	module.exports = update;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactTestUtils
	 */

	'use strict';

	var EventConstants = __webpack_require__(8);
	var EventPluginHub = __webpack_require__(72);
	var EventPropagators = __webpack_require__(96);
	var React = __webpack_require__(5);
	var ReactElement = __webpack_require__(14);
	var ReactEmptyComponent = __webpack_require__(79);
	var ReactBrowserEventEmitter = __webpack_require__(71);
	var ReactCompositeComponent = __webpack_require__(87);
	var ReactInstanceHandles = __webpack_require__(23);
	var ReactInstanceMap = __webpack_require__(39);
	var ReactMount = __webpack_require__(70);
	var ReactUpdates = __webpack_require__(27);
	var SyntheticEvent = __webpack_require__(100);

	var assign = __webpack_require__(16);

	var topLevelTypes = EventConstants.topLevelTypes;

	function Event(suffix) {}

	/**
	 * @class ReactTestUtils
	 */

	/**
	 * Todo: Support the entire DOM.scry query syntax. For now, these simple
	 * utilities will suffice for testing purposes.
	 * @lends ReactTestUtils
	 */
	var ReactTestUtils = {
	  renderIntoDocument: function(instance) {
	    var div = document.createElement('div');
	    // None of our tests actually require attaching the container to the
	    // DOM, and doing so creates a mess that we rely on test isolation to
	    // clean up, so we're going to stop honoring the name of this method
	    // (and probably rename it eventually) if no problems arise.
	    // document.documentElement.appendChild(div);
	    return React.render(instance, div);
	  },

	  isElement: function(element) {
	    return ReactElement.isValidElement(element);
	  },

	  isElementOfType: function(inst, convenienceConstructor) {
	    return (
	      ReactElement.isValidElement(inst) &&
	      inst.type === convenienceConstructor
	    );
	  },

	  isDOMComponent: function(inst) {
	    // TODO: Fix this heuristic. It's just here because composites can currently
	    // pretend to be DOM components.
	    return !!(inst && inst.tagName && inst.getDOMNode);
	  },

	  isDOMComponentElement: function(inst) {
	    return !!(inst &&
	              ReactElement.isValidElement(inst) &&
	              !!inst.tagName);
	  },

	  isCompositeComponent: function(inst) {
	    return typeof inst.render === 'function' &&
	           typeof inst.setState === 'function';
	  },

	  isCompositeComponentWithType: function(inst, type) {
	    return !!(ReactTestUtils.isCompositeComponent(inst) &&
	             (inst.constructor === type));
	  },

	  isCompositeComponentElement: function(inst) {
	    if (!ReactElement.isValidElement(inst)) {
	      return false;
	    }
	    // We check the prototype of the type that will get mounted, not the
	    // instance itself. This is a future proof way of duck typing.
	    var prototype = inst.type.prototype;
	    return (
	      typeof prototype.render === 'function' &&
	      typeof prototype.setState === 'function'
	    );
	  },

	  isCompositeComponentElementWithType: function(inst, type) {
	    return !!(ReactTestUtils.isCompositeComponentElement(inst) &&
	             (inst.constructor === type));
	  },

	  getRenderedChildOfCompositeComponent: function(inst) {
	    if (!ReactTestUtils.isCompositeComponent(inst)) {
	      return null;
	    }
	    var internalInstance = ReactInstanceMap.get(inst);
	    return internalInstance._renderedComponent.getPublicInstance();
	  },

	  findAllInRenderedTree: function(inst, test) {
	    if (!inst) {
	      return [];
	    }
	    var ret = test(inst) ? [inst] : [];
	    if (ReactTestUtils.isDOMComponent(inst)) {
	      var internalInstance = ReactInstanceMap.get(inst);
	      var renderedChildren = internalInstance
	        ._renderedComponent
	        ._renderedChildren;
	      var key;
	      for (key in renderedChildren) {
	        if (!renderedChildren.hasOwnProperty(key)) {
	          continue;
	        }
	        if (!renderedChildren[key].getPublicInstance) {
	          continue;
	        }
	        ret = ret.concat(
	          ReactTestUtils.findAllInRenderedTree(
	            renderedChildren[key].getPublicInstance(),
	            test
	          )
	        );
	      }
	    } else if (ReactTestUtils.isCompositeComponent(inst)) {
	      ret = ret.concat(
	        ReactTestUtils.findAllInRenderedTree(
	          ReactTestUtils.getRenderedChildOfCompositeComponent(inst),
	          test
	        )
	      );
	    }
	    return ret;
	  },

	  /**
	   * Finds all instance of components in the rendered tree that are DOM
	   * components with the class name matching `className`.
	   * @return an array of all the matches.
	   */
	  scryRenderedDOMComponentsWithClass: function(root, className) {
	    return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
	      var instClassName = inst.props.className;
	      return ReactTestUtils.isDOMComponent(inst) && (
	        (instClassName && (' ' + instClassName + ' ').indexOf(' ' + className + ' ') !== -1)
	      );
	    });
	  },

	  /**
	   * Like scryRenderedDOMComponentsWithClass but expects there to be one result,
	   * and returns that one result, or throws exception if there is any other
	   * number of matches besides one.
	   * @return {!ReactDOMComponent} The one match.
	   */
	  findRenderedDOMComponentWithClass: function(root, className) {
	    var all =
	      ReactTestUtils.scryRenderedDOMComponentsWithClass(root, className);
	    if (all.length !== 1) {
	      throw new Error('Did not find exactly one match ' +
	        '(found: ' + all.length + ') for class:' + className
	      );
	    }
	    return all[0];
	  },


	  /**
	   * Finds all instance of components in the rendered tree that are DOM
	   * components with the tag name matching `tagName`.
	   * @return an array of all the matches.
	   */
	  scryRenderedDOMComponentsWithTag: function(root, tagName) {
	    return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
	      return ReactTestUtils.isDOMComponent(inst) &&
	            inst.tagName === tagName.toUpperCase();
	    });
	  },

	  /**
	   * Like scryRenderedDOMComponentsWithTag but expects there to be one result,
	   * and returns that one result, or throws exception if there is any other
	   * number of matches besides one.
	   * @return {!ReactDOMComponent} The one match.
	   */
	  findRenderedDOMComponentWithTag: function(root, tagName) {
	    var all = ReactTestUtils.scryRenderedDOMComponentsWithTag(root, tagName);
	    if (all.length !== 1) {
	      throw new Error('Did not find exactly one match for tag:' + tagName);
	    }
	    return all[0];
	  },


	  /**
	   * Finds all instances of components with type equal to `componentType`.
	   * @return an array of all the matches.
	   */
	  scryRenderedComponentsWithType: function(root, componentType) {
	    return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
	      return ReactTestUtils.isCompositeComponentWithType(
	        inst,
	        componentType
	      );
	    });
	  },

	  /**
	   * Same as `scryRenderedComponentsWithType` but expects there to be one result
	   * and returns that one result, or throws exception if there is any other
	   * number of matches besides one.
	   * @return {!ReactComponent} The one match.
	   */
	  findRenderedComponentWithType: function(root, componentType) {
	    var all = ReactTestUtils.scryRenderedComponentsWithType(
	      root,
	      componentType
	    );
	    if (all.length !== 1) {
	      throw new Error(
	        'Did not find exactly one match for componentType:' + componentType
	      );
	    }
	    return all[0];
	  },

	  /**
	   * Pass a mocked component module to this method to augment it with
	   * useful methods that allow it to be used as a dummy React component.
	   * Instead of rendering as usual, the component will become a simple
	   * <div> containing any provided children.
	   *
	   * @param {object} module the mock function object exported from a
	   *                        module that defines the component to be mocked
	   * @param {?string} mockTagName optional dummy root tag name to return
	   *                              from render method (overrides
	   *                              module.mockTagName if provided)
	   * @return {object} the ReactTestUtils object (for chaining)
	   */
	  mockComponent: function(module, mockTagName) {
	    mockTagName = mockTagName || module.mockTagName || "div";

	    module.prototype.render.mockImplementation(function() {
	      return React.createElement(
	        mockTagName,
	        null,
	        this.props.children
	      );
	    });

	    return this;
	  },

	  /**
	   * Simulates a top level event being dispatched from a raw event that occured
	   * on an `Element` node.
	   * @param topLevelType {Object} A type from `EventConstants.topLevelTypes`
	   * @param {!Element} node The dom to simulate an event occurring on.
	   * @param {?Event} fakeNativeEvent Fake native event to use in SyntheticEvent.
	   */
	  simulateNativeEventOnNode: function(topLevelType, node, fakeNativeEvent) {
	    fakeNativeEvent.target = node;
	    ReactBrowserEventEmitter.ReactEventListener.dispatchEvent(
	      topLevelType,
	      fakeNativeEvent
	    );
	  },

	  /**
	   * Simulates a top level event being dispatched from a raw event that occured
	   * on the `ReactDOMComponent` `comp`.
	   * @param topLevelType {Object} A type from `EventConstants.topLevelTypes`.
	   * @param comp {!ReactDOMComponent}
	   * @param {?Event} fakeNativeEvent Fake native event to use in SyntheticEvent.
	   */
	  simulateNativeEventOnDOMComponent: function(
	      topLevelType,
	      comp,
	      fakeNativeEvent) {
	    ReactTestUtils.simulateNativeEventOnNode(
	      topLevelType,
	      comp.getDOMNode(),
	      fakeNativeEvent
	    );
	  },

	  nativeTouchData: function(x, y) {
	    return {
	      touches: [
	        {pageX: x, pageY: y}
	      ]
	    };
	  },

	  createRenderer: function() {
	    return new ReactShallowRenderer();
	  },

	  Simulate: null,
	  SimulateNative: {}
	};

	/**
	 * @class ReactShallowRenderer
	 */
	var ReactShallowRenderer = function() {
	  this._instance = null;
	};

	ReactShallowRenderer.prototype.getRenderOutput = function() {
	  return (
	    (this._instance && this._instance._renderedComponent &&
	     this._instance._renderedComponent._renderedOutput)
	    || null
	  );
	};

	var NoopInternalComponent = function(element) {
	  this._renderedOutput = element;
	  this._currentElement = element === null || element === false ?
	    ReactEmptyComponent.emptyElement :
	    element;
	};

	NoopInternalComponent.prototype = {

	  mountComponent: function() {
	  },

	  receiveComponent: function(element) {
	    this._renderedOutput = element;
	    this._currentElement = element === null || element === false ?
	      ReactEmptyComponent.emptyElement :
	      element;
	  },

	  unmountComponent: function() {
	  }

	};

	var ShallowComponentWrapper = function() { };
	assign(
	  ShallowComponentWrapper.prototype,
	  ReactCompositeComponent.Mixin, {
	    _instantiateReactComponent: function(element) {
	      return new NoopInternalComponent(element);
	    },
	    _replaceNodeWithMarkupByID: function() {},
	    _renderValidatedComponent:
	      ReactCompositeComponent.Mixin.
	        _renderValidatedComponentWithoutOwnerOrContext
	  }
	);

	ReactShallowRenderer.prototype.render = function(element, context) {
	  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
	  this._render(element, transaction, context);
	  ReactUpdates.ReactReconcileTransaction.release(transaction);
	};

	ReactShallowRenderer.prototype.unmount = function() {
	  if (this._instance) {
	    this._instance.unmountComponent();
	  }
	};

	ReactShallowRenderer.prototype._render = function(element, transaction, context) {
	  if (!this._instance) {
	    var rootID = ReactInstanceHandles.createReactRootID();
	    var instance = new ShallowComponentWrapper(element.type);
	    instance.construct(element);

	    instance.mountComponent(rootID, transaction, context);

	    this._instance = instance;
	  } else {
	    this._instance.receiveComponent(element, transaction, context);
	  }
	};

	/**
	 * Exports:
	 *
	 * - `ReactTestUtils.Simulate.click(Element/ReactDOMComponent)`
	 * - `ReactTestUtils.Simulate.mouseMove(Element/ReactDOMComponent)`
	 * - `ReactTestUtils.Simulate.change(Element/ReactDOMComponent)`
	 * - ... (All keys from event plugin `eventTypes` objects)
	 */
	function makeSimulator(eventType) {
	  return function(domComponentOrNode, eventData) {
	    var node;
	    if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
	      node = domComponentOrNode.getDOMNode();
	    } else if (domComponentOrNode.tagName) {
	      node = domComponentOrNode;
	    }

	    var fakeNativeEvent = new Event();
	    fakeNativeEvent.target = node;
	    // We don't use SyntheticEvent.getPooled in order to not have to worry about
	    // properly destroying any properties assigned from `eventData` upon release
	    var event = new SyntheticEvent(
	      ReactBrowserEventEmitter.eventNameDispatchConfigs[eventType],
	      ReactMount.getID(node),
	      fakeNativeEvent
	    );
	    assign(event, eventData);
	    EventPropagators.accumulateTwoPhaseDispatches(event);

	    ReactUpdates.batchedUpdates(function() {
	      EventPluginHub.enqueueEvents(event);
	      EventPluginHub.processEventQueue();
	    });
	  };
	}

	function buildSimulators() {
	  ReactTestUtils.Simulate = {};

	  var eventType;
	  for (eventType in ReactBrowserEventEmitter.eventNameDispatchConfigs) {
	    /**
	     * @param {!Element || ReactDOMComponent} domComponentOrNode
	     * @param {?object} eventData Fake event data to use in SyntheticEvent.
	     */
	    ReactTestUtils.Simulate[eventType] = makeSimulator(eventType);
	  }
	}

	// Rebuild ReactTestUtils.Simulate whenever event plugins are injected
	var oldInjectEventPluginOrder = EventPluginHub.injection.injectEventPluginOrder;
	EventPluginHub.injection.injectEventPluginOrder = function() {
	  oldInjectEventPluginOrder.apply(this, arguments);
	  buildSimulators();
	};
	var oldInjectEventPlugins = EventPluginHub.injection.injectEventPluginsByName;
	EventPluginHub.injection.injectEventPluginsByName = function() {
	  oldInjectEventPlugins.apply(this, arguments);
	  buildSimulators();
	};

	buildSimulators();

	/**
	 * Exports:
	 *
	 * - `ReactTestUtils.SimulateNative.click(Element/ReactDOMComponent)`
	 * - `ReactTestUtils.SimulateNative.mouseMove(Element/ReactDOMComponent)`
	 * - `ReactTestUtils.SimulateNative.mouseIn/ReactDOMComponent)`
	 * - `ReactTestUtils.SimulateNative.mouseOut(Element/ReactDOMComponent)`
	 * - ... (All keys from `EventConstants.topLevelTypes`)
	 *
	 * Note: Top level event types are a subset of the entire set of handler types
	 * (which include a broader set of "synthetic" events). For example, onDragDone
	 * is a synthetic event. Except when testing an event plugin or React's event
	 * handling code specifically, you probably want to use ReactTestUtils.Simulate
	 * to dispatch synthetic events.
	 */

	function makeNativeSimulator(eventType) {
	  return function(domComponentOrNode, nativeEventData) {
	    var fakeNativeEvent = new Event(eventType);
	    assign(fakeNativeEvent, nativeEventData);
	    if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
	      ReactTestUtils.simulateNativeEventOnDOMComponent(
	        eventType,
	        domComponentOrNode,
	        fakeNativeEvent
	      );
	    } else if (!!domComponentOrNode.tagName) {
	      // Will allow on actual dom nodes.
	      ReactTestUtils.simulateNativeEventOnNode(
	        eventType,
	        domComponentOrNode,
	        fakeNativeEvent
	      );
	    }
	  };
	}

	var eventType;
	for (eventType in topLevelTypes) {
	  // Event type is stored as 'topClick' - we transform that to 'click'
	  var convenienceName = eventType.indexOf('top') === 0 ?
	    eventType.charAt(3).toLowerCase() + eventType.substr(4) : eventType;
	  /**
	   * @param {!Element || ReactDOMComponent} domComponentOrNode
	   * @param {?Event} nativeEventData Fake native event to use in SyntheticEvent.
	   */
	  ReactTestUtils.SimulateNative[convenienceName] =
	    makeNativeSimulator(eventType);
	}

	module.exports = ReactTestUtils;


/***/ },
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var classNames = __webpack_require__(262);

	//var ViewActions = require('../actions/ViewActions');
	var Constants = __webpack_require__(297);

	var Icon = __webpack_require__(298);
	var Mixins = __webpack_require__(393);

	var DropdownMenuItem = __webpack_require__(394);
	var DropdownMenuButton = __webpack_require__(395);

	var OutsideClickHandler = __webpack_require__(396);

	__webpack_require__(397);


	module.exports = React.createClass({

	  displayName: 'Dropdown',

	  mixins: [
	    //require('react-onclickoutside'),
	    //Mixins.toggleMenuMixin
	  ],

	  propTypes: {
	    icon: React.PropTypes.string,
	    actions: React.PropTypes.array.isRequired,
	    handleItemClick: React.PropTypes.func.isRequired,
	  },

	  getInitialState: function () {

	    return {
	      icon: this.props.icon || 'more-vert',
	      isOpen: false,
	    }
	  },

	  handleItemClick: function (item) {
	    this.props.handleItemClick(item);
	  },

	  toggleOpenClose: function (e) {
	    this.setState({isOpen: !this.state.isOpen});
	  },

	  close: function () {
	    this.setState({'isOpen': false});
	  },

	  render: function () {

	    var cssClasses = classNames({
	      'dropdown-menu': true,
	      'dropdown-menu-visible': this.state.isOpen,
	    });

	    var items = this.props.actions.filter(function (action) {
	      return !action.hasOwnProperty('iconType')
	    }).map(function (action, i) {
	      return React.createElement(DropdownMenuItem, {key: i, action: action, handleItemClick: this.handleItemClick})
	    }.bind(this));

	    var buttons = this.props.actions.filter(function (action) {
	      return action.hasOwnProperty('iconType')
	    }).map(function (action, i) {
	      return React.createElement(DropdownMenuButton, {key: i, action: action, handleItemClick: this.handleItemClick})
	    }.bind(this));

	    return (
	      React.createElement(OutsideClickHandler, {onOutsideClick: this.close}, 
	        React.createElement("div", {className: "dropdown"}, 
	          React.createElement("div", {className: "dropdown-button clickable", onClick: this.toggleOpenClose}, 
	            React.createElement(Icon, {icon: this.state.icon})
	          ), 
	          React.createElement("div", {className: cssClasses}, 
	            React.createElement("div", {className: "dropdown-menu-section"}, 
	              items
	            ), 
	            React.createElement("div", {className: "dropdown-menu-section dropdown-menu-section-buttons"}, 
	              buttons
	            )
	          )
	        )
	      )
	    );
	  }

	});


/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	var host, api;
	host = 'https://api.syncano.rocks';
	api = host + '/v1';

	module.exports = {

	  HOST: host,
	  API: api,

	  // Views constrains
	  VIEW_MODES: ['cards', 'stream'],
	  SORT_MODES: [
	      'sortByName',
	      'sortByDate',
	      'sortByFullName',
	      'sortByEmail',
	      'sortByCodeBoxName',
	      'sortByWebHookName',
	      'sortByScheduleCreateDate',
	      'sortByScheduleName',
	      'sortByTriggerName',
	      'sortByTriggerCreateDate',
	      'sortByAPIKeyDescription',
	      'sortByAPIKeyCreationDate',
	      'sortByClassCreateDate',
	      'sortByClassName'

	  ],

	  VIEW_ACTIONS_MAP: {
	      sortByName: 'id',
	      sortByDate: 'data.created_at',
	      switchToListView: 'stream',
	      switchToCardView: 'cards',
	      sortByFullName: 'fullname',
	      sortByEmail: 'data.email',
	      sortByCodeBoxName: 'data.name',
	      sortByWebHookName: 'data.slug',
	      sortByScheduleCreateDate: 'data.created_at',
	      sortByScheduleName: 'data.name',
	      sortByTriggerName: 'data.name',
	      sortByTriggerCreateDate: 'data.created_at',
	      sortByAPIKeyCreationDate: 'data.created_at',
	      sortByAPIKeyDescription: 'data.description',
	      sortByClassCreateDate: 'data.created_at',
	      sortByClassName: 'data.name'
	  }
	};


/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var IconStore = __webpack_require__(299);

	module.exports = React.createClass({

	  displayName: 'Icon',

	  propTypes: {
	    icon: React.PropTypes.oneOf(IconStore.getAllIcons()),
	    glowing: React.PropTypes.bool,
	    style: React.PropTypes.object,
	  },

	  getInitialState: function () {
	    var defaultStyle = {
	      width: '20px',
	      height: '20px',
	    };
	    var propsStyle = this.props.style || {};
	    var mergedStyles = propsStyle;

	    for (var attrname in defaultStyle) {
	      if (!mergedStyles.hasOwnProperty(attrname)) {
	        mergedStyles[attrname] = defaultStyle[attrname];
	      }
	    }

	    return {
	      style: mergedStyles
	    }
	  },

	  render: function () {

	    if (this.props.glowing) {
	      var klass = "glowing";
	    }

	    if (this.props.icon) {
	      var svg = __webpack_require__(300)("./" + this.props.icon);
	      return React.createElement("i", {dangerouslySetInnerHTML: {__html: svg}, style: this.state.style, className: klass});

	    } else {
	      return React.createElement("i", {style: this.state.style, className: klass});
	    }
	  }
	});

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	var allIcons = [
	  "accessibility",
	  "account-child",
	  "account-circle",
	  "airplanemode-on",
	  "arrow-back",
	  "autorenew",
	  "av-timer",
	  "bug-report",
	  "cached",
	  "call-split",
	  "call",
	  "cart",
	  "checkbox-blank",
	  "checkbox-marked",
	  "close",
	  "cloud",
	  "color-lens",
	  "credit-card",
	  "devices",
	  "directions-car",
	  "directions-subway",
	  "done",
	  "email",
	  "event",
	  "facebook",
	  "favorite",
	  "flag",
	  "folder",
	  "get-app",
	  "github",
	  "golang",
	  "google",
	  "grade",
	  "group-add",
	  "home",
	  "inbox",
	  "keyboard-arrow-down",
	  "keyboard-arrow-left",
	  "keyboard-arrow-right",
	  "keyboard-arrow-up",
	  "label",
	  "layers",
	  "local-bar",
	  "local-offer",
	  "location-on",
	  "lock",
	  "map",
	  "menu-down",
	  "menu",
	  "more-horiz",
	  "more-vert",
	  "nodejs",
	  "notifications-none",
	  "notifications",
	  "person-add",
	  "phone-android",
	  "play-arrow",
	  "playlist-add",
	  "plus",
	  "publ",
	  "python",
	  "query-builder",
	  "question-answer",
	  "room",
	  "ruby",
	  "school",
	  "search",
	  "settings-backup-restore",
	  "share",
	  "shopping-cart",
	  "sync",
	  "sync-problem",
	  "system-update-tv",
	  "terminal",
	  "theaters",
	  "twitter",
	  "unfold-less",
	  "unfold-more",
	  "videocam",
	  "view-module",
	  "view-stream",
	  "vpn-key",
	  "warning",
	  "webhooks",
	  "whatshot",
	  "work",
	];

	var iconPickerIcons = [
	  "accessibility",
	  "account-child",
	  "airplanemode-on",
	  "autorenew",
	  "bug-report",
	  "call",
	  "cloud",
	  "color-lens",
	  "credit-card",
	  "devices",
	  "directions-car",
	  "directions-subway",
	  "email",
	  "event",
	  "favorite",
	  "flag",
	  "folder",
	  "get-app",
	  "grade",
	  "home",
	  "inbox",
	  "label",
	  "layers",
	  "local-bar",
	  "local-offer",
	  "lock",
	  "map",
	  "phone-android",
	  "publ",
	  "query-builder",
	  "question-answer",
	  "room",
	  "school",
	  "share",
	  "shopping-cart",
	  "theaters",
	  "videocam",
	  "vpn-key",
	  "whatshot",
	  "work",
	];

	var IconStore = {

	  getAllIcons: function() {
	    return allIcons;
	  },

	  getIconPickerIcons: function() {
	    return iconPickerIcons;
	  },

	  contains: function(string) {
	    return allIcons.indexOf(string) !== -1;
	  },

	};

	module.exports = IconStore;

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./accessibility": 301,
		"./accessibility.svg": 301,
		"./account-child": 302,
		"./account-child.svg": 302,
		"./account-circle": 303,
		"./account-circle.svg": 303,
		"./airplanemode-on": 304,
		"./airplanemode-on.svg": 304,
		"./arrow-back": 305,
		"./arrow-back.svg": 305,
		"./arrow_down": 306,
		"./arrow_down.svg": 306,
		"./arrow_up": 307,
		"./arrow_up.svg": 307,
		"./autorenew": 308,
		"./autorenew.svg": 308,
		"./av-timer": 309,
		"./av-timer.svg": 309,
		"./bug-report": 310,
		"./bug-report.svg": 310,
		"./cached": 311,
		"./cached.svg": 311,
		"./call": 312,
		"./call-split": 313,
		"./call-split.svg": 313,
		"./call.svg": 312,
		"./cart": 314,
		"./cart.svg": 314,
		"./checkbox-blank": 315,
		"./checkbox-blank.svg": 315,
		"./checkbox-marked": 316,
		"./checkbox-marked.svg": 316,
		"./close": 317,
		"./close.svg": 317,
		"./cloud": 318,
		"./cloud.svg": 318,
		"./color-lens": 319,
		"./color-lens.svg": 319,
		"./credit-card": 320,
		"./credit-card.svg": 320,
		"./devices": 321,
		"./devices.svg": 321,
		"./directions-car": 322,
		"./directions-car.svg": 322,
		"./directions-subway": 323,
		"./directions-subway.svg": 323,
		"./done": 324,
		"./done.svg": 324,
		"./email": 325,
		"./email.svg": 325,
		"./error": 326,
		"./error.svg": 326,
		"./event": 327,
		"./event.svg": 327,
		"./facebook": 328,
		"./facebook.svg": 328,
		"./favorite": 329,
		"./favorite.svg": 329,
		"./flag": 330,
		"./flag.svg": 330,
		"./folder": 331,
		"./folder.svg": 331,
		"./get-app": 332,
		"./get-app.svg": 332,
		"./github": 333,
		"./github.svg": 333,
		"./golang": 334,
		"./golang.svg": 334,
		"./google": 335,
		"./google.svg": 335,
		"./grade": 336,
		"./grade.svg": 336,
		"./group-add": 337,
		"./group-add.svg": 337,
		"./home": 338,
		"./home.svg": 338,
		"./inbox": 339,
		"./inbox.svg": 339,
		"./info": 340,
		"./info.svg": 340,
		"./keyboard-arrow-down": 341,
		"./keyboard-arrow-down.svg": 341,
		"./keyboard-arrow-left": 342,
		"./keyboard-arrow-left.svg": 342,
		"./keyboard-arrow-right": 343,
		"./keyboard-arrow-right.svg": 343,
		"./keyboard-arrow-up": 344,
		"./keyboard-arrow-up.svg": 344,
		"./label": 345,
		"./label.svg": 345,
		"./layers": 346,
		"./layers.svg": 346,
		"./local-bar": 347,
		"./local-bar.svg": 347,
		"./local-offer": 348,
		"./local-offer.svg": 348,
		"./location-on": 349,
		"./location-on.svg": 349,
		"./lock": 350,
		"./lock.svg": 350,
		"./map": 351,
		"./map.svg": 351,
		"./menu": 352,
		"./menu-down": 353,
		"./menu-down.svg": 353,
		"./menu.svg": 352,
		"./more-horiz": 354,
		"./more-horiz.svg": 354,
		"./more-vert": 355,
		"./more-vert.svg": 355,
		"./navigate_after": 356,
		"./navigate_after.svg": 356,
		"./navigate_before": 357,
		"./navigate_before.svg": 357,
		"./nodejs": 358,
		"./nodejs.svg": 358,
		"./notifications": 359,
		"./notifications-none": 360,
		"./notifications-none.svg": 360,
		"./notifications.svg": 359,
		"./person-add": 361,
		"./person-add.svg": 361,
		"./phone-android": 362,
		"./phone-android.svg": 362,
		"./play-arrow": 363,
		"./play-arrow.svg": 363,
		"./playlist-add": 364,
		"./playlist-add.svg": 364,
		"./plus": 365,
		"./plus.svg": 365,
		"./publ": 366,
		"./publ.svg": 366,
		"./python": 367,
		"./python.svg": 367,
		"./query-builder": 368,
		"./query-builder.svg": 368,
		"./question-answer": 369,
		"./question-answer.svg": 369,
		"./room": 370,
		"./room.svg": 370,
		"./ruby": 371,
		"./ruby.svg": 371,
		"./school": 372,
		"./school.svg": 372,
		"./search": 373,
		"./search.svg": 373,
		"./settings-backup-restore": 374,
		"./settings-backup-restore.svg": 374,
		"./share": 375,
		"./share.svg": 375,
		"./shopping-cart": 376,
		"./shopping-cart.svg": 376,
		"./sync": 377,
		"./sync-problem": 378,
		"./sync-problem.svg": 378,
		"./sync.svg": 377,
		"./system-update-tv": 379,
		"./system-update-tv.svg": 379,
		"./terminal": 380,
		"./terminal.svg": 380,
		"./theaters": 381,
		"./theaters.svg": 381,
		"./twitter": 382,
		"./twitter.svg": 382,
		"./unfold-less": 383,
		"./unfold-less.svg": 383,
		"./unfold-more": 384,
		"./unfold-more.svg": 384,
		"./videocam": 385,
		"./videocam.svg": 385,
		"./view-module": 386,
		"./view-module.svg": 386,
		"./view-stream": 387,
		"./view-stream.svg": 387,
		"./vpn-key": 388,
		"./vpn-key.svg": 388,
		"./warning": 389,
		"./warning.svg": 389,
		"./webhooks": 390,
		"./webhooks.svg": 390,
		"./whatshot": 391,
		"./whatshot.svg": 391,
		"./work": 392,
		"./work.svg": 392
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 300;


/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M12 2c1.105 0 2 0.895 2 2s-0.895 2-2 2-2-0.895-2-2 0.895-2 2-2zM21 9h-6v13h-2v-6h-2v6h-2v-13h-6v-2h18v2z\"></path>\n</svg>\n"

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M16.5 12c1.38 0 2.49-1.12 2.49-2.5s-1.11-2.5-2.49-2.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5zM9 11c1.655 0 2.99-1.345 2.99-3s-1.335-3-2.99-3c-1.655 0-3 1.345-3 3s1.345 3 3 3zM16.5 14c-1.835 0-5.5 0.92-5.5 2.75v2.25h11v-2.25c0-1.83-3.665-2.75-5.5-2.75zM9 13c-2.335 0-7 1.17-7 3.5v2.5h7v-2.25c0-0.85 0.335-2.335 2.37-3.47-0.87-0.185-1.715-0.28-2.37-0.28z\"></path>\n</svg>\n"

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M12 2c-5.525 0-10 4.475-10 10s4.475 10 10 10 10-4.475 10-10-4.475-10-10-10zM12 5c1.655 0 3 1.345 3 3 0 1.66-1.345 3-3 3s-3-1.34-3-3c0-1.655 1.345-3 3-3zM12 19.2c-2.505 0-4.705-1.28-6-3.22 0.025-1.985 4.005-3.080 6-3.080s5.97 1.095 6 3.080c-1.295 1.94-3.495 3.22-6 3.22z\"></path>\n</svg>\n"

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M21 16v-2l-8-5v-5.5c0-0.83-0.67-1.5-1.5-1.5s-1.5 0.67-1.5 1.5v5.5l-8 5v2l8-2.5v5.5l-2 1.5v1.5l3.5-1 3.5 1v-1.5l-2-1.5v-5.5l8 2.5z\"></path>\n</svg>\n"

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M20 11h-12.17l5.585-5.585-1.415-1.415-8 8 8 8 1.415-1.415-5.585-5.585h12.17v-2z\"></path>\n</svg>\n"

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n    <path d=\"M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z\"/>\n</svg>\n"

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n    <path d=\"M7.41 15.41l4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z\"/>\n</svg>\n"

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57 0.46 3.025 1.24 4.26l1.46-1.46c-0.445-0.835-0.7-1.785-0.7-2.8 0-3.315 2.685-6 6-6zM18.76 7.74l-1.46 1.46c0.445 0.835 0.7 1.785 0.7 2.8 0 3.315-2.685 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-0.46-3.025-1.24-4.26z\"></path>\n</svg>\n"

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M11 17c0 0.55 0.45 1 1 1s1-0.45 1-1-0.45-1-1-1-1 0.45-1 1zM11 3v4h2v-1.92c3.39 0.485 6 3.395 6 6.92 0 3.865-3.135 7-7 7s-7-3.135-7-7c0-1.68 0.59-3.215 1.575-4.425l5.425 5.425 1.415-1.415-6.8-6.8-0.010 0.020c-2.185 1.64-3.605 4.25-3.605 7.195 0 4.97 4.020 9 8.995 9s9.005-4.030 9.005-9-4.030-9-9.005-9h-0.995zM18 12c0-0.55-0.45-1-1-1s-1 0.45-1 1 0.45 1 1 1 1-0.45 1-1zM6 12c0 0.55 0.45 1 1 1s1-0.45 1-1-0.45-1-1-1-1 0.45-1 1z\"></path>\n</svg>\n"

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M20 8h-2.81c-0.45-0.78-1.070-1.455-1.815-1.96l1.625-1.625-1.415-1.415-2.175 2.175c-0.45-0.11-0.925-0.175-1.41-0.175s-0.96 0.065-1.41 0.175l-2.175-2.175-1.415 1.415 1.625 1.625c-0.745 0.505-1.365 1.18-1.815 1.96h-2.81v2h2.090c-0.055 0.325-0.090 0.66-0.090 1v1h-2v2h2v1c0 0.34 0.035 0.675 0.090 1h-2.090v2h2.81c1.035 1.79 2.97 3 5.19 3s4.155-1.21 5.19-3h2.81v-2h-2.090c0.055-0.325 0.090-0.66 0.090-1v-1h2v-2h-2v-1c0-0.34-0.035-0.675-0.090-1h2.090v-2zM14 16h-4v-2h4v2zM14 12h-4v-2h4v2z\"></path>\n</svg>\n"

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M19 8l-4 4h3c0 3.315-2.685 6-6 6-1.015 0-1.965-0.255-2.805-0.695l-1.46 1.46c1.24 0.775 2.695 1.235 4.265 1.235 4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.315 2.685-6 6-6 1.015 0 1.965 0.255 2.805 0.695l1.46-1.46c-1.24-0.775-2.695-1.235-4.265-1.235-4.42 0-8 3.58-8 8h-3l4 4 4-4h-3z\"></path>\n</svg>\n"

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M6.625 10.795c1.44 2.83 3.755 5.145 6.59 6.585l2.2-2.205c0.275-0.275 0.67-0.355 1.015-0.245 1.12 0.37 2.325 0.57 3.57 0.57 0.555 0 1 0.445 1 1v3.5c0 0.555-0.445 1-1 1-9.39 0-17-7.61-17-17 0-0.555 0.45-1 1-1h3.5c0.555 0 1 0.445 1 1 0 1.245 0.2 2.45 0.57 3.57 0.11 0.345 0.030 0.74-0.245 1.015l-2.2 2.21z\"></path>\n</svg>\n"

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M14 4l2.295 2.295-2.88 2.875 1.415 1.415 2.875-2.88 2.295 2.295v-6zM10 4h-6v6l2.295-2.295 4.705 4.71v7.585h2v-8.415l-5.295-5.29z\"></path>\n</svg>\n"

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M7 18c-1.105 0-1.99 0.895-1.99 2s0.885 2 1.99 2 2-0.895 2-2-0.895-2-2-2zM1 2v2h2l3.595 7.585-1.35 2.45c-0.155 0.29-0.245 0.615-0.245 0.965 0 1.105 0.895 2 2 2h12v-2h-11.575c-0.14 0-0.25-0.11-0.25-0.25 0-0.045 0.010-0.085 0.030-0.12l0.895-1.63h7.45c0.75 0 1.405-0.415 1.75-1.030l3.575-6.49c0.080-0.14 0.125-0.305 0.125-0.48 0-0.555-0.45-1-1-1h-14.785l-0.95-2h-3.265zM17 18c-1.105 0-1.99 0.895-1.99 2s0.885 2 1.99 2 2-0.895 2-2-0.895-2-2-2z\"></path>\n</svg>"

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z\" />\n</svg>"

/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z\" />\n</svg>"

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M19 6.415l-1.415-1.415-5.585 5.585-5.585-5.585-1.415 1.415 5.585 5.585-5.585 5.585 1.415 1.415 5.585-5.585 5.585 5.585 1.415-1.415-5.585-5.585z\"></path>\n</svg>\n"

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M19.355 10.035c-0.68-3.44-3.715-6.035-7.355-6.035-2.89 0-5.395 1.64-6.65 4.035-3.005 0.325-5.35 2.87-5.35 5.965 0 3.315 2.685 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.055-4.78-4.645-4.965z\"></path>\n</svg>\n"

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M12 3c-4.97 0-9 4.030-9 9s4.030 9 9 9c0.83 0 1.5-0.67 1.5-1.5 0-0.39-0.145-0.74-0.39-1.005-0.235-0.265-0.375-0.61-0.375-0.995 0-0.83 0.67-1.5 1.5-1.5h1.765c2.76 0 5-2.24 5-5 0-4.42-4.030-8-9-8zM6.5 12c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5zM9.5 8c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5zM14.5 8c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5zM17.5 12c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5z\"></path>\n</svg>\n"

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M20 4h-16c-1.105 0-1.99 0.895-1.99 2l-0.010 12c0 1.105 0.895 2 2 2h16c1.105 0 2-0.895 2-2v-12c0-1.105-0.895-2-2-2zM20 18h-16v-6h16v6zM20 8h-16v-2h16v2z\"></path>\n</svg>\n"

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M4 6h18v-2h-18c-1.105 0-2 0.895-2 2v11h-2v3h14v-3h-10v-11zM23 8h-6c-0.55 0-1 0.45-1 1v10c0 0.55 0.45 1 1 1h6c0.55 0 1-0.45 1-1v-10c0-0.55-0.45-1-1-1zM22 17h-4v-7h4v7z\"></path>\n</svg>\n"

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M18.92 6.010c-0.205-0.59-0.765-1.010-1.42-1.010h-11c-0.655 0-1.215 0.42-1.42 1.010l-2.080 5.99v8c0 0.55 0.45 1 1 1h1c0.555 0 1-0.45 1-1v-1h12v1c0 0.55 0.45 1 1 1h1c0.555 0 1-0.45 1-1v-8l-2.080-5.99zM6.5 16c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5zM17.5 16c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5zM5 11l1.5-4.5h11l1.5 4.5h-14z\"></path>\n</svg>\n"

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M12 2c-4.42 0-8 0.5-8 4v9.5c0 1.935 1.57 3.5 3.5 3.5l-1.5 1.5v0.5h12v-0.5l-1.5-1.5c1.935 0 3.5-1.565 3.5-3.5v-9.5c0-3.5-3.58-4-8-4zM7.5 17c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5zM11 11h-5v-5h5v5zM16.5 17c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5zM18 11h-5v-5h5v5z\"></path>\n</svg>\n"

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M9 16.17l-4.17-4.17-1.415 1.415 5.585 5.585 12-12-1.415-1.415z\"></path>\n</svg>\n"

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M20 4h-16c-1.105 0-1.99 0.895-1.99 2l-0.010 12c0 1.105 0.895 2 2 2h16c1.105 0 2-0.895 2-2v-12c0-1.105-0.895-2-2-2zM20 8l-8 5-8-5v-2l8 5 8-5v2z\"></path>\n</svg>\n"

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 22 23\">\n    <path d=\"M11,0.03 C4.9225,0.03 0,4.9525 0,11.03 C0,17.1075 4.9225,22.03 11,22.03 C17.0775,22.03 22,17.1075 22,11.03 C22,4.9525 17.0775,0.03 11,0.03 L11,0.03 Z M12.375,16.48875 L9.625,16.48875 L9.625,13.73875 L12.375,13.73875 L12.375,16.48875 L12.375,16.48875 Z M12.375,12.36375 L9.625,12.36375 L9.625,5.48875 L12.375,5.48875 L12.375,12.36375 L12.375,12.36375 Z\">\n    </path>\n</svg>"

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M17 12h-5v5h5v-5zM16 1v2h-8v-2h-2v2h-1c-1.105 0-1.99 0.895-1.99 2l-0.010 14c0 1.105 0.895 2 2 2h14c1.105 0 2-0.895 2-2v-14c0-1.105-0.895-2-2-2h-1v-2h-2zM19 19h-14v-11h14v11z\"></path>\n</svg>\n"

/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 16 28\">\n  <path d=\"M14.984 0.187v4.125h-2.453q-1.344 0-1.813 0.562t-0.469 1.687v2.953h4.578l-0.609 4.625h-3.969v11.859h-4.781v-11.859h-3.984v-4.625h3.984v-3.406q0-2.906 1.625-4.508t4.328-1.602q2.297 0 3.563 0.187z\"></path>\n</svg>\n"

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M12 21.35l-1.45-1.315c-5.15-4.675-8.55-7.76-8.55-11.535 0-3.085 2.415-5.5 5.5-5.5 1.74 0 3.41 0.81 4.5 2.085 1.090-1.275 2.76-2.085 4.5-2.085 3.085 0 5.5 2.415 5.5 5.5 0 3.775-3.4 6.86-8.55 11.535l-1.45 1.315z\"></path>\n</svg>\n"

/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M14.4 6l-0.4-2h-9v17h2v-7h5.6l0.4 2h7v-10z\"></path>\n</svg>\n"

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M10 4h-6c-1.105 0-1.99 0.895-1.99 2l-0.010 12c0 1.105 0.895 2 2 2h16c1.105 0 2-0.895 2-2v-10c0-1.105-0.895-2-2-2h-8l-2-2z\"></path>\n</svg>\n"

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M19 9h-4v-6h-6v6h-4l7 7 7-7zM5 18v2h14v-2h-14z\"></path>\n</svg>\n"

/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 64 64\">\n  <path d=\"M0 32q0-7.464 3.679-13.768t9.982-9.982 13.768-3.679 13.768 3.679 9.982 9.982 3.679 13.768q0 8.964-5.232 16.125t-13.518 9.911q-0.964 0.179-1.411-0.25t-0.446-1.071v-7.536q0-3.464-1.857-5.071 2.036-0.214 3.661-0.643t3.357-1.393 2.893-2.375 1.893-3.75 0.732-5.375q0-4.321-2.821-7.357 1.321-3.25-0.286-7.286-1-0.321-2.893 0.393t-3.286 1.571l-1.357 0.857q-3.321-0.929-6.857-0.929t-6.857 0.929q-0.571-0.393-1.518-0.964t-2.982-1.375-3.071-0.482q-1.571 4.036-0.25 7.286-2.821 3.036-2.821 7.357 0 3.036 0.732 5.357t1.875 3.75 2.875 2.393 3.357 1.393 3.661 0.643q-1.429 1.286-1.75 3.679-0.75 0.357-1.607 0.536t-2.036 0.179-2.339-0.768-1.982-2.232q-0.679-1.143-1.732-1.857t-1.768-0.857l-0.714-0.107q-0.75 0-1.036 0.161t-0.179 0.411 0.321 0.5 0.464 0.429l0.25 0.179q0.786 0.357 1.554 1.357t1.125 1.821l0.357 0.821q0.464 1.357 1.571 2.196t2.393 1.071 2.482 0.25 1.982-0.125l0.821-0.143q0 1.357 0.018 3.179t0.018 1.929q0 0.643-0.464 1.071t-1.429 0.25q-8.286-2.75-13.518-9.911t-5.232-16.125z\"></path>\n</svg>"

/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 60 60\" enable-background=\"new 0 0 60 60\">\n  <path d=\"M34.071 27.201c2.249 0 4.072-1.823 4.072-4.071v-6.701s-.014-2.728-1.357-4.071c-1.371-1.371-5.429-1.357-5.429-1.357h-6.786s-2.727.698-4.071 2.714c-1.37 2.055-1.357 5.428-1.357 5.428h10.178c.375 0 .679.304.679.679s-.304.679-.679.679h-11.536s-6.786-.085-6.786 9.5l5.429 9.5v-5.513c0-3.748 3.038-6.786 6.786-6.786h10.857zm-10.56-10.179c-.913 0-1.654-.741-1.654-1.654s.741-1.654 1.654-1.654c.913 0 1.654.741 1.654 1.654s-.741 1.654-1.654 1.654zm20.06 3.478v5.428c0 3.748-3.038 6.786-6.786 6.786h-10.857c-2.249 0-4.072 1.823-4.072 4.071v6.786s.014 2.728 1.357 4.071c1.371 1.371 4.071 1.357 4.071 1.357h8.143s2.727-.698 4.071-2.714c1.37-2.055 1.357-5.429 1.357-5.429h-10.178c-.375 0-.679-.304-.679-.679 0-.375.304-.678.679-.678h11.536s6.786.085 6.786-9.5l-5.429-9.5zm-7.083 22.478c.913 0 1.654.741 1.654 1.654 0 .913-.741 1.654-1.654 1.654-.913 0-1.654-.741-1.654-1.654 0-.913.741-1.654 1.654-1.654z\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"/>\n</svg>\n"

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 64 64\">\n  <path d=\"M3.964 48.357q0-2.893 1.589-5.357t4.232-4.107q4.679-2.929 14.429-3.571-1.143-1.464-1.696-2.625t-0.554-2.625q0-1.429 0.75-3.036-1.643 0.143-2.429 0.143-5.286 0-8.911-3.446t-3.625-8.732q0-2.929 1.286-5.679t3.536-4.679q2.714-2.357 6.5-3.5t7.786-1.143h14.893l-4.893 3.143h-4.714q2.679 2.25 4.036 4.75t1.357 5.714q0 2.571-0.875 4.625t-2.125 3.321-2.482 2.321-2.107 2.196-0.875 2.357q0 1.286 1.143 2.518t2.75 2.429 3.232 2.625 2.768 3.714 1.143 5.071q0 3.25-1.75 6.179-2.536 4.357-7.482 6.411t-10.661 2.054q-4.714 0-8.804-1.482t-6.161-4.911q-1.286-2.107-1.286-4.679zM10.607 46.714q0 2 0.839 3.643t2.179 2.696 3.107 1.786 3.571 1.036 3.625 0.304q2.071 0 3.982-0.464t3.536-1.393 2.607-2.607 0.982-3.893q0-0.893-0.25-1.75t-0.518-1.5-0.964-1.482-1.054-1.25-1.375-1.232-1.304-1.036-1.482-1.071-1.304-0.929q-0.571-0.071-1.75-0.071-1.893 0-3.732 0.25t-3.821 0.893-3.464 1.643-2.446 2.661-0.964 3.768zM14.393 11.214q0 1.643 0.357 3.482t1.125 3.679 1.857 3.304 2.679 2.393 3.446 0.929q1.321 0 2.768-0.589t2.339-1.554q1.893-2 1.893-5.679 0-2.107-0.607-4.482t-1.714-4.607-3-3.696-4.179-1.464q-1.5 0-2.946 0.696t-2.375 1.875q-1.643 2.107-1.643 5.714z\"></path>\n</svg>\n"

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M12 17.27l6.18 3.73-1.635-7.030 5.455-4.725-7.19-0.62-2.81-6.625-2.81 6.625-7.19 0.62 5.455 4.725-1.635 7.030z\"></path>\n</svg>\n"

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M8 10h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2zM18 11c1.655 0 2.99-1.345 2.99-3s-1.335-3-2.99-3c-0.32 0-0.625 0.050-0.915 0.145 0.565 0.81 0.905 1.795 0.905 2.855s-0.34 2.045-0.905 2.855c0.29 0.095 0.595 0.145 0.915 0.145zM13 11c1.655 0 2.99-1.345 2.99-3s-1.335-3-2.99-3c-1.655 0-3 1.345-3 3s1.345 3 3 3zM19.62 13.16c0.83 0.725 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.375-2.485-4.38-2.84zM13 13c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z\"></path>\n</svg>\n"

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M10 20v-6h4v6h5v-8h3l-10-9-10 9h3v8z\"></path>\n</svg>\n"

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M19 3h-14.010c-1.105 0-1.98 0.895-1.98 2l-0.010 14c0 1.105 0.885 2 1.99 2h14.010c1.105 0 2-0.895 2-2v-14c0-1.105-0.895-2-2-2zM19 15h-4c0 1.655-1.345 3-3 3s-3-1.345-3-3h-4.010v-10h14.010v10zM16 10h-2v-3h-4v3h-2l4 4 4-4z\"></path>\n</svg>\n"

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 22 22\">\n    <path d=\"M11,0 C4.928,0 0,4.928 0,11 C0,17.072 4.928,22 11,22 C17.072,22 22,17.072 22,11 C22,4.928 17.072,0 11,0 L11,0 Z M12.1,16.5 L9.9,16.5 L9.9,9.9 L12.1,9.9 L12.1,16.5 L12.1,16.5 Z M12.1,7.7 L9.9,7.7 L9.9,5.5 L12.1,5.5 L12.1,7.7 L12.1,7.7 Z\">\n    </path>\n</svg>"

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M7.415 8.21l4.585 4.585 4.585-4.585 1.415 1.415-6 6-6-6z\"></path>\n</svg>\n"

/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M15.415 16.335l-4.585-4.585 4.585-4.585-1.415-1.415-6 6 6 6z\"></path>\n</svg>"

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M8.585 16.46l4.585-4.585-4.585-4.585 1.415-1.415 6 6-6 6z\"></path>\n</svg>"

/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M7.415 15.415l4.585-4.585 4.585 4.585 1.415-1.415-6-6-6 6z\"></path>\n</svg>\n"

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M17.635 5.845c-0.365-0.51-0.96-0.845-1.635-0.845l-11 0.010c-1.105 0-2 0.885-2 1.99v10c0 1.105 0.895 1.99 2 1.99l11 0.010c0.675 0 1.27-0.335 1.635-0.845l4.365-6.155-4.365-6.155z\"></path>\n</svg>\n"

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M11.995 18.54l-7.375-5.735-1.62 1.26 9 7 9-7-1.63-1.265-7.375 5.74zM12 16l9-7-9-7-9 7 1.63 1.265 7.37 5.735z\"></path>\n</svg>\n"

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M11 13v6h-5v2h12v-2h-5v-6l8-8v-2h-18v2l8 8zM7.5 7l-2-2h13l-2 2h-9z\"></path>\n</svg>\n"

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M21.41 11.58l-8.995-8.995c-0.365-0.36-0.865-0.585-1.415-0.585h-7c-1.105 0-2 0.895-2 2v7c0 0.555 0.225 1.055 0.59 1.415l9 9c0.36 0.36 0.86 0.585 1.41 0.585s1.055-0.225 1.415-0.585l7-7c0.36-0.365 0.585-0.865 0.585-1.415 0-0.555-0.225-1.055-0.59-1.42zM5.5 7c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5z\"></path>\n</svg>\n"

/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M12 2c-3.865 0-7 3.135-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.865-3.135-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\"></path>\n</svg>\n"

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M18 8h-1v-2c0-2.76-2.24-5-5-5s-5 2.24-5 5v2h-1c-1.105 0-2 0.895-2 2v10c0 1.105 0.895 2 2 2h12c1.105 0 2-0.895 2-2v-10c0-1.105-0.895-2-2-2zM12 17c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM15.1 8h-6.2v-2c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z\"></path>\n</svg>\n"

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M20.5 3c-0.055 0-0.105 0.005-0.155 0.025l-5.345 2.075-6-2.1-5.635 1.9c-0.21 0.070-0.365 0.25-0.365 0.48v15.12c0 0.275 0.225 0.5 0.5 0.5 0.055 0 0.105-0.005 0.155-0.025l5.345-2.075 6 2.1 5.64-1.895c0.21-0.075 0.36-0.255 0.36-0.485v-15.12c0-0.275-0.225-0.5-0.5-0.5zM15 19l-6-2.105v-11.895l6 2.105v11.895z\"></path>\n</svg>\n"

/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M3 18h18v-2h-18v2zM3 13h18v-2h-18v2zM3 6v2h18v-2h-18z\"></path>\n</svg>"

/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M7,10L12,15L17,10H7Z\" />\n</svg>"

/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M6 10c-1.105 0-2 0.895-2 2s0.895 2 2 2 2-0.895 2-2-0.895-2-2-2zM18 10c-1.105 0-2 0.895-2 2s0.895 2 2 2 2-0.895 2-2-0.895-2-2-2zM12 10c-1.105 0-2 0.895-2 2s0.895 2 2 2 2-0.895 2-2-0.895-2-2-2z\"></path>\n</svg>\n"

/***/ },
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M12 8c1.105 0 2-0.895 2-2s-0.895-2-2-2-2 0.895-2 2 0.895 2 2 2zM12 10c-1.105 0-2 0.895-2 2s0.895 2 2 2 2-0.895 2-2-0.895-2-2-2zM12 16c-1.105 0-2 0.895-2 2s0.895 2 2 2 2-0.895 2-2-0.895-2-2-2z\"></path>\n</svg>"

/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n    <path d=\"M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z\"/>\n    <path d=\"M0 0h24v24h-24z\" fill=\"none\"/>\n</svg>\n"

/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n    <path d=\"M15.41 7.41l-1.41-1.41-6 6 6 6 1.41-1.41-4.58-4.59z\"/>\n    <path d=\"M0 0h24v24h-24z\" fill=\"none\"/>\n</svg>\n\n\n"

/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 60 60\" enable-background=\"new 0 0 60 60\">\n  <path d=\"M29.995 51.988c-.589 0-1.174-.154-1.691-.452l-5.381-3.184c-.802-.449-.411-.608-.146-.7 1.072-.373 1.289-.459 2.433-1.107.119-.068.276-.041.401.03l4.133 2.454c.15.084.361.084.5 0l16.115-9.302c.15-.086.247-.257.247-.435v-18.598c0-.182-.097-.352-.25-.444l-16.108-9.293c-.149-.087-.348-.087-.496 0l-16.105 9.296c-.156.09-.255.265-.255.441v18.598c0 .178.098.346.254.43l4.414 2.551c2.396 1.196 3.862-.215 3.862-1.631v-18.361c0-.259.209-.464.468-.464h2.043c.256 0 .467.205.467.464v18.362c0 3.196-1.742 5.03-4.772 5.03-.931 0-1.665 0-3.712-1.007l-4.226-2.434c-1.043-.602-1.69-1.731-1.69-2.938v-18.6c0-1.209.646-2.336 1.691-2.938l16.115-9.312c1.019-.577 2.375-.577 3.387 0l16.113 9.312c1.044.604 1.694 1.729 1.694 2.938v18.598c0 1.207-.649 2.331-1.694 2.938l-16.113 9.305c-.517.299-1.101.453-1.698.453zM34.972 39.175c-7.052 0-8.529-3.237-8.529-5.951 0-.259.208-.465.466-.465h2.083c.233 0 .426.169.463.394.314 2.121 1.252 3.193 5.517 3.193 3.395 0 4.84-.768 4.84-2.569 0-1.038-.409-1.809-5.686-2.327-4.409-.435-7.136-1.41-7.136-4.938 0-3.25 2.741-5.19 7.336-5.19 5.162 0 7.716 1.791 8.041 5.636.012.134-.035.261-.122.358-.089.093-.212.149-.341.149h-2.092c-.216 0-.408-.154-.452-.364-.502-2.231-1.722-2.944-5.033-2.944-3.707 0-4.138 1.292-4.138 2.258 0 1.172.508 1.513 5.513 2.176 4.953.656 7.304 1.582 7.304 5.064 0 3.51-2.927 5.52-8.034 5.52z\"/>\n</svg>"

/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M11.5 22c1.105 0 2-0.895 2-2h-4c0 1.105 0.895 2 2 2zM18 16v-5.5c0-3.075-2.135-5.64-5-6.32v-0.68c0-0.83-0.67-1.5-1.5-1.5s-1.5 0.67-1.5 1.5v0.68c-2.865 0.68-5 3.245-5 6.32v5.5l-2 2v1h17v-1l-2-2z\"></path>\n</svg>\n"

/***/ },
/* 360 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M11.5 22c1.105 0 2-0.895 2-2h-4c0 1.105 0.895 2 2 2zM18 16v-5.5c0-3.075-2.135-5.64-5-6.32v-0.68c0-0.83-0.67-1.5-1.5-1.5s-1.5 0.67-1.5 1.5v0.68c-2.865 0.68-5 3.245-5 6.32v5.5l-2 2v1h17v-1l-2-2zM16 17h-9v-6.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5v6.5z\"></path>\n</svg>\n"

/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M15 12c2.21 0 4-1.795 4-4 0-2.21-1.79-4-4-4s-4 1.79-4 4c0 2.205 1.79 4 4 4zM6 10v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3zM15 14c-2.665 0-8 1.335-8 4v2h16v-2c0-2.665-5.335-4-8-4z\"></path>\n</svg>\n"

/***/ },
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M16 1h-8c-1.655 0-3 1.345-3 3v16c0 1.655 1.345 3 3 3h8c1.655 0 3-1.345 3-3v-16c0-1.655-1.345-3-3-3zM14 21h-4v-1h4v1zM17.25 18h-10.5v-14h10.5v14z\"></path>\n</svg>\n"

/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M8 5v14l11-7z\"></path>\n</svg>"

/***/ },
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M14 10h-12v2h12v-2zM14 6h-12v2h12v-2zM18 14v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2h-8v2z\"></path>\n</svg>"

/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 64 64\">\n  <path d=\"M32 5.333q1.104 0 1.885 0.781t0.781 1.885v21.333h21.333q1.104 0 1.885 0.781t0.781 1.885-0.781 1.885-1.885 0.781h-21.333v21.333q0 1.104-0.781 1.885t-1.885 0.781-1.885-0.781-0.781-1.885v-21.333h-21.333q-1.104 0-1.885-0.781t-0.781-1.885 0.781-1.885 1.885-0.781h21.333v-21.333q0-1.104 0.781-1.885t1.885-0.781z\"></path>\n</svg>"

/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M12 2c-5.525 0-10 4.475-10 10s4.475 10 10 10 10-4.475 10-10-4.475-10-10-10zM11 19.93c-3.945-0.49-7-3.85-7-7.93 0-0.615 0.075-1.215 0.21-1.79l4.79 4.79v1c0 1.105 0.895 2 2 2v1.93zM17.895 17.395c-0.255-0.81-1.005-1.395-1.895-1.395h-1v-3c0-0.55-0.45-1-1-1h-6v-2h2c0.55 0 1-0.45 1-1v-2h2c1.105 0 2-0.895 2-2v-0.415c2.93 1.185 5 4.055 5 7.415 0 2.080-0.8 3.97-2.105 5.395z\"></path>\n</svg>\n"

/***/ },
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 60 60\" enable-background=\"new 0 0 60 60\">\n  <path d=\"M34.071 27.201c2.249 0 4.072-1.823 4.072-4.071v-6.701s-.014-2.728-1.357-4.071c-1.371-1.371-5.429-1.357-5.429-1.357h-6.786s-2.727.698-4.071 2.714c-1.37 2.055-1.357 5.428-1.357 5.428h10.178c.375 0 .679.304.679.679s-.304.679-.679.679h-11.536s-6.786-.085-6.786 9.5l5.429 9.5v-5.513c0-3.748 3.038-6.786 6.786-6.786h10.857zm-10.56-10.179c-.913 0-1.654-.741-1.654-1.654s.741-1.654 1.654-1.654c.913 0 1.654.741 1.654 1.654s-.741 1.654-1.654 1.654zm20.06 3.478v5.428c0 3.748-3.038 6.786-6.786 6.786h-10.857c-2.249 0-4.072 1.823-4.072 4.071v6.786s.014 2.728 1.357 4.071c1.371 1.371 4.071 1.357 4.071 1.357h8.143s2.727-.698 4.071-2.714c1.37-2.055 1.357-5.429 1.357-5.429h-10.178c-.375 0-.679-.304-.679-.679 0-.375.304-.678.679-.678h11.536s6.786.085 6.786-9.5l-5.429-9.5zm-7.083 22.478c.913 0 1.654.741 1.654 1.654 0 .913-.741 1.654-1.654 1.654-.913 0-1.654-.741-1.654-1.654 0-.913.741-1.654 1.654-1.654z\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"/>\n</svg>\n"

/***/ },
/* 368 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M11.995 2c-5.525 0-9.995 4.475-9.995 10s4.47 10 9.995 10c5.525 0 10.005-4.475 10.005-10s-4.48-10-10.005-10zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"></path>\n<path d=\"M12.5 7h-1.5v6l5.245 3.15 0.755-1.23-4.5-2.67z\"></path>\n</svg>\n"

/***/ },
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M21 6h-2v9h-13v2c0 0.55 0.45 1 1 1h11l4 4v-15c0-0.55-0.45-1-1-1zM17 12v-9c0-0.55-0.45-1-1-1h-13c-0.55 0-1 0.45-1 1v14l4-4h10c0.55 0 1-0.45 1-1z\"></path>\n</svg>\n"

/***/ },
/* 370 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M12 2c-3.865 0-7 3.135-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.865-3.135-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\"></path>\n</svg>\n"

/***/ },
/* 371 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 38 37\">\n  <path d=\"M35.084,35.083 L35.124,35.118 L35.096,34.927 L37.135,8.227 L37.111,8.271 C37.194,5.369 36.176,2.585 32.742,1.449 C34.56,2.161 34.845,3.564 35.332,5.628 L25.873,4.168 L35.19,11.788 L34.682,12.719 L23.002,13.5 L26.553,27.566 L26.591,27.525 L26.582,27.537 L26.939,27.854 L33.23,34.378 L17.203,34.378 C17.547,34.205 17.885,34.02 18.221,33.833 L18.234,33.858 C21.256,32.219 23.674,30.249 25.877,28.135 L26.504,27.559 L12.671,23.115 L12.671,23.117 L12.667,23.116 L22.984,13.528 L25.917,4.21 L25.855,4.166 L25.797,4.157 L31.365,1.089 L31.37,1.09 L31.372,1.089 L21.433,1.044 L21.298,0.949 L13.445,3.888 C10.971,6.189 6.17,10.743 5.997,10.828 C5.841,10.908 3.339,15.616 1.809,18.498 L1.674,18.753 L1.39,19.288 L1.428,19.394 C1.092,20.46 0.76,22.42 0.76,26.021 C0.76,27.651 0.912,29.179 1.09,30.415 C1.151,31.152 1.267,31.807 1.432,32.385 C1.556,32.985 1.647,33.335 1.647,33.335 L1.746,33.28 C3.228,36.731 6.657,36.885 8.41,36.935 L8.394,36.949 L35.081,35.138 L35.082,35.125 L35.156,35.12 L35.083,35.121 L35.084,35.083 L35.084,35.083 Z M3.478,25.223 L3.468,25.215 L3.466,25.245 L2.167,27.621 C1.817,25.481 1.573,22.895 1.782,20.401 L3.48,25.218 L3.478,25.223 L3.478,25.223 Z M8.531,36.828 L8.486,36.867 L7.853,35.389 C6.277,31.473 3.882,25.57 3.511,25.248 L3.502,25.226 L12.59,23.187 L12.667,23.115 L12.67,23.121 L8.531,36.828 L8.531,36.828 Z M34.636,31.806 L32.989,19.51 L35.802,13.804 L34.636,31.806 L34.636,31.806 Z\" id=\"Shape\"></path>\n</svg>"

/***/ },
/* 372 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M5 13.18v4l7 3.82 7-3.82v-4l-7 3.82-7-3.82zM12 3l-11 6 11 6 9-4.91v6.91h2v-8l-11-6z\"></path>\n</svg>\n"

/***/ },
/* 373 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M15.5 14h-0.795l-0.275-0.275c0.98-1.135 1.57-2.61 1.57-4.225 0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.615 0 3.090-0.59 4.225-1.565l0.275 0.275v0.79l5 4.99 1.49-1.49-4.99-5zM9.5 14c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z\"></path>\n</svg>\n"

/***/ },
/* 374 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M14 12c0-1.105-0.895-2-2-2s-2 0.895-2 2 0.895 2 2 2 2-0.895 2-2zM12 3c-4.97 0-9 4.030-9 9h-3l4 4 4-4h-3c0-3.865 3.135-7 7-7s7 3.135 7 7-3.135 7-7 7c-1.515 0-2.91-0.485-4.060-1.305l-1.415 1.435c1.52 1.17 3.415 1.87 5.475 1.87 4.97 0 9-4.030 9-9s-4.030-9-9-9z\"></path>\n</svg>\n"

/***/ },
/* 375 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M18 16.085c-0.76 0-1.445 0.295-1.965 0.77l-7.125-4.155c0.055-0.225 0.090-0.46 0.090-0.7s-0.035-0.475-0.090-0.7l7.050-4.115c0.535 0.5 1.25 0.81 2.040 0.81 1.655 0 3-1.345 3-3s-1.345-3-3-3-3 1.345-3 3c0 0.24 0.035 0.475 0.090 0.7l-7.050 4.115c-0.535-0.5-1.25-0.81-2.040-0.81-1.655 0-3 1.345-3 3s1.345 3 3 3c0.79 0 1.505-0.31 2.040-0.81l7.125 4.155c-0.050 0.21-0.080 0.43-0.080 0.655 0 1.61 1.305 2.915 2.915 2.915s2.915-1.305 2.915-2.915-1.305-2.915-2.915-2.915z\"></path>\n</svg>\n"

/***/ },
/* 376 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M7 18c-1.105 0-1.99 0.895-1.99 2s0.885 2 1.99 2 2-0.895 2-2-0.895-2-2-2zM1 2v2h2l3.595 7.585-1.35 2.45c-0.155 0.29-0.245 0.615-0.245 0.965 0 1.105 0.895 2 2 2h12v-2h-11.575c-0.14 0-0.25-0.11-0.25-0.25 0-0.045 0.010-0.085 0.030-0.12l0.895-1.63h7.45c0.75 0 1.405-0.415 1.75-1.030l3.575-6.49c0.080-0.14 0.125-0.305 0.125-0.48 0-0.555-0.45-1-1-1h-14.785l-0.95-2h-3.265zM17 18c-1.105 0-1.99 0.895-1.99 2s0.885 2 1.99 2 2-0.895 2-2-0.895-2-2-2z\"></path>\n</svg>\n"

/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M12 4v-3l-4 4 4 4v-3c3.315 0 6 2.685 6 6 0 1.015-0.255 1.965-0.695 2.805l1.46 1.46c0.775-1.24 1.235-2.695 1.235-4.265 0-4.42-3.58-8-8-8zM12 18c-3.315 0-6-2.685-6-6 0-1.015 0.255-1.965 0.695-2.805l-1.46-1.46c-0.775 1.24-1.235 2.695-1.235 4.265 0 4.42 3.58 8 8 8v3l4-4-4-4v3z\"></path>\n</svg>\n"

/***/ },
/* 378 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M3 12c0 2.21 0.91 4.2 2.355 5.645l-2.355 2.355h6v-6l-2.235 2.235c-1.090-1.085-1.765-2.58-1.765-4.235 0-2.61 1.67-4.825 4-5.65v-2.090c-3.45 0.89-6 4.015-6 7.74zM11 17h2v-2h-2v2zM21 4h-6v6l2.235-2.235c1.090 1.085 1.765 2.58 1.765 4.235 0 2.61-1.67 4.825-4 5.65v2.085c3.45-0.885 6-4.010 6-7.735 0-2.21-0.91-4.2-2.355-5.645l2.355-2.355zM11 13h2v-6h-2v6z\"></path>\n</svg>\n"

/***/ },
/* 379 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M12 16.25l4-4h-3v-9h-2v9h-3l4 4zM21 3.25h-6v1.985h6v14.030h-18v-14.030h6v-1.985h-6c-1.105 0-2 0.895-2 2v14c0 1.105 0.895 2 2 2h18c1.105 0 2-0.895 2-2v-14c0-1.105-0.895-2-2-2z\"></path>\n</svg>"

/***/ },
/* 380 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 26 28\">\n  <path d=\"M9.141 15.359l-7.281 7.281q-0.156 0.156-0.359 0.156t-0.359-0.156l-0.781-0.781q-0.156-0.156-0.156-0.359t0.156-0.359l6.141-6.141-6.141-6.141q-0.156-0.156-0.156-0.359t0.156-0.359l0.781-0.781q0.156-0.156 0.359-0.156t0.359 0.156l7.281 7.281q0.156 0.156 0.156 0.359t-0.156 0.359zM26 22.5v1q0 0.219-0.141 0.359t-0.359 0.141h-15q-0.219 0-0.359-0.141t-0.141-0.359v-1q0-0.219 0.141-0.359t0.359-0.141h15q0.219 0 0.359 0.141t0.141 0.359z\"></path>\n</svg>\n"

/***/ },
/* 381 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M18 3v2h-2v-2h-8v2h-2v-2h-2v18h2v-2h2v2h8v-2h2v2h2v-18h-2zM8 17h-2v-2h2v2zM8 13h-2v-2h2v2zM8 9h-2v-2h2v2zM18 17h-2v-2h2v2zM18 13h-2v-2h2v2zM18 9h-2v-2h2v2z\"></path>\n</svg>\n"

/***/ },
/* 382 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 64 64\">\n  <path d=\"M1.571 49.679q1.25 0.143 2.786 0.143 8.036 0 14.321-4.929-3.75-0.071-6.714-2.304t-4.071-5.696q1.179 0.179 2.179 0.179 1.536 0 3.036-0.393-4-0.821-6.625-3.982t-2.625-7.339v-0.143q2.429 1.357 5.214 1.464-2.357-1.571-3.75-4.107t-1.393-5.5q0-3.143 1.571-5.821 4.321 5.321 10.518 8.518t13.268 3.554q-0.286-1.357-0.286-2.643 0-4.786 3.375-8.161t8.161-3.375q5 0 8.429 3.643 3.893-0.75 7.321-2.786-1.321 4.107-5.071 6.357 3.321-0.357 6.643-1.786-2.393 3.5-5.786 5.964 0.036 0.5 0.036 1.5 0 4.643-1.357 9.268t-4.125 8.875-6.589 7.518-9.214 5.214-11.536 1.946q-9.679 0-17.714-5.179z\"></path>\n</svg>"

/***/ },
/* 383 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M7.415 18.585l1.415 1.415 3.17-3.17 3.17 3.17 1.415-1.415-4.585-4.585-4.585 4.585zM16.585 5.415l-1.415-1.415-3.17 3.17-3.17-3.17-1.415 1.415 4.585 4.585 4.585-4.585z\"></path>\n</svg>\n"

/***/ },
/* 384 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M12 5.83l3.17 3.17 1.415-1.415-4.585-4.585-4.585 4.585 1.415 1.415 3.17-3.17zM12 18.17l-3.17-3.17-1.415 1.415 4.585 4.585 4.585-4.585-1.415-1.415-3.17 3.17z\"></path>\n</svg>\n"

/***/ },
/* 385 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M17 10.5v-3.5c0-0.55-0.45-1-1-1h-12c-0.55 0-1 0.45-1 1v10c0 0.55 0.45 1 1 1h12c0.55 0 1-0.45 1-1v-3.5l4 4v-11l-4 4z\"></path>\n</svg>\n"

/***/ },
/* 386 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M4 11h5v-6h-5v6zM4 18h5v-6h-5v6zM10 18h5v-6h-5v6zM16 18h5v-6h-5v6zM10 11h5v-6h-5v6zM16 5v6h5v-6h-5z\"></path>\n</svg>\n"

/***/ },
/* 387 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n  <path d=\"M4 18h17v-6h-17v6zM4 5v6h17v-6h-17z\"></path>\n</svg>\n"

/***/ },
/* 388 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M12.65 10c-0.825-2.33-3.040-4-5.65-4-3.315 0-6 2.685-6 6s2.685 6 6 6c2.61 0 4.825-1.67 5.65-4h4.35v4h4v-4h2v-4h-10.35zM7 14c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2z\"></path>\n</svg>\n"

/***/ },
/* 389 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 23 20\">\n    <path d=\"M0.5,20 L22.5,20 L11.5,0 L0.5,20 L0.5,20 Z M12.7941176,17.3333333 L10.2058824,17.3333333 L10.2058824,14.6666667 L12.7941176,14.6666667 L12.7941176,17.3333333 L12.7941176,17.3333333 Z M12.7941176,13.3333333 L10.2058824,13.3333333 L10.2058824,8 L12.7941176,8 L12.7941176,13.3333333 L12.7941176,13.3333333 Z\">\n    </path>\n</svg>"

/***/ },
/* 390 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 129 121\">\n  <path d=\"M60.467,51.345 C55.1,60.367 49.958,69.104 44.709,77.775 C43.361,80.001 42.694,81.814 43.771,84.644 C46.744,92.461 42.55,100.068 34.667,102.133 C27.233,104.081 19.99,99.195 18.515,91.236 C17.208,84.191 22.675,77.285 30.442,76.184 C31.093,76.091 31.757,76.08 32.851,75.998 C36.657,69.616 40.556,63.079 44.666,56.186 C37.235,48.797 32.812,40.159 33.791,29.456 C34.483,21.89 37.458,15.352 42.896,9.993 C53.311,-0.269 69.2,-1.931 81.463,5.946 C93.241,13.512 98.635,28.25 94.037,40.864 C90.57,39.924 87.079,38.976 83.241,37.935 C84.685,30.922 83.617,24.624 78.887,19.229 C75.762,15.667 71.752,13.8 67.192,13.112 C58.051,11.731 49.076,17.604 46.413,26.576 C43.39,36.759 47.965,45.077 60.467,51.345 Z M75.794,40.676 C79.575,47.346 83.414,54.117 87.219,60.826 C106.451,54.876 120.951,65.522 126.153,76.92 C132.436,90.688 128.141,106.995 115.801,115.489 C103.135,124.209 87.117,122.719 75.895,111.518 C78.755,109.124 81.629,106.719 84.7,104.15 C95.784,111.329 105.478,110.991 112.675,102.49 C118.812,95.238 118.679,84.425 112.364,77.325 C105.076,69.132 95.314,68.882 83.514,76.747 C78.619,68.063 73.639,59.448 68.899,50.701 C67.301,47.753 65.536,46.043 61.934,45.419 C55.918,44.376 52.034,39.21 51.801,33.422 C51.572,27.698 54.944,22.524 60.215,20.508 C65.436,18.511 71.563,20.123 75.075,24.562 C77.945,28.189 78.857,32.271 77.347,36.744 C76.927,37.991 76.383,39.198 75.794,40.676 Z M84.831,95.204 L61.679,95.204 C59.46,104.331 54.667,111.7 46.408,116.386 C39.988,120.028 33.068,121.263 25.703,120.074 C12.143,117.887 1.055,105.68 0.079,91.934 C-1.026,76.363 9.677,62.522 23.943,59.413 C24.928,62.99 25.923,66.601 26.908,70.169 C13.819,76.847 9.289,85.261 12.952,95.782 C16.177,105.041 25.337,110.116 35.283,108.153 C45.44,106.149 50.561,97.708 49.936,84.161 C59.565,84.161 69.202,84.061 78.832,84.21 C82.592,84.269 85.495,83.879 88.328,80.564 C92.992,75.109 101.576,75.601 106.599,80.753 C111.732,86.018 111.486,94.49 106.054,99.533 C100.813,104.399 92.533,104.139 87.63,98.896 C86.622,97.815 85.828,96.532 84.831,95.204 Z\"></path>\n</svg>"

/***/ },
/* 391 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path fill=\"#444444\" d=\"M13.5 0.67s0.74 2.65 0.74 4.8c0 2.060-1.35 3.735-3.415 3.735s-3.625-1.67-3.625-3.735l0.025-0.36c-2.010 2.405-3.225 5.505-3.225 8.89 0 4.42 3.58 8 8 8s8-3.58 8-8c0-5.395-2.595-10.205-6.5-13.33zM11.71 19c-1.78 0-3.225-1.405-3.225-3.14 0-1.625 1.045-2.765 2.815-3.12s3.6-1.205 4.615-2.575c0.39 1.29 0.595 2.65 0.595 4.035 0 2.645-2.15 4.8-4.8 4.8z\"></path>\n</svg>\n"

/***/ },
/* 392 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<svg viewBox=\"0 0 24 24\">\n<path d=\"M20 6h-4v-2c0-1.105-0.895-2-2-2h-4c-1.105 0-2 0.895-2 2v2h-4c-1.105 0-1.99 0.895-1.99 2l-0.010 11c0 1.105 0.895 2 2 2h16c1.105 0 2-0.895 2-2v-11c0-1.105-0.895-2-2-2zM14 6h-4v-2h4v2z\"></path>\n</svg>\n"

/***/ },
/* 393 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {}

	module.exports.toggleMenuMixin = {

	  handleClickOutside: function (evt) {
	    this.clearMenuVisability();
	  },

	  toggleMenu: function (name, e) {
	    e.stopPropagation();

	    var state = {};
	    state[name] = !this.state[name];

	    this.setState(state);
	  },

	  clearMenuVisability: function () {
	    var newState = {};
	    this.state.toggleArgs.map(function (item) {
	      newState[item] = false;
	    });
	    this.setState(newState);
	  }
	}


	module.exports.dropdownClickMixin = {

	  handleClick: function (e) {
	    console.log('handleDropdownClick', e);
	    this.props.handleClick(this.props.action.name);
	    e.stopPropagation();
	    //ViewActions.closeDropdown();

	    //var action = this.props.action.name;
	    //if (Constants.VIEW_MODES.indexOf(Constants.VIEW_ACTIONS_MAP[action]) != -1) {
	    //  ViewActions.updateViewMode(this.props.list.uuid, action);
	    //}
	    //if (Constants.SORT_MODES.indexOf(action) != -1) {
	    //  ViewActions.updateSortMode(this.props.list.uuid, action);
	    //}
	  },
	}


/***/ },
/* 394 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var classNames = __webpack_require__(262);

	//var ViewActions = require('../actions/ViewActions');
	var Constants = __webpack_require__(297);

	var Icon = __webpack_require__(298);
	var Mixins = __webpack_require__(393);


	module.exports = React.createClass({

	  displayName: 'DropdownMenuItem',

	  //mixins: [Mixins.dropdownClickMixin],

	  propTypes: {
	    action: React.PropTypes.object.isRequired,
	    handleItemClick: React.PropTypes.func.isRequired,
	  },


	  handleItemClick: function(e) {
	    this.props.handleItemClick(this.props.action);
	    e.stopPropagation();
	  },


	  render: function () {
	    //console.log("Action", this.props.action);
	    return (
	      React.createElement("div", {className: "dropdown-menu-item clickable", onClick: this.handleItemClick}, this.props.action.displayName)
	    );
	  }
	});


/***/ },
/* 395 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var classNames = __webpack_require__(262);

	//var ViewActions = require('../actions/ViewActions');
	var Constants = __webpack_require__(297);

	var Icon = __webpack_require__(298);
	var Mixins = __webpack_require__(393);

	module.exports = React.createClass({

	  displayName: 'DropdownMenuButton',

	  mixins: [Mixins.dropdownClickMixin],

	  render: function () {
	    return (
	      React.createElement("div", {className: "dropdown-menu-button", onClick: this.handleDropdownClick}, 
	        React.createElement(Icon, {icon: this.props.action.iconType})
	      )
	    );
	  }
	});

/***/ },
/* 396 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015 Eric Suh
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */

	"use strict";
	var React = __webpack_require__(4);

	var OutsideClickHandler = React.createClass({
	  propTypes: {
	    onOutsideClick: React.PropTypes.func
	  },
	  componentDidMount: function () {
	    document.addEventListener('click', this.handleDocumentClick, false);
	  },
	  componentWillUnmount: function () {
	    document.removeEventListener('click', this.handleDocumentClick, false);
	  },
	  render: function () {
	    return React.DOM.div(
	      {onClick: this.handleMyClick},
	      this.props.children
	    );
	  },
	  handleDocumentClick: function (event) {
	    if (this.props.onOutsideClick !== null) {
	      return this.props.onOutsideClick(event);
	    }
	  },
	  handleMyClick: function (event) {
	    event.stopPropagation();
	    event.nativeEvent.stopImmediatePropagation();
	  }
	});

	module.exports = OutsideClickHandler;


/***/ },
/* 397 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(398);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Dropdown/Dropdown.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Dropdown/Dropdown.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 398 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, ".dropdown {\n  position: relative;\n  padding: 0 10px 0 5px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.dropdown i {\n  float: right;\n}\n\n.dropdown-menu {\n  color: #999;\n  position: absolute;\n  right: 0px;\n  left: auto;\n  top: 30px;\n  background-color: white;\n  border-radius: 2px;\n  box-shadow: 0px 2px 8px rgba(0,0,0,0.25);\n  font-size: 14px;\n  z-index: 999;\n  min-width: 120px;\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: translate(0, -20px);\n          transform: translate(0, -20px);\n  transition: all 100ms;\n  padding: 5px 0;\n  max-height: 230px;\n  overflow: auto;\n}\n\n.dropdown-menu b {\n  font-weight: 500;\n  color: #707070;\n}\n\n.dropdown-menu-section-buttons {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: space-around;\n      -ms-flex-pack: distribute;\n          justify-content: space-around;\n  padding: 10px 10px 5px 10px;\n  border-top: 1px solid #E8E8E8;\n}\n\n.dropdown-menu-section-buttons .dropdown-menu-button {\n  padding: 5px;\n  cursor: pointer;\n}\n\n.dropdown-menu-section-buttons .dropdown-menu-button:hover i {\n  fill: #444;\n}\n\n.dropdown-menu-section-buttons i {\n  width: 24px;\n  height: 24px;\n  fill: #A1A1A1;\n  transition: all 125ms;\n}\n\n.dropdown-menu.dropdown-menu-visible {\n  opacity: 1;\n  visibility: visible;\n  -webkit-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\n\n.dropdown-menu-item {\n  padding: 10px 20px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.dropdown-menu-item-toggle {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.dropdown-menu-item-toggle:hover i {\n  fill: #444;\n}\n\n.dropdown-menu-item-toggle i {\n  margin-right: 15px;\n}\n\n.dropdown-menu-item:hover {\n  color: #444;\n}\n\n.dropdown-menu-item:first-child {\n  margin-top: 5px;\n}\n\n.dropdown-menu-item:last-child {\n  margin-bottom: 5px;\n}\n\n.dropdown-button {\n  width: 20px;\n  height: 20px;\n}\n\n.dropdown-button path {\n  fill: #C3C3C3;\n}\n\n.dropdown-button:hover path {\n  fill: #777;\n}", ""]);

/***/ },
/* 399 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var classNames = __webpack_require__(262);

	__webpack_require__(400);

	module.exports = React.createClass({

	  displayName: 'ProgressBar',

	  propTypes: {
	    visible: React.PropTypes.bool
	  },

	  getInitialState: function () {
	    return {
	      visible: this.props.visible || false,
	    }
	  },

	  render: function () {

	    var cssClasses = classNames({
	      'progress-bar-group': true,
	      'progress-bar-visible': this.state.visible,
	    });

	    return (
	      React.createElement("div", {className: cssClasses})
	    );
	  }

	});

/***/ },
/* 400 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(401);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/ProgressBar/ProgressBar.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/ProgressBar/ProgressBar.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 401 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, ".progress-bar-group.progress-bar-visible {\n  opacity: 1;\n  visibility: visible;\n  -webkit-animation: animatedBackground 15s linear infinite;\n          animation: animatedBackground 15s linear infinite;\n}\n\n.progress-bar-group {\n  /*position: absolute;*/\n  bottom: -5px;\n  height: 5px;\n  z-index: 99;\n  width: 100%;\n  opacity: 0;\n  visibility: hidden;\n  transition: 150ms all;\n  background-image: linear-gradient(to right, #FAD165 0%, #FAD165 25%, #3FD18E 25%, #3FD18E 50%, #F4697A 50%, #F4697A 75%, #176EF9 75%, #176EF9 100% );\n  background-position: 0px 0px;\n}\n\n@-webkit-keyframes animatedBackground {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: -10000px 0;\n  }\n}\n\n@keyframes animatedBackground {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: -10000px 0;\n  }\n}\n", ""]);

/***/ },
/* 402 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	__webpack_require__(403);

	module.exports = React.createClass({

	  displayName: 'Label',

	  propTypes: {
	    text: React.PropTypes.string.isRequired,
	  },

	  render: function() {
	    return (
	      React.createElement("div", {className: "label"}, React.createElement("span", null, this.props.text))
	    );
	  }
	});

/***/ },
/* 403 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(404);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Label/Label.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Label/Label.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 404 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, ".label {\n  background-color: #444;\n  color: #fff;\n  font-size: 12px;\n  width: auto;\n  white-space: nowrap;\n  padding: 0.4em 0.9em;\n  border-radius: 2px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  line-height: 1.3em;\n  box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.25);\n}", ""]);

/***/ },
/* 405 */
/***/ function(module, exports, __webpack_require__) {

	var React      = __webpack_require__(4);

	var Icon       = __webpack_require__(298);

	module.exports = React.createClass({

	  displayName: 'ListItemEmpty',

	  getDefaultProps: function(){
	    return {
	      icon: 'cart',
	      text: 'empty',
	    }
	  },

	  render: function() {

	    console.log('Rendering EmptyList element');
	    return (
	      React.createElement("div", {className: "list-item list-item-empty"}, 
	        React.createElement("div", {className: "card-header"}, 
	          React.createElement("div", {className: "list-item-details card-details"}, 
	            React.createElement("div", {className: "list-item-icon card-icon"}, 
	              React.createElement(Icon, {icon: this.props.icon})
	            ), 
	            React.createElement("div", {className: "list-item-text card-text"}, 
	              React.createElement("div", {className: "list-item-title card-title"}, React.createElement("span", null, this.props.text)), 
	              React.createElement("div", {className: "list-item-description card-description"})
	            )
	          )
	        )
	      )
	    );
	  }
	});


/***/ },
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */
/***/ function(module, exports, __webpack_require__) {

	var React  = __webpack_require__(4);
	var classNames = __webpack_require__(262);

	__webpack_require__(414);


	var Button = React.createClass({

	  displayName: 'Button',

	  handleClick: function(){
	    this.props.handleClick(this.props.data.name);
	  },

	  render: function() {
	    var data = "data" in this.props ? this.props.data : this.props;
	    var cssClasses = classNames({
	      'button': true,
	      'button-raised': data.type === 'raised',
	      'button-flat': data.type === 'flat',
	      'button-default-action': data.isDefault,
	    });
	    return (
	      React.createElement("div", {className: cssClasses, onClick: this.handleClick}, 
	        React.createElement("span", null, data.displayName)
	      )
	    );
	  }
	});

	module.exports = React.createClass({

	  displayName: 'ButtonGroup',

	  render: function() {
	    var buttons = this.props.buttons.map(function(button, i){
	      return React.createElement(Button, React.__spread({},  this.props, {key: i, data: button}))
	    }.bind(this));
	    return (
	      React.createElement("div", {className: "button-group"}, 
	        buttons
	      )
	    );
	  }
	});

/***/ },
/* 414 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(415);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Button/Button.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Button/Button.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 415 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, ".button {\n  -webkit-flex: 0 0 auto;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  text-transform: uppercase;\n  font-size: 14px;\n  text-align: center;\n  height: 35px;\n  padding: 0px 15px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  border-radius: 2px;\n  transition: all 150ms;\n  background-color: #0091EA;\n  color: white;\n  white-space: nowrap;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  font-family: 'Roboto',sans-serif;\n  font-weight: 500;\n  letter-spacing: 0.01em;\n}\n\n.button-raised {\n  background-color: #FFFFFF;\n  color: #929292;\n  font-size: 13px;\n  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.30);\n}\n\n.button:hover {\n  box-shadow: 0px 1px 7px 1px rgba(0, 0, 0, 0.25);\n}\n\n.button-flat {\n  background-color: transparent;\n  color: #737373;\n  box-shadow: none;\n}\n\n.button-flat.button-default-action {\n  color: #0091EA;\n}\n\n.button-flat:hover {\n  box-shadow: none;\n  color: #0091EA;\n}", ""]);

/***/ },
/* 416 */,
/* 417 */,
/* 418 */
/***/ function(module, exports, __webpack_require__) {

	var React      = __webpack_require__(4);
	var classNames = __webpack_require__(262);

	var Icon       = __webpack_require__(298);

	__webpack_require__(419);

	module.exports = React.createClass({

	  // FloatingActionButton
	  displayName: 'FAB',

	  propTypes: {
	    button: React.PropTypes.object,
	    handleFABClick: React.PropTypes.func.isRequired,
	  },

	  getDefaultProps: function() {
	    return {
	      button: {
	        label: 'Some default label',
	        name: 'defaultButton',
	        icon: 'plus',
	        color: '#FFC52D',
	      }
	    }
	  },

	  handleClick: function() {
	    this.props.handleFABClick(this.props.button.name);
	  },

	  render: function() {
	    var cssClasses = classNames({
	      'fab': true,
	      'fab-primary': this.props.button.primary,
	    });
	    var style = {
	      backgroundColor: this.props.button.color
	    };
	    return (
	      React.createElement("div", {className: cssClasses, style: style, onClick: this.handleClick}, 
	        React.createElement(Icon, {icon: this.props.button.icon})
	      )
	    );
	  }
	});

/***/ },
/* 419 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(420);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Fab/Fab.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Fab/Fab.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 420 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, ".fab-list {\n  position: fixed;\n  right: 50px;\n  bottom: 50px;\n  z-index: 999;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-align-items: flex-end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n}\n\n.fab-with-label {\n  position: relative;\n  margin-bottom: 15px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.fab-with-label .label {\n  -webkit-order: 1;\n      -ms-flex-order: 1;\n          order: 1;\n  margin-right: 15px;\n}\n\n.fab-with-label .fab {\n  -webkit-order: 2;\n      -ms-flex-order: 2;\n          order: 2;\n  margin-right: 15px;\n}\n\n.fab + .label {\n  visibility: hidden;\n  opacity: 0;\n  transition: all 125ms;\n}\n\n.fab:hover + .label {\n  visibility: visible;\n  opacity: 1;\n}\n\n.fab {\n  width: 40px;\n  height: 40px;\n  border-radius: 100%;\n  box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  transition: all 150ms;\n  fill: #fff;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n}\n\n.fab.fab-primary {\n  background: #FF2D6F;\n  width: 55px;\n  height: 55px;\n}\n\n.fab:hover {\n  box-shadow: 0 8px 17px 0 rgba(0,0,0,.2);\n}\n\n.fab i {\n  width: 22px;\n  height: 22px;\n}", ""]);

/***/ },
/* 421 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var FAB   = __webpack_require__(418);
	var Label = __webpack_require__(402);

	module.exports = React.createClass({

	  displayName: 'FABList',

	  propTypes: {
	    buttons: React.PropTypes.array.isRequired,
	    handleFABClick: React.PropTypes.func.isRequired,
	  },

	  render: function() {
	    var buttons = this.props.buttons.map(function(button) {
	      return (
	        React.createElement("div", {className: "fab-with-label", key: button.name}, 
	          React.createElement(FAB, {button: button, handleFABClick: this.props.handleFABClick}), 
	          React.createElement(Label, {text: button.label})
	        )
	      );
	    }.bind(this));
	    return (
	      React.createElement("div", {className: "fab-list"}, 
	        buttons
	      )
	    );
	  }
	});


/***/ },
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var Icon = __webpack_require__(298);

	__webpack_require__(509);


	module.exports = React.createClass({

	  displayName: 'ButtonSocialAuth',

	  handleClick: function () {
	    this.props.handleClick(this.props.type);
	  },

	  render: function () {
	    return (
	      React.createElement("li", {className: "button-social-auth", onClick: this.handleClick}, 
	        React.createElement(Icon, {icon: this.props.type}), 

	        React.createElement("div", {className: "button-text"}, this.props.text)
	      )
	    );
	  }
	});

/***/ },
/* 429 */,
/* 430 */,
/* 431 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var Moment = __webpack_require__(160);
	var classNames = __webpack_require__(262);

	var Icon = __webpack_require__(298);
	var Dropdown = __webpack_require__(296);


	__webpack_require__(432);

	module.exports = React.createClass({

	  displayName: 'InstancesListItem',


	  propTypes: {
	    // Click on item's option from dropdown
	    handleItemMenuClick: React.PropTypes.func.isRequired,
	    item: React.PropTypes.object.isRequired,
	    style: React.PropTypes.oneOf(['stream', 'cards']),
	    dropdownVisible: React.PropTypes.bool,
	    avatarStyle: React.PropTypes.oneOf(['user', 'icon']),
	  },

	  getInitialState: function () {
	    return {
	      animateInk: false,
	      dropdownViable: this.props.dropdownViable || false,
	    }
	  },


	  handleItemMenuClick: function (action) {
	    // We need to add here information about *item*
	    action['item'] = this.props.item;
	    this.props.handleItemMenuClick(action);
	  },

	  //handleDropdownMenuItemClick: function (actionType) {
	  //  //if (actionType === "delete") {
	  //  //  ViewActions.showModalConfirmDeleteResource(this.props.item);
	  //  //} else if (actionType === "edit") {
	  //  //  ViewActions.showModalUpdateResource(this.props.item);
	  //  //} else if (actionType === "customize") {
	  //  //  ViewActions.showModalCustomizeResource(this.props.item);
	  //  //} else if (actionType === "run") {
	  //  //  ServerActions.runWebhook(this.props.item);
	  //  //}
	  //},

	  render: function () {

	    console.log('Rendering List element');

	    var item = this.props.item;


	    var color = item.metadata.color || '#e2e2e2';


	    var icon = item.metadata.icon;
	    var info = "Updated " + Moment(item.updated_at).fromNow();

	    var inkStyle = {
	      height: "200px",
	      width: "200px",
	      top: "0px",
	      left: "0px",
	    };

	    var cssClasses = classNames('list-item', 'list-item-' + this.props.style, {
	      'animate-ink': this.state.animateInk,
	      'card': true,
	      'card-view-cards': this.props.style === "cards",
	      'list-item-card-view': this.props.style === "cards",
	      'list-item-no-color': !this.props.color,
	      'list-item-stream-view': this.props.style === "stream",
	      //'card-codebox-nodejs'    : runtime === "nodejs",
	      //'card-codebox-python'    : runtime === "python",
	      //'card-codebox-ruby'      : runtime === "ruby",
	      //'card-codebox-golang'    : runtime === "golang",
	      //'card-loading': loading,
	      //'card-expanded': this.props.expanded,
	      //'list-item-expanded': this.props.expanded,
	      //'card-trace-pending'     : status === "pending",
	      //'card-trace-failure'     : status === "failure",
	      //'card-trace-success'     : status === "success",
	      //'card-trace-timeout'     : status === "timeout",
	    });

	    console.log("5");

	    if (this.state.animateInk) {
	      inkStyle['top'] = "50px";
	      inkStyle['left'] = "50px";
	    }

	    //debugger;

	    if (this.props.style === "cards") {

	      var style = {
	        backgroundColor: color
	      };

	      return (
	        React.createElement("div", {className: cssClasses, style: style, onClick: this.handleCardClick}, 
	          React.createElement("div", {className: "list-item-header card-header"}, 
	            React.createElement("div", {className: "list-item-details card-details"}, 
	              React.createElement("div", {className: "list-item-icon card-icon"}, 
	                React.createElement(Icon, {icon: icon})
	              ), 
	              React.createElement("div", {className: "list-item-text card-text"}, 
	                React.createElement("div", {className: "list-item-title card-title"}, React.createElement("span", null, this.props.item.name)), 
	                React.createElement("div", {className: "list-item-description card-description"}, this.props.item.description)
	              )
	            ), 
	            React.createElement("div", {className: "ink", style: inkStyle}), 
	            React.createElement("div", {className: "list-item-extras card-extras"}, 
	              React.createElement(Dropdown, {actions: this.props.actions, handleItemClick: this.handleItemMenuClick})
	            )
	          )
	        )
	      );
	    } else if (this.props.style === "stream") {

	      var iconStyle = {
	        width: '45px',
	        height: '45px',
	        'border-radius': '50%',
	        fill: '#fff',
	        padding: '9px',
	        backgroundColor: color
	      };

	      //var trac  eResult = this.props.expanded ? <TraceResult result={this.props.item.data.result}/> : null;

	      var dropdown = React.createElement(Dropdown, {actions: this.props.actions, 
	                               visible: this.props.dropdownVisible, 
	                               handleItemClick: this.handleItemMenuClick});

	      //toggleDropdownMenu={this.toggleDropdownMenu}


	      var avatar;
	      console.log('avatarStyle', this.props.avatarStyle);
	      if (this.props.avatarStyle === "user") {
	        console.log('avatarStyle', this.props.avatarStyle);
	        avatar = React.createElement(AvatarInitials, {text: this.props.item.name});
	      } else {
	        avatar = React.createElement(Icon, {icon: icon, style: iconStyle});
	      }

	      console.log('avatarStyle', this.props.avatarStyle);
	      //debugger;

	      //var dropdown = this.props.actions.length > 0 ? dropdownComponent : null;
	      //var dropdown = null;


	      //var buttonExpandToggle = this.props.expandable ? <ButtonExpandToggle parentExpanded={this.props.expanded}/> : null;

	      var traceResult = [];
	      var buttonExpandToggle = [];

	      return (
	        React.createElement("div", {className: cssClasses}, 
	          React.createElement("div", {className: "list-item-header card-header", onClick: this.handleItemHeaderClick}, 
	            React.createElement("div", {className: "list-item-details card-details-other"}, 
	              React.createElement("div", {className: "list-item-icon card-icon"}, 
	                avatar
	              ), 
	              React.createElement("div", {className: "list-item-text card-text-other"}, 
	                React.createElement("div", {className: "list-item-title card-title"}, React.createElement("span", null, this.props.item.name)), 
	                React.createElement("div", {className: "list-item-description card-description-other"}, this.props.item.description)
	              )
	            ), 
	            React.createElement("div", {className: "list-item-highlight card-highlight"}), 
	            React.createElement("div", {className: "list-item-extras card-other-extras"}, 
	              React.createElement("div", {className: "card-info"}, info), 
	              buttonExpandToggle, 
	              React.createElement("div", {className: "card-dropdown"}, dropdown)
	            )
	          ), 
	          traceResult
	        )
	      );
	    }


	  }
	});

	//            <Dropdown actions={this.props.actions} visible={this.props.dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick}/>


	//var React              = require('react');
	//var classNames         = require('classnames');
	//var Moment             = require('moment');
	//
	////var ViewActions        = require('../actions/ViewActions');
	////var ServerActions      = require('../actions/ServerActions');
	//
	////var Constants          = require('../../constants/Constants');
	////
	////var Icon               = require('../../common/Icon/Icon.react');
	////var ButtonExpandToggle = require('../../common/Button/ButtonExpandToggle.react');
	////var Dropdown           = require('../../common/Dropdown/Dropdown.react');
	////var ProgressBar        = require('../../common/ProgressBar/ProgressBar.react');
	////var AvatarInitials     = require('../../common/AvatarInitials/AvatarInitials.react');
	////var TraceResult        = require('../../common/Trace/TraceResult.react');
	//
	////require('../../common/Lists/Card.css');
	//
	//module.exports = React.createClass({
	//
	//  displayName: 'InstancesListItem',
	//
	//  //propTypes: {
	//  //  handleClick: React.PropTypes.func.isRequired,
	//  //  item: React.PropTypes.object.isRequired,
	//  //},
	//
	//  getInitialState: function() {
	//    //return {
	//    //  animateInk: false,
	//    //  title: this.props.item.id,
	//    //}
	//  },
	//
	//  getDefaultProps: function() {
	//    //return {
	//    //  color: "#0288D1"
	//    //}
	//  },
	//
	//  handleCardClick: function() {
	//    //this.setState({animateInk: true});
	//    //setTimeout(function(){
	//    //  this.props.handleClick(this.props.item);
	//    //}.bind(this), 250)
	//  },
	//
	//  handleItemHeaderClick: function() {
	//    //this.props.handleClick(this.props.item);
	//  },
	//
	//  toggleDropdownMenu: function() {
	//    //ViewActions.showDropdown(this.props.item.uuid);
	//  },
	//
	//  handleDropdownMenuItemClick: function(actionType) {
	//    //if (actionType === "delete") {
	//    //  ViewActions.showModalConfirmDeleteResource(this.props.item);
	//    //} else if (actionType === "edit") {
	//    //  ViewActions.showModalUpdateResource(this.props.item);
	//    //} else if (actionType === "customize") {
	//    //  ViewActions.showModalCustomizeResource(this.props.item);
	//    //} else if (actionType === "run") {
	//    //  ServerActions.runWebhook(this.props.item);
	//    //}
	//  },
	//
	//  render: function() {
	//
	//    console.log('Rendering InstanceListItem');
	//
	//    return (
	//      <div className="list-item list-item-empty">
	//        <div className="card-header">
	//          <div className="list-item-details card-details">
	//            <div className="list-item-icon card-icon">
	//            </div>
	//            <div className="list-item-text card-text">
	//              <div className="list-item-title card-title"><span>XXXXX</span></div>
	//              <div className="list-item-description card-description"></div>
	//            </div>
	//          </div>
	//        </div>
	//      </div>
	//    );
	//
	//    //var item = this.props.item;
	//    //var data = item.data;
	//    //var color = { backgroundColor: data.metadata.color || '#e2e2e2' };
	//    //var icon = data.metadata.icon;
	//    //var info = "Updated " + Moment(data.updated_at).fromNow();
	//    //
	//    //var inkStyle = {
	//    //  height: "200px",
	//    //  width: "200px",
	//    //  top: "0px",
	//    //  left: "0px",
	//    //};
	//    //var contentType = this.props.list.contentType.split('_').join('-');
	//    //var runtime     = this.props.item.runtime_name;
	//    //var status      = this.props.item.status;
	//    //var loading     = this.props.item.loading;
	//    //var cssClasses  = classNames('list-item', 'list-item-' + contentType, {
	//    //  'animate-ink'            : this.state.animateInk,
	//    //  'card'                   : true,
	//    //  'card-view-cards'        : this.props.list.viewMode === "cards",
	//    //  'list-item-card-view'    : this.props.list.viewMode === "cards",
	//    //  'list-item-no-color'     : !this.props.color,
	//    //  'list-item-stream-view'  : this.props.list.viewMode === "stream",
	//    //  //'card-codebox-nodejs'    : runtime === "nodejs",
	//    //  //'card-codebox-python'    : runtime === "python",
	//    //  //'card-codebox-ruby'      : runtime === "ruby",
	//    //  //'card-codebox-golang'    : runtime === "golang",
	//    //  'card-loading'           : loading,
	//    //  'card-expanded'          : this.props.expanded,
	//    //  'list-item-expanded'     : this.props.expanded,
	//    //  //'card-trace-pending'     : status === "pending",
	//    //  //'card-trace-failure'     : status === "failure",
	//    //  //'card-trace-success'     : status === "success",
	//    //  //'card-trace-timeout'     : status === "timeout",
	//    //});
	//    //if (this.state.animateInk) {
	//    //  inkStyle['top'] = "50px";
	//    //  inkStyle['left'] = "50px";
	//    //}
	//    //
	//    //
	//    //if (this.props.list.viewMode === "cards") {
	//    //  return (
	//    //    <div className={cssClasses} style={color} onClick={this.handleCardClick}>
	//    //      <div className="list-item-header card-header">
	//    //        <div className="list-item-details card-details">
	//    //          <div className="list-item-icon card-icon">
	//    //            <Icon type={icon} />
	//    //          </div>
	//    //          <div className="list-item-text card-text">
	//    //            <div className="list-item-title card-title"><span>{this.props.title}</span></div>
	//    //            <div className="list-item-description card-description">{this.props.description}</div>
	//    //          </div>
	//    //        </div>
	//    //        <div className="ink" style={inkStyle}></div>
	//    //        <div className="list-item-extras card-extras">
	//    //          <Dropdown actions={this.props.actions} visible={this.props.dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />
	//    //        </div>
	//    //      </div>
	//    //    </div>
	//    //  );
	//    //} else if (this.props.list.viewMode === "stream") {
	//    //  var traceResult = this.props.expanded ? <TraceResult result={this.props.item.data.result} /> : null;
	//    //  var initialsComponent = <AvatarInitials text={this.props.title} />;
	//    //  var dropdownComponent = <Dropdown actions={this.props.actions} visible={this.props.dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />;
	//    //  var iconComponent = <Icon type={this.props.icon} style={color} />;
	//    //  var avatar = contentType === "users" ? initialsComponent : iconComponent;
	//    //  var dropdown = this.props.actions.length > 0 ? dropdownComponent : null;
	//    //  var buttonExpandToggle = this.props.expandable ? <ButtonExpandToggle parentExpanded={this.props.expanded} /> : null;
	//    //  return (
	//    //    <div className={cssClasses}>
	//    //      <div className="list-item-header card-header" onClick={this.handleItemHeaderClick}>
	//    //        <div className="list-item-details card-details-other">
	//    //          <div className="list-item-icon card-icon">
	//    //            {avatar}
	//    //          </div>
	//    //          <div className="list-item-text card-text-other">
	//    //            <div className="list-item-title card-title"><span>{this.props.title}</span></div>
	//    //            <div className="list-item-description card-description-other">{this.props.description}</div>
	//    //          </div>
	//    //        </div>
	//    //        <div className="list-item-highlight card-highlight"></div>
	//    //        <div className="list-item-extras card-other-extras">
	//    //          <div className="card-info">{info}</div>
	//    //          {buttonExpandToggle}
	//    //          <div className="card-dropdown">{dropdown}</div>
	//    //        </div>
	//    //      </div>
	//    //      {traceResult}
	//    //    </div>
	//    //  );
	//    //}
	//
	//    // if (this.props.item.expanded && this.props.list.contentType === "traces") {
	//    //   if (this.props.item.args && this.props.item.meta) {
	//    //     return (
	//    //       <div className={cssClasses} onClick={this.handleClick}>
	//    //         <div className="list-item-header card-header">
	//    //           <div className="list-item-details card-details">
	//    //             <div className="card-icon">
	//    //               <Icon type={this.props.item.icon} style={this.props.item.iconColor}/>
	//    //             </div>
	//    //             <div className="list-item-text card-text">
	//    //               <div className="list-item-title card-title"><span onClick={this.handleTitleClick} >{this.props.item.title}</span></div>
	//    //               <div className="list-item-description card-description">{this.props.item.description}</div>
	//    //             </div>
	//    //           </div>
	//    //           <div className="card-highlight"></div>
	//    //           <div className="list-item-extras card-extras">
	//    //             <div className="card-info">{this.props.item.info}</div>
	//    //             {dropdown}
	//    //           </div>
	//    //         </div>
	//    //         <div className="card-body">
	//    //           <TraceResultView args={this.props.item.args} meta={this.props.item.meta} result={this.props.item.result} />
	//    //         </div>
	//    //         <ProgressBar />
	//    //       </div>
	//    //     );
	//    //   } else {
	//    //     return (
	//    //       <div className={cssClasses} onClick={this.handleClick}>
	//    //         <div className="list-item-header card-header">
	//    //           <div className="list-item-details card-details">
	//    //             <div className="card-icon">
	//    //               <Icon type={this.props.item.icon} style={this.props.item.iconColor} />
	//    //             </div>
	//    //             <div className="list-item-text card-text">
	//    //               <div className="list-item-title card-title"><span onClick={this.handleTitleClick}>{this.props.item.title}</span></div>
	//    //               <div className="list-item-description card-description">{this.props.item.description}</div>
	//    //             </div>
	//    //           </div>
	//    //           <div className="card-highlight"></div>
	//    //           <div className="list-item-extras card-extras">
	//    //             <div className="card-info">{this.props.item.info}</div>
	//    //             {dropdown}
	//    //           </div>
	//    //         </div>
	//    //         <div className="card-body">
	//    //           <TraceResultView result={this.props.item.result} />
	//    //         </div>
	//    //         <ProgressBar />
	//    //       </div>
	//    //     );
	//    //   }
	//    // }
	//  }
	//});

/***/ },
/* 432 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(433);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Lists/Card.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Lists/Card.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 433 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, ".list-item,\n.card {\n  background-color: white;\n  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.15),0px 2px 5px rgba(0,0,0,0.2);\n  font-size: 14px;\n  color: #737373;\n  position: relative;\n  border-bottom: 1px solid #E5E5E5;\n  transition: all 150ms;\n}\n\n.list-item-stream-view .list-item-header {\n  cursor: pointer;\n}\n\n.list-item-stream-view .list-item-header .button-expand-toggle {\n  fill: #C3C3C3;\n}\n\n.list-item-stream-view .list-item-header:hover .list-item-title,\n.list-item-stream-view .list-item-header:hover .list-item-description,\n.list-item-stream-view .list-item-header:hover .button-expand-toggle {\n  color: #0091EA;\n  fill: #0091EA;\n}\n\n.button-expand-toggle {\n  fill: #C3C3C3;\n  padding-top: 10px;\n}\n\n.button-expand-toggle:hover {\n  fill: #0091EA;\n}\n\n.button-expand-toggle i {\n  width: 20px;\n  height: 20px;\n}\n\n\n.list-item.list-item-empty {\n  background-color: transparent;\n  box-shadow: none;\n  font-size: 14px;\n  color: #737373;\n  border: 2px dashed #D2D2D2;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.list-item.list-item-empty .list-item-details {\n  padding: 35px;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.list-item.list-item-empty .list-item-text {\n  margin: 15px 0 0 0;\n  padding: 0;\n}\n\n.list-item.list-item-empty .list-item-title {\n  font-weight: 300;\n  font-size: 18px;\n  color: #989898;\n}\n\n.view-stream .list-item.list-item-empty .list-item-icon i {\n  width: 40px;\n  height: 40px;\n  padding: 0;\n  fill: #828282;\n}\n\n.card.card-loading {\n  margin: 30px -30px;\n}\n\n.list-item.list-item-expanded {\n  margin: 30px -30px;\n}\n\n.list-item.list-item-expanded:first-child {\n  margin: 0 -30px 25px -30px;\n}\n\n.list-item-expanded > .list-item-header {\n  border-bottom: 1px solid #E5E5E5;\n  height: 100px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.card.card-loading .progress-bar-group {\n  opacity: 1;\n  visibility: visible;\n  -webkit-animation: animatedBackground 10s linear infinite;\n          animation: animatedBackground 10s linear infinite;\n}\n\n.card:last-child {\n  border-bottom: none;\n}\n\n.card .card-header {\n  position: relative;\n}\n\n.card-highlight {\n  width: 4px;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  bottom: 0px;\n  background-color: #0091EA;\n  visibility: hidden;\n}\n\n.card-highlighted .card-highlight {\n  visibility: visible;\n}\n\n/*.card .tabs {\n  margin-left: 70px;\n}*/\n\n.card-icon {\n  width: 90px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.card-icon i {\n  width: 30px;\n}\n\n.card-instance .card-icon i,\n.card-class .card-icon i {\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.card-webhook .card-icon i,\n.card-trigger .card-icon i,\n.card-schedule .card-icon i,\n.card-instance .card-icon i,\n.card-codebox .card-icon i,\n.card-class .card-icon i,\n.card-api-key .card-icon i,\n.card-admin .card-icon i,\n.card-invitation .card-icon i,\n.card-account-invitation .card-icon i,\n.card-trace .card-icon i {\n  width: 40px;\n  height: 40px;\n  border-radius: 100%;\n  fill: white;\n  padding: 9px;\n}\n\n.card-trace.card-trace-pending .card-icon i {\n  background-color: #FEBF58;\n}\n\n.card-trace.card-trace-failure .card-icon i {\n  background-color: #F16072;\n  padding: 8px 9px 9px 9px;\n}\n\n.card-trace.card-trace-success .card-icon i {\n  background-color: #93D14F;\n}\n\n.card-trace.card-trace-timeout .card-icon i {\n  background-color: #8D9FE6;\n}\n\n.card-codebox .card-icon i {\n  width: 40px;\n  height: 40px;\n  border-radius: 100%;\n  fill: white;\n  padding: 4px;\n}\n\n.view-stream .list-item .list-item-icon i {\n  width: 40px;\n  height: 40px;\n  border-radius: 100%;\n  fill: white;\n  padding: 9px;\n}\n\n.card-codebox.card-codebox-nodejs .card-icon i {\n  background-color: #80BD01;\n}\n\n.card-codebox.card-codebox-python .card-icon i {\n  background-color: #4984B1;\n}\n\n.card-codebox.card-codebox-golang .card-icon i {\n  background-color: #E0EBF5;\n}\n\n.card-codebox.card-codebox-ruby .card-icon i {\n  background-color: #B21000;\n  padding: 9px;\n}\n\n.card > .card-header {\n  height: 100px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n\n.card-text {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.card-text-other {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.card-details {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0 5px 0 10px;\n  -webkit-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n}\n\n.card-details-other {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline;\n  padding: 0 5px 0 10px;\n  -webkit-flex: 5;\n      -ms-flex: 5;\n          flex: 5;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.card-id {\n  font-size: 16px;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-align: left;\n  word-break: break-word;\n  line-height: 100px;\n  vertical-align: middle;\n  padding: 0 5px;\n}\n\n.card-description {\n  -webkit-flex: 4;\n      -ms-flex: 4;\n          flex: 4;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-self: center;\n      -ms-flex-item-align: center;\n          align-self: center;\n  font-size: 12px;\n  color: #999;\n  text-align: left;\n  vertical-align: middle;\n  line-height: 15px;\n  overflow: hidden;\n  word-break: break-word;\n  padding: 0 5px;\n}\n\n.card-description-other {\n  -webkit-flex: 4;\n      -ms-flex: 4;\n          flex: 4;\n  font-size: 12px;\n  color: #999;\n  text-align: left;\n  overflow: hidden;\n  word-break: break-word;\n}\n\n.card-extras {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 10px 5px;\n}\n\n.card-other-extras {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n}\n\n.card-title {\n  font-weight: 400;\n  font-size: 16px;\n  color: #666;\n  margin-bottom: 0.15em;\n  color: #767676;\n  word-break: break-word;\n}\n\n.card-info, .card-info-date {\n  color: #999;\n  font-size: 13px;\n  margin-right: 10px;\n  line-height: 20px;\n}\n\n.card-info {\n  padding: 10px 10px 5px 5px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  -webkit-flex: 7;\n      -ms-flex: 7;\n          flex: 7;\n}\n\n.card-dropdown {\n  padding: 10px 10px 5px 5px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.card-instance span,\n.card-codebox span,\n.card-trigger span,\n.card-webhook span,\n.card-schedule span {\n  cursor: pointer;\n}\n\n.card-instance span:hover,\n.card-codebox span:hover,\n.card-trigger span:hover,\n.card-webhook span:hover,\n.card-schedule span:hover {\n  text-decoration: underline;\n}\n\n.card-avatar {\n  border-radius: 100%;\n  width: 40px;\n  height: 40px;\n}\n\n.card-body {\n  padding: 30px 0;\n  /*margin-top: 30px;\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;*/\n}\n\n.card-body .card {\n  width: auto;\n  height: 85px;\n  background-color: white;\n  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.30);\n  margin-right: 20px;\n  margin-bottom: 20px;\n  -webkit-flex: 0 1 250px;\n      -ms-flex: 0 1 250px;\n          flex: 0 1 250px;\n  min-width: 200px;\n  border-bottom: none;\n}\n\n.card-body .card-icon {\n  background-color: rgb(224, 131, 131);\n  border-radius: 100%;\n  width: 40px;\n  height: 40px;\n  margin: 0 15px;\n  padding: 0;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.card-body .card-icon i {\n  width: 20px;\n  height: 20px;\n}\n\n.card-body .card-header {\n  border: none;\n}\n\n.card-body .card-title {\n  font-size: 13px;\n  color: #7C7C7C;\n}\n\n.card-body .card-icon path {\n  fill: white;\n}\n\n.card-body .card-content {\n  padding: 15px;\n}\n\n.card-body .card-list {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n}\n\n.card-section {\n  padding: 0px 70px 0px 70px;\n  margin-bottom: 30px;\n}\n\n.card-section-result {\n  padding: 25px;\n  color: white;\n  white-space: pre;\n  font: 12px/normal 'Monaco', monospace;\n  background-color: #4C4A43;\n}\n\n.card-section:last-child {\n  margin-bottom: 0px;\n}\n\n.card-section:last-child .card-section-inner {\n  border-bottom: none;\n}\n\n.card-section-inner {\n  border-bottom: 1px solid #E5E5E5;\n  padding-bottom: 30px;\n}\n\n.card-section-header {\n  position: relative;\n  margin-bottom: 20px;\n}\n\n.card-section-icon {\n  position: absolute;\n  top: 0px;\n  left: -70px;\n  width: 70px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.card-section-header-content {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n\n.card-section-header .card-section-header-text {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n\n.card-section-header i {\n  width: 20px;\n  height: 20px;\n}\n\n.card-section-header i path {\n  fill: #BFBFBF;\n}\n\n.card-section-title {\n  color: #888;\n  font-size: 14px;\n}\n\n.card-section-description {\n  font-size: 13px;\n  color: #999;\n  margin-top: 0.15em;\n}\n\n.card-header .tabs-group {\n  margin-left: 60px;\n  font-size: 13px;\n  font-weight: 400;\n  -webkit-flex: 0 0 40px;\n      -ms-flex: 0 0 40px;\n          flex: 0 0 40px;\n}\n", ""]);

/***/ },
/* 434 */,
/* 435 */,
/* 436 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var Hello = __webpack_require__(253);

	var ButtonSocialAuthList = __webpack_require__(508);
	//var ServerActions = require('../actions/ServerActions');
	//
	__webpack_require__(257);


	module.exports = React.createClass({

	  displayName: 'Signup',

	  getDefaultProps: function () {
	    return {
	      msgs: {
	        windowHeader: 'Try it now and start creating your apps right away.',
	        signupDescription: 'Your 30 day trial includes unlimited use of the Syncano platform without inputting any credit card information.',
	        signupButton: 'Sign up for free',
	        loginHere: 'Log in here',
	        alreadyAccount: 'Already have an account?',
	        bySigning: 'By signing up you agree to our',
	        terms: 'Terms of Use and Privacy Policy',
	        passwordLabel: 'Password',
	        emailLabel: 'Email',
	      },
	      socialAuthButtons: [{
	        type: 'github',
	        text: 'Sign up with Github',
	      }, {
	        type: 'google',
	        text: 'Sign up with Google',
	      }, {
	        type: 'facebook',
	        text: 'Sign up with Facebook',
	      }]
	    }
	  },

	  componentDidMount: function () {
	    this.refs.email.getDOMNode().focus();
	  },

	  getFormData: function () {
	    return {
	      email: this.refs.email.getDOMNode().value,
	      password: this.refs.password.getDOMNode().value,
	    };
	  },

	  handleSignUp: function (e) {
	    if (e.keyCode === 13 || e.type === "click") {
	      var data = this.getFormData();
	      ServerActions.registerAccount(data);
	    }
	  },

	  handleSocialButtonClick: function (button) {
	    Hello(button).login();
	  },

	  facebookSignIn: function () {
	    FB.login(function (res) {
	      if (res.status === "connected") {
	        var token = res.authResponse.accessToken;
	        ServerActions.facebookSignIn(token);
	      }
	    }.bind(this), {
	      scope: 'public_profile, email'
	    });
	  },

	  render: function () {
	    return (
	      React.createElement("div", {className: "signup-page", ref: "signupPage"}, 
	        React.createElement("div", {className: "signup"}, 
	          React.createElement("div", {className: "signup-logo"}, 
	            React.createElement("img", {src: "/img/syncano-logo.png"})
	          ), 
	          React.createElement("div", {className: "signup-content"}, 
	            React.createElement("div", {className: "signup-header"}, 
	              React.createElement("h1", null, this.props.msgs.windowHeader), 
	              React.createElement("p", null, this.props.msgs.signupDescription)
	            ), 

	            React.createElement("form", {className: "signup-input-group", acceptCharset: "UTF-8", action: "/action", method: "post"}, 
	              React.createElement("label", {htmlFor: "email"}, this.props.msgs.emailLabel), 
	              React.createElement("input", {type: "email", placeholder: "Your email", ref: "email", name: "email", autoComplete: "email", onKeyUp: this.handleSignUp}), 

	              React.createElement("label", {htmlFor: "password"}, this.props.msgs.passwordLabel), 
	              React.createElement("input", {type: "password", placeholder: "Password", ref: "password", name: "password", autoComplete: "password", onKeyUp: this.handleSignUp})
	            ), 
	            React.createElement("div", {className: "signup-options-group"}, 
	              React.createElement("div", {className: "signup-button", onClick: this.handleSignUp}, 
	                React.createElement("span", null, this.props.msgs.signupButton)
	              ), 
	              React.createElement("div", {className: "separator"}, "or"), 
	              React.createElement(ButtonSocialAuthList, {handleClick: this.handleSocialButtonClick, facebookSignIn: this.facebookSignIn})
	            ), 
	            React.createElement("div", {className: "signup-disclaimer"}, 
	              React.createElement("p", null, this.props.msgs.alreadyAccount, " ", React.createElement("a", {href: "#login"}, this.props.msgs.loginHere)), 
	              React.createElement("p", null, this.props.msgs.bySigning, " ", React.createElement("a", {href: "#"}, this.props.msgs.terms), ".")
	            )
	          )
	        )
	      )
	    );
	  }
	});


/***/ },
/* 437 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var AuthStore = __webpack_require__(255);
	var Header = __webpack_require__(438);


	module.exports = React.createClass({

	  displayName: 'AdminPageWrapper',

	  componentWillMount: function () {

	    //debugger;
	    console.log('Checking Syncano connection');
	    var token = AuthStore.getToken();
	    if (token) {
	      if (!Syncano.getInfo().account.account_key) {
	        console.log('Connecting to Syncnao!');
	        Syncano.connect(token);
	      }
	    }
	  },

	  handleBackClick: function () {
	    window.location = "#instances";
	  },


	  render: function () {
	    //var currentInstanceName = "XXX";
	    return (
	      React.createElement("div", {className: "instance-view"}, 
	        React.createElement(Header, {title: this.props.title, handleTabClick: this.handleTabClick}), 
	        this.props.children
	      )
	    );
	  }
	});





/***/ },
/* 438 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var classNames = __webpack_require__(262);

	var HeaderStore = __webpack_require__(439);
	var AuthStore = __webpack_require__(255);

	//var ViewActions   = require('../actions/ViewActions');

	var Icon = __webpack_require__(298);
	var Tabs = __webpack_require__(444);
	var ProgressBar = __webpack_require__(399);

	var HeaderOptions = __webpack_require__(447);

	__webpack_require__(477);

	module.exports = React.createClass({

	  displayName: 'Header',

	  propTypes: {
	    actions: React.PropTypes.array.isRequired,
	    title: React.PropTypes.string.isRequired,
	    icon: React.PropTypes.string,
	    //handleTabClick: React.PropTypes.func.isRequired,
	    //handleAccountMenuItemClick: React.PropTypes.func.isRequired,
	  },

	  getInitialState: function () {
	    return {
	      menu: HeaderStore.getMenu(),
	      //account: AuthStore.getAccount(),
	    }
	  },

	  getDefaultProps: function () {
	    return {
	      appLoading: false,
	      actions: [{
	        displayName: 'Account settings',
	        name: 'account'
	      }, {
	        displayName: 'Log out',
	        name: 'logout'
	      }],
	    }
	  },

	  componentDidMount: function () {
	    HeaderStore.addChangeListener(this.onChange);
	    AuthStore.addChangeListener(this.onChange);
	  },

	  componentWillUnmount: function () {
	    HeaderStore.removeChangeListener(this.onChange);
	    AuthStore.removeChangeListener(this.onChange);
	  },

	  onChange: function () {
	    this.setState({
	      menu: HeaderStore.getMenu(),
	      //account: AuthStore.getAccount(),
	    });
	  },

	  render: function () {

	    var cssClasses = classNames({
	      'header-group': true,
	      'header-group-loading': this.props.appLoading,
	    });


	    //return (<div>aaa</div> )
	    if (typeof this.props.tabs !== "undefined") {
	      var viewTab = HeaderStore.getAppView().tab;
	      return (
	        React.createElement("div", {className: cssClasses}, 
	          React.createElement("div", {className: "header-details"}, 
	            React.createElement("div", {className: "header-nav-icon", onClick: this.props.handleIconClick}, 
	              React.createElement(Icon, {icon: this.props.icon})
	            ), 
	            React.createElement("div", {className: "header-text"}, 
	              React.createElement("div", {className: "header-title"}, this.props.title)
	            ), 
	            React.createElement(HeaderOptions, React.__spread({},  this.props, {menu: this.state.menu, account: this.state.account}))
	          ), 
	          React.createElement(Tabs, React.__spread({},  this.props, {activeTab: viewTab})), 
	          React.createElement(ProgressBar, null)
	        )
	      );
	    } else {
	      return (
	        React.createElement("div", {className: cssClasses}, 
	          React.createElement("div", {className: "header-details"}, 
	            React.createElement("div", {className: "header-nav-icon"}, 
	              React.createElement(Icon, {icon: this.props.icon})
	            ), 
	            React.createElement("div", {className: "header-text"}, 
	              React.createElement("div", {className: "header-title"}, this.props.title)
	            ), 
	            React.createElement(HeaderOptions, {menu: this.state.menu, actions: this.props.actions})
	          ), 
	          React.createElement(ProgressBar, null)
	        )
	      );
	    }
	  }

	});



	//<HeaderOptions {...this.props} menu={this.state.menu} account={this.state.account} handleAccountMenuItemClick={this.handleAccountMenuItemClick}/>

/***/ },
/* 439 */
/***/ function(module, exports, __webpack_require__) {

	var Request = __webpack_require__(441);
	var assign = __webpack_require__(252);
	var EventEmitter = __webpack_require__(256).EventEmitter;
	var uuid = __webpack_require__(440);

	var AppDispatcher = __webpack_require__(248);
	//var AccountStore = require('./AccountStore');
	//var ViewActions = require('../actions/ViewActions');
	//var ServerActions = require('../actions/ServerActions');
	var Constants = __webpack_require__(297);


	var CHANGE_EVENT = 'change';

	var appView = {};
	var menuName = null;


	var HeaderStore = assign(EventEmitter.prototype, {

	  getAppView: function () {
	    return appView;
	  },

	  getMenu: function () {
	    return menuName;
	  },

	  emitChange: function () {
	    this.emit(CHANGE_EVENT);
	  },

	  addChangeListener: function (callback) {
	    this.on(CHANGE_EVENT, callback);
	  },

	  removeChangeListener: function (callback) {
	    this.removeListener(CHANGE_EVENT, callback)
	  },

	});

	HeaderStore.dispatchToken = AppDispatcher.register(function (payload) {

	  HeaderStore.emitChange();

	});

	module.exports = HeaderStore;

/***/ },
/* 440 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	(function() {
	  var _global = this;

	  // Unique ID creation requires a high quality random # generator.  We feature
	  // detect to determine the best RNG source, normalizing to a function that
	  // returns 128-bits of randomness, since that's what's usually required
	  var _rng;

	  // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
	  //
	  // Moderately fast, high quality
	  if (typeof(_global.require) == 'function') {
	    try {
	      var _rb = _global.require('crypto').randomBytes;
	      _rng = _rb && function() {return _rb(16);};
	    } catch(e) {}
	  }

	  if (!_rng && _global.crypto && crypto.getRandomValues) {
	    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	    //
	    // Moderately fast, high quality
	    var _rnds8 = new Uint8Array(16);
	    _rng = function whatwgRNG() {
	      crypto.getRandomValues(_rnds8);
	      return _rnds8;
	    };
	  }

	  if (!_rng) {
	    // Math.random()-based (RNG)
	    //
	    // If all else fails, use Math.random().  It's fast, but is of unspecified
	    // quality.
	    var  _rnds = new Array(16);
	    _rng = function() {
	      for (var i = 0, r; i < 16; i++) {
	        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	      }

	      return _rnds;
	    };
	  }

	  // Buffer class to use
	  var BufferClass = typeof(_global.Buffer) == 'function' ? _global.Buffer : Array;

	  // Maps for number <-> hex string conversion
	  var _byteToHex = [];
	  var _hexToByte = {};
	  for (var i = 0; i < 256; i++) {
	    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	    _hexToByte[_byteToHex[i]] = i;
	  }

	  // **`parse()` - Parse a UUID into it's component bytes**
	  function parse(s, buf, offset) {
	    var i = (buf && offset) || 0, ii = 0;

	    buf = buf || [];
	    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	      if (ii < 16) { // Don't overflow!
	        buf[i + ii++] = _hexToByte[oct];
	      }
	    });

	    // Zero out remaining bytes if string was short
	    while (ii < 16) {
	      buf[i + ii++] = 0;
	    }

	    return buf;
	  }

	  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	  function unparse(buf, offset) {
	    var i = offset || 0, bth = _byteToHex;
	    return  bth[buf[i++]] + bth[buf[i++]] +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] + '-' +
	            bth[buf[i++]] + bth[buf[i++]] +
	            bth[buf[i++]] + bth[buf[i++]] +
	            bth[buf[i++]] + bth[buf[i++]];
	  }

	  // **`v1()` - Generate time-based UUID**
	  //
	  // Inspired by https://github.com/LiosK/UUID.js
	  // and http://docs.python.org/library/uuid.html

	  // random #'s we need to init node and clockseq
	  var _seedBytes = _rng();

	  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	  var _nodeId = [
	    _seedBytes[0] | 0x01,
	    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	  ];

	  // Per 4.2.2, randomize (14 bit) clockseq
	  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	  // Previous uuid creation time
	  var _lastMSecs = 0, _lastNSecs = 0;

	  // See https://github.com/broofa/node-uuid for API details
	  function v1(options, buf, offset) {
	    var i = buf && offset || 0;
	    var b = buf || [];

	    options = options || {};

	    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

	    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

	    // Per 4.2.1.2, use count of uuid's generated during the current clock
	    // cycle to simulate higher resolution clock
	    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

	    // Time since last uuid creation (in msecs)
	    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	    // Per 4.2.1.2, Bump clockseq on clock regression
	    if (dt < 0 && options.clockseq == null) {
	      clockseq = clockseq + 1 & 0x3fff;
	    }

	    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	    // time interval
	    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
	      nsecs = 0;
	    }

	    // Per 4.2.1.2 Throw error if too many uuids are requested
	    if (nsecs >= 10000) {
	      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	    }

	    _lastMSecs = msecs;
	    _lastNSecs = nsecs;
	    _clockseq = clockseq;

	    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	    msecs += 12219292800000;

	    // `time_low`
	    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	    b[i++] = tl >>> 24 & 0xff;
	    b[i++] = tl >>> 16 & 0xff;
	    b[i++] = tl >>> 8 & 0xff;
	    b[i++] = tl & 0xff;

	    // `time_mid`
	    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	    b[i++] = tmh >>> 8 & 0xff;
	    b[i++] = tmh & 0xff;

	    // `time_high_and_version`
	    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	    b[i++] = tmh >>> 16 & 0xff;

	    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	    b[i++] = clockseq >>> 8 | 0x80;

	    // `clock_seq_low`
	    b[i++] = clockseq & 0xff;

	    // `node`
	    var node = options.node || _nodeId;
	    for (var n = 0; n < 6; n++) {
	      b[i + n] = node[n];
	    }

	    return buf ? buf : unparse(b);
	  }

	  // **`v4()` - Generate random UUID**

	  // See https://github.com/broofa/node-uuid for API details
	  function v4(options, buf, offset) {
	    // Deprecated - 'format' argument, as supported in v1.2
	    var i = buf && offset || 0;

	    if (typeof(options) == 'string') {
	      buf = options == 'binary' ? new BufferClass(16) : null;
	      options = null;
	    }
	    options = options || {};

	    var rnds = options.random || (options.rng || _rng)();

	    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	    rnds[6] = (rnds[6] & 0x0f) | 0x40;
	    rnds[8] = (rnds[8] & 0x3f) | 0x80;

	    // Copy bytes to buffer, if provided
	    if (buf) {
	      for (var ii = 0; ii < 16; ii++) {
	        buf[i + ii] = rnds[ii];
	      }
	    }

	    return buf || unparse(rnds);
	  }

	  // Export public API
	  var uuid = v4;
	  uuid.v1 = v1;
	  uuid.v4 = v4;
	  uuid.parse = parse;
	  uuid.unparse = unparse;
	  uuid.BufferClass = BufferClass;

	  if (typeof(module) != 'undefined' && module.exports) {
	    // Publish as node.js module
	    module.exports = uuid;
	  } else  if (true) {
	    // Publish as AMD module
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {return uuid;}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	 

	  } else {
	    // Publish as global (in browsers)
	    var _previousRoot = _global.uuid;

	    // **`noConflict()` - (browser only) to reset global 'uuid' var**
	    uuid.noConflict = function() {
	      _global.uuid = _previousRoot;
	      return uuid;
	    };

	    _global.uuid = uuid;
	  }
	}).call(this);


/***/ },
/* 441 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(442);
	var reduce = __webpack_require__(443);

	/**
	 * Root reference for iframes.
	 */

	var root = 'undefined' == typeof window
	  ? this
	  : window;

	/**
	 * Noop.
	 */

	function noop(){};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isHost(obj) {
	  var str = {}.toString.call(obj);

	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}

	/**
	 * Determine XHR.
	 */

	function getXHR() {
	  if (root.XMLHttpRequest
	    && ('file:' != root.location.protocol || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  return false;
	}

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return obj === Object(obj);
	}

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pairs.push(encodeURIComponent(key)
	        + '=' + encodeURIComponent(obj[key]));
	    }
	  }
	  return pairs.join('&');
	}

	/**
	 * Expose serialization method.
	 */

	 request.serializeObject = serialize;

	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var parts;
	  var pair;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    parts = pair.split('=');
	    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };

	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  lines.pop(); // trailing CRLF

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function type(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function params(str){
	  return reduce(str.split(/ *; */), function(obj, str){
	    var parts = str.split(/ *= */)
	      , key = parts.shift()
	      , val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  this.text = this.req.method !='HEAD' 
	     ? this.xhr.responseText 
	     : null;
	  this.setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this.setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this.parseBody(this.text)
	    : null;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	Response.prototype.setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);

	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype.parseBody = function(str){
	  var parse = request.parse[this.type];
	  return parse && str && str.length
	    ? parse(str)
	    : null;
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	Response.prototype.setStatusProperties = function(status){
	  var type = status / 100 | 0;

	  // status / class
	  this.status = status;
	  this.statusType = type;

	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;

	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status || 1223 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  Emitter.call(this);
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {};
	  this._header = {};
	  this.on('end', function(){
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self); 
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	    }

	    self.callback(err, res);
	  });
	}

	/**
	 * Mixin `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Allow for extension
	 */

	Request.prototype.use = function(fn) {
	  fn(this);
	  return this;
	}

	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.timeout = function(ms){
	  this._timeout = ms;
	  return this;
	};

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.clearTimeout = function(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */

	Request.prototype.abort = function(){
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Get case-insensitive header `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 */

	Request.prototype.getHeader = function(field){
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass){
	  var str = btoa(user + ':' + pass);
	  this.set('Authorization', 'Basic ' + str);
	  return this;
	};

	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/

	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.field = function(name, val){
	  if (!this._formData) this._formData = new FormData();
	  this._formData.append(name, val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, filename){
	  if (!this._formData) this._formData = new FormData();
	  this._formData.append(field, file, filename);
	  return this;
	};

	/**
	 * Send `data`, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // querystring
	 *       request.get('/search')
	 *         .end(callback)
	 *
	 *       // multiple data "writes"
	 *       request.get('/search')
	 *         .send({ search: 'query' })
	 *         .send({ range: '1..5' })
	 *         .send({ order: 'desc' })
	 *         .end(callback)
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"})
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	  *      request.post('/user')
	  *        .send('name=tobi')
	  *        .send('species=ferret')
	  *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.send = function(data){
	  var obj = isObject(data);
	  var type = this.getHeader('Content-Type');

	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    if (!type) this.type('form');
	    type = this.getHeader('Content-Type');
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!obj) return this;
	  if (!type) this.type('json');
	  return this;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  if (2 == fn.length) return fn(err, res);
	  if (err) return this.emit('error', err);
	  fn(res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function(){
	  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
	  err.crossDomain = true;
	  this.callback(err);
	};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	Request.prototype.timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	Request.prototype.withCredentials = function(){
	  this._withCredentials = true;
	  return this;
	};

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = getXHR();
	  var query = this._query.join('&');
	  var timeout = this._timeout;
	  var data = this._formData || this._data;

	  // store callback
	  this._callback = fn || noop;

	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;
	    if (0 == xhr.status) {
	      if (self.aborted) return self.timeoutError();
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  if (xhr.upload) {
	    xhr.upload.onprogress = function(e){
	      e.percent = e.loaded / e.total * 100;
	      self.emit('progress', e);
	    };
	  }

	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.abort();
	    }, timeout);
	  }

	  // querystring
	  if (query) {
	    query = request.serializeObject(query);
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }

	  // initiate request
	  xhr.open(this.method, this.url, true);

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
	    // serialize stuff
	    var serialize = request.serialize[this.getHeader('Content-Type')];
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }

	  // send stuff
	  this.emit('request', this);
	  xhr.send(data);
	  return this;
	};

	/**
	 * Expose `Request`.
	 */

	request.Request = Request;

	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */

	function request(method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new Request('GET', method).end(url);
	  }

	  // url first
	  if (1 == arguments.length) {
	    return new Request('GET', method);
	  }

	  return new Request(method, url);
	}

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.del = function(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * Expose `request`.
	 */

	module.exports = request;


/***/ },
/* 442 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};

	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 443 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Reduce `arr` with `fn`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Mixed} initial
	 *
	 * TODO: combatible error handling?
	 */

	module.exports = function(arr, fn, initial){  
	  var idx = 0;
	  var len = arr.length;
	  var curr = arguments.length == 3
	    ? initial
	    : arr[idx++];

	  while (idx < len) {
	    curr = fn.call(null, curr, arr[idx], ++idx, arr);
	  }
	  
	  return curr;
	};

/***/ },
/* 444 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var classNames = __webpack_require__(262);

	__webpack_require__(445);


	var Tab = React.createClass({

	  displayName: 'Tab',

	  handleClick: function() {
	    this.props.handleTabClick(this.props.tab.path || this.props.tab.name)
	  },

	  render: function() {
	    var cssClasses = classNames('tab', {
	      'tab-active': this.props.active,
	    });
	    return (
	      React.createElement("div", {className: cssClasses, onClick: this.handleClick}, 
	        React.createElement("span", null, this.props.tab.displayName)
	      )
	    );
	  }

	});

	module.exports = React.createClass({

	  displayName: 'Tabs',

	  render: function() {
	    var tabs = this.props.tabs.map(function(tab){
	      var active = tab.name === this.props.activeTab;
	      return React.createElement(Tab, React.__spread({},  this.props, {ref: "tab", key: tab.name, tab: tab, active: active}))
	    }.bind(this));
	    return (
	      React.createElement("div", {className: "tabs-group", ref: "tabs"}, 
	        tabs
	      )
	    );
	  }

	});

/***/ },
/* 445 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(446);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Tabs/Tabs.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/Tabs/Tabs.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 446 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, ".tabs-group {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  text-transform: uppercase;\n  font-size: 14px;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n  -webkit-align-self: flex-start;\n      -ms-flex-item-align: start;\n          align-self: flex-start; \n}\n\n.tab {\n  margin: 0 10px;\n  text-align: center;\n  white-space: nowrap;\n  padding: 0 10px;\n  height: 40px;\n  border-bottom: 3px solid transparent;\n  cursor: pointer;\n  transition: 125ms all;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  color: #A8A8A8;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-flex-grow: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -webkit-flex-shrink: 0;\n      -ms-flex-negative: 0;\n          flex-shrink: 0;\n}\n\n.tab:first-child {\n  margin-left: 0;\n}\n\n.tab:hover {\n  color: #0091EA;\n}\n\n.tab.tab-active {\n  border-bottom: 3px solid #0091EA;\n  color: #0091EA;\n}", ""]);

/***/ },
/* 447 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(275);
	var classNames = __webpack_require__(262);
	var Gravatar = __webpack_require__(448);

	var AuthAppStore = __webpack_require__(255);
	var AuthAppActions = __webpack_require__(247);

	var Icon = __webpack_require__(298);
	var DropdownMenuItem = __webpack_require__(394);


	//var ViewActions = require('../actions/ViewActions');
	var InvitationsMenuItem = __webpack_require__(475);

	var Mixins = __webpack_require__(393);


	module.exports = React.createClass({

	  displayName: 'HeaderOptions',

	  mixins: [
	    __webpack_require__(476),
	    Mixins.toggleMenuMixin
	  ],

	  propTypes: {
	    menu: React.PropTypes.array.isRequired,
	  },

	  getInitialState: function () {
	    return {
	      accountMenu: false,
	      notificationMenu: false,
	      toggleArgs: ['accountMenu', 'notificationMenu']
	    }
	  },

	  handleAccountMenuItemClick: function (action) {
	    //debugger;
	    console.log('handleAccountMenuItemClick', action);
	    if (action === "logout") {
	      AuthAppActions.logOut();
	    } else if (action === "account") {
	      window.location.href = '#account';
	    }
	  },

	  onOptionsClick: function (click) {
	    console.log(click);
	  },

	  render: function () {

	    var cssClasses = classNames({
	      'header-options': true,
	      'account-menu-visible': this.state.accountMenu,
	      'notifications-menu-visible': this.state.notificationMenu,
	    });

	    var items = this.props.actions.map(function (action, i) {
	      return React.createElement(DropdownMenuItem, {key: i, action: action, handleClick: this.handleAccountMenuItemClick})
	    }.bind(this));

	    //var notificationItems = this.props.invitations.filter(function (invitation) {
	    //  return invitation.state === "new";
	    //}).map(function (invitation, i) {
	    //  return <InvitationsMenuItem key={i} invitation={invitation} />
	    //});

	    var notificationItems = [];

	    var gravatarUrl = Gravatar.url(AuthAppStore.getAccountInfo('email'), {s: '50'}, true);
	    var fullname = AuthAppStore.getAccountInfo('first_name') + ' ' + AuthAppStore.getAccountInfo('last_name');

	    var notificationIcon = notificationItems.length > 0 ? 'notifications' : 'notifications-none';

	    // Search
	    //
	    //<div className="header-option-button">
	    //  <Icon type="search" />
	    //</div>

	    return (
	      React.createElement("div", {className: cssClasses}, 
	        React.createElement("div", {className: "header-option"}
	        ), 
	        React.createElement("div", {className: "header-option", onClick: this.toggleMenu.bind(this, 'notificationMenu')}, 
	          React.createElement("div", {className: "header-option-button"}, 
	            React.createElement(Icon, {icon: notificationIcon, glowing: notificationItems.length > 0})
	          ), 
	          React.createElement("div", {className: "dropdown-menu notifications-menu"}, 
	            React.createElement("div", {className: "dropdown-menu-section"}, 
	              notificationItems
	            )
	          )
	        ), 
	        React.createElement("div", {className: "header-option", onClick: this.onOptionsClick}, 
	          React.createElement("div", {className: "header-option-button", onClick: this.toggleMenu.bind(this, 'accountMenu')}, 
	            React.createElement(Icon, {icon: "more-vert"})
	          ), 
	          React.createElement("div", {className: "dropdown-menu account-menu"}, 
	            React.createElement("div", {className: "dropdown-menu-section"}, 
	              React.createElement("div", {className: "account-group"}, 
	                React.createElement("div", {className: "account-image"}, 
	                  React.createElement("img", {src: gravatarUrl})
	                ), 
	                React.createElement("div", {className: "account-text"}, 
	                  React.createElement("div", {className: "account-name"}, fullname), 
	                  React.createElement("div", {className: "account-email"}, AuthAppStore.getAccountInfo('email'))
	                )
	              )
	            ), 
	            React.createElement("div", {className: "dropdown-menu-section"}, 
	              items
	            )
	          )
	        )
	      )
	    );
	  }

	});



/***/ },
/* 448 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(449);


/***/ },
/* 449 */
/***/ function(module, exports, __webpack_require__) {

	var crypto = __webpack_require__(450)
	  , querystring = __webpack_require__(472);

	var gravatar = module.exports = {
	    url: function (email, options, protocol) {
	      email = email || 'unspecified';
	      var baseURL;

	      if(typeof protocol === 'undefined'){
	        baseURL = "//www.gravatar.com/avatar/";
	      } else {
	        baseURL = protocol ? "https://secure.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
	      }

	      var queryData = querystring.stringify(options);
	      var query = (queryData && "?" + queryData) || "";

	      return baseURL + crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex') + query;
	    }
	};


/***/ },
/* 450 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(455)

	function error () {
	  var m = [].slice.call(arguments).join(' ')
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	    ].join('\n'))
	}

	exports.createHash = __webpack_require__(457)

	exports.createHmac = __webpack_require__(469)

	exports.randomBytes = function(size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)))
	    } catch (err) { callback(err) }
	  } else {
	    return new Buffer(rng(size))
	  }
	}

	function each(a, f) {
	  for(var i in a)
	    f(a[i], i)
	}

	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160']
	}

	var p = __webpack_require__(470)(exports)
	exports.pbkdf2 = p.pbkdf2
	exports.pbkdf2Sync = p.pbkdf2Sync


	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials'
	, 'createCipher'
	, 'createCipheriv'
	, 'createDecipher'
	, 'createDecipheriv'
	, 'createSign'
	, 'createVerify'
	, 'createDiffieHellman'
	], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet')
	  }
	})

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(451).Buffer))

/***/ },
/* 451 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var base64 = __webpack_require__(452)
	var ieee754 = __webpack_require__(453)
	var isArray = __webpack_require__(454)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var kMaxLength = 0x3fffffff
	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
	    return fromTypedArray(that, object)
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength.toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = String(string)

	  if (string.length === 0) return 0

	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      return string.length
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return string.length * 2
	    case 'hex':
	      return string.length >>> 1
	    case 'utf8':
	    case 'utf-8':
	      return utf8ToBytes(string).length
	    case 'base64':
	      return base64ToBytes(string).length
	    default:
	      return string.length
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	// toString(encoding, start=0, end=buffer.length)
	Buffer.prototype.toString = function toString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }

	  return res + decodeUtf8Char(tmp)
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start

	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	  var i = 0

	  for (; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (leadSurrogate) {
	        // 2 leads in a row
	        if (codePoint < 0xDC00) {
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          leadSurrogate = codePoint
	          continue
	        } else {
	          // valid surrogate pair
	          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	          leadSurrogate = null
	        }
	      } else {
	        // no lead yet

	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else {
	          // valid lead
	          leadSurrogate = codePoint
	          continue
	        }
	      }
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	      leadSurrogate = null
	    }

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x200000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(451).Buffer))

/***/ },
/* 452 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ },
/* 453 */
/***/ function(module, exports, __webpack_require__) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = -7,
	      i = isLE ? (nBytes - 1) : 0,
	      d = isLE ? -1 : 1,
	      s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	      i = isLE ? 0 : (nBytes - 1),
	      d = isLE ? 1 : -1,
	      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 454 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 455 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	  var g = ('undefined' === typeof window ? global : window) || {}
	  _crypto = (
	    g.crypto || g.msCrypto || __webpack_require__(456)
	  )
	  module.exports = function(size) {
	    // Modern Browsers
	    if(_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */
	    
	      _crypto.getRandomValues(bytes);
	      return bytes;
	    }
	    else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size)
	    }
	    else
	      throw new Error(
	        'secure random number generation not supported by this browser\n'+
	        'use chrome, FireFox or Internet Explorer 11'
	      )
	  }
	}())

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(451).Buffer))

/***/ },
/* 456 */
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

/***/ },
/* 457 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(458)

	var md5 = toConstructor(__webpack_require__(466))
	var rmd160 = toConstructor(__webpack_require__(468))

	function toConstructor (fn) {
	  return function () {
	    var buffers = []
	    var m= {
	      update: function (data, enc) {
	        if(!Buffer.isBuffer(data)) data = new Buffer(data, enc)
	        buffers.push(data)
	        return this
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers)
	        var r = fn(buf)
	        buffers = null
	        return enc ? r.toString(enc) : r
	      }
	    }
	    return m
	  }
	}

	module.exports = function (alg) {
	  if('md5' === alg) return new md5()
	  if('rmd160' === alg) return new rmd160()
	  return createHash(alg)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(451).Buffer))

/***/ },
/* 458 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg]
	  if(!Alg) throw new Error(alg + ' is not supported (we accept pull requests)')
	  return new Alg()
	}

	var Buffer = __webpack_require__(451).Buffer
	var Hash   = __webpack_require__(459)(Buffer)

	exports.sha1 = __webpack_require__(460)(Buffer, Hash)
	exports.sha256 = __webpack_require__(464)(Buffer, Hash)
	exports.sha512 = __webpack_require__(465)(Buffer, Hash)


/***/ },
/* 459 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (Buffer) {

	  //prototype class for hash functions
	  function Hash (blockSize, finalSize) {
	    this._block = new Buffer(blockSize) //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize
	    this._blockSize = blockSize
	    this._len = 0
	    this._s = 0
	  }

	  Hash.prototype.init = function () {
	    this._s = 0
	    this._len = 0
	  }

	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8"
	      data = new Buffer(data, enc)
	    }

	    var l = this._len += data.length
	    var s = this._s = (this._s || 0)
	    var f = 0
	    var buffer = this._block

	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
	      var ch = (t - f)

	      for (var i = 0; i < ch; i++) {
	        buffer[(s % this._blockSize) + i] = data[i + f]
	      }

	      s += ch
	      f += ch

	      if ((s % this._blockSize) === 0) {
	        this._update(buffer)
	      }
	    }
	    this._s = s

	    return this
	  }

	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8

	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80

	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1)

	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block)
	      this._block.fill(0)
	    }

	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4)

	    var hash = this._update(this._block) || this._hash()

	    return enc ? hash.toString(enc) : hash
	  }

	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass')
	  }

	  return Hash
	}


/***/ },
/* 460 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */

	var inherits = __webpack_require__(461).inherits

	module.exports = function (Buffer, Hash) {

	  var A = 0|0
	  var B = 4|0
	  var C = 8|0
	  var D = 12|0
	  var E = 16|0

	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80)

	  var POOL = []

	  function Sha1 () {
	    if(POOL.length)
	      return POOL.pop().init()

	    if(!(this instanceof Sha1)) return new Sha1()
	    this._w = W
	    Hash.call(this, 16*4, 14*4)

	    this._h = null
	    this.init()
	  }

	  inherits(Sha1, Hash)

	  Sha1.prototype.init = function () {
	    this._a = 0x67452301
	    this._b = 0xefcdab89
	    this._c = 0x98badcfe
	    this._d = 0x10325476
	    this._e = 0xc3d2e1f0

	    Hash.prototype.init.call(this)
	    return this
	  }

	  Sha1.prototype._POOL = POOL
	  Sha1.prototype._update = function (X) {

	    var a, b, c, d, e, _a, _b, _c, _d, _e

	    a = _a = this._a
	    b = _b = this._b
	    c = _c = this._c
	    d = _d = this._d
	    e = _e = this._e

	    var w = this._w

	    for(var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j*4)
	        : rol(w[j - 3] ^ w[j -  8] ^ w[j - 14] ^ w[j - 16], 1)

	      var t = add(
	        add(rol(a, 5), sha1_ft(j, b, c, d)),
	        add(add(e, W), sha1_kt(j))
	      )

	      e = d
	      d = c
	      c = rol(b, 30)
	      b = a
	      a = t
	    }

	    this._a = add(a, _a)
	    this._b = add(b, _b)
	    this._c = add(c, _c)
	    this._d = add(d, _d)
	    this._e = add(e, _e)
	  }

	  Sha1.prototype._hash = function () {
	    if(POOL.length < 100) POOL.push(this)
	    var H = new Buffer(20)
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a|0, A)
	    H.writeInt32BE(this._b|0, B)
	    H.writeInt32BE(this._c|0, C)
	    H.writeInt32BE(this._d|0, D)
	    H.writeInt32BE(this._e|0, E)
	    return H
	  }

	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if(t < 20) return (b & c) | ((~b) & d);
	    if(t < 40) return b ^ c ^ d;
	    if(t < 60) return (b & c) | (b & d) | (c & d);
	    return b ^ c ^ d;
	  }

	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	           (t < 60) ? -1894007588 : -899497514;
	  }

	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return (x + y ) | 0
	  //lets see how this goes on testling.
	  //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  //  return (msw << 16) | (lsw & 0xFFFF);
	  }

	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	  }

	  return Sha1
	}


/***/ },
/* 461 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(462);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(463);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(6)))

/***/ },
/* 462 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 463 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 464 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */

	var inherits = __webpack_require__(461).inherits

	module.exports = function (Buffer, Hash) {

	  var K = [
	      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	      0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	      0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	      0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	      0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	      0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	      0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	      0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	      0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	      0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	      0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	    ]

	  var W = new Array(64)

	  function Sha256() {
	    this.init()

	    this._w = W //new Array(64)

	    Hash.call(this, 16*4, 14*4)
	  }

	  inherits(Sha256, Hash)

	  Sha256.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, n) {
	    return (X >>> n) | (X << (32 - n));
	  }

	  function R (X, n) {
	    return (X >>> n);
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  function Sigma0256 (x) {
	    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	  }

	  function Sigma1256 (x) {
	    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	  }

	  function Gamma0256 (x) {
	    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	  }

	  function Gamma1256 (x) {
	    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	  }

	  Sha256.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var T1, T2

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16
	        ? M.readInt32BE(j * 4)
	        : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16]

	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w

	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g; g = f; f = e; e = d + T1; d = c; c = b; b = a; a = T1 + T2;
	    }

	    this._a = (a + this._a) | 0
	    this._b = (b + this._b) | 0
	    this._c = (c + this._c) | 0
	    this._d = (d + this._d) | 0
	    this._e = (e + this._e) | 0
	    this._f = (f + this._f) | 0
	    this._g = (g + this._g) | 0
	    this._h = (h + this._h) | 0

	  };

	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32)

	    H.writeInt32BE(this._a,  0)
	    H.writeInt32BE(this._b,  4)
	    H.writeInt32BE(this._c,  8)
	    H.writeInt32BE(this._d, 12)
	    H.writeInt32BE(this._e, 16)
	    H.writeInt32BE(this._f, 20)
	    H.writeInt32BE(this._g, 24)
	    H.writeInt32BE(this._h, 28)

	    return H
	  }

	  return Sha256

	}


/***/ },
/* 465 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(461).inherits

	module.exports = function (Buffer, Hash) {
	  var K = [
	    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	  ]

	  var W = new Array(160)

	  function Sha512() {
	    this.init()
	    this._w = W

	    Hash.call(this, 128, 112)
	  }

	  inherits(Sha512, Hash)

	  Sha512.prototype.init = function () {

	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0

	    this._al = 0xf3bcc908|0
	    this._bl = 0x84caa73b|0
	    this._cl = 0xfe94f82b|0
	    this._dl = 0x5f1d36f1|0
	    this._el = 0xade682d1|0
	    this._fl = 0x2b3e6c1f|0
	    this._gl = 0xfb41bd6b|0
	    this._hl = 0x137e2179|0

	    this._len = this._s = 0

	    return this
	  }

	  function S (X, Xl, n) {
	    return (X >>> n) | (Xl << (32 - n))
	  }

	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }

	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }

	  Sha512.prototype._update = function(M) {

	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var al, bl, cl, dl, el, fl, gl, hl

	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0

	    al = this._al | 0
	    bl = this._bl | 0
	    cl = this._cl | 0
	    dl = this._dl | 0
	    el = this._el | 0
	    fl = this._fl | 0
	    gl = this._gl | 0
	    hl = this._hl | 0

	    for (var i = 0; i < 80; i++) {
	      var j = i * 2

	      var Wi, Wil

	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4)
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4)

	      } else {
	        var x  = W[j - 15*2]
	        var xl = W[j - 15*2 + 1]
	        var gamma0  = S(x, xl, 1) ^ S(x, xl, 8) ^ (x >>> 7)
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7)

	        x  = W[j - 2*2]
	        xl = W[j - 2*2 + 1]
	        var gamma1  = S(x, xl, 19) ^ S(xl, x, 29) ^ (x >>> 6)
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6)

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[j - 7*2]
	        var Wi7l = W[j - 7*2 + 1]

	        var Wi16  = W[j - 16*2]
	        var Wi16l = W[j - 16*2 + 1]

	        Wil = gamma0l + Wi7l
	        Wi  = gamma0  + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
	        Wil = Wil + gamma1l
	        Wi  = Wi  + gamma1  + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
	        Wil = Wil + Wi16l
	        Wi  = Wi  + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)

	        W[j] = Wi
	        W[j + 1] = Wil
	      }

	      var maj = Maj(a, b, c)
	      var majl = Maj(al, bl, cl)

	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7)
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7)
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9)
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9)

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j]
	      var Kil = K[j + 1]

	      var ch = Ch(e, f, g)
	      var chl = Ch(el, fl, gl)

	      var t1l = hl + sigma1l
	      var t1 = h + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0)
	      t1l = t1l + chl
	      t1 = t1 + ch + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0)
	      t1l = t1l + Kil
	      t1 = t1 + Ki + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0)
	      t1l = t1l + Wil
	      t1 = t1 + Wi + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0)

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl
	      var t2 = sigma0h + maj + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0)

	      h  = g
	      hl = gl
	      g  = f
	      gl = fl
	      f  = e
	      fl = el
	      el = (dl + t1l) | 0
	      e  = (d + t1 + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	      d  = c
	      dl = cl
	      c  = b
	      cl = bl
	      b  = a
	      bl = al
	      al = (t1l + t2l) | 0
	      a  = (t1 + t2 + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0
	    }

	    this._al = (this._al + al) | 0
	    this._bl = (this._bl + bl) | 0
	    this._cl = (this._cl + cl) | 0
	    this._dl = (this._dl + dl) | 0
	    this._el = (this._el + el) | 0
	    this._fl = (this._fl + fl) | 0
	    this._gl = (this._gl + gl) | 0
	    this._hl = (this._hl + hl) | 0

	    this._a = (this._a + a + ((this._al >>> 0) < (al >>> 0) ? 1 : 0)) | 0
	    this._b = (this._b + b + ((this._bl >>> 0) < (bl >>> 0) ? 1 : 0)) | 0
	    this._c = (this._c + c + ((this._cl >>> 0) < (cl >>> 0) ? 1 : 0)) | 0
	    this._d = (this._d + d + ((this._dl >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	    this._e = (this._e + e + ((this._el >>> 0) < (el >>> 0) ? 1 : 0)) | 0
	    this._f = (this._f + f + ((this._fl >>> 0) < (fl >>> 0) ? 1 : 0)) | 0
	    this._g = (this._g + g + ((this._gl >>> 0) < (gl >>> 0) ? 1 : 0)) | 0
	    this._h = (this._h + h + ((this._hl >>> 0) < (hl >>> 0) ? 1 : 0)) | 0
	  }

	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64)

	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset)
	      H.writeInt32BE(l, offset + 4)
	    }

	    writeInt64BE(this._a, this._al, 0)
	    writeInt64BE(this._b, this._bl, 8)
	    writeInt64BE(this._c, this._cl, 16)
	    writeInt64BE(this._d, this._dl, 24)
	    writeInt64BE(this._e, this._el, 32)
	    writeInt64BE(this._f, this._fl, 40)
	    writeInt64BE(this._g, this._gl, 48)
	    writeInt64BE(this._h, this._hl, 56)

	    return H
	  }

	  return Sha512

	}


/***/ },
/* 466 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	var helpers = __webpack_require__(467);

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;

	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;

	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;

	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);

	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}

	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};


/***/ },
/* 467 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
	var chrsz = 8;

	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }

	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}

	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}

	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}

	module.exports = { hash: hash };

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(451).Buffer))

/***/ },
/* 468 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160



	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	// Constants table
	var zl = [
	    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
	var zr = [
	    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
	var sl = [
	     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
	var sr = [
	    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];

	var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];

	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words;
	};

	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes;
	};

	var processBlock = function (H, M, offset) {

	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];

	    // Swap
	    M[offset_i] = (
	        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	    );
	  }

	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;

	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = (al +  M[offset+zl[i]])|0;
	    if (i<16){
	        t +=  f1(bl,cl,dl) + hl[0];
	    } else if (i<32) {
	        t +=  f2(bl,cl,dl) + hl[1];
	    } else if (i<48) {
	        t +=  f3(bl,cl,dl) + hl[2];
	    } else if (i<64) {
	        t +=  f4(bl,cl,dl) + hl[3];
	    } else {// if (i<80) {
	        t +=  f5(bl,cl,dl) + hl[4];
	    }
	    t = t|0;
	    t =  rotl(t,sl[i]);
	    t = (t+el)|0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;

	    t = (ar + M[offset+zr[i]])|0;
	    if (i<16){
	        t +=  f5(br,cr,dr) + hr[0];
	    } else if (i<32) {
	        t +=  f4(br,cr,dr) + hr[1];
	    } else if (i<48) {
	        t +=  f3(br,cr,dr) + hr[2];
	    } else if (i<64) {
	        t +=  f2(br,cr,dr) + hr[3];
	    } else {// if (i<80) {
	        t +=  f1(br,cr,dr) + hr[4];
	    }
	    t = t|0;
	    t =  rotl(t,sr[i]) ;
	    t = (t+er)|0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t    = (H[1] + cl + dr)|0;
	  H[1] = (H[2] + dl + er)|0;
	  H[2] = (H[3] + el + ar)|0;
	  H[3] = (H[4] + al + br)|0;
	  H[4] = (H[0] + bl + cr)|0;
	  H[0] =  t;
	};

	function f1(x, y, z) {
	  return ((x) ^ (y) ^ (z));
	}

	function f2(x, y, z) {
	  return (((x)&(y)) | ((~x)&(z)));
	}

	function f3(x, y, z) {
	  return (((x) | (~(y))) ^ (z));
	}

	function f4(x, y, z) {
	  return (((x) & (z)) | ((y)&(~(z))));
	}

	function f5(x, y, z) {
	  return ((x) ^ ((y) |(~(z))));
	}

	function rotl(x,n) {
	  return (x<<n) | (x>>>(32-n));
	}

	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];

	  if (typeof message == 'string')
	    message = new Buffer(message, 'utf8');

	  var m = bytesToWords(message);

	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;

	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	  );

	  for (var i=0 ; i<m.length; i += 16) {
	    processBlock(H, m, i);
	  }

	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	      // Shortcut
	    var H_i = H[i];

	    // Swap
	    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	  }

	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(451).Buffer))

/***/ },
/* 469 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(457)

	var zeroBuffer = new Buffer(128)
	zeroBuffer.fill(0)

	module.exports = Hmac

	function Hmac (alg, key) {
	  if(!(this instanceof Hmac)) return new Hmac(alg, key)
	  this._opad = opad
	  this._alg = alg

	  var blocksize = (alg === 'sha512') ? 128 : 64

	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key

	  if(key.length > blocksize) {
	    key = createHash(alg).update(key).digest()
	  } else if(key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize)
	  }

	  var ipad = this._ipad = new Buffer(blocksize)
	  var opad = this._opad = new Buffer(blocksize)

	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36
	    opad[i] = key[i] ^ 0x5C
	  }

	  this._hash = createHash(alg).update(ipad)
	}

	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc)
	  return this
	}

	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest()
	  return createHash(this._alg).update(this._opad).update(h).digest(enc)
	}


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(451).Buffer))

/***/ },
/* 470 */
/***/ function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(471)

	module.exports = function (crypto, exports) {
	  exports = exports || {}

	  var exported = pbkdf2Export(crypto)

	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync

	  return exports
	}


/***/ },
/* 471 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function(crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest
	      digest = undefined
	    }

	    if ('function' !== typeof callback)
	      throw new Error('No callback provided to pbkdf2')

	    setTimeout(function() {
	      var result

	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest)
	      } catch (e) {
	        return callback(e)
	      }

	      callback(undefined, result)
	    })
	  }

	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations)
	      throw new TypeError('Iterations not a number')

	    if (iterations < 0)
	      throw new TypeError('Bad iterations')

	    if ('number' !== typeof keylen)
	      throw new TypeError('Key length not a number')

	    if (keylen < 0)
	      throw new TypeError('Bad key length')

	    digest = digest || 'sha1'

	    if (!Buffer.isBuffer(password)) password = new Buffer(password)
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt)

	    var hLen, l = 1, r, T
	    var DK = new Buffer(keylen)
	    var block1 = new Buffer(salt.length + 4)
	    salt.copy(block1, 0, 0, salt.length)

	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length)

	      var U = crypto.createHmac(digest, password).update(block1).digest()

	      if (!hLen) {
	        hLen = U.length
	        T = new Buffer(hLen)
	        l = Math.ceil(keylen / hLen)
	        r = keylen - (l - 1) * hLen

	        if (keylen > (Math.pow(2, 32) - 1) * hLen)
	          throw new TypeError('keylen exceeds maximum length')
	      }

	      U.copy(T, 0, 0, hLen)

	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest()

	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k]
	        }
	      }

	      var destPos = (i - 1) * hLen
	      var len = (i == l ? r : hLen)
	      T.copy(DK, destPos, 0, len)
	    }

	    return DK
	  }

	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(451).Buffer))

/***/ },
/* 472 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(473);
	exports.encode = exports.stringify = __webpack_require__(474);


/***/ },
/* 473 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

	var isArray = Array.isArray || function (xs) {
	  return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ },
/* 474 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return map(objectKeys(obj), function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (isArray(obj[k])) {
	        return map(obj[k], function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};

	var isArray = Array.isArray || function (xs) {
	  return Object.prototype.toString.call(xs) === '[object Array]';
	};

	function map (xs, f) {
	  if (xs.map) return xs.map(f);
	  var res = [];
	  for (var i = 0; i < xs.length; i++) {
	    res.push(f(xs[i], i));
	  }
	  return res;
	}

	var objectKeys = Object.keys || function (obj) {
	  var res = [];
	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
	  }
	  return res;
	};


/***/ },
/* 475 */
/***/ function(module, exports, __webpack_require__) {

	var React         = __webpack_require__(4);

	//var ServerActions = require('../actions/ServerActions');

	var ButtonGroup   = __webpack_require__(413);


	module.exports = React.createClass({

	  displayName: 'InvitationsMenuItem',

	  getDefaultProps: function() {
	    return {
	      buttons: [{
	        type: "flat",
	        isDefault: false,
	        name: "declined",
	        displayName: "Decline",
	      },{
	        type: "flat",
	        isDefault: false,
	        name: "accepted",
	        displayName: "Accept",
	      }]
	    }
	  },

	  handleButtonClick: function(action) {
	    //ServerActions.respondToInvitation(action, this.props.invitation);
	  },

	  render: function() {
	    return (
	      React.createElement("div", {className: "invitations-menu-item"}, 
	        React.createElement("div", {className: "invitations-menu-text"}, 
	          "You're invited by ", React.createElement("b", null, this.props.invitation.inviter), " to the instance ", React.createElement("b", null, this.props.invitation.instance), "."
	        ), 
	        React.createElement(ButtonGroup, {buttons: this.props.buttons, handleClick: this.handleButtonClick})
	      )
	    );
	  }

	});

/***/ },
/* 476 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * A mixin for handling (effectively) onClickOutside for React components.
	 * Note that we're not intercepting any events in this approach, and we're
	 * not using double events for capturing and discarding in layers or wrappers.
	 *
	 * The idea is that components define function
	 *
	 *   handleClickOutside: function() { ... }
	 *
	 * If no such function is defined, an error will be thrown, as this means
	 * either it still needs to be written, or the component should not be using
	 * this mixing since it will not exhibit onClickOutside behaviour.
	 *
	 */
	(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node. Note that this does not work with strict
	    // CommonJS, but only CommonJS-like environments
	    // that support module.exports
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.OnClickOutside = factory();
	  }
	}(this, function () {
	  "use strict";

	  // Use a parallel array because we can't use
	  // objects as keys, they get toString-coerced
	  var registeredComponents = [];
	  var handlers = [];

	  var IGNORE_CLASS = 'ignore-react-onclickoutside';

	  return {
	    componentDidMount: function() {
	      if(!this.handleClickOutside)
	        throw new Error("Component lacks a handleClickOutside(event) function for processing outside click events.");

	      var fn = this.__outsideClickHandler = (function(localNode, eventHandler) {
	        return function(evt) {
	          var source = evt.target;
	          var found = false;
	          // If source=local then this event came from "somewhere"
	          // inside and should be ignored. We could handle this with
	          // a layered approach, too, but that requires going back to
	          // thinking in terms of Dom node nesting, running counter
	          // to React's "you shouldn't care about the DOM" philosophy.
	          while(source.parentNode) {
	            found = (source === localNode || source.classList.contains(IGNORE_CLASS));
	            if(found) return;
	            source = source.parentNode;
	          }
	          eventHandler(evt);
	        }
	      }(this.getDOMNode(), this.handleClickOutside));

	      var pos = registeredComponents.length;
	      registeredComponents.push(this);
	      handlers[pos] = fn;

	      // If there is a truthy disableOnClickOutside property for this
	      // component, don't immediately start listening for outside events.
	      if (!this.props.disableOnClickOutside) {
	        this.enableOnClickOutside();
	      }
	    },

	    componentWillUnmount: function() {
	      this.disableOnClickOutside();
	      this.__outsideClickHandler = false;
	      var pos = registeredComponents.indexOf(this);
	      if( pos>-1) {
	        if (handlers[pos]) {
	          // clean up so we don't leak memory
	          handlers.splice(pos, 1);
	          registeredComponents.splice(pos, 1);
	        }
	      }
	    },

	    /**
	     * Can be called to explicitly enable event listening
	     * for clicks and touches outside of this element.
	     */
	    enableOnClickOutside: function() {
	      var fn = this.__outsideClickHandler;
	      document.addEventListener("mousedown", fn);
	      document.addEventListener("touchstart", fn);
	    },

	    /**
	     * Can be called to explicitly disable event listening
	     * for clicks and touches outside of this element.
	     */
	    disableOnClickOutside: function(fn) {
	      var fn = this.__outsideClickHandler;
	      document.removeEventListener("mousedown", fn);
	      document.removeEventListener("touchstart", fn);
	    }
	  };

	}));


/***/ },
/* 477 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(478);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/apps/Header/Header.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/apps/Header/Header.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 478 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, ".header-group {\n  background-color: #0091EA;\n  color: white;\n  font-family: 'Roboto';\n  font-weight: 400;\n  position: relative;\n  box-shadow: 0px 2px 2px rgba(0,0,0,0.15);\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.header-group .header-title {\n  font-family: 'Roboto';\n}\n\n.header-group .header-title {\n  font-size: 22px;\n  line-height: 1.3em;\n  font-weight: 300;\n}\n\n.header-details {\n  height: 80px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.header-text {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n\n.header-options {\n  margin-right: 20px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.header-option {\n  margin-left: 15px;\n  position: relative;\n}\n\n.header-option i {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  fill: white;\n}\n\n.header-nav-icon {\n  -webkit-flex: 0 0 60px;\n      -ms-flex: 0 0 60px;\n          flex: 0 0 60px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  fill: white;\n}\n\n.header-nav-icon i {\n  width: 24px;\n  height: 24px;\n}\n\n.header-nav-icon svg {\n  height: 100%;\n}\n\n.header-group .tabs-group {\n  height: 50px;\n  -webkit-align-items: flex-end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n  padding-left: 50px;\n}\n\n.header-group .tab {\n  color: rgba(255,255,255,0.75);\n  font-family: Roboto, sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  letter-spacing: 0.14px;\n  line-height: 14px;\n  text-transform: uppercase;\n  border-bottom: 4px solid transparent;\n}\n\n.header-group .tab:hover {\n  color: rgba(255,255,255,1);\n}\n\n.header-group .tab.tab-active {\n  border-bottom: 4px solid #00DBED;\n  color: rgba(255,255,255,1);\n}\n\n\n.header-group .dropdown-menu {\n  right: 0px;\n  left: auto;\n  top: 40px;\n  z-index: 9999;\n  min-width: 275px;\n  padding: 0 0 5px 0;\n}\n\n.header-group .account-menu-visible .account-menu {\n  opacity: 1;\n  visibility: visible;\n  -webkit-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\n\n.header-group .notifications-menu-visible .notifications-menu {\n  opacity: 1;\n  visibility: visible;\n  -webkit-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\n\n.header-group .dropdown-menu-section {\n  border-bottom: 1px solid #E9E9E9;\n}\n\n.header-group .dropdown-menu-section:last-child {\n  border-bottom: none;\n}\n\n.header-group .account-group {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 20px;\n}\n\n.header-group .account-group .account-name {\n  color: #707070;\n  font-weight: 500;\n}\n\n.header-group .account-group .account-email {\n  font-size: 13px;\n}\n\n.header-group .account-group .account-image {\n  margin-right: 15px;\n  width: 50px;\n  height: 50px;\n}\n\n.header-group .account-group .account-image img {\n  display: block;\n  border-radius: 100%;\n}\n\n.header-group .invitations-menu-item {\n  padding: 25px 25px 10px 25px;\n  font-size: 13px;\n  color: #929292;\n  width: 300px;\n  border-bottom: 1px solid #E9E9E9;\n}\n\n.header-group .invitations-menu-item:last-child {\n  border-bottom: none;\n}\n\n.header-group .invitations-menu-item .button {\n  font-size: 13px;\n}\n\n.header-group .invitations-menu-text {\n  margin-bottom: 10px;\n}\n\n.header-group-loading .progress-bar-group {\n  opacity: 1;\n  visibility: visible;\n  -webkit-animation: animatedBackground 10s linear infinite;\n          animation: animatedBackground 10s linear infinite;\n}\n\n@-webkit-keyframes glowing {\n  0% { fill: #004A7F;}\n  50% { fill: rgba(11, 81, 133, 0.68);}\n  100% { fill: #004A7F;}\n}\n\n@keyframes glowing {\n  0% { fill: #004A7F;}\n  50% { fill: rgba(11, 81, 133, 0.68);}\n  100% { fill: #004A7F;}\n}\n\n.glowing {\n  -webkit-animation: glowing 1500ms infinite;\n          animation: glowing 1500ms infinite;\n}", ""]);

/***/ },
/* 479 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var InstancesAppStore = __webpack_require__(480);
	var InstancesAppActions = __webpack_require__(481);

	var Header = __webpack_require__(438);

	var Lists = __webpack_require__(482);
	var FABList = __webpack_require__(421);

	//var ListWithOptions = require('../../common/Lists/ListWithOptions.react');
	var InstancesListWithHeader = __webpack_require__(496);


	module.exports = React.createClass({

	  displayName: 'InstancesView',

	  getInitialState: function () {
	    return {
	      myInstances: [],
	      otherInstances: [],
	      //myInstances: InstanceStore._getMyInstances(),
	      //myInstancesViewMode: InstanceStore._getMyInstancesViewMode(),
	      //myInstancesSortMode: InstanceStore._getMyInstancesSortMode(),
	      //
	      //otherInstances: InstanceStore._getOtherInstances(),
	      //otherInstancesViewMode: InstanceStore._getOtherInstancesViewMode(),
	      //otherInstancesSortMode: InstanceStore._getOtherInstancesSortMode(),
	    }
	  },

	  componentWillMount: function () {
	    //InstancesAppStore.addChangeListener(this.onChange);
	    InstancesAppActions.getInstances();
	  },

	  componentDidMount: function () {
	    InstancesAppStore.addChangeListener(this.onChange);
	    //InstancesAppActions.getInstances();
	  },

	  componentWillUnmount: function () {
	    //InstancesAppStore.removeChangeListener(this.onChange)
	  },


	  handleFABClick: function (buttonName) {
	    if (buttonName === "create") {
	      ViewActions.showModalCreateResource('instance');
	    }
	  },

	  onChange: function () {
	    console.log('onChange InstancesApp');
	    this.setState({
	      myInstances: InstancesAppStore.getInstances(),
	      otherInstances: InstancesAppStore.getInstances('other'),
	    });
	  },

	  filterEmptyLists: function (listOfLists) {
	    return listOfLists.filter(function (list, i) {
	      if (!list.hideEmpty) {
	        return true;
	      } else {
	        return list.data.length > 0;
	      }
	    })
	  },

	  handleHeaderMenuClick: function (action) {
	    console.log("InstanceView handleHeaderMenuClick", action)
	  },

	  handleItemMenuClick: function (action) {
	    console.log("InstanceView handleItemMenuClick", action)
	  },


	  render: function () {

	    // Instances View Buttons
	    var buttons = [{
	      name: "create",
	      primary: true,
	      displayName: "Create an instance",
	      icon: "plus",
	    }];

	    // Lists on the View
	    var myInstancesLists = {
	      heading: "My instances",
	      uuid: "myInstances",
	      contentType: "instances",
	      //viewMode: this.state.myInstancesViewMode,
	      viewMode: 'stream',
	      avatarStyle: 'icon',
	      //sortMode: this.state.myInstancesSortMode,
	      //data: this.state.myInstances,
	      data: this.state.myInstances,

	      emptyText: "There are no Instances here. Click here to generate one.",
	      emptyIcon: "vpn-key",

	      //itemConfig: {
	      //  ''
	      //},

	      actions: [{
	        displayName: 'Sort by name',
	        name: 'sortByName',
	      }, {
	        displayName: 'Sort by date',
	        name: 'sortByDate',
	      }, {
	        displayName: 'Switch to list view',
	        name: 'switchToListView',
	        iconType: 'view-stream',
	      }, {
	        displayName: 'Switch to card view',
	        name: 'switchToCardView',
	        iconType: 'view-module',
	      }]
	    };

	    var otherInstancesList = {
	      heading: "Instances I belong to",
	      uuid: "otherInstances",
	      contentType: "instances",
	      viewMode: 'stream',
	      //sortMode: this.state.otherInstancesSortMode,
	      data: this.state.otherInstances,
	      avatarStyle: 'icon',
	      //hideEmpty: true,
	      actions: [{
	        displayName: 'Sort by name',
	        name: 'sortByName',
	      }, {
	        displayName: 'Sort by date',
	        name: 'sortByDate',
	      }, {
	        displayName: 'Switch to list view',
	        name: 'switchToListView',
	        iconType: 'view-stream',
	      }, {
	        displayName: 'Switch to card view',
	        name: 'switchToCardView',
	        iconType: 'view-module',
	      }]
	    };


	    var Lists = this.filterEmptyLists([myInstancesLists, otherInstancesList]);

	    var ListsToShow = Lists.map(function (list, i) {
	      return React.createElement(InstancesListWithHeader, {
	        key: i, 
	        list: list, 
	        handleHeaderMenuClick: this.handleHeaderMenuClick, 
	        handleItemMenuClick: this.handleItemMenuClick}
	        )
	    }.bind(this));


	    console.log('ListsToShow', ListsToShow);

	    return (
	      React.createElement("div", {className: "content-group"}, 
	        React.createElement("div", {className: "lists-group"}, 
	          ListsToShow
	        ), 
	        React.createElement(FABList, React.__spread({},  this.props, {buttons: buttons, handleFABClick: this.handleFABClick}))
	      )
	    );
	  }

	});

/***/ },
/* 480 */
/***/ function(module, exports, __webpack_require__) {

	var Request = __webpack_require__(441);
	var assign = __webpack_require__(252);
	var EventEmitter = __webpack_require__(256).EventEmitter;
	var uuid = __webpack_require__(440);

	var AppDispatcher = __webpack_require__(248);

	var AuthStore  = __webpack_require__(255);
	//var ViewActions   = require('../actions/ViewActions');
	//var ServerActions = require('../actions/ServerActions');
	//var Constants     = require('../constants/Constants');
	//var Syncano       = require('../utils/Syncano');

	var CHANGE_EVENT = 'change';

	var instancesStore = {
	  allInstances: null,
	};

	var InstancesStore = assign(EventEmitter.prototype, {
	  getInstances: function (instanceFilter) {
	    var instances = instancesStore.allInstances;

	    if (instanceFilter === "other") {

	      var otherInstancesNames = Object.keys(instances).filter(function (key) {
	        return instances[key].owner.email !== AuthStore.getAccountInfo('email');
	      });
	      var otherInstances = otherInstancesNames.map(function(instanceName) {
	        return instances[instanceName];
	      });
	      return otherInstances;
	    }
	    console.log("getInstances", instances);
	    return instances;
	  },

	  addChangeListener: function (callback) {
	    this.on(CHANGE_EVENT, callback);
	  },

	  removeChangeListener: function (callback) {
	    this.removeListener(CHANGE_EVENT, callback)
	  },

	  emitChange: function () {
	    console.log('InstancesStore change emitted');
	    this.emit(CHANGE_EVENT);
	  },

	});

	InstancesStore.dispatchToken = AppDispatcher.register(function (payload) {

	  var action = payload.action;
	  var item = action.item;
	  var itemType = action.itemType;
	  var data = action.data;


	  var successGetInstances = function (instances) {
	    console.log("successGetInstances", instances);
	    instancesStore.allInstances = instances;
	    InstancesStore.emitChange();
	  };

	  var error = function (error) {
	    console.log("Error", error);
	  };

	  console.log('InstanceStore action:', action);
	  switch (action.type) {

	    case "GET_INSTANCES":
	      var instances = Syncano.Instances.list().then(successGetInstances, error);
	      break;
	  }

	  //InstancesStore.emitChange();

	});

	module.exports = InstancesStore;

/***/ },
/* 481 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(248);

	module.exports = {

	  getInstances: function(data) {
	    AppDispatcher.handleInstancesAppAction({
	      type: 'GET_INSTANCES',
	      data: data,
	    });
	  },

	};


/***/ },
/* 482 */
/***/ function(module, exports, __webpack_require__) {

	var React            = __webpack_require__(4);

	var ListWithOptions  = __webpack_require__(483);

	module.exports = React.createClass({

	  displayName: 'Lists',

	  render: function() {
	    var lists = this.props.lists.filter(function(list, i){
	      return list.data.length > 0;
	    }).map(function(list, i){
	      return React.createElement(ListWithOptions, React.__spread({},  this.props, {key: i, list: list}))
	    }.bind(this));

	    return (
	      React.createElement("div", {className: "lists-group"}, 
	        lists
	      )
	    );
	  }
	});

/***/ },
/* 483 */
/***/ function(module, exports, __webpack_require__) {

	var React               = __webpack_require__(4);

	//var ViewActions         = require('../actions/ViewActions');

	var Constants           = __webpack_require__(297);
	var List                = __webpack_require__(484);
	var Dropdown            = __webpack_require__(296).Dropdown;
	var DropdownWithButtons = __webpack_require__(493);

	var ContentHeader       = __webpack_require__(495);

	module.exports = React.createClass({

	  displayName: 'ListWithOptions',

	  handleDropdownMenuItemClick: function(action) {

	    //if (Constants.VIEW_MODES.indexOf(action) != -1) {
	    //    ViewActions.updateViewMode(this.props.list.uuid, Constants.VIEW_ACTIONS_MAP[action]);
	    //}
	    //if (Constants.SORT_MODES.indexOf(action) != -1) {
	    //    ViewActions.updateSortMode(this.props.list.uuid, action);
	    //}
	  },

	  toggleDropdownMenu: function() {
	    ViewActions.showDropdown(this.props.list.uuid);
	  },

	  render: function() {
	    var dropdownVisible = this.props.dropdown === this.props.list.uuid;
	    var dropdown;
	    var heading;

	    //debugger;
	    //if (this.props.list.contentType !== "instances") {
	    //  dropdown = <Dropdown icon="more-horiz" actions={this.props.list.actions} visible={dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />;
	    //} else {
	    //  dropdown = <DropdownWithButtons icon="more-horiz" actions={this.props.list.actions} visible={dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />;
	    //}

	    //if (this.props.list.heading === "CodeBoxes" || this.props.list.heading === "Classes") {
	    //  heading = <ContentHeader {...this.props}/>
	    //} else {
	    //  heading = <div className="list-header">{this.props.list.heading}<div className="list-heading-dropdown">{dropdown}</div></div>
	    //}

	    //{heading}
	    console.log("List data", this.props.list.data)
	    return (
	      React.createElement("div", {className: "list-group"}, 

	        React.createElement(List, React.__spread({},  this.props, {data: this.props.list.data}))
	      )
	    );
	  }

	});

/***/ },
/* 484 */
/***/ function(module, exports, __webpack_require__) {

	var React           = __webpack_require__(4);
	var Moment          = __webpack_require__(160);
	var classNames      = __webpack_require__(262);

	var ListItem        = __webpack_require__(485);
	var ListItemColumns = __webpack_require__(492);
	var ListItemEmpty   = __webpack_require__(405);

	//var InstanceStore   = require('../stores/InstanceStore');
	//var ConfigStore     = require('../stores/ConfigStore');
	//var ViewsStore      = require('../stores/ViewsStore');
	//var ViewActions     = require('../actions/ViewActions');

	module.exports = React.createClass({

	  displayName: 'List',

	  getDefaultProps: function() {
	    return {
	      data: []
	    }
	  },

	  handleClick: function(item) {
	    var instanceName = InstanceStore.getRouteParams().instanceName;
	    if (this.props.list.contentType === "instances") {
	      window.location.href = '#instances/' + item.id;
	    } else if (this.props.list.contentType === "codeboxes") {
	      window.location.href = '#instances/' + instanceName + '/codeboxes/' + item.id;
	    } else if (this.props.list.contentType === "triggers") {
	      window.location.href = '#instances/' + instanceName + '/triggers/' + item.id;
	    } else if (this.props.list.contentType === "schedules") {
	      window.location.href = '#instances/' + instanceName + '/schedules/' + item.id;
	    } else if (this.props.list.contentType === "webhooks") {
	      window.location.href = '#instances/' + instanceName + '/webhooks/' + item.id;
	    } else if (this.props.list.contentType === "traces") {
	      ViewActions.expandListItem(item);
	    }
	  },

	  getCodeBoxName: function(item) {
	    var codeBoxes = InstanceStore._getCodeBoxes();
	    var codeBoxName;
	    codeBoxes.forEach(function(codeBox){
	      if (codeBox.id === item.data.codebox) {
	        codeBoxName = codeBox.data.name
	      }
	    });
	    return codeBoxName;
	  },

	  render: function() {
	    var expandable;
	    var expanded;
	    var color;
	    var info;
	    var items;
	    //var config = ConfigStore.getConfig();
	    var contentType = this.props.list.contentType;
	    //var view = ViewsStore.getView(contentType);
	    //var icon = view.icon;
	    if (this.props.data.length > 0 && !this.props.appLoading) {
	      items = this.props.data.map(function(item, i) {
	        var dropdownVisible = this.props.dropdown === item.uuid;
	        //var actions = config[item.type].actions;
	        var action = [];
	        var data = item.data;
	        if (contentType === "instances") {
	          info = "Updated " + Moment(data.updated_at).fromNow();
	          return React.createElement(ListItem, React.__spread({},  this.props, {key: i, item: item, color: data.metadata.color || '#e2e2e2', icon: data.metadata.icon, title: item.id, description: data.description, info: info, actions: actions, dropdownVisible: dropdownVisible, handleClick: this.handleClick}));

	        } else if (contentType === "classes") {
	          info = {
	            created_at: Moment(data.created_at).format('DD.MM.YYYY, h:mm:ss A'),
	            updated_at: "Updated " + Moment(data.updated_at).format('DD.MM.YYYY, h:mm:ss A'),
	          };
	          return React.createElement(ListItemColumns, React.__spread({},  this.props, {key: i, item: item, color: data.metadata.color || '#e2e2e2', icon: data.metadata.icon, title: item.id, description: data.description, info: info, actions: actions, dropdownVisible: dropdownVisible, handleClick: this.handleClick}));

	        } else if (contentType === "api_keys") {
	          info = "Updated " + Moment(data.updated_at).fromNow();
	          return React.createElement(ListItem, React.__spread({},  this.props, {key: i, item: item, icon: icon, title: data.api_key, description: data.description, info: info, actions: actions, dropdownVisible: dropdownVisible, handleClick: this.handleClick}));

	        } else if (contentType === "admins") {
	          info = "Role " + data.role.toUpperCase();
	          return React.createElement(ListItem, React.__spread({},  this.props, {key: i, item: item, icon: icon, title: data.email, info: info, actions: actions, dropdownVisible: dropdownVisible, handleClick: this.handleClick}));

	        } else if (contentType === "invitations") {
	          info = "Created " + Moment(data.created_at).fromNow();
	          return React.createElement(ListItem, React.__spread({},  this.props, {key: i, item: item, icon: icon, title: data.email, info: info, actions: actions, dropdownVisible: dropdownVisible, handleClick: this.handleClick}));

	        } else if (contentType === "users") {
	          return React.createElement(ListItem, React.__spread({},  this.props, {key: i, item: item, title: data.username, actions: actions, dropdownVisible: dropdownVisible, handleClick: this.handleClick}));

	        } else if (contentType === "codeboxes") {
	          info = {
	            created_at: Moment(data.created_at).format('DD.MM.YYYY, h:mm:ss A'),
	            updated_at: "Updated " + Moment(data.updated_at).format('DD.MM.YYYY, h:mm:ss A'),
	          };
	          return React.createElement(ListItemColumns, React.__spread({},  this.props, {key: i, item: item, icon: data.runtime_name, title: data.name, info: info, description: data.description, actions: actions, dropdownVisible: dropdownVisible, handleClick: this.handleClick}));
	        } else if (contentType === "webhooks") {
	          var codeBoxName = this.getCodeBoxName(item);
	          return React.createElement(ListItem, React.__spread({},  this.props, {key: i, item: item, icon: icon, title: data.slug, description: codeBoxName, actions: actions, dropdownVisible: dropdownVisible, handleClick: this.handleClick}));

	        } else if (contentType === "triggers") {
	          info = "Updated " + Moment(data.updated_at).fromNow();
	          return React.createElement(ListItem, React.__spread({},  this.props, {key: i, item: item, icon: icon, title: data.name, info: info, description: data.signal, actions: actions, dropdownVisible: dropdownVisible, handleClick: this.handleClick}));

	        } else if (contentType === "schedules") {
	          info = "Created " + Moment(data.created_at).fromNow();
	          return React.createElement(ListItem, React.__spread({},  this.props, {key: i, item: item, icon: icon, title: data.name, info: info, description: data.crontab, actions: actions, dropdownVisible: dropdownVisible, handleClick: this.handleClick}));

	        } else if (contentType === "traces") {
	          info = "Executed at " + Moment(data.created_at).format('MMMM Do YYYY, h:mm:ss a');
	          if (data.status === "success") {
	            icon = "done";
	            color = "#4CAF50";
	            expandable = true;
	          } else if (data.status === "failure") {
	            icon = "close";
	            color = "#EF5350";
	            expandable = true;
	          } else if (data.status === "pending") {
	            icon = "sync";
	            color = "#03A9F4";
	          } else if (data.status === "timeout") {
	            icon = "sync-problem";
	            color = "#FFA726";
	          }
	          expanded = this.props.list.expandedItemId === item.uuid && expandable;
	          return React.createElement(ListItem, React.__spread({},  this.props, {key: i, item: item, icon: icon, color: color, title: data.status, info: info, description: data.duration + "ms", actions: actions, expandable: expandable, expanded: expanded, dropdownVisible: dropdownVisible, handleClick: this.handleClick}));
	        }
	      }.bind(this));
	    } else if (this.props.data.length === 0 && !this.props.appLoading) {
	      items = React.createElement(ListItemEmpty, React.__spread({},  this.props, {icon: this.props.list.emptyIcon, text: this.props.list.emptyText}))
	    }
	    var cssClasses = classNames('list', 'items-list', 'view-' + this.props.list.viewMode);
	    return (
	      React.createElement("div", {className: cssClasses}, 
	        items
	      )
	    );
	  }

	});

/***/ },
/* 485 */
/***/ function(module, exports, __webpack_require__) {

	var React              = __webpack_require__(4);
	var classNames         = __webpack_require__(262);
	var Moment             = __webpack_require__(160);

	//var ViewActions        = require('../actions/ViewActions');
	//var ServerActions      = require('../actions/ServerActions');

	var Constants          = __webpack_require__(297);

	var Icon               = __webpack_require__(298);
	var ButtonExpandToggle = __webpack_require__(486);
	var Dropdown           = __webpack_require__(296);
	var ProgressBar        = __webpack_require__(399);
	var AvatarInitials     = __webpack_require__(487);
	var TraceResult        = __webpack_require__(491);

	__webpack_require__(432);

	module.exports = React.createClass({

	  displayName: 'ListItem',

	  getInitialState: function() {
	    return {
	      animateInk: false,
	    }
	  },

	  getDefaultProps: function() {
	    return {
	      color: "#0288D1"
	    }
	  },

	  handleCardClick: function() {
	    this.setState({animateInk: true});
	    setTimeout(function(){
	      this.props.handleClick(this.props.item);
	    }.bind(this), 250)
	  },

	  handleItemHeaderClick: function() {
	    this.props.handleClick(this.props.item);
	  },

	  toggleDropdownMenu: function() {
	    ViewActions.showDropdown(this.props.item.uuid);
	  },

	  handleDropdownMenuItemClick: function(actionType) {
	    if (actionType === "delete") {
	      ViewActions.showModalConfirmDeleteResource(this.props.item);
	    } else if (actionType === "edit") {
	      ViewActions.showModalUpdateResource(this.props.item);
	    } else if (actionType === "customize") {
	      ViewActions.showModalCustomizeResource(this.props.item);
	    } else if (actionType === "run") {
	      ServerActions.runWebhook(this.props.item);
	    }
	  },

	  render: function() {

	    var color = {
	      backgroundColor: this.props.color
	    };
	    var inkStyle = {
	      height: "200px",
	      width: "200px",
	      top: "0px",
	      left: "0px",
	    };
	    var contentType = this.props.list.contentType.split('_').join('-');
	    var runtime     = this.props.item.runtime_name;
	    var status      = this.props.item.status;
	    var loading     = this.props.item.loading;
	    var cssClasses  = classNames('list-item', 'list-item-' + contentType, {
	      'animate-ink'            : this.state.animateInk,
	      'card'                   : true,
	      'card-view-cards'        : this.props.list.viewMode === "cards",
	      'list-item-card-view'    : this.props.list.viewMode === "cards",
	      'list-item-no-color'     : !this.props.color,
	      'list-item-stream-view'  : this.props.list.viewMode === "stream",
	      'card-codebox-nodejs'    : runtime === "nodejs",
	      'card-codebox-python'    : runtime === "python",
	      'card-codebox-ruby'      : runtime === "ruby",
	      'card-codebox-golang'    : runtime === "golang",
	      'card-loading'           : loading,
	      'card-expanded'          : this.props.expanded,
	      'list-item-expanded'     : this.props.expanded,
	      'card-trace-pending'     : status === "pending",
	      'card-trace-failure'     : status === "failure",
	      'card-trace-success'     : status === "success",
	      'card-trace-timeout'     : status === "timeout",
	    });
	    if (this.state.animateInk) {
	      inkStyle['top'] = "50px";
	      inkStyle['left'] = "50px";
	    }


	    if (this.props.list.viewMode === "cards") {
	      return (
	        React.createElement("div", {className: cssClasses, style: color, onClick: this.handleCardClick}, 
	          React.createElement("div", {className: "list-item-header card-header"}, 
	            React.createElement("div", {className: "list-item-details card-details"}, 
	              React.createElement("div", {className: "list-item-icon card-icon"}, 
	                React.createElement(Icon, {icon: this.props.icon})
	              ), 
	              React.createElement("div", {className: "list-item-text card-text"}, 
	                React.createElement("div", {className: "list-item-title card-title"}, React.createElement("span", null, this.props.title)), 
	                React.createElement("div", {className: "list-item-description card-description"}, this.props.description)
	              )
	            ), 
	            React.createElement("div", {className: "ink", style: inkStyle}), 
	            React.createElement("div", {className: "list-item-extras card-extras"}, 
	              React.createElement(Dropdown, {actions: this.props.actions, visible: this.props.dropdownVisible, toggleDropdownMenu: this.toggleDropdownMenu, handleClick: this.handleDropdownMenuItemClick})
	            )
	          )
	        )
	      );
	    } else if (this.props.list.viewMode === "stream") {
	      var traceResult = this.props.expanded ? React.createElement(TraceResult, {result: this.props.item.data.result}) : null;
	      var initialsComponent = React.createElement(AvatarInitials, {text: this.props.title});
	      var dropdownComponent = React.createElement(Dropdown, {actions: this.props.actions, visible: this.props.dropdownVisible, toggleDropdownMenu: this.toggleDropdownMenu, handleClick: this.handleDropdownMenuItemClick});
	      var iconComponent = React.createElement(Icon, {icon: this.props.icon, style: color});
	      var avatar = contentType === "users" ? initialsComponent : iconComponent;
	      var dropdown = this.props.actions.length > 0 ? dropdownComponent : null;
	      var buttonExpandToggle = this.props.expandable ? React.createElement(ButtonExpandToggle, {parentExpanded: this.props.expanded}) : null;
	      return (
	        React.createElement("div", {className: cssClasses}, 
	          React.createElement("div", {className: "list-item-header card-header", onClick: this.handleItemHeaderClick}, 
	            React.createElement("div", {className: "list-item-details card-details-other"}, 
	              React.createElement("div", {className: "list-item-icon card-icon"}, 
	                avatar
	              ), 
	              React.createElement("div", {className: "list-item-text card-text-other"}, 
	                React.createElement("div", {className: "list-item-title card-title"}, React.createElement("span", null, this.props.title)), 
	                React.createElement("div", {className: "list-item-description card-description-other"}, this.props.description)
	              )
	            ), 
	            React.createElement("div", {className: "list-item-highlight card-highlight"}), 
	            React.createElement("div", {className: "list-item-extras card-other-extras"}, 
	              React.createElement("div", {className: "card-info"}, this.props.info), 
	              buttonExpandToggle, 
	              React.createElement("div", {className: "card-dropdown"}, dropdown)
	            )
	          ), 
	          traceResult
	        )
	      );
	    }

	    // if (this.props.item.expanded && this.props.list.contentType === "traces") {
	    //   if (this.props.item.args && this.props.item.meta) {
	    //     return (
	    //       <div className={cssClasses} onClick={this.handleClick}>
	    //         <div className="list-item-header card-header">
	    //           <div className="list-item-details card-details">
	    //             <div className="card-icon">
	    //               <Icon type={this.props.item.icon} style={this.props.item.iconColor}/>
	    //             </div>
	    //             <div className="list-item-text card-text">
	    //               <div className="list-item-title card-title"><span onClick={this.handleTitleClick} >{this.props.item.title}</span></div>
	    //               <div className="list-item-description card-description">{this.props.item.description}</div>
	    //             </div>
	    //           </div>
	    //           <div className="card-highlight"></div>
	    //           <div className="list-item-extras card-extras">
	    //             <div className="card-info">{this.props.item.info}</div>
	    //             {dropdown}
	    //           </div>
	    //         </div>
	    //         <div className="card-body">
	    //           <TraceResultView args={this.props.item.args} meta={this.props.item.meta} result={this.props.item.result} />
	    //         </div>
	    //         <ProgressBar />
	    //       </div>
	    //     );
	    //   } else {
	    //     return (
	    //       <div className={cssClasses} onClick={this.handleClick}>
	    //         <div className="list-item-header card-header">
	    //           <div className="list-item-details card-details">
	    //             <div className="card-icon">
	    //               <Icon type={this.props.item.icon} style={this.props.item.iconColor} />
	    //             </div>
	    //             <div className="list-item-text card-text">
	    //               <div className="list-item-title card-title"><span onClick={this.handleTitleClick}>{this.props.item.title}</span></div>
	    //               <div className="list-item-description card-description">{this.props.item.description}</div>
	    //             </div>
	    //           </div>
	    //           <div className="card-highlight"></div>
	    //           <div className="list-item-extras card-extras">
	    //             <div className="card-info">{this.props.item.info}</div>
	    //             {dropdown}
	    //           </div>
	    //         </div>
	    //         <div className="card-body">
	    //           <TraceResultView result={this.props.item.result} />
	    //         </div>
	    //         <ProgressBar />
	    //       </div>
	    //     );
	    //   }
	    // }
	  }
	});

/***/ },
/* 486 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var Icon = __webpack_require__(298);

	module.exports = React.createClass({

	  displayName: 'ButtonExpandToggle',

	  render: function () {
	    var icon = this.props.parentExpanded ? "unfold-less" : "unfold-more";
	    return (
	      React.createElement("div", {className: "button-expand-toggle", onClick: this.props.handleClick}, 
	        React.createElement(Icon, {icon: icon})
	      )
	    );
	  }
	});

/***/ },
/* 487 */
/***/ function(module, exports, __webpack_require__) {

	var React      = __webpack_require__(4);
	var ColorStore = __webpack_require__(488);

	__webpack_require__(489);

	module.exports = React.createClass({

	  displayName: 'AvatarInitials',

	  propTypes: {
	    name: React.PropTypes.string.isRequired,
	    backgroundColor: React.PropTypes.string,
	    singleInitial: React.PropTypes.bool
	  },

	  getHash: function(str) {
	    var hash;
	    for (var i = 0; i < str.length; i++) {
	      hash = ((hash << 5) - hash) + str.charCodeAt(i);
	      hash |= 0;
	    }
	    return Math.abs(hash);
	  },

	  render: function() {
	    var initials;
	    var colors = ColorStore.getAllColors();
	    var nameFragments = this.props.name.split(' ');
	    if (this.props.singleInitial || nameFragments.length === 1) {
	      initials = this.props.name.charAt(0).toUpperCase();
	    } else {
	      initials = nameFragments.filter(function(nameFragment, index, arr){
	        return index === 0 || index === arr.length - 1
	      }).map(function(nameFragment){
	        return nameFragment.charAt(0).toUpperCase();
	      }).join('');
	    }
	    var style = {
	      backgroundColor: this.props.backgroundColor || colors[this.getHash(this.props.name) % colors.length]
	    };
	    return (
	      React.createElement("div", {className: "avatar-initials", style: style}, 
	        React.createElement("div", {className: "avatar-initials-text"}, initials)
	      )
	    );
	  }

	});

/***/ },
/* 488 */
/***/ function(module, exports, __webpack_require__) {

	var colorPickerPalette = [
	  '#EF6C00', '#C62828', '#AD1457', '#6A1B9A', '#4527A0', '#1565C0', '#0277BD', '#00695C', '#2E7D32', '#37474F',
	  '#F57C00', '#D32F2F', '#C2185B', '#7B1FA2', '#512DA8', '#1976D2', '#0288D1', '#00796B', '#388E3C', '#455A64',
	  '#FF9800', '#E53935', '#D81B60', '#8E24AA', '#5E35B1', '#1E88E5', '#039BE5', '#00897B', '#43A047', '#546E7A',
	  '#FFA726', '#EF5350', '#EC407A', '#AB47BC', '#7E57C2', '#2196F3', '#03A9F4', '#009688', '#4CAF50', '#78909C',
	];

	var ColorStore = {

	  getColorPickerPalette: function() {
	    return colorPickerPalette;
	  },

	  getAllColors: function() {
	    return colorPickerPalette;
	  },

	};

	module.exports = ColorStore;

/***/ },
/* 489 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(490);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/AvatarInitials/AvatarInitials.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/AvatarInitials/AvatarInitials.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 490 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, ".avatar-initials {\n  width: 40px;\n  height: 40px;\n  font-weight: 300;\n  font-size: 16px;\n  line-height: 1em;\n  border-radius: 100%;\n  color: white;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: default;\n}", ""]);

/***/ },
/* 491 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var Icon = __webpack_require__(298);

	module.exports = React.createClass({

	  displayName: "TraceResult",

	  render: function () {
	    return (
	      React.createElement("div", {className: "card-body"}, 
	        React.createElement("div", {className: "card-section"}, 
	          React.createElement("div", {className: "card-section-inner"}, 
	            React.createElement("div", {className: "card-section-header"}, 
	              React.createElement("div", {className: "card-section-icon"}, 
	                React.createElement(Icon, {icon: "terminal"})
	              ), 
	              React.createElement("div", {className: "card-section-header-content"}, 
	                React.createElement("div", {className: "card-section-title"}, "Result")
	              )
	            ), 
	            React.createElement("div", {className: "card-section-body"}, 
	              React.createElement("div", {className: "card-section-result"}, 
	                this.props.result
	              )
	            )
	          )
	        )
	      )
	    )
	  }
	});

/***/ },
/* 492 */
/***/ function(module, exports, __webpack_require__) {

	var React              = __webpack_require__(4);
	var classNames         = __webpack_require__(262);
	var Moment             = __webpack_require__(160);

	var Icon               = __webpack_require__(298);
	var Dropdown           = __webpack_require__(296);

	var ButtonExpandToggle = __webpack_require__(486);

	var ProgressBar        = __webpack_require__(399);
	var AvatarInitials     = __webpack_require__(487);
	var TraceResult        = __webpack_require__(491);

	//var ViewActions        = require('../actions/ViewActions');
	//var ServerActions      = require('../actions/ServerActions');

	__webpack_require__(432);

	module.exports = React.createClass({

	  displayName: 'ListItemColumns',

	  getInitialState: function() {
	    return {
	      animateInk: false,
	    }
	  },

	  getDefaultProps: function() {
	    return {
	      color: "#0288D1"
	    }
	  },

	  handleCardClick: function() {
	    this.setState({animateInk: true});
	    setTimeout(function(){
	      this.props.handleClick(this.props.item);
	    }.bind(this), 250)
	  },

	  handleItemHeaderClick: function() {
	    this.props.handleClick(this.props.item);
	  },

	  toggleDropdownMenu: function() {
	    ViewActions.showDropdown(this.props.item.uuid);
	  },

	  handleDropdownMenuItemClick: function(actionType) {
	    if (actionType === "delete") {
	      ViewActions.showModalConfirmDeleteResource(this.props.item);
	    } else if (actionType === "edit") {
	      ViewActions.showModalUpdateResource(this.props.item);
	    } else if (actionType === "customize") {
	      ViewActions.showModalCustomizeResource(this.props.item);
	    } else if (actionType === "run") {
	      ServerActions.runWebhook(this.props.item);
	    }
	  },

	  render: function() {
	    var color = {
	      backgroundColor: this.props.color
	    };
	    var inkStyle = {
	      height: "200px",
	      width: "200px",
	      top: "0px",
	      left: "0px",
	    };
	    var contentType = this.props.list.contentType.split('_').join('-');
	    var runtime     = this.props.item.runtime_name;
	    var status      = this.props.item.status;
	    var loading     = this.props.item.loading;
	    var cssClasses  = classNames('list-item', 'list-item-' + contentType, {
	      'animate-ink'            : this.state.animateInk,
	      'card'                   : true,
	      'card-view-cards'        : this.props.list.viewMode === "cards",
	      'list-item-card-view'    : this.props.list.viewMode === "cards",
	      'list-item-no-color'     : !this.props.color,
	      'list-item-stream-view'  : this.props.list.viewMode === "stream",
	      'card-codebox-nodejs'    : runtime === "nodejs",
	      'card-codebox-python'    : runtime === "python",
	      'card-codebox-ruby'      : runtime === "ruby",
	      'card-codebox-golang'    : runtime === "golang",
	      'card-loading'           : loading,
	      'card-expanded'          : this.props.expanded,
	      'list-item-expanded'     : this.props.expanded,
	      'card-trace-pending'     : status === "pending",
	      'card-trace-failure'     : status === "failure",
	      'card-trace-success'     : status === "success",
	      'card-trace-timeout'     : status === "timeout",
	    });
	    if (this.state.animateInk) {
	      inkStyle['top'] = "50px";
	      inkStyle['left'] = "50px";
	    }
	    if (this.props.list.viewMode === "cards") {
	      return (
	        React.createElement("div", {className: cssClasses, style: color, onClick: this.handleCardClick}, 
	          React.createElement("div", {className: "list-item-header card-header"}, 
	            React.createElement("div", {className: "list-item-details card-details"}, 
	              React.createElement("div", {className: "list-item-icon card-icon"}, 
	                React.createElement(Icon, {icon: this.props.icon})
	              ), 
	              React.createElement("div", {className: "list-item-text card-text"}, 
	                React.createElement("div", {className: "list-item-title card-title"}, React.createElement("span", null, this.props.title)), 
	                React.createElement("div", {className: "list-item-description card-description"}, this.props.description)
	              )
	            ), 
	            React.createElement("div", {className: "ink", style: inkStyle}), 
	            React.createElement("div", {className: "list-item-extras card-extras"}, 
	              React.createElement(Dropdown, {actions: this.props.actions, visible: this.props.dropdownVisible, toggleDropdownMenu: this.toggleDropdownMenu, handleClick: this.handleDropdownMenuItemClick})
	            )
	          )
	        )
	      );
	    } else if (this.props.list.viewMode === "stream") {
	      var traceResult = this.props.expanded ? React.createElement(TraceResult, {result: this.props.item.data.result}) : null;
	      var initialsComponent = React.createElement(AvatarInitials, {text: this.props.title});
	      var dropdownComponent = React.createElement(Dropdown, {actions: this.props.actions, visible: this.props.dropdownVisible, toggleDropdownMenu: this.toggleDropdownMenu, handleClick: this.handleDropdownMenuItemClick});
	      var iconComponent = React.createElement(Icon, {icon: this.props.icon, style: color});
	      var avatar = contentType === "users" ? initialsComponent : iconComponent;
	      var dropdown = this.props.actions.length > 0 ? dropdownComponent : null;
	      var buttonExpandToggle = this.props.expandable ? React.createElement(ButtonExpandToggle, {parentExpanded: this.props.expanded}) : null;
	      
	      return (
	        React.createElement("div", {className: cssClasses}, 
	          React.createElement("div", {className: "list-item-header card-header", onClick: this.handleItemHeaderClick}, 
	            React.createElement("div", {className: "list-item-details card-details"}, 
	              React.createElement("div", {className: "list-item-icon card-icon"}, 
	                avatar
	              ), 
	              React.createElement("div", {className: "list-item-title card-title"}, this.props.title)
	            ), 
	            React.createElement("div", {className: "list-item-title card-id"}, this.props.item.id), 
	            React.createElement("div", {ref: "description", className: "list-item-description card-description"}, this.props.description), 
	            React.createElement("div", {className: "list-item-highlight card-highlight"}), 
	            React.createElement("div", {className: "list-item-extras card-extras"}, 
	              React.createElement("div", {className: "card-info-date"}, this.props.info.created_at), 
	              React.createElement("div", {className: "card-info-date"}, this.props.info.updated_at), 
	              buttonExpandToggle
	            ), 
	            React.createElement("div", {className: "card-dropdown"}, dropdown)
	          ), 
	          traceResult
	        )
	      );
	    }
	  }
	});

/***/ },
/* 493 */
/***/ function(module, exports, __webpack_require__) {

	var React                  = __webpack_require__(4);
	var classNames             = __webpack_require__(262);

	var Icon                   = __webpack_require__(298);

	var DropdownMenuItem       = __webpack_require__(296).DropdownMenuItem;
	var DropdownMenuButton       = __webpack_require__(296).DropdownMenuButton;

	var DropdownMenuItemToggle = __webpack_require__(494);

	__webpack_require__(397);

	module.exports = React.createClass({

	  displayName: 'DropdownWithButtons',

	  toggleDropdownMenu: function(e) {
	    e.stopPropagation();
	    this.props.toggleDropdownMenu();
	  },

	  render: function() {
	    var cssClasses = classNames({
	      'dropdown-menu': true,
	      'dropdown-menu-visible': this.props.visible,
	    });

	    var items = this.props.actions.filter(function(action){
	      return !action.hasOwnProperty('iconType')
	    }).map(function(action, i) {
	      return React.createElement(DropdownMenuItem, React.__spread({},  this.props, {key: i, action: action}))
	    }.bind(this));

	    var buttons = this.props.actions.filter(function(action){
	      return action.hasOwnProperty('iconType')
	    }).map(function(action, i){
	      return React.createElement(DropdownMenuButton, React.__spread({},  this.props, {key: i, action: action}))
	    }.bind(this));

	    return (
	      React.createElement("div", {className: "dropdown"}, 
	        React.createElement("div", {className: "dropdown-button clickable", onClick: this.toggleDropdownMenu}, 
	          React.createElement(Icon, {icon: this.props.icon})
	        ), 
	        React.createElement("div", {className: cssClasses}, 
	          React.createElement("div", {className: "dropdown-menu-section"}, 
	            items
	          ), 
	          React.createElement("div", {className: "dropdown-menu-section dropdown-menu-section-buttons"}, 
	            buttons
	          )
	        )
	      )
	    );
	  }

	});


/***/ },
/* 494 */
/***/ function(module, exports, __webpack_require__) {

	var React       = __webpack_require__(4);

	//var ViewActions = require('../actions/ViewActions');

	var Icon        = __webpack_require__(298);

	module.exports = React.createClass({

	  displayName: 'DropdownMenuItemToggle',

	  handleClick: function(e) {
	    e.stopPropagation();
	    this.props.handleClick(this.props.action.name);
	  },

	  render: function() {
	    var type = this.props.action.selected ? "checkbox-marked" : "checkbox-blank";
	    return (
	      React.createElement("div", {className: "dropdown-menu-item dropdown-menu-item-toggle", onClick: this.handleClick}, 
	        React.createElement(Icon, {icon: type}), 
	        React.createElement("span", null, this.props.action.displayName)
	      )
	    );
	  }

	});

/***/ },
/* 495 */
/***/ function(module, exports, __webpack_require__) {

	var React               = __webpack_require__(4);

	//var ViewActions         = require('../actions/ViewActions');

	var Dropdown            = __webpack_require__(296);
	var DropdownWithButtons = __webpack_require__(493);

	module.exports = React.createClass({

	  displayName: 'ContentHeader',

	  getInitialState: function () {
	      return {
	          headerNameWidth: 11,  
	      };
	  },

	  toggleDropdownMenu: function() {
	    ViewActions.showDropdown(this.props.list.uuid);
	  },

	  componentDidMount: function () {
	    this.setState({
	      headerNameWidth: this.props.initialHeaderWidth,
	    }, function() {
	      var updatedHeaderNameWidth = this.state.headerNameWidth;
	      this.props.headerColumns.forEach(function(column) {
	        updatedHeaderNameWidth -= column.width;
	      });
	      this.setState({
	        headerNameWidth: updatedHeaderNameWidth,
	      }, function() {
	        this.refs.title.getDOMNode().style.flex = this.state.headerNameWidth;
	      });
	    });
	  },

	  render: function() {
	    var dropdownVisible = this.props.dropdown === this.props.list.uuid;
	    var dropdown;
	    var columns = this.props.headerColumns.map(function(column) {
	      return React.createElement("div", {className: column.className, ref: column.ref}, column.text)
	    });
	    return (
	      React.createElement("div", {className: "list-header"}, 
	        columns
	      )
	    )
	  }

	});

/***/ },
/* 496 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	//var ViewActions         = require('../actions/ViewActions');

	var Constants = __webpack_require__(297);
	var List = __webpack_require__(497);

	var Dropdown = __webpack_require__(296).Dropdown;
	var DropdownWithButtons = __webpack_require__(493);

	var InstancesListHeader = __webpack_require__(498);

	var ContentHeader = __webpack_require__(495);

	module.exports = React.createClass({

	  displayName: 'InstancesListWithHeader',

	  propTypes: {
	    list: React.PropTypes.object.isRequired,
	    handleItemMenuClick: React.PropTypes.func.isRequired,
	    handleHeaderMenuClick: React.PropTypes.func.isRequired,
	  },

	  handleDropdownMenuItemClick: function (action) {

	    //if (Constants.VIEW_MODES.indexOf(action) != -1) {
	    //    ViewActions.updateViewMode(this.props.list.uuid, Constants.VIEW_ACTIONS_MAP[action]);
	    //}
	    //if (Constants.SORT_MODES.indexOf(action) != -1) {
	    //    ViewActions.updateSortMode(this.props.list.uuid, action);
	    //}
	  },

	  toggleDropdownMenu: function () {
	    ViewActions.showDropdown(this.props.list.uuid);
	  },

	  render: function () {

	    var dropdownVisible = this.props.dropdown === this.props.list.uuid;
	    var dropdown;
	    var heading;

	    //debugger;
	    //if (this.props.list.contentType !== "instances") {
	    //  dropdown = <Dropdown icon="more-horiz" actions={this.props.list.actions} visible={dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />;
	    //} else {
	    //  dropdown = <DropdownWithButtons icon="more-horiz" actions={this.props.list.actions} visible={dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />;
	    //}

	    //if (this.props.list.heading === "CodeBoxes" || this.props.list.heading === "Classes") {
	    //  heading = <ContentHeader {...this.props}/>
	    //} else {
	    //  heading = <div className="list-header">{this.props.list.heading}<div className="list-heading-dropdown">{dropdown}</div></div>
	    //}

	    //{heading}
	    console.log("List data", this.props.list.data);
	    return (
	      React.createElement("div", {className: "list-group"}, 
	        React.createElement(InstancesListHeader, {list: this.props.list, handleHeaderMenuClick: this.props.handleHeaderMenuClick}), 
	        React.createElement(List, {list: this.props.list, handleItemMenuClick: this.props.handleItemMenuClick})
	      )
	    );
	  }

	});

/***/ },
/* 497 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var Moment = __webpack_require__(160);
	var classNames = __webpack_require__(262);

	var ListItem = __webpack_require__(431);
	//var ListItemColumns = require('./ListItemColumns.react');
	var ListItemEmpty = __webpack_require__(405);


	module.exports = React.createClass({

	  displayName: 'List',

	  propTypes: {
	    list: React.PropTypes.object.isRequired,
	    handleItemMenuClick: React.PropTypes.func.isRequired,
	  },

	  getDefaultProps: function () {
	    return {
	      data: []
	    }
	  },

	  handleClick: function (item) {
	    //var instanceName = InstanceStore.getRouteParams().instanceName;
	    //if (this.props.list.contentType === "instances") {
	    //  window.location.href = '#instances/' + item.id;
	    //} else if (this.props.list.contentType === "codeboxes") {
	    //  window.location.href = '#instances/' + instanceName + '/codeboxes/' + item.id;
	    //} else if (this.props.list.contentType === "triggers") {
	    //  window.location.href = '#instances/' + instanceName + '/triggers/' + item.id;
	    //} else if (this.props.list.contentType === "schedules") {
	    //  window.location.href = '#instances/' + instanceName + '/schedules/' + item.id;
	    //} else if (this.props.list.contentType === "webhooks") {
	    //  window.location.href = '#instances/' + instanceName + '/webhooks/' + item.id;
	    //} else if (this.props.list.contentType === "traces") {
	    //  ViewActions.expandListItem(item);
	    //}
	  },

	  //getCodeBoxName: function (item) {
	  //  var codeBoxes = InstanceStore._getCodeBoxes();
	  //  var codeBoxName;
	  //  codeBoxes.forEach(function (codeBox) {
	  //    if (codeBox.id === item.data.codebox) {
	  //      codeBoxName = codeBox.data.name
	  //    }
	  //  });
	  //  return codeBoxName;
	  //},

	  handleItemMenuClick: function (action) {
	    // We need to add here information about list we are sorting/changing/view etc.
	    action['list'] = this.props.list.uuid;
	    this.props.handleItemMenuClick(action);
	  },

	  render: function () {

	    console.log('Rendering InstanceList');


	    var list = this.props.list;
	    var data = list.data;

	    var expandable;
	    var expanded;
	    var color;
	    var info;


	    //var config = ConfigStore.getConfig();
	    var contentType = this.props.list.contentType;

	    //var view = ViewsStore.getView(contentType);
	    //var icon = view.icon;


	    console.log('Number of items', data.length);

	    var items = [];
	    if (data.length > 0) {
	      console.log('Iterate over items', data);
	      items = Object.keys(data).map(function (item, i) {
	        return (React.createElement(ListItem, {
	          key: i, 
	          item: data[item], 
	          actions: list.actions, 
	          handleItemMenuClick: this.handleItemMenuClick, 
	          style: list.viewMode, 
	          avatarStyle: this.props.list.avatarStyle}))
	      }.bind(this));
	    } else if (data.length === 0) {
	      items = (React.createElement(ListItemEmpty, {icon: this.props.list.emptyIcon, 
	                              text: this.props.list.emptyText}))
	    }


	    var cssClasses = classNames('list', 'items-list', 'view-' + list.viewMode);

	    console.log("List items", items);
	    return (
	      React.createElement("div", {className: cssClasses}, 
	        items
	      )
	    );
	  }

	});

/***/ },
/* 498 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var Dropdown = __webpack_require__(296);


	module.exports = React.createClass({

	  displayName: 'InstancesListHeader',

	  propTypes: {
	    list: React.PropTypes.object.isRequired,
	    handleHeaderMenuClick: React.PropTypes.func.isRequired,
	  },

	  handleHeaderMenuClick: function(action) {
	    // We need to add here information about list we are sorting/changing/view etc.
	    action['list'] = this.props.list.uuid;
	    this.props.handleHeaderMenuClick(action);
	  },

	  render: function () {
	    var dropdown;
	    // Dropdown has only sense if there is more than one element on the list
	    if (this.props.list.data.length > 0) {
	      dropdown = React.createElement(Dropdown, {icon: "more-horiz", actions: this.props.list.actions, handleItemClick: this.handleHeaderMenuClick})
	    }
	    return (
	      React.createElement("div", {className: "list-header"}, this.props.list.heading, 
	        React.createElement("div", {className: "list-heading-dropdown"}, 
	          dropdown
	        )
	      )
	    )
	  }

	});

/***/ },
/* 499 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var AuthStore = __webpack_require__(255);

	module.exports = {

	  checkAuth: function (component, params) {
	    if (AuthStore.getToken()) {
	      React.render(component, params);
	    } else {
	      window.location.href = '#login';
	    }
	  }
	};



/***/ },
/* 500 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Syncano 4 javascript library
	 * ver 4.1
	 * last changed: 2015-05-05 by Artur Wróbel
	 * Copyright 2015 Syncano Inc.
	 */

	var isNode = false,
		isWebpack = false;
	if (typeof module !== 'undefined' && module.exports) {
		isNode = true;
	}

	if (typeof __webpack_require__ === 'function') {
		isNode = false;
		isWebpack = true;
	}

	var reqfun = (function(s) {
		return function(s) {
			return eval('require("' + s + '");');
		};
	})();

	if (isNode) {
		var Request = reqfun('request');
	}

	var Syncano = (function() {
		/*
			define dummy console if not present in the system
		*/
		if (typeof console === 'undefined') {
			console = {
				log: function() {},
				error: function() {},
				warning: function() {}
			};
		}

		/*
			private variables
		*/

		// base url of all requests - will be changed in final version
		var baseURL = 'https://api.syncano.rocks/';

		// main api authorization key - the one used to connect to Syncano or returned when connecting with user/password
		var apiKey = null;

		// object to store current user info
		var accountObject = {};

		// instance you are currently connected to
		var instanceObject = {};

		// object with all links extracted from various requests
		var linksObject = {};

		var tempInstance = null;


		/********************
			PRIVATE METHODS
		*********************/
		function normalizeUrl(url) {
			var baseUrl = url.substr(0, 8);
			if (baseUrl === 'https://') {
				url = url.substr(8);
			} else {
				baseUrl = '';
			}
			if (url.substr(-1) !== '/' && url.indexOf('?') === -1) {
				url += '/';
			}
			return baseUrl + url.replace(/\/\//g, '/');
		}

		function setApiKey(_apiKey) {
			apiKey = _apiKey;
		}

		/*
			Parses obj and search for obj.links.
			If found, copies them to private linksObject with given prefix and removes from obj. 
			All existing links will be overwritten
			Returns:
				linksObject
		*/
		function saveLinks(prefix, obj) {
			if (obj.links) {
				Object.keys(obj.links).forEach(function(key) {
					linksObject[prefix + '_' + key] = obj.links[key];
				});
			}
			if (typeof linksObject.instance_channels === 'undefined') {
				linksObject.instance_channels = linksObject.instance_self + 'channels/';
			}
			delete obj.links;
			return linksObject;
		}

		function prepareAjaxParams(data) {
			var s = [];
			for (var i in data) {
				if (data.hasOwnProperty(i)) {
					s.push(i + '=' + data[i]);
				}
			}
			return s.join('&');
		}

		function ajax(params) {
			var xhr = {};
			var request = new XMLHttpRequest();
			var mtype = params.type.toUpperCase();
			if (mtype === 'GET') {
				params.url += (params.url.indexOf('?') === -1 ? '?' : '&') + prepareAjaxParams(params.data);
			}
			request.open(mtype, params.url, true);
			if (mtype !== 'GET') {
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			}
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					var data = '';
					try {
						data = JSON.parse(request.responseText);
					} catch (e) {};
					params.success(data);
				} else {
					params.error(request);
				}
			};

			if (mtype !== 'GET') {
				request.send(prepareAjaxParams(params.data));
			} else {
				request.send();
			}
			return xhr;
		}

		function buildUrlParams(params) {
			var urlParams = [];
			for (var key in params) {
				var val = params[key];
				if (Array.isArray(val)) {
					for (var ii = 0, ll = val.length; ii < ll; ii++) {
						urlParams.push(key + '=' + encodeURIComponent(val[ii]));
					}
				} else if (typeof val === 'object') {
					for (var kk in val) {
						if (val.hasOwnProperty(kk)) {
							var nkey = key + '%5B' + kk + '%5D';
							urlParams.push(nkey + '=' + encodeURIComponent(val[kk]));
						}
					}
				} else {
					urlParams.push(key + '=' + encodeURIComponent(val));
				}
			}
			return urlParams.join('&');
		}

		function nodeRequest(params) {
			var opt = {
				url: params.url,
				method: params.type,
				strictSSL: false,
				body: buildUrlParams(params.data)
			};
			if (params.type !== 'GET') {
				opt.headers = {
					'content-type': 'application/x-www-form-urlencoded',
					'user-agent': 'syncano-nodejs-4.0'
				};
			}
			Request(opt, function(error, response, body) {
				if (response.statusCode >= 200 && response.statusCode < 400) {
					var data = '';
					try {
						data = JSON.parse(body);
					} catch (e) {};
					params.success(data);
				} else {
					params.error({
						responseText: body
					});
				}
			});
		}

		function prepareObjectToBeUpdated(obj) {
			var fieldsToDelete = ['updated_at', 'created_at', 'revision', 'links'];
			for (var i = 0; i < fieldsToDelete.length; i++) {
				delete obj[fieldsToDelete[i]];
			}
			return obj;
		}

		/*
			Helper method to convert list of objects returned from Syncano to object
		*/
		function createList(lib, data) {
			var List = {};
			for (var i = 0, len = data.objects.length; i < len; i++) {
				Object.defineProperty(data.objects[i], 'delete', {
					value: function(callbackOK, callbackError) {
						return lib.request('DELETE', this.links.self, {}, callbackOK, callbackError);
					},
					writable: false,
					enumerable: false,
					configurable: false
				});
				if (typeof data.objects[i].name !== 'undefined') {
					Object.defineProperty(List, data.objects[i].name, {
						value: data.objects[i],
						writable: true,
						enumerable: true,
						configurable: false
					});
				}
			}
			Object.defineProperty(List, '_items', {
				value: data.objects,
				writable: true,
				enumerable: false,
				configurable: false
			});
			Object.defineProperty(List, 'length', {
				value: List._items.length,
				writable: false,
				enumerable: false,
				configurable: false
			});
			Object.defineProperty(List, 'at', {
				value: function(idx) {
					return List._items[idx];
				},
				writable: false,
				enumerable: false,
				configurable: false
			});
			Object.defineProperty(List, 'hasNextPage', {
				value: function() {
					return data.next !== null;
				},
				writable: false,
				enumerable: false,
				configurable: false
			});
			Object.defineProperty(List, 'hasPrevPage', {
				value: function() {
					return data.prev !== null;
				},
				writable: false,
				enumerable: false,
				configurable: false
			});
			Object.defineProperty(List, 'loadNextPage', {
				value: function(callbackOK, callbackError) {
					return lib.request('GET', data.next);
				},
				writable: false,
				enumerable: false,
				configurable: false
			});
			Object.defineProperty(List, 'loadPrevPage', {
				value: function(callbackOK, callbackError) {
					return lib.request('GET', data.prev);
				},
				writable: false,
				enumerable: false,
				configurable: false
			});
			return List;
		}

		function extendClassObject(lib, obj) {
			Object.defineProperty(obj, 'createDataObject', {
				value: function(params, callbackOK, callbackError) {
					return lib.createDataObject(obj.name, params, callbackOK, callbackError);
				},
				writable: false,
				enumerable: false,
				configurable: false
			});
		}

		var deferIsAlwaysAsync = true;


		/**
		 * Creates Syncano object
		 *
		 * @constructor
		 * @class Syncano
		 * @param {object|string} [param] - either name of the instance to connect to or object with instance attribute
		 */
		function Syncano(param) {
			if (typeof param === 'string') {
				tempInstance = param;
			} else if (typeof param === 'object' && typeof param.instance === 'string') {
				tempInstance = param.instance;
			}

			/**
			 * Object with methods to handle Accounts
			 *
			 * @alias Syncano#Accounts
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createAccount} method
			 * @property {function} get - shortcut to {@link Syncano#getAccount} method
			 * @property {function} update - shortcut to {@link Syncano#updateAccount} method
			 * @property {function} resetKey - shortcut to {@link Syncano#resetAccountKey} method
			 */
			this.Accounts = {
				create: this.createAccount.bind(this),
				get: this.getAccount.bind(this),
				update: this.updateAccount.bind(this),
				resetKey: this.resetAccountKey.bind(this)
			};

			/**
			 * Object with methods to handle Instances
			 *
			 * @alias Syncano#Instances
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createInstance} method
			 * @property {function} list - shortcut to {@link Syncano#listInstances} method
			 * @property {function} get - shortcut to {@link Syncano#getInstance} method
			 * @property {function} remove - shortcut to {@link Syncano#removeInstance} method
			 * @property {function} update - shortcut to {@link Syncano#updateInstance} method
			 * @property {function} listAdmins - shortcut to {@link Syncano#listInstanceAdmins} method
			 */
			this.Instances = {
				create: this.createInstance.bind(this),
				list: this.listInstances.bind(this),
				get: this.getInstance.bind(this),
				remove: this.removeInstance.bind(this),
				update: this.updateInstance.bind(this),
				listAdmins: this.listInstanceAdmins.bind(this)
			};

			/**
			 * Object with methods to handle Classes
			 *
			 * @alias Syncano#Classes
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createClass} method
			 * @property {function} list - shortcut to {@link Syncano#listClasses} method
			 * @property {function} get - shortcut to {@link Syncano#getClass} method
			 * @property {function} remove - shortcut to {@link Syncano#removeClass} method
			 * @property {function} update - shortcut to {@link Syncano#updateClass} method
			 */
			this.Classes = {
				create: this.createClass.bind(this),
				list: this.listClasses.bind(this),
				remove: this.removeClass.bind(this),
				get: this.getClass.bind(this),
				update: this.updateClass.bind(this)
			};

			/**
			 * Object with methods to handle DataObjects
			 *
			 * @alias Syncano#DataObjects
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createDataObject} method
			 * @property {function} list - shortcut to {@link Syncano#listDataObjects} method
			 * @property {function} get - shortcut to {@link Syncano#getDataObject} method
			 * @property {function} remove - shortcut to {@link Syncano#removeDataObject} method
			 * @property {function} update - shortcut to {@link Syncano#updateDataObject} method
			 */
			this.DataObjects = {
				create: this.createDataObject.bind(this),
				list: this.listDataObjects.bind(this),
				remove: this.removeDataObject.bind(this),
				get: this.getDataObject.bind(this),
				update: this.updateDataObject.bind(this)
			};

			/**
			 * Object with methods to handle ApiKeys
			 *
			 * @alias Syncano#ApiKeys
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createApiKey} method
			 * @property {function} list - shortcut to {@link Syncano#listApiKeys} method
			 * @property {function} get - shortcut to {@link Syncano#getApiKey} method
			 * @property {function} remove - shortcut to {@link Syncano#removeApiKey} method
			 */
			this.ApiKeys = {
				create: this.createApiKey.bind(this),
				list: this.listApiKeys.bind(this),
				get: this.getApiKey.bind(this),
				remove: this.removeApiKey.bind(this)
			};

			/**
			 * Object with methods to handle Users
			 *
			 * @alias Syncano#Users
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createUser} method
			 * @property {function} list - shortcut to {@link Syncano#listUsers} method
			 * @property {function} get - shortcut to {@link Syncano#getUser} method
			 * @property {function} update - shortcut to {@link Syncano#updateUser} method
			 * @property {function} remove - shortcut to {@link Syncano#removeUser} method
			 */
			this.Users = {
				create: this.createUser.bind(this),
				list: this.listUsers.bind(this),
				get: this.getUser.bind(this),
				update: this.updateUser.bind(this),
				remove: this.removeUser.bind(this)
			};

			/**
			 * Object with methods to handle Groups of permissions
			 *
			 * @alias Syncano#Groups
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createGroup} method
			 * @property {function} list - shortcut to {@link Syncano#listGroups} method
			 * @property {function} get - shortcut to {@link Syncano#getGroup} method
			 * @property {function} remove - shortcut to {@link Syncano#removeGroup} method
			 * @property {function} addUser - shortcut to {@link Syncano#addUserToGroup} method
			 */
			this.Groups = {
				create: this.createGroup.bind(this),
				list: this.listGroups.bind(this),
				get: this.getGroup.bind(this),
				remove: this.removeGroup.bind(this),
				addUser: this.addUserToGroup.bind(this)
			};

			/**
			 * Object with methods to handle Channels
			 *
			 * @alias Syncano#Channels
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createChannel} method
			 * @property {function} list - shortcut to {@link Syncano#listChannels} method
			 * @property {function} get - shortcut to {@link Syncano#getChannel} method
			 * @property {function} update - shortcut to {@link Syncano#updateChannel} method
			 * @property {function} remove - shortcut to {@link Syncano#removeChannel} method
			 * @property {function} listen - shortcut to {@link Syncano#channelListen} method
			 * @property {function} getHistory - shortcut to {@link Syncano#getChannelHistory} method
			 * @property {function} publish - shortcut to {@link Syncano#publishToChannel} method
			 */
			this.Channels = {
				create: this.createChannel.bind(this),
				list: this.listChannels.bind(this),
				get: this.getChannel.bind(this),
				update: this.updateChannel.bind(this),
				remove: this.removeChannel.bind(this),
				listen: this.channelListen.bind(this),
				getHistory: this.getChannelHistory.bind(this),
				publish: this.publishToChannel.bind(this)
			};

			/**
			 * Object with methods to handle CodeBoxes
			 *
			 * @alias Syncano#CodeBoxes
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createCodeBox} method
			 * @property {function} list - shortcut to {@link Syncano#listCodeBoxes} method
			 * @property {function} get - shortcut to {@link Syncano#getCodeBox} method
			 * @property {function} remove - shortcut to {@link Syncano#removeCodeBox} method
			 * @property {function} update - shortcut to {@link Syncano#updateCodeBox} method
			 * @property {function} listRuntimes - shortcut to {@link Syncano#listCodeBoxRuntimes} method
			 * @property {function} traces - shortcut to {@link Syncano#listCodeBoxTraces} method
			 * @property {function} trace - shortcut to {@link Syncano#getCodeBoxTrace} method
			 * @property {function} run - shortcut to {@link Syncano#runCodeBox} method
			 */
			this.CodeBoxes = {
				create: this.createCodeBox.bind(this),
				list: this.listCodeBoxes.bind(this),
				listRuntimes: this.listCodeBoxRuntimes.bind(this),
				get: this.getCodeBox.bind(this),
				update: this.updateCodeBox.bind(this),
				remove: this.removeCodeBox.bind(this),
				traces: this.listCodeBoxTraces.bind(this),
				trace: this.getCodeBoxTrace.bind(this),
				run: this.runCodeBox.bind(this),
			};

			/**
			 * Object with methods to handle Invitations
			 *
			 * @alias Syncano#Invitations
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createInvitation} method
			 * @property {function} list - shortcut to {@link Syncano#listInvitations} method
			 * @property {function} get - shortcut to {@link Syncano#getInvitation} method
			 * @property {function} remove - shortcut to {@link Syncano#removeInvitation} method
			 */
			this.Invitations = {
				create: this.createInvitation.bind(this),
				list: this.listInvitations.bind(this),
				get: this.getInvitation.bind(this),
				remove: this.removeInvitation.bind(this)
			};

			/**
			 * Object with methods to handle WebHooks
			 *
			 * @alias Syncano#WebHooks
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createWebHook} method
			 * @property {function} list - shortcut to {@link Syncano#listWebHooks} method
			 * @property {function} get - shortcut to {@link Syncano#getWebHook} method
			 * @property {function} remove - shortcut to {@link Syncano#removeWebHook} method
			 * @property {function} update - shortcut to {@link Syncano#updateWebHook} method
			 * @property {function} run - shortcut to {@link Syncano#runWebHook} method
			 */
			this.WebHooks = {
				create: this.createWebHook.bind(this),
				list: this.listWebHooks.bind(this),
				get: this.getWebHook.bind(this),
				update: this.updateWebHook.bind(this),
				remove: this.removeWebHook.bind(this),
				run: this.runWebHook.bind(this),
				traces: this.listWebHookTraces.bind(this),
				trace: this.getWebHookTrace.bind(this)
			};

			/**
			 * Object with methods to handle Triggers
			 *
			 * @alias Syncano#Triggers
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createTrigger} method
			 * @property {function} list - shortcut to {@link Syncano#listTriggers} method
			 * @property {function} get - shortcut to {@link Syncano#getTrigger} method
			 * @property {function} remove - shortcut to {@link Syncano#removeTrigger} method
			 * @property {function} update - shortcut to {@link Syncano#updateTrigger} method
			 */
			this.Triggers = {
				create: this.createTrigger.bind(this),
				list: this.listTriggers.bind(this),
				get: this.getTrigger.bind(this),
				update: this.updateTrigger.bind(this),
				remove: this.removeTrigger.bind(this),
				traces: this.listTriggerTraces.bind(this),
				trace: this.getTriggerTrace.bind(this)
			};

			/**
			 * Object with methods to handle Schedules
			 *
			 * @alias Syncano#Schedules
			 * @type {object}
			 * @property {function} create - shortcut to {@link Syncano#createSchedule} method
			 * @property {function} list - shortcut to {@link Syncano#listSchedules} method
			 * @property {function} get - shortcut to {@link Syncano#getSchedule} method
			 * @property {function} remove - shortcut to {@link Syncano#removeSchedule} method
			 * @property {function} traces - shortcut to {@link Syncano#listScheduleTraces} method
			 * @property {function} trace - shortcut to {@link Syncano#getScheduleTrace} method
			 */
			this.Schedules = {
				create: this.createSchedule.bind(this),
				list: this.listSchedules.bind(this),
				get: this.getSchedule.bind(this),
				remove: this.removeSchedule.bind(this),
				traces: this.listScheduleTraces.bind(this),
				trace: this.getScheduleTrace.bind(this)
			};
		}


		Syncano.prototype = {

			setAlwaysAsync: function(value) {
				deferIsAlwaysAsync = value;
			},

			/**
			 * Connects to Syncano using either auth token (api key) or email / password.
			 * Calls proper auth method based on arguments passed.
			 *
			 * @method Syncano#connect
			 * @param {string} identifier - email or token
			 * @param {string} [password] - used only if first parameter is email
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object}	promise
			 *
			 * @example
			 * var s = new Syncano('instance-name');
			 * s.connect('email', 'password').then(function(){
			 *     alert('connected');
			 * });
			 */
			connect: function() {
				var promise;
				if (arguments.length >= 2 && arguments[0].indexOf('@') > 0) {
					// arguments are: email and password and optional callbacks
					promise = this.authWithPassword.apply(this, arguments);
					if (tempInstance !== null) {
						promise = promise.then(function() {
							return this.setInstance(tempInstance);
						}.bind(this));
					}
				} else if (arguments.length >= 1) {
					// arguments are: apiKey and optional callbacks
					promise = this.authWithApiKey.apply(this, arguments);
					if (tempInstance !== null) {
						promise = this.setInstance(tempInstance);
					}
				} else {
					throw new Error('Incorrect arguments');
				}
				return promise;
			},

			/**
			 * Connects to Syncano using email and password
			 *
			 * @method Syncano#authWithPassword
			 * @param {string} email
			 * @param {string} password
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 *
			 * @example
			 * var s = new Syncano('instance-name');
			 * s.authWithPassword('email', 'password').then(function(){
			 *     alert('connected');
			 * });
			 */
			authWithPassword: function(email, password, callbackOK, callbackError) {
				var params = {
					email: email,
					password: password
				};
				return this.request('POST', 'v1/account/auth', params, function(res) {
					accountObject = res;
					setApiKey(res.account_key);
					typeof callbackOK === 'function' && callbackOK(res);
				}.bind(this), callbackError);
			},

			/**
			 * Connects to Syncano using email and password
			 *
			 * @method Syncano#authWithApiKey
			 * @param  {string} email
			 * @param  {string} password
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 *
			 * @example
			 * var s = new Syncano('instance-name');
			 * s.authWithApiKey('api-key').then(function(){
			 *     alert('connected');
			 * });
			 */
			authWithApiKey: function(apiKey, callbackOK) {
				setApiKey(apiKey);
				var deferred = Deferred();
				accountObject = {
					account_key: apiKey
				};
				typeof callbackOK === 'function' && callbackOK(accountObject);
				deferred.resolve(accountObject);
				return deferred.promise;
			},


			/**
			 * Checks if instance exists and stores its information in private instanceObject
			 *
			 * @method Syncano#setInstance
			 * @param {string} instanceName
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			setInstance: function(instanceName, callbackOK, callbackError) {
				return this.request('GET', 'v1/instances/' + instanceName, {}, function(result) {
					instanceObject = result;
					saveLinks('instance', result);
					typeof callbackOK === 'function' && callbackOK(result);
				}.bind(this), callbackError);
			},

			/**
			 * Returns object with private informations: account, instance and links
			 *
			 * @method Syncano#getInfo
			 * @return {object}
			 */
			getInfo: function() {
				return {
					account: accountObject,
					instance: instanceObject,
					links: linksObject
				}
			},


			/*********************
			   INSTANCES METHODS
			**********************/
			/**
			 * Creates new instance using passed parameters.
			 *
			 * @method Syncano#createInstance
			 * @alias Syncano.Instances.create
			 * @param {object} params
			 * @param {string} params.name - name of the instance
			 * @param {string} [description] - optional description of the instance
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createInstance: function(params, callbackOK, callbackError) {
				if (typeof params === 'string') {
					params = {
						name: params
					};
				}
				if (typeof params === 'undefined' || typeof params.name === 'undefined') {
					throw new Error('Missing instance name');
				}
				return this.request('POST', 'v1/instances', params, callbackOK, callbackError);
			},

			/**
			 * Returns all defined instances as a list
			 *
			 * @method Syncano#listInstances
			 * @alias Syncano.Instances.list
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listInstances: function(params, callbackOK, callbackError) {
				params = params || {};
				return this.request('GET', 'v1/instances', params, callbackOK, callbackError);
			},

			/**
			 * Returns details of the instance with specified name
			 *
			 * @method Syncano#getInstance
			 * @alias Syncano.Instances.get
			 * @param {string|object} name
			 * @param {string} name.name - when passed parameter is an object, we use its name property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getInstance: function(name, callbackOK, callbackError) {
				if (typeof name === 'object') {
					name = name.name;
				}
				if (typeof name === 'undefined' || name.length === 0) {
					throw new Error('Missing instance name');
				}
				return this.request('GET', 'v1/instances/' + name, {}, callbackOK, callbackError);
			},

			/**
			 * Removes instance identified by specified name
			 *
			 * @method Syncano#removeInstance
			 * @alias Syncano.Instances.remove
			 * @param {string|object} name
			 * @param {string} name.name - when passed parameter is an object, we use its name property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeInstance: function(name, callbackOK, callbackError) {
				if (typeof name === 'object') {
					name = name.name;
				}
				if (typeof name === 'undefined' || name.length === 0) {
					throw new Error('Missing instance name');
				}
				return this.request('DELETE', 'v1/instances/' + name, {}, callbackOK, callbackError);
			},

			/**
			 * Updates instance identified by specified name
			 *
			 * @method Syncano#updateInstance
			 * @alias Syncano.Instances.update
			 * @param {string} name - name of the instance to change
			 * @param {Object} params - new values of the instance parameters
			 * @param {string} params.description - new description of the instance
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {Object} promise
			 */
			updateInstance: function(name, params, callbackOK, callbackError) {
				if (typeof name === 'undefined' || name.length === 0) {
					throw new Error('Missing instance name');
				}
				return this.request('PATCH', 'v1/instances/' + name, params, callbackOK, callbackError);
			},

			/**
			 * Returns all defined instance admins as a list
			 *
			 * @method Syncano#listInstanceAdmins
			 * @alias Syncano.Instances.listAdmins
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listInstanceAdmins: function(name, params, callbackOK, callbackError) {
				params = params || {};
				if (typeof name === 'object') {
					name = name.name;
				}
				if (typeof name === 'undefined' || name.length === 0) {
					throw new Error('Missing instance name');
				}
				return this.request('GET', 'v1/instances/' + name + '/admins/', params, callbackOK, callbackError);
			},


			/*****************
			   CLASS METHODS
			******************/
			/**
			 * Creates new class based on passed parameters
			 *
			 * @method Syncano#createClass
			 * @alias Syncano.Classes.create
			 * @param {Object} params - values of the class parameters
			 * @param {string} params.name - name of the class
			 * @param {string} params.description - description of the class
			 * @param {string|object} params.schema - schema object or string
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createClass: function(params, callbackOK, callbackError) {
				if (typeof linksObject.instance_classes === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				params.description = params.description || '';
				if (typeof params.schema !== 'string') {
					params.schema = params.schema.toString();
				}
				return this.request('POST', linksObject.instance_classes, params, function(result) {
					saveLinks('class_' + params.name, result);
					typeof callbackOK === 'function' && callbackOK(result);
				}.bind(this), callbackError);
			},

			/**
			 * Returns all defined classes as a list
			 *
			 * @method Syncano#listClasses
			 * @alias Syncano.Classes.list
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listClasses: function(params, callbackOK, callbackError) {
				return this.genericList(params, 'instance_classes', callbackOK, callbackError);
			},

			/**
			 * Removes class identified by specified name
			 *
			 * @method Syncano#removeClass
			 * @alias Syncano.Classes.remove
			 * @param {string|object} name
			 * @param {string} name.name - when passed parameter is an object, we use its name property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeClass: function(name, callbackOK, callbackError) {
				return this.genericRemove(name, 'instance_classes', callbackOK, callbackError);
			},

			/**
			 * Returns details of the class with specified name
			 *
			 * @method Syncano#getClass
			 * @alias Syncano.Classes.get
			 * @param {string|object} name
			 * @param {string} name.name - when passed parameter is an object, we use its name property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getClass: function(name, callbackOK, callbackError) {
				return this.genericGet(name, 'instance_classes', function(obj) {
					extendClassObject(this, obj);
					if (typeof callbackOK === 'function') {
						callbackOK();
					}
				}.bind(this), callbackError);
			},

			/**
			 * Updates class identified by specified name
			 *
			 * @method Syncano#updateClass
			 * @alias Syncano.Classes.update
			 * @param {string} name - name of the class to change
			 * @param {Object} params - new values of the class parameters
			 * @param {string} params.description - new description of the class
			 * @param {string|object} params.schema - schema object or string
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {Object} promise
			 */
			updateClass: function(name, params, callbackOK, callbackError) {
				if (typeof linksObject.instance_classes === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				if (typeof name === 'object') {
					params = name;
					name = name.name;
					delete params.name;
				}
				if (typeof name === 'undefined' || name.length === 0) {
					throw new Error('Missing class name');
				}
				if (typeof params.schema !== 'string') {
					params.schema = params.schema.toString();
				}
				return this.request('PATCH', linksObject.instance_classes + name, params, callbackOK, callbackError);
			},


			/*******************
			   ACCOUNT METHODS
			********************/
			/**
			 * Registers new account
			 *
			 * @method Syncano#createAccount
			 * @alias Syncano.Accounts.create
			 * @param {object} params
			 * @param {string} params.email
			 * @param {string} params.password
			 * @param {string} params.first_name
			 * @param {string} params.last_name
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createAccount: function(params, callbackOK, callbackError) {
				return this.request('POST', 'v1/account/register/', params, callbackOK, callbackError);
			},

			/**
			 * Returns details of the currently logged user
			 *
			 * @method Syncano#getAccount
			 * @alias Syncano.Accounts.get
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getAccount: function(callbackOK, callbackError) {
				return this.request('GET', 'v1/account/', {}, callbackOK, callbackError);
			},

			/**
			 * Updates account of the currently logged user
			 *
			 * @method Syncano#updateAccount
			 * @alias Syncano.Accounts.update
			 * @param {Object} params - new values of the account parameters
			 * @param {string} params.email - new email address
			 * @param {string} params.first_name - new first name of the user
			 * @param {string} params.last_name - new last name of the user
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {Object} promise
			 */
			updateAccount: function(params, callbackOK, callbackError) {
				return this.request('PUT', 'v1/account/', params, callbackOK, callbackError);
			},

			/**
			 * Sets new auth key for api calls and removes previous one.
			 *
			 * @method  Syncano#resetAccountKey
			 * @alias Syncano.Accounts.resetKey
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {Object} promise
			 */
			resetAccountKey: function(callbackOK, callbackError) {
				return this.request('POST', 'v1/account/reset_key', {}, callbackOK, callbackError);
			},

			/***********************
			   DATA OBJECT METHODS
			************************/
			/**
			 * Creates new data object within given class
			 *
			 * @method Syncano#createDataObject
			 * @alias Syncano.DataObjects.create
			 * @param {string} className - name of the class object belongs to
			 * @param {Object} params - values of the data object parameters (as defined in class definition)
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createDataObject: function(className, params, callbackOK, callbackError) {
				if (typeof className === 'object') {
					params = className;
					className = className.class_name;
					delete params.class_name;
				}
				if (typeof className === 'undefined') {
					throw new Error('Missing name of the class');
				}
				if (typeof linksObject.instance_classes === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				var methodName = linksObject.instance_classes + className + '/objects/';
				return this.request('POST', methodName, params, callbackOK, callbackError);
			},

			/**
			 * Returns all data objects withing a single class as a list
			 *
			 * @method Syncano#listDataObjects
			 * @alias Syncano.DataObjects.list
			 * @param {string} className
			 * @param {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listDataObjects: function(className, params, callbackOK, callbackError) {
				if (typeof className === 'object') {
					className = className.name;
				}
				if (typeof className === 'undefined') {
					throw new Error('Missing name of the class');
				}
				if (typeof linksObject.instance_classes === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				var methodName = linksObject.instance_classes + className + '/objects/';
				return this.request('GET', methodName, params, callbackOK, callbackError);
			},

			/**
			 * Removes data object identified by specified id and className
			 *
			 * @method Syncano#removeDataObject
			 * @alias Syncano.DataObjects.remove
			 * @param {string} className - name of the class object belongs to
			 * @param {Number|object} params - data object or its it
			 * @param {Number} params.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeDataObject: function(className, params, callbackOK, callbackError) {
				if (typeof className === 'object') {
					params = className;
					className = className.class_name;
					delete params.class_name;
				}
				if (typeof className === 'undefined') {
					throw new Error('Missing name of the class');
				}
				if (typeof linksObject.instance_classes === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				var id;
				if (typeof params !== 'object') {
					id = params;
				} else {
					id = params.id || params.pk;
				}
				var methodName = linksObject.instance_classes + className + '/objects/' + id;
				return this.request('DELETE', methodName, {}, callbackOK, callbackError);
			},

			/**
			 * Returns details of the data object with specified id and class
			 *
			 * @method Syncano#getDataObject
			 * @alias Syncano.DataObjects.get
			 * @param {string} className
			 * @param {Number|object} params - when passed parameter is a number we treat it as an id of the data object
			 * @param {Number} params.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getDataObject: function(className, params, callbackOK, callbackError) {
				if (typeof className === 'object') {
					params = className;
					className = className.class_name;
					delete params.class_name;
				}
				if (typeof className === 'undefined') {
					throw new Error('Missing name of the class');
				}
				if (typeof linksObject.instance_classes === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				var id;
				if (typeof params !== 'object') {
					id = params;
				} else {
					id = params.id || params.pk;
				}
				var methodName = linksObject.instance_classes + className + '/objects/' + id;
				return this.request('GET', methodName, {}, callbackOK, callbackError);
			},

			/**
			 * Updates data object identified by given id and className
			 *
			 * @method Syncano#updateDataObject
			 * @alias Syncano.DataObjects.update
			 * @param {string} className - name of the class object belongs to
			 * @param {Object} params - new values of the data object parameters (as defined in class definition)
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {Object} promise
			 */
			updateDataObject: function(className, params, callbackOK, callbackError) {
				if (typeof className === 'object') {
					params = className;
					className = className.class_name;
					delete params.class_name;
				}
				if (typeof className === 'undefined') {
					throw new Error('Missing name of the class');
				}
				if (typeof linksObject.instance_classes === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				var id;
				if (params.id) {
					id = params.id;
					delete params.id;
				} else if (params.pk) {
					id = params.pk;
					delete params.pk;
				}
				params = prepareObjectToBeUpdated(params);
				var methodName = linksObject.instance_classes + className + '/objects/' + id;
				return this.request('PATCH', methodName, params, callbackOK, callbackError);
			},

			/********************
			   API KEYS METHODS
			*********************/
			/**
			 * Creates new api key
			 *
			 * @method  Syncano#createApiKey
			 * @alias Syncano.ApiKeys.create
			 * @param  {object} params
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createApiKey: function(params, callbackOK, callbackError) {
				params = params || {};
				if (typeof linksObject.instance_api_keys === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('POST', linksObject.instance_api_keys, params, callbackOK, callbackError);
			},

			/**
			 * Returns all defined api keys as a list
			 *
			 * @method Syncano#listApiKeys
			 * @alias Syncano.ApiKeys.list
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listApiKeys: function(params, callbackOK, callbackError) {
				return this.genericList(params, 'instance_api_keys', callbackOK, callbackError);
			},

			/**
			 * Returns the API key with specified id
			 *
			 * @method Syncano#getApiKey
			 * @alias Syncano.ApiKeys.get
			 * @param {Number|object} id
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getApiKey: function(id, callbackOK, callbackError) {
				return this.genericGet(id, 'instance_api_keys', callbackOK, callbackError);
			},

			/**
			 * Removes API key identified by specified id
			 *
			 * @method Syncano#removeApiKey
			 * @alias Syncano.ApiKeys.remove
			 * @param {Number|object} id - identifier of the api key to remove
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeApiKey: function(id, callbackOK, callbackError) {
				return this.genericRemove(id, 'instance_api_keys', callbackOK, callbackError);
			},

			/*********************
			   USERS METHODS
			**********************/
			/**
			 * Creates new user
			 *
			 * @method Syncano#createUser
			 * @alias Syncano.Users.create
			 * @param {object} params
			 * @param {string} params.username
			 * @param {string} params.password
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createUser: function(params, callbackOK, callbackError) {
				params = params || {};
				if (typeof linksObject.instance_users === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('POST', linksObject.instance_users, params, callbackOK, callbackError);
			},

			/**
			 * Returns all users within an instance as a list
			 *
			 * @method Syncano#listUsers
			 * @alias Syncano.Users.list
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listUsers: function(params, callbackOK, callbackError) {
				return this.genericList(params, 'instance_users', callbackOK, callbackError);
			},

			/**
			 * Returns user with specified id
			 *
			 * @method Syncano#getUser
			 * @alias Syncano.Users.get
			 * @param {Number|object} id
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getUser: function(id, callbackOK, callbackError) {
				return this.genericGet(id, 'instance_users', callbackOK, callbackError);
			},

			/**
			 * Updates user identified by given id
			 *
			 * @method Syncano#updateUser
			 * @alias Syncano.Users.update
			 * @param {Number|object} id
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {Object} params - new parameters of user
			 * @param {string} params.username
			 * @param {string} params.password
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {Object} promise
			 */
			updateUser: function(id, params, callbackOK, callbackError) {
				if (typeof id === 'object') {
					params = id;
					id = params.id;
					delete params.id;
				}
				if (typeof id === 'undefined') {
					throw new Error('Missing user id');
				}
				if (typeof linksObject.instance_users === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				var promise = this.request('PATCH', linksObject.instance_users + id, params, callbackOK, callbackError);
				delete params.username;
				delete params.password;
				if (Object.keys(params).length > 0) {
					promise = promise.then(function(res) {
						var profileUrl = res.profile.links.self;
						return this.request('PATCH', profileUrl, params, callbackOK, callbackError);
					}.bind(this), callbackError);
				}
				return promise;
			},

			/**
			 * Removes User identified by specified id
			 *
			 * @method Syncano#removeUser
			 * @alias Syncano.Users.remove
			 * @param {Number|object} id - identifier of the user to remove
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeUser: function(id, callbackOK, callbackError) {
				return this.genericRemove(id, 'instance_users', callbackOK, callbackError);
			},


			/*********************
			   GROUPS METHODS
			**********************/
			/**
			 * Creates new group
			 *
			 * @method Syncano#createGroup
			 * @alias Syncano.Groups.create
			 * @param {object} name - name of the group
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createGroup: function(name, callbackOK, callbackError) {
				var params = {
					name: name
				};
				if (typeof linksObject.instance_groups === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('POST', linksObject.instance_groups, params, callbackOK, callbackError);
			},

			/**
			 * Returns all defined groups
			 *
			 * @method Syncano#listGroups
			 * @alias Syncano.Groups.list
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listGroups: function(params, callbackOK, callbackError) {
				return this.genericList(params, 'instance_groups', callbackOK, callbackError);
			},

			/**
			 * Returns the group with specified id
			 *
			 * @method Syncano#getGroup
			 * @alias Syncano.Groups.get
			 * @param {Number|object} id
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getGroup: function(id, callbackOK, callbackError) {
				return this.genericGet(id, 'instance_groups', callbackOK, callbackError);
			},

			/**
			 * Removes group identified by specified id
			 *
			 * @method Syncano#removeGroup
			 * @alias Syncano.Group.remove
			 * @param {Number|object} id - identifier of the CodeBox to remove
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeGroup: function(id, callbackOK, callbackError) {
				return this.genericRemove(id, 'instance_groups', callbackOK, callbackError);
			},

			addUserToGroup: function(params, callbackOK, callbackError) {
				var groupId = params.group;
				delete params.group;
				if (typeof linksObject.instance_groups === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				if (typeof groupId === 'undefined') {
					throw new Error('Missing group id');
				}
				if (typeof params.user === 'undefined') {
					throw new Error('Missing user id');
				}
				return this.request('POST', linksObject.instance_groups + groupId + '/users/', params, callbackOK, callbackError);
			},

			/*********************
			   CODEBOXES METHODS
			**********************/
			/**
			 * Creates new codebox
			 *
			 * @method Syncano#createCodeBox
			 * @alias Syncano.CodeBoxes.create
			 * @param {object} params
			 * @param {string} params.runtime_name - python / nodejs / ruby
			 * @param {string} params.name - name of the codebox
			 * @param {string} params.source - source code (will be automatically URL-encoded)
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createCodeBox: function(params, callbackOK, callbackError) {
				if (typeof params !== 'object') {
					throw new Error('Missing parameters object');
				}
				if (typeof linksObject.instance_codeboxes === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				if (typeof params.runtime_name === 'undefined') {
					params.runtime_name = 'nodejs';
				}
				if (typeof params.source !== 'undefined') {
					params.source = encodeURIComponent(params.source);
				}
				return this.request('POST', linksObject.instance_codeboxes, params, callbackOK, callbackError);
			},

			/**
			 * Returns all defined codeboxes as a list
			 *
			 * @method Syncano#listCodeBoxes
			 * @alias Syncano.CodeBoxes.list
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listCodeBoxes: function(params, callbackOK, callbackError) {
				return this.genericList(params, 'instance_codeboxes', callbackOK, callbackError);
			},

			/**
			 * Returns all runtime types for codeboxes as a list
			 *
			 * @method Syncano#listCodeBoxRuntimes
			 * @alias Syncano.CodeBoxes.listRuntimes
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listCodeBoxRuntimes: function(params, callbackOK, callbackError) {
				return this.genericList(params, 'instance_runtimes', callbackOK, callbackError);
			},

			/**
			 * Returns the codebox with specified id
			 *
			 * @method Syncano#getCodeBox
			 * @alias Syncano.CodeBoxes.get
			 * @param {Number|object} id
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getCodeBox: function(id, callbackOK, callbackError) {
				return this.genericGet(id, 'instance_codeboxes', callbackOK, callbackError);
			},

			/**
			 * Updates codebox identified by specified id
			 *
			 * @method Syncano#updateCodeBox
			 * @alias Syncano.CodeBoxes.update
			 * @param {Number} id - codebox id
			 * @param {Object} params - new values of the codebox parameters
			 * @param {string} params.config -
			 * @param {string} params.runtime_name - nodejs / python / ruby
			 * @param {string} params.name - new codebox name
			 * @param {string} params.description -
			 * @param {string} params.source - source code in Node.js / Python / Ruby
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {Object} promise
			 */
			updateCodeBox: function(id, params, callbackOK, callbackError) {
				if (typeof id === 'object') {
					params = id;
					id = params.id;
					delete params.id;
				}
				if (typeof id === 'undefined') {
					throw new Error('Missing codebox id');
				}
				if (typeof linksObject.instance_codeboxes === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				if (typeof params.source !== 'undefined') {
					params.source = encodeURIComponent(params.source);
				}
				return this.request('PATCH', linksObject.instance_codeboxes + id, params, callbackOK, callbackError);
			},

			/**
			 * Removes CodeBox identified by specified id
			 *
			 * @method Syncano#removeCodeBox
			 * @alias Syncano.CodeBoxes.remove
			 * @param {Number|object} id - identifier of the CodeBox to remove
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeCodeBox: function(id, callbackOK, callbackError) {
				return this.genericRemove(id, 'instance_codeboxes', callbackOK, callbackError);
			},

			/**
			 * Runs new codebox
			 *
			 * @method Syncano#runCodeBox
			 * @alias Syncano.CodeBoxes.run
			 * @param {object} params
			 * @param {string} params.runtime_name - python / nodejs / ruby
			 * @param {string} params.name - name of the codebox
			 * @param {string} params.source - source code (will be automatically URL-encoded)
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			runCodeBox: function(params, callbackOK, callbackError) {
				if (typeof params !== 'object') {
					throw new Error('Missing parameters object');
				}
				if (typeof linksObject.instance_codeboxes === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				if (typeof params.runtime_name === 'undefined') {
					params.runtime_name = 'nodejs';
				}
				if (typeof params.source !== 'undefined') {
					params.source = encodeURIComponent(params.source);
				}
				return this.request('POST', linksObject.instance_codeboxes, params, callbackOK, callbackError);
			},

			/**
			 * List all traces for single codebox
			 *
			 * @method Syncano#listCodeBoxTraces
			 * @alias Syncano.CodeBoxes.traces
			 * @param {Number|object} codeboxId
			 * @param {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listCodeBoxTraces: function(codeboxId, params, callbackOK, callbackError) {
				if (typeof codeboxId === 'object') {
					codeboxId = codeboxId.id;
				}
				return this.request('GET', linksObject.instance_codeboxes + codeboxId + '/traces/', params, callbackOK, callbackError);
			},

			/**
			 * Get single trace for single codebox
			 *
			 * @method Syncano#getCodeBoxTrace
			 * @alias Syncano.CodeBoxes.trace
			 * @param {Number|object} codeboxId
			 * @param {Number|object} traceId
			 * @param {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getCodeBoxTrace: function(codeboxId, traceId, params, callbackOK, callbackError) {
				if (typeof codeboxId === 'object') {
					codeboxId = codeboxId.id;
				}
				if (typeof traceId === 'object') {
					traceId = traceId.id;
				}
				return this.request('GET', linksObject.instance_codeboxes + codeboxId + '/traces/' + traceId + '/', params, callbackOK, callbackError);
			},


			/***********************
			   INVITATIONS METHODS
			************************/
			/**
			 * Invites new person to your instance
			 *
			 * @method Syncano#createInvitation
			 * @alias Syncano.Invitations.create
			 * @param  {object} params
			 * @param  {string} params.email - email of the person you are inviting
			 * @param  {string} params.role - read / write / full
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createInvitation: function(params, callbackOK, callbackError) {
				if (typeof params !== 'object') {
					throw new Error('Missing parameters object');
				}
				if (typeof linksObject.instance_invitations === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				if (typeof params.role === 'undefined') {
					params.role = 'read';
				}
				return this.request('POST', linksObject.instance_invitations, params, callbackOK, callbackError);
			},

			/**
			 * Returns all created invitations as a list
			 *
			 * @method Syncano#listInvitations
			 * @alias Syncano.Invitations.list
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listInvitations: function(params, callbackOK, callbackError) {
				return this.genericList(params, 'instance_invitations', callbackOK, callbackError);
			},

			/**
			 * Returns the invitation with specified id
			 *
			 * @method Syncano#getInvitation
			 * @alias Syncano.Invitations.get
			 * @param {Number|object} id
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getInvitation: function(id, callbackOK, callbackError) {
				return this.genericGet(id, 'instance_invitations', callbackOK, callbackError);
			},

			/**
			 * Removes invitation identified by specified id
			 *
			 * @method Syncano#removeInvitation
			 * @alias Syncano.Invitations.remove
			 * @param {Number|object} id - identifier of the invitation to remove
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeInvitation: function(id, callbackOK, callbackError) {
				return this.genericRemove(id, 'instance_invitations', callbackOK, callbackError);
			},

			/********************
			   WEBHOOKS METHODS
			*********************/
			/**
			 * Creates new webhook.
			 *
			 * @method Syncano#createWebHook
			 * @alias Syncano.WebHooks.create
			 * @param {object} params
			 * @param {string} params.slug
			 * @param {Number} params.codebox
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createWebHook: function(params, callbackOK, callbackError) {
				if (typeof params !== 'object') {
					throw new Error('Missing parameters object');
				}
				if (typeof params.codebox === 'object') {
					params.codebox = params.codebox.id || params.codebox.pk;
				}
				if (typeof linksObject.instance_webhooks === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('POST', linksObject.instance_webhooks, params, callbackOK, callbackError);
			},

			/**
			 * Returns all defined webhooks as a list
			 *
			 * @method Syncano#listWebHooks
			 * @alias Syncano.WebHooks.list
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listWebHooks: function(params, callbackOK, callbackError) {
				return this.genericList(params, 'instance_webhooks', callbackOK, callbackError);
			},

			/**
			 * Returns the webhook with specified id
			 *
			 * @method Syncano#getWebHook
			 * @alias Syncano.WebHooks.get
			 * @param {Number|object} id
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getWebHook: function(id, callbackOK, callbackError) {
				return this.genericGet(id, 'instance_webhooks', callbackOK, callbackError);
			},

			/**
			 * Removes Webhook identified by specified id
			 *
			 * @method Syncano#removeWebHook
			 * @alias Syncano.WebHooks.remove
			 * @param {Number|object} id - identifier of the webhook to remove
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeWebHook: function(id, callbackOK, callbackError) {
				return this.genericRemove(id, 'instance_webhooks', callbackOK, callbackError);
			},

			/**
			 * Updates webhook identified by specified id
			 *
			 * @method Syncano#updateWebHook
			 * @alias Syncano.WebHooks.update
			 * @param {Number} id - webhook id
			 * @param {Object} params - new values of the webhook parameters
			 * @param {string} params.slug -
			 * @param {Number} params.codebox -
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {Object} promise
			 */
			updateWebHook: function(id, params, callbackOK, callbackError) {
				if (typeof id === 'object') {
					id = id.slug;
				}
				if (typeof id === 'undefined') {
					throw new Error('Missing webhook slug');
				}
				if (typeof linksObject.instance_webhooks === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('PATCH', linksObject.instance_webhooks + id, params, callbackOK, callbackError);
			},

			/**
			 * Runs defined webhook.
			 *
			 * @method Syncano#runWebHook
			 * @alias Syncano.WebHooks.run
			 * @param  {Number} id - identifier of the webhook
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			runWebHook: function(id, callbackOK, callbackError) {
				if (typeof id === 'object') {
					id = id.slug;
				}
				if (typeof id === 'undefined') {
					throw new Error('Missing webhook slug');
				}
				if (typeof linksObject.instance_webhooks === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('GET', linksObject.instance_webhooks + id + '/run', {}, callbackOK, callbackError);
			},

			/**
			 * List all traces for single webhook
			 *
			 * @method Syncano#listWebHookTraces
			 * @alias Syncano.WebHooks.traces
			 * @param {Number|object} webhookId
			 * @param {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listWebHookTraces: function(webhookId, params, callbackOK, callbackError) {
				if (typeof webhookId === 'object') {
					webhookId = webhookId.id;
				}
				return this.request('GET', linksObject.instance_webhooks + webhookId + '/traces/', params, callbackOK, callbackError);
			},

			/**
			 * Get single trace for single webhook
			 *
			 * @method Syncano#getWebHookTrace
			 * @alias Syncano.WebHooks.trace
			 * @param {Number|object} webhookId
			 * @param {Number|object} traceId
			 * @param {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getWebHookTrace: function(webhookId, traceId, params, callbackOK, callbackError) {
				if (typeof webhookId === 'object') {
					webhookId = webhookId.id;
				}
				if (typeof traceId === 'object') {
					traceId = traceId.id;
				}
				return this.request('GET', linksObject.instance_webhooks + webhookId + '/traces/' + traceId + '/', params, callbackOK, callbackError);
			},

			/********************
			   TRIGGERS METHODS
			*********************/
			/**
			 * Creates new trigger
			 *
			 * @method Syncano#createTrigger
			 * @alias Syncano.Triggers.create
			 * @param {object} params
			 * @param {string} params.name - name of the trigger
			 * @param {string} params.class - name of the objects class
			 * @param {Number} params.codebox - codebox to run
			 * @param {string} params.signal - when to run codebox (possible values: post_create, post_update, post_delete)
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createTrigger: function(params, callbackOK, callbackError) {
				if (typeof params !== 'object') {
					throw new Error('Missing parameters object');
				}
				if (typeof params.codebox === 'object') {
					params.codebox = params.codebox.id;
				}
				if (typeof params.klass === 'object') {
					params.klass = params.klass.name;
				}
				if (typeof linksObject.instance_triggers === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('POST', linksObject.instance_triggers, params, callbackOK, callbackError);
			},

			/**
			 * Returns all defined triggers as a list
			 *
			 * @method Syncano#listTriggers
			 * @alias Syncano.Triggers.list
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listTriggers: function(params, callbackOK, callbackError) {
				return this.genericList(params, 'instance_triggers', callbackOK, callbackError);
			},

			/**
			 * Returns the trigger with specified id
			 *
			 * @method Syncano#getTrigger
			 * @alias Syncano.Triggers.get
			 * @param {Number|object} id
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getTrigger: function(id, callbackOK, callbackError) {
				return this.genericGet(id, 'instance_triggers', callbackOK, callbackError);
			},

			/**
			 * Updates trigger identified by specified id
			 *
			 * @method Syncano#updateTrigger
			 * @alias Syncano.Triggers.update
			 * @param {Number} id - trigger id
			 * @param {Object} params - new values of the trigger parameters
			 * @param {string} params.klass -
			 * @param {string} params.signal - post_update / post_create / post_delete
			 * @param {Number} params.codebox - new codebox id
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {Object} promise
			 */
			updateTrigger: function(id, params, callbackOK, callbackError) {
				if (typeof id === 'object') {
					id = id.id;
				}
				if (typeof id === 'undefined') {
					throw new Error('Missing identifier');
				}
				if (typeof linksObject.instance_triggers === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('PATCH', linksObject.instance_triggers + id, params, callbackOK, callbackError);
			},

			/**
			 * Removes trigger identified by specified id
			 *
			 * @method Syncano#removeTrigger
			 * @alias Syncano.Triggers.remove
			 * @param {Number|object} id - identifier of the trigger to remove
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeTrigger: function(id, callbackOK, callbackError) {
				return this.genericRemove(id, 'instance_triggers', callbackOK, callbackError);
			},

			/**
			 * List all traces for single trigger
			 *
			 * @method Syncano#listTriggerTraces
			 * @alias Syncano.Triggers.traces
			 * @param {Number|object} triggerId
			 * @param {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listTriggerTraces: function(triggerId, params, callbackOK, callbackError) {
				if (typeof triggerId === 'object') {
					triggerId = triggerId.id;
				}
				return this.request('GET', linksObject.instance_triggers + triggerId + '/traces/', params, callbackOK, callbackError);
			},

			/**
			 * Get single trace for single trigger
			 *
			 * @method Syncano#getTriggerTrace
			 * @alias Syncano.Triggers.trace
			 * @param {Number|object} triggerId
			 * @param {Number|object} traceId
			 * @param {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getTriggerTrace: function(triggerId, traceId, params, callbackOK, callbackError) {
				if (typeof triggerId === 'object') {
					triggerId = triggerId.id;
				}
				if (typeof traceId === 'object') {
					traceId = traceId.id;
				}
				return this.request('GET', linksObject.instance_triggers + triggerId + '/traces/' + traceId + '/', params, callbackOK, callbackError);
			},

			/********************
			   SCHEDULES METHODS
			*********************/
			/**
			 * Creates new schedule
			 *
			 * @method Syncano#createSchedule
			 * @alias Syncano.Schedules.create
			 * @param {object} params
			 * @param {string} params.name - name of the new schedule
			 * @param {Number} params.codebox - codebox to run
			 * @param {string} params.interval_sec - how often (in seconds) the schedule should run
			 * @param {string} params.crontab - ???
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createSchedule: function(params, callbackOK, callbackError) {
				if (typeof params !== 'object') {
					throw new Error('Missing parameters object');
				}
				if (typeof params.codebox === 'object') {
					params.codebox = params.codebox.id;
				}
				if (typeof linksObject.instance_schedules === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('POST', linksObject.instance_schedules, params, callbackOK, callbackError);
			},

			/**
			 * Returns all defined schedules as a list
			 *
			 * @method Syncano#listSchedules
			 * @alias Syncano.Schedules.list
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listSchedules: function(params, callbackOK, callbackError) {
				return this.genericList(params, 'instance_schedules', callbackOK, callbackError);
			},

			/**
			 * Returns the schedule with specified id
			 *
			 * @method Syncano#getSchedule
			 * @alias Syncano.Schedules.get
			 * @param {Number|object} id
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getSchedule: function(id, callbackOK, callbackError) {
				return this.genericGet(id, 'instance_schedules', callbackOK, callbackError);
			},

			/**
			 * Removes schedule identified by specified id
			 *
			 * @method Syncano#removeSchedule
			 * @alias Syncano.Schedules.remove
			 * @param {Number|object} id - identifier of the schedule to remove
			 * @param {Number} id.id - when passed parameter is an object, we use its id property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeSchedule: function(id, callbackOK, callbackError) {
				return this.genericRemove(id, 'instance_schedules', callbackOK, callbackError);
			},

			/**
			 * List all traces for single schedule
			 *
			 * @method Syncano#listScheduleTraces
			 * @alias Syncano.Schedules.traces
			 * @param {Number|object} scheduleId
			 * @param {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listScheduleTraces: function(scheduleId, params, callbackOK, callbackError) {
				if (typeof scheduleId === 'object') {
					scheduleId = scheduleId.id;
				}
				return this.request('GET', linksObject.instance_schedules + scheduleId + '/traces/', params, callbackOK, callbackError);
			},

			/**
			 * Get single trace for single schedule
			 *
			 * @method Syncano#getScheduleTrace
			 * @alias Syncano.Schedules.trace
			 * @param {Number|object} scheduleId
			 * @param {Number|object} traceId
			 * @param {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getScheduleTrace: function(scheduleId, traceId, params, callbackOK, callbackError) {
				if (typeof scheduleId === 'object') {
					scheduleId = scheduleId.id;
				}
				if (typeof traceId === 'object') {
					traceId = traceId.id;
				}
				return this.request('GET', linksObject.instance_schedules + scheduleId + '/traces/' + traceId + '/', params, callbackOK, callbackError);
			},

			/********************
			   REALTIME METHODS
			*********************/
			/**
			 * Creates new communication channel based on passed parameters
			 *
			 * @method Syncano#createChannel
			 * @alias Syncano.Channels.create
			 * @param {Object} params
			 * @param {string} params.name - name of the channel
			 * @param {boolean} params.custom_publish - true if channel accepts custom messages
			 * @param {string} params.type - "separate_rooms" or "default"
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			createChannel: function(params, callbackOK, callbackError) {
				if (typeof linksObject.instance_self === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('POST', linksObject.instance_channels, params, callbackOK, callbackError);
			},

			/**
			 * Returns all defined channels as a list
			 *
			 * @method Syncano#listChannels
			 * @alias Syncano.Channels.list
			 * @param  {object} [params]
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			listChannels: function(params, callbackOK, callbackError) {
				return this.request('GET', linksObject.instance_channels, params, callbackOK, callbackError);
			},

			/**
			 * Returns the channels with specified name
			 *
			 * @method Syncano#getChannel
			 * @alias Syncano.Channels.get
			 * @param {string|object} name
			 * @param {string} name.name - when passed parameter is an object, we use its name property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getChannel: function(name, callbackOK, callbackError) {
				return this.genericGet(name, 'instance_channels', callbackOK, callbackError);
			},

			/**
			 * Removes channel identified by specified name
			 *
			 * @method Syncano#removeChannel
			 * @alias Syncano.Channels.remove
			 * @param {string|object} name
			 * @param {string} name.name - when passed parameter is an object, we use its name property
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			removeChannel: function(name, callbackOK, callbackError) {
				return this.genericRemove(name, 'instance_channels', callbackOK, callbackError);
			},

			/**
			 * Updates channel identified by specified name
			 *
			 * @method Syncano#updateChannel
			 * @alias Syncano.Channels.update
			 * @param {string|Object} name - channel name
			 * @param {string} name.name - when passed parameter is an object, we use its name property
			 * @param {Object} params - new values of the channel parameters
			 * @param {boolean} params.custom_publish - true if channel accepts custom messages
			 * @param {string} params.type - "separate_rooms" or "default"
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {Object} promise
			 */
			updateChannel: function(channel, params, callbackOK, callbackError) {
				if (typeof channel === 'object') {
					channel = channel.name;
				}
				if (typeof linksObject.instance_channels === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('PATCH', linksObject.instance_channels + channel, params, callbackOK, callbackError);
			},

			/**
			 * Subscribes to messages on channel identified by specified name. Calls callback method when data arrives.
			 *
			 * @method Syncano#channelListen
			 * @alias Syncano.Channels.listen
			 * @param {string|Object} name - channel name
			 * @param {string} name.name - when passed parameter is an object, we use its name property
			 * @param {function} [callback] - method to call when data arrives
			 */
			channelListen: function(name, callback) {
				if (typeof name !== 'string') {
					name = name.name;
				}
				if (typeof name !== 'string') {
					throw new Error('Missing channel name');
				}
				var url = normalizeUrl(baseURL + linksObject.instance_channels + name + '/poll/');
				if (apiKey !== null) {
					url += (url.indexOf('?') === -1 ? '?' : '&') + 'api_key=' + apiKey + '&format=json';
				}
				(function poll() {
					$.ajax({
						url: url,
						success: function(data) {
							callback(data);
						},
						dataType: "json",
						complete: function(xhr) {
							if (xhr.responseJSON && xhr.responseJSON.id) {
								url = [
									normalizeUrl(baseURL + linksObject.instance_channels),
									name + '/poll/?last_id=' + xhr.responseJSON.id,
									'&api_key=' + apiKey + '&format=json'
								].join('');
							}
							poll();
						},
						timeout: 30000
					});
				})();
			},

			/**
			 * Sends custom message to channel identified by name
			 *
			 * @method Syncano#publishToChannel
			 * @alias Syncano.Channels.publish
			 * @param {string|Object} name - channel name
			 * @param {string} name.name - when passed parameter is an object, we use its name property
			 * @param {object} params - data to send to channel
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			publishToChannel: function(name, params, callbackOK, callbackError) {
				if (typeof name !== 'string') {
					name = name.name;
				}
				if (typeof name !== 'string') {
					throw new Error('Missing channel name');
				}
				var data = {
					payload: JSON.stringify(params)
				};
				var url = linksObject.instance_channels + name + '/publish/';
				return this.request('POST', url, data, callbackOK, callbackError);
			},

			/**
			 * Returns all data that was sent to specified channel during last 24 hours
			 *
			 * @method Syncano#getChannelHistory
			 * @alias Syncano.Channels.getHistory
			 * @param {string|Object} name - channel name
			 * @param {string} name.name - when passed parameter is an object, we use its name property
			 * @param {object} params - optional parameters
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			getChannelHistory: function(name, params, callbackOK, callbackError) {
				params = params || {};
				if (typeof name !== 'string') {
					name = name.name;
				}
				if (typeof name !== 'string') {
					throw new Error('Missing channel name');
				}
				var url = linksObject.instance_channels + name + '/history/';
				return this.request('GET', url, params, callbackOK, callbackError);
			},


			/********************
			   GENERIC METHODS
			*********************/
			/*
				These methods are used internally by other list*, get* and remove* methods
			 */
			genericList: function(params, links_url, callbackOK, callbackError) {
				params = params || {};
				var url = linksObject[links_url];
				if (typeof url === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				return this.request('GET', url, params, callbackOK, callbackError);
			},

			genericGet: function(id, links_url, callbackOK, callbackError) {
				var url = linksObject[links_url];
				if (typeof url === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				if (typeof id === 'object') {
					id = id.id || id.name || id.slug;
				}
				if (!id) {
					throw new Error('Missing identifier');
				}
				return this.request('GET', url + id, {}, callbackOK, callbackError);
			},

			genericRemove: function(id, links_url, callbackOK, callbackError) {
				var url = linksObject[links_url];
				if (typeof url === 'undefined') {
					throw new Error('Not connected to any instance');
				}
				if (typeof id === 'object') {
					id = id.id || id.name || id.slug;
				}
				if (!id) {
					throw new Error('Missing identifier');
				}
				return this.request('DELETE', url + id, {}, callbackOK, callbackError);
			},

			/**
			 * Generic request method. Sends request to Syncano backend via XMLHttpRequest (in browser) or Request module (in Node.js)
			 *
			 * @method Syncano#request
			 * @param {string} requestType - GET / POST / PUT / PATCH / DELETE
			 * @param {string} method - Syncano API method to call
			 * @param {object} params -  - parameters to API call
			 * @param {function} [callbackOK] - optional method to call on success
			 * @param {function} [callbackError] - optional method to call when request fails
			 * @returns {object} promise
			 */
			request: function(requestType, method, params, _callbackOK, _callbackError) {
				var deferred = Deferred();
				var callbackOK = function(result) {
					typeof _callbackOK === 'function' && _callbackOK(result);
					deferred.resolve(result);
				};
				var callbackError = function(error) {
					typeof _callbackError === 'function' && _callbackError(error);
					deferred.reject(error);
				};

				if (typeof method === 'undefined') {
					callbackError('Missing request method');
				} else {
					params = params || {};
					var url = normalizeUrl(baseURL + method);
					if (apiKey !== null) {
						url += (url.indexOf('?') === -1 ? '?' : '&') + 'api_key=' + apiKey + '&format=json';
					}
					var ajaxParams = {
						type: requestType,
						url: url,
						data: params
					};
					ajaxParams.success = function(data) {
						if (typeof data === 'object' && typeof data.objects !== 'undefined' && typeof data.prev !== 'undefined' && typeof data.next !== 'undefined') {
							callbackOK(createList(this, data));
						} else {
							callbackOK(data);
						}
					}.bind(this);

					ajaxParams.error = function(xhr) {
						var err = 'Error sending request: ' + method;
						if (xhr.responseText) {
							try {
								err = JSON.parse(xhr.responseText);
								if (err.detail) {
									err = err.detail;
								}
							} catch (e) {
								err = xhr.responseText;
							};
						}
						callbackError(err);
					};

					if (!isNode) {
						ajax(ajaxParams);
					} else if (isNode) {
						nodeRequest(ajaxParams);
					}
				}
				return deferred.promise;
			}
		};

		/**
		 * Schema is the builder for the classes definition
		 *
		 * @constructor
		 * @class Syncano.Schema
		 *
		 * @example
		 * var schema = new Syncano.Schema()
		 *   .addField('last_name', 'string').addOrderIndex()
		 *   .addField('year_of_birth', 'integer').addFilterIndex()
		 *   .toString();
		 */
		Syncano.Schema = function() {
			this.data = [];
		};

		Syncano.Schema.prototype = {
			/**
			 * Adds new field to the schema
			 *
			 * @method Syncano.Schema#addField
			 * @param {string} name - name of the field
			 * @param {string} type - string / text / integer / float / boolean / datetime / file / reference
			 * @param {string} target - if type equals 'reference', target describes className of the reference object
			 * @return {object} this - Schema object
			 */
			addField: function(name, type, target) {
				var rec = {
					name: name,
					type: type
				};
				if (type === 'reference') {
					rec.target = target;
				}
				this.data.push(rec);
				return this;
			},

			/**
			 * Defines that last added field can be used in order_by query
			 *
			 * @method Syncano.Schema#addOrderIndex
			 * @return {object} this - Schema object
			 */
			addOrderIndex: function() {
				this.data[this.data.length - 1]['order_index'] = true;
				return this;
			},

			/**
			 * Defines that last added field can be used for filtering objects
			 *
			 * @method Syncano.Schema#addFilterIndex
			 * @return {object} this - Schema object
			 */
			addFilterIndex: function() {
				this.data[this.data.length - 1]['filter_index'] = true;
				return this;
			},

			/**
			 * Converts schema to string (used internally)
			 *
			 * @method Syncano.Schema#toString
			 * @return {string}
			 */
			toString: function() {
				return JSON.stringify(this.data);
			}
		};

		/*
		 * Simple defer/promise library
		 * author Jonathan Gotti <jgotti at jgotti dot net>
		 * https://github.com/malko/D.js/blob/master/lib/D.js
		 */
		var Deferred = (function(undef) {
			"use strict";

			var isFunc = function(f) {
					return (typeof f === 'function');
				},
				isArray = function(a) {
					return Array.isArray ? Array.isArray(a) : (a instanceof Array);
				},
				isObjOrFunc = function(o) {
					return !!(o && (typeof o).match(/function|object/));
				},
				isNotVal = function(v) {
					return (v === false || v === undef || v === null);
				},
				slice = function(a, offset) {
					return [].slice.call(a, offset);
				}


			var nextTick = function(cb) {
				setTimeout(cb, 0);
			};

			function rethrow(e) {
				nextTick(function() {
					throw e;
				});
			}

			function promise_success(fulfilled) {
				return this.then(fulfilled, undef);
			}

			function promise_error(failed) {
				return this.then(undef, failed);
			}

			function promise_apply(fulfilled, failed) {
				return this.then(
					function(a) {
						return isFunc(fulfilled) ? fulfilled.apply(null, isArray(a) ? a : [a]) : (defer.onlyFuncs ? a : fulfilled);
					}, failed || undef
				);
			}

			function promise_ensure(cb) {
				function _cb() {
					cb();
				}
				this.then(_cb, _cb);
				return this;
			}

			function promise_nodify(cb) {
				return this.then(
					function(a) {
						return isFunc(cb) ? cb.apply(null, isArray(a) ? a.splice(0, 0, undefined) && a : [undefined, a]) : (defer.onlyFuncs ? a : cb);
					},
					function(e) {
						return cb(e);
					}
				);
			}

			function promise_rethrow(failed) {
				return this.then(
					undef, failed ? function(e) {
						failed(e);
						throw e;
					} : rethrow
				);
			}

			var defer = function(alwaysAsync) {
				var alwaysAsyncFn = (undef !== alwaysAsync ? alwaysAsync : deferIsAlwaysAsync) ? nextTick : function(fn) {
						fn();
					},
					status = 0,
					pendings = [],
					value,
					_promise = {
						then: function(fulfilled, failed) {
							var d = defer();
							pendings.push([
								function(value) {
									try {
										if (isNotVal(fulfilled)) {
											d.resolve(value);
										} else {
											d.resolve(isFunc(fulfilled) ? fulfilled(value) : (defer.onlyFuncs ? value : fulfilled));
										}
									} catch (e) {
										d.reject(e);
									}
								},
								function(err) {
									if (isNotVal(failed) || ((!isFunc(failed)) && defer.onlyFuncs)) {
										d.reject(err);
									}
									if (failed) {
										try {
											d.resolve(isFunc(failed) ? failed(err) : failed);
										} catch (e) {
											d.reject(e);
										}
									}
								}
							]);
							status !== 0 && alwaysAsyncFn(execCallbacks);
							return d.promise;
						},
						success: promise_success,
						error: promise_error,
						'catch': promise_error,
						otherwise: promise_error,
						apply: promise_apply,
						spread: promise_apply,
						ensure: promise_ensure,
						nodify: promise_nodify,
						rethrow: promise_rethrow,

						isPending: function() {
							return status === 0;
						},

						getStatus: function() {
							return status;
						}
					};

				_promise.toSource = _promise.toString = _promise.valueOf = function() {
					return value === undef ? this : value;
				};


				function execCallbacks() {
					if (status === 0) {
						return;
					}
					var cbs = pendings,
						i = 0,
						l = cbs.length,
						cbIndex = ~status ? 0 : 1,
						cb;
					pendings = [];
					for (; i < l; i++) {
						(cb = cbs[i][cbIndex]) && cb(value);
					}
				}

				function _resolve(val) {
					var done = false;

					function once(f) {
						return function(x) {
							if (done) {
								return undefined;
							} else {
								done = true;
								return f(x);
							}
						};
					}
					if (status) {
						return this;
					}
					try {
						var then = isObjOrFunc(val) && val.then;
						if (isFunc(then)) { // managing a promise
							if (val === _promise) {
								throw new Error("Promise can't resolve itself");
							}
							then.call(val, once(_resolve), once(_reject));
							return this;
						}
					} catch (e) {
						once(_reject)(e);
						return this;
					}
					alwaysAsyncFn(function() {
						value = val;
						status = 1;
						execCallbacks();
					});
					return this;
				}

				function _reject(Err) {
					status || alwaysAsyncFn(function() {
						try {
							throw (Err);
						} catch (e) {
							value = e;
						}
						status = -1;
						execCallbacks();
					});
					return this;
				}
				return {
					promise: _promise,
					resolve: _resolve,
					fulfill: _resolve // alias
						,
					reject: _reject
				};
			};

			defer.deferred = defer.defer = defer;
			defer.nextTick = nextTick;
			defer.onlyFuncs = true;

			defer.resolved = defer.fulfilled = function(value) {
				return defer(true).resolve(value).promise;
			};

			defer.rejected = function(reason) {
				return defer(true).reject(reason).promise;
			};

			defer.wait = function(time) {
				var d = defer();
				setTimeout(d.resolve, time || 0);
				return d.promise;
			};

			defer.delay = function(fn, delay) {
				var d = defer();
				setTimeout(function() {
					try {
						d.resolve(isFunc(fn) ? fn.apply(null) : fn);
					} catch (e) {
						d.reject(e);
					}
				}, delay || 0);
				return d.promise;
			};

			defer.promisify = function(promise) {
				if (promise && isFunc(promise.then)) {
					return promise;
				}
				return defer.resolved(promise);
			};

			function multiPromiseResolver(callerArguments, returnPromises) {
				var promises = slice(callerArguments);
				if (promises.length === 1 && isArray(promises[0])) {
					if (!promises[0].length) {
						return defer.fulfilled([]);
					}
					promises = promises[0];
				}
				var args = [],
					d = defer(),
					c = promises.length;
				if (!c) {
					d.resolve(args);
				} else {
					var resolver = function(i) {
						promises[i] = defer.promisify(promises[i]);
						promises[i].then(
							function(v) {
								args[i] = returnPromises ? promises[i] : v;
								(--c) || d.resolve(args);
							},
							function(e) {
								if (!returnPromises) {
									d.reject(e);
								} else {
									args[i] = promises[i];
									(--c) || d.resolve(args);
								}
							}
						);
					};
					for (var i = 0, l = c; i < l; i++) {
						resolver(i);
					}
				}
				return d.promise;
			}

			function sequenceZenifier(promise, zenValue) {
				return promise.then(isFunc(zenValue) ? zenValue : function() {
					return zenValue;
				});
			}

			function sequencePromiseResolver(callerArguments) {
				var funcs = slice(callerArguments);
				if (funcs.length === 1 && isArray(funcs[0])) {
					funcs = funcs[0];
				}
				var d = defer(),
					i = 0,
					l = funcs.length,
					promise = defer.resolved();
				for (; i < l; i++) {
					promise = sequenceZenifier(promise, funcs[i]);
				}
				d.resolve(promise);
				return d.promise;
			}

			defer.all = function() {
				return multiPromiseResolver(arguments, false);
			};

			defer.resolveAll = function() {
				return multiPromiseResolver(arguments, true);
			};

			defer.sequence = function() {
				return sequencePromiseResolver(arguments);
			};
			return defer;
		})();

		return Syncano;

	})();

	if (isNode || isWebpack) {
		module.exports = Syncano;
	}

/***/ },
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var Icon = __webpack_require__(298);
	var ButtonSocialAuth = __webpack_require__(428);

	__webpack_require__(509);


	module.exports = React.createClass({

	  displayName: 'ButtonSocialAuthList',

	  getDefaultProps: function () {

	    return {
	      buttons: [{
	        type: 'github',
	        text: 'Log in with Github',
	      }, {
	        type: 'google',
	        text: 'Log in with Google',
	      }, {
	        type: 'facebook',
	        text: 'Log in with Facebook',
	      }]
	    }
	  },

	  render: function () {
	    var buttons = this.props.buttons.map(function (button, i) {
	      return React.createElement(ButtonSocialAuth, React.__spread({},  this.props, {key: i, type: button.type, text: button.text}));
	    }.bind(this));
	    return (
	      React.createElement("ul", {className: "button-social-auth-list"}, 
	        buttons
	      )
	    );
	  }
	});

/***/ },
/* 509 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(510);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(260)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/SocialButton/SocialButtonList.css", function() {
			var newContent = require("!!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/css-loader/index.js!/Users/mpelka/Sites/Syncano/syncano-dashboard/node_modules/autoprefixer-loader/index.js?browsers=last 2 version!/Users/mpelka/Sites/Syncano/syncano-dashboard/src/common/SocialButton/SocialButtonList.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 510 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(259)();
	exports.push([module.id, ".button-social-auth-list {\n  border: 1px solid #0091EA;\n  border-radius: 3px;\n}\n\n.button-social-auth-list:hover .button-social-auth {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.button-social-auth-list:hover .button-social-auth:first-child {\n  border-bottom: 1px solid #0091EA;\n}\n\n.button-social-auth {\n  color: #0091EA;\n  border-bottom: 1px solid #0091EA;\n  display: none;\n  height: 50px;\n  font-size: 14px;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  padding: 0 2em;\n}\n\n.button-social-auth:hover {\n  color: white;\n  background-color: #0091EA;\n}\n\n.button-social-auth:hover path {\n  fill: white;\n}\n\n.button-social-auth path {\n  fill: #0091EA;\n}\n\n.button-social-auth:first-child {\n  border-bottom: 1px solid #0091EA;\n}\n\n.button-social-auth i {\n  width: 20px;\n  height: 20px;\n  margin-right: 20px;\n}\n\n.button-social-auth:first-child {\n/*  display: flex;\n  border-bottom: none;*/\n}\n\n.button-social-auth:last-child {\n  border: none;\n}", ""]);

/***/ }
]);