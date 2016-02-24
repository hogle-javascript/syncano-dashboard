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

var reqfun = (function (s) {
  return function (s) {
    return eval('require("' + s + '");');
  };
})();

if (isNode) {
  var Request = reqfun('request');
}

var Syncano = (function () {
  /*
   define dummy console if not present in the system
   */
  if (typeof console === 'undefined') {
    console = {
      log: function () {
      },
      error: function () {
      },
      warning: function () {
      }
    };
  }

  /*
   private variables
   */

  // base url of all requests - will be changed in final version
  var baseURL = 'https://api.syncano.io/';

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
      Object.keys(obj.links).forEach(function (key) {
        linksObject[prefix + '_' + key] = obj.links[key];
      });
    }

    if (typeof linksObject.instance_channels === 'undefined') {
      linksObject.instance_channels = linksObject.instance_self + 'channels/';
    }

    if (typeof obj.links.push_notifications === 'undefined') {
      linksObject.instance_push_notifications = obj.links.self + 'push_notifications/';
    }

    if (typeof obj.links.templates === 'undefined') {
      linksObject.instance_templates = obj.links.self + 'snippets/templates/';
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
    if (mtype === 'GET' && Object.keys(params.data).length > 0) {
      params.url += (params.url.indexOf('?') === -1 ? '?' : '&') + prepareAjaxParams(params.data);
    }
    request.open(mtype, params.url, true);
    request.setRequestHeader('Accept', 'application/json;charset=UTF-8');

    if (apiKey !== null) {
      request.setRequestHeader('Authorization', 'Token ' + apiKey);
    }

    if (mtype !== 'GET') {
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    }

    if (params.headers !== undefined) {
      for (var headerName in params.headers) {
        request.setRequestHeader(headerName, params.headers[headerName]);
      }
    }

    request.onload = function () {
      if (request.status >= 200 && request.status <= 299) {
        var data = request.responseText;
        try {
          data = JSON.parse(request.responseText);
        } catch (e) {};
        params.success(data);
      } else {
        params.error(request);
      }
    };

    if (mtype !== 'GET') {
      request.send(JSON.stringify(params.data));
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
      body: buildUrlParams(params.data),
      headers: {'Accept': 'application/json;charset=UTF-8'}
    };

    if (apiKey !== null) {
      opt.headers['Authorization'] = 'Token ' + apiKey;
    }

    if (params.type !== 'GET') {
      opt.headers['content-type'] = 'application/json;charset=UTF-8';
      opt.headers['user-agent'] = 'syncano-nodejs-4.0';
    }

    if (params.headers !== undefined) {
      opt.headers = opt.headers || {};
      for (var headerName in params.headers) {
        opt.headers[headerName] = params.headers[headerName];
      }
    }

    Request(opt, function (error, response, body) {
      if (response.statusCode >= 200 && response.statusCode < 400) {
        var data = '';
        try {
          data = JSON.parse(body);
        } catch (e) {
        };
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
        value: function (callbackOK, callbackError) {
          return lib.request('DELETE', this.links.self, {}, callbackOK, callbackError);
        },
        writable: false,
        enumerable: false,
        configurable: false
      });
      if (typeof data.objects[i].id !== 'undefined') {
        Object.defineProperty(List, data.objects[i].id, {
          value: data.objects[i],
          writable: true,
          enumerable: true,
          configurable: false
        });
      } else if (typeof data.objects[i].name !== 'undefined') {
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
      value: function (idx) {
        return List._items[idx];
      },
      writable: false,
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(List, 'hasNextPage', {
      value: function () {
        return data.next !== null;
      },
      writable: false,
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(List, 'next', {
      value: function () {
        return data.next;
      },
      writable: false,
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(List, 'prev', {
      value: function () {
        return data.prev;
      },
      writable: false,
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(List, 'hasPrevPage', {
      value: function () {
        return data.prev !== null;
      },
      writable: false,
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(List, 'loadNextPage', {
      value: function (callbackOK, callbackError) {
        return lib.request('GET', data.next);
      },
      writable: false,
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(List, 'loadPrevPage', {
      value: function (callbackOK, callbackError) {
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
      value: function (params, callbackOK, callbackError) {
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
  function Syncano(param, _baseUrl) {
    if (param && typeof param === 'string') {
      tempInstance = param;
    } else if (param && typeof param === 'object' && typeof param.instance === 'string') {
      tempInstance = param.instance;
    }

    if (typeof _baseUrl !== 'undefined' && _baseUrl.length > 0) {
      baseURL = _baseUrl;
    }

    this.setApiKey = function (api_key) {
      setApiKey(api_key);
      return this;
    };

    this.setBaseUrl = function (_baseUrl) {
      baseURL = _baseUrl;
      return this;
    };

    this.Deferred = Deferred;

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
      changePassword: this.changeAccountPassword.bind(this),
      setPassword: this.setAccountPassword.bind(this),
      resetKey: this.resetAccountKey.bind(this),
      passwordReset: this.accountPasswordReset.bind(this),
      passwordResetConfirm: this.accountPasswordResetConfirm.bind(this),
      activate: this.activateAccount.bind(this),
      resendActivationEmail: this.resendActivationEmail.bind(this)
    };

    this.Billing = {
      getProfile: this.getBillingProfile.bind(this),
      updateProfile: this.updateBillingProfile.bind(this),
      getCard: this.getBillingCard.bind(this),
      updateCard: this.updateBillingCard.bind(this),
      getInvoices: this.getBillingInvoices.bind(this),
      getUsage: this.getBillingUsage.bind(this),
      getPlans: this.getBillingPlans.bind(this),
      subscribePlan: this.subscribeBillingPlan.bind(this),
      getSubscriptions: this.getSubscriptions.bind(this),
      cancelSubscription: this.cancelSubscription.bind(this)
    };

    this.Usage = {
      getDaily: this.getDailyUsage.bind(this),
      getHourly: this.getHourlyUsage.bind(this)
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
     * @property {function} rename - shortcut to {@link Syncano#renameInstance} method
     * @property {function} listAdmins - shortcut to {@link Syncano#listInstanceAdmins} method
     */
    this.Instances = {
      create: this.createInstance.bind(this),
      list: this.listInstances.bind(this),
      get: this.getInstance.bind(this),
      remove: this.removeInstance.bind(this),
      removeShared: this.removeSharedInstance.bind(this),
      update: this.updateInstance.bind(this),
      rename: this.renameInstance.bind(this),
      listAdmins: this.listInstanceAdmins.bind(this)
    };

    /**
     * Object with methods to handle Solutions
     *
     * @alias Syncano#Instances
     * @type {object}
     * @property {function} list - shortcut to {@link Syncano#listSolutions} method
     */
    this.Solutions = {
      install: this.installSolution.bind(this),
      get: this.getSolution.bind(this),
      list: this.listSolutions.bind(this),
      listVersions: this.listSolutionVersions.bind(this),
      create: this.createSolution.bind(this),
      update: this.updateSolution.bind(this),
      createVersion: this.createVersion.bind(this),
      remove: this.removeSolution.bind(this),
      removeVersion: this.removeSolution.bind(this),
      star: this.starSolution.bind(this),
      unstar: this.unstarSolution.bind(this),
      listTags: this.listTags.bind(this)
    };

    /**
     * Object with methods to handle Admins
     *
     * @alias Syncano#Admins
     * @type {object}
     * @property {function} list - shortcut to {@link Syncano#listAdmins} method
     * @property {function} update - shortcut to {@link Syncano#updateAdmin} method
     * @property {function} remove - shortcut to {@link Syncano#removeAdmin} method
     */
    this.Admins = {
      list: this.listAdmins.bind(this),
      update: this.updateAdmin.bind(this),
      remove: this.removeAdmin.bind(this)
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
      update: this.updateDataObject.bind(this),
      uploadFile: this.uploadFileDataObject.bind(this)
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
     * @property {function} reset - shortcut to {@link Syncano#resetApiKey} method
     */
    this.ApiKeys = {
      create: this.createApiKey.bind(this),
      update: this.updateApiKey.bind(this),
      list: this.listApiKeys.bind(this),
      get: this.getApiKey.bind(this),
      remove: this.removeApiKey.bind(this),
      reset: this.resetApiKey.bind(this)
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
      remove: this.removeUser.bind(this),
      getUserGroups: this.getUserGroups.bind(this),
      addToGroup: this.addToGroup.bind(this),
      removeFromGroup: this.removeFromGroup.bind(this)
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
      update: this.updateGroup.bind(this),
      list: this.listGroups.bind(this),
      get: this.getGroup.bind(this),
      remove: this.removeGroup.bind(this),
      addUser: this.addUserToGroup.bind(this),
      getUsers: this.getGroupUsers.bind(this)
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
     * Object with methods to handle Templates
     *
     * @alias Syncano#Templates
     * @type {object}
     * @property {function} create - shortcut to {@link Syncano#createTemplate} method
     * @property {function} list - shortcut to {@link Syncano#listTemplate} method
     * @property {function} get - shortcut to {@link Syncano#getTemplate} method
     * @property {function} remove - shortcut to {@link Syncano#removeTemplate} method
     * @property {function} update - shortcut to {@link Syncano#updateTemplate} method
     */
    this.Templates = {
      create: this.createTemplate.bind(this),
      list: this.listTemplates.bind(this),
      get: this.getTemplate.bind(this),
      update: this.updateTemplate.bind(this),
      remove: this.removeTemplate.bind(this),
      render: this.renderTemplate.bind(this),
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
     * @property {function} resend - shortcut to {@link Syncano#resendInvitation} method
     */
    this.Invitations = {
      create: this.createInvitation.bind(this),
      list: this.listInvitations.bind(this),
      get: this.getInvitation.bind(this),
      remove: this.removeInvitation.bind(this),
      resend: this.resendInvitation.bind(this)
    };

    /**
     * Object with methods to handle Account Invitations
     *
     * @alias Syncano#AccountInvitations
     * @type {object}
     * @property {function} list - shortcut to {@link Syncano#listAccountInvitations} method
     * @property {function} get - shortcut to {@link Syncano#getAccountInvitation} method
     * @property {function} remove - shortcut to {@link Syncano#removeAccountInvitation} method
     * @property {function} accept - shortcut to {@link Syncano#acceptAccountInvitation} method
     */
    this.AccountInvitations = {
      list: this.listAccountInvitations.bind(this),
      get: this.getAccountInvitation.bind(this),
      remove: this.removeAccountInvitation.bind(this),
      accept: this.acceptAccountInvitation.bind(this)
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
     * Object with methods to handle DataViews
     *
     * @alias Syncano#DataViews
     * @type {object}
     * @property {function} create - shortcut to {@link Syncano#createDataView} method
     * @property {function} list - shortcut to {@link Syncano#listDataViews} method
     * @property {function} get - shortcut to {@link Syncano#getWebHook} method
     * @property {function} remove - shortcut to {@link Syncano#removeWebHook} method
     * @property {function} update - shortcut to {@link Syncano#updateWebHook} method
     * @property {function} run - shortcut to {@link Syncano#runWebHook} method
     */
    this.DataViews = {
      create: this.createDataView.bind(this),
      list: this.listDataViews.bind(this),
      //get: this.getWebHook.bind(this),
      update: this.updateDataView.bind(this),
      remove: this.removeDataView.bind(this),
      //run: this.runWebHook.bind(this),
      //traces: this.listWebHookTraces.bind(this),
      //trace: this.getWebHookTrace.bind(this)
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
      update: this.updateSchedule.bind(this),
      remove: this.removeSchedule.bind(this),
      traces: this.listScheduleTraces.bind(this),
      trace: this.getScheduleTrace.bind(this)
    };

    /**
     * Object with methods to handle Push Notifications
     *
     * @alias Syncano#PushNotifications
     * @type {object}
     * @property {function} listDevices - shorcut to {@link Syncano#listDevices} method
     */
    this.PushNotifications = {
      GCM: {
        config: this.configGCMPushNotification.bind(this),
        get: this.getGCMPushNotificationConfig.bind(this),
        sendMessages: this.sendMessageToGCMDevices.bind(this)
      },
      APNS: {
        config: this.configAPNSPushNotification.bind(this),
        get: this.getAPNSPushNotificationConfig.bind(this),
        sendMessages: this.sendMessageToAPNSDevices.bind(this)
      },
      Devices: {
        create: this.createDevice.bind(this),
        update: this.updateDevice.bind(this),
        remove: this.removeDevice.bind(this),
        list: this.listDevices.bind(this)
      }
    };
  }

  Syncano.prototype = {

    setAlwaysAsync: function (value) {
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
     * @returns {object}  promise
     *
     * @example
     * var s = new Syncano('instance-name');
     * s.connect('email', 'password').then(function(){
     *     alert('connected');
     * });
     */
    connect: function () {
      var promise;
      if (arguments.length >= 2 && arguments[0].indexOf('@') > 0) {
        // arguments are: email and password and optional callbacks
        promise = this.authWithPassword.apply(this, arguments);
        if (tempInstance !== null) {
          promise = promise.then(function () {
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

    socialConnect: function (network, access_token, callbackOK, callbackError) {
      if (network === 'google') {
        network = 'google-oauth2';
      }
      return this.request('POST', 'v1/account/auth/' + network + '/', {access_token: access_token}, callbackOK, callbackError);
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
    authWithPassword: function (email, password, callbackOK, callbackError) {
      var params = {
        email: email,
        password: password
      };
      return this.request('POST', 'v1/account/auth', params, function (res) {
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
    authWithApiKey: function (apiKey, callbackOK) {
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
    setInstance: function (instanceName, callbackOK, callbackError) {
      return this.request('GET', 'v1/instances/' + instanceName, {}, function (result) {
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
    getInfo: function () {
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
    createInstance: function (params, callbackOK, callbackError) {
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
    listInstances: function (params, callbackOK, callbackError) {
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
    getInstance: function (name, callbackOK, callbackError) {
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
    removeInstance: function (name, callbackOK, callbackError) {
      if (typeof name === 'object') {
        name = name.name;
      }
      if (typeof name === 'undefined' || name.length === 0) {
        throw new Error('Missing instance name');
      }
      return this.request('DELETE', 'v1/instances/' + name, {}, callbackOK, callbackError);
    },

    /**
     * Removes admin from shared instance identified by specified instance name and admin ID
     *
     * @method Syncano#removeSharedInstance
     * @alias Syncano.Instances.removeShared
     * @param {string|object} name
     * @param {string} name.name - when passed parameter is an object, we use its name property
     * @param {string|number} adminId - admin ID to remove from instance
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    removeSharedInstance: function (name, adminId, callbackOK, callbackError) {
      if (typeof name === 'object') {
        name = name.name;
      }
      if (typeof name === 'undefined' || name.length === 0) {
        throw new Error('Missing instance name');
      }
      if (typeof adminId === 'undefined') {
        throw new Error('Missing admin ID');
      }
      return this.request('DELETE', 'v1/instances/' + name + '/admins/' + adminId, {}, callbackOK, callbackError);
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
    updateInstance: function (name, params, callbackOK, callbackError) {
      if (typeof name === 'undefined' || name.length === 0) {
        throw new Error('Missing instance name');
      }
      return this.request('PATCH', 'v1/instances/' + name, params, callbackOK, callbackError);
    },

    /**
     * Renames instance identified by specified name
     *
     * @method Syncano#renameInstance
     * @alias Syncano.Instances.rename
     * @param {string} name - name of the instance to change
     * @param {Object} params - new values of the instance parameters
     * @param {string} params.new_name - new name of the instance
     * @param {string} params.description - new description of the instance
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {Object} promise
     */
    renameInstance: function (name, params, callbackOK, callbackError) {
      if (typeof name === 'undefined' || name.length === 0) {
        throw new Error('Missing instance name');
      }
      return this.request('POST', 'v1/instances/' + name + '/rename/', params, callbackOK, callbackError);
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
    listInstanceAdmins: function (name, params, callbackOK, callbackError) {
      params = params || {};
      if (typeof name === 'object') {
        name = name.name;
      }
      if (typeof name === 'undefined' || name.length === 0) {
        throw new Error('Missing instance name');
      }
      return this.request('GET', 'v1/instances/' + name + '/admins/', params, callbackOK, callbackError);
    },

    /*********************
     SOLUTIONS METHODS
     **********************/

    /**
     * Returns all defined solutions as a list
     *
     * @method Syncano#installSolution
     * @alias Syncano.Solutions.install
     * @param  {string} [solutionId]
     * @param  {string} [versionId]
     * @param  {string} [instanceName]
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    installSolution: function (solutionId, versionId, instanceName, callbackOK, callbackError) {
      var url = 'v1/marketplace/solutions/' + solutionId + '/versions/' + versionId + '/install/';
      return this.request('POST', url, {instance: instanceName}, callbackOK, callbackError);
    },

    /**
     * Returns all defined solutions as a list
     *
     * @method Syncano#getSolution
     * @alias Syncano.Solutions.get
     * @param  {number} [id]
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    getSolution: function (id, callbackOK, callbackError) {
      return this.request('GET', 'v1/marketplace/solutions/' + id, {}, callbackOK, callbackError);
    },

    /**
     * Returns all defined solutions as a list
     *
     * @method Syncano#listSolutions
     * @alias Syncano.Solutions.list
     * @param  {object} [params]
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    listSolutions: function (params, callbackOK, callbackError) {
      params = params || {};
      return this.request('GET', 'v1/marketplace/solutions', params, callbackOK, callbackError);
    },

    /**
     * Returns all defined solutions as a list
     *
     * @method Syncano#listSolutions
     * @alias Syncano.Solutions.list
     * @param  {object} [params]
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    listSolutionVersions: function (id, callbackOK, callbackError) {
      return this.request('GET', 'v1/marketplace/solutions/' + id + '/versions/', {}, callbackOK, callbackError);
    },

    /**
     * Creates new solution based on passed parameters
     *
     * @method Syncano#createSolution
     * @alias Syncano.Solutions.create
     * @param {Object} params - values of the solution parameters
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    createSolution: function (params, callbackOK, callbackError) {
      return this.request('POST', 'v1/marketplace/solutions', params, callbackOK, callbackError);
    },

    /**
     * Update  solution based on passed parameters
     *
     * @method Syncano#updateSolution
     * @alias Syncano.Solutions.update
     * @param {Object} params - values of the solution parameters
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    updateSolution: function (id, params, callbackOK, callbackError) {
      params.serialize = false;
      return this.request('PATCH', 'v1/marketplace/solutions/' + id, params, callbackOK, callbackError);
    },

    /**
     * Removes solution based on passed parameters
     *
     * @method Syncano#removeSolution
     * @alias Syncano.Solutions.create
     * @param {number} solutionId - solutionId
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    removeSolution: function (solutionId, callbackOK, callbackError) {

      return this.request('DELETE', 'v1/marketplace/solutions/' + solutionId + '/', {}, callbackOK, callbackError);
    },

    /**
     * Creates new solution based on passed parameters
     *
     * @method Syncano#createVersion
     * @alias Syncano.Solutions.createVersion
     * @param {number} solutionId - id of the solution
     * @param {Object} params - values of the version parameters
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    createVersion: function (solutionId, params, callbackOK, callbackError) {
      var url = 'v1/marketplace/solutions/' + solutionId + '/versions/create_from_instance/';
      return this.request('POST', url, params, callbackOK, callbackError);
    },

    /**
     * Removes solution version based on passed parameters
     *
     * @method Syncano#removeVersion
     * @alias Syncano.Solutions.create
     * @param {number} solutionId - solutionId
     * @param {number} versionId - versionId
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    removeVersion: function (versionId, solutionId, callbackOK, callbackError) {
      var url = 'v1/marketplace/solutions/' + solutionId + '/versions/' + versionId + '/';
      return this.request('DELETE', url, {}, callbackOK, callbackError);
    },

    /**
     * Stars solution identified by specified id
     *
     * @method Syncano#starSolution
     * @alias Syncano.Solutions.star
     * @param {number|object} id - id of solution to star. If param is an object the id key is taken
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    starSolution: function (id, callbackOK, callbackError) {
      if (typeof id === 'object') {
        id = id.id;
      }
      if (typeof id === 'undefined' || id.length === 0) {
        throw new Error('Missing solution id');
      }
      return this.request('POST', 'v1/marketplace/solutions/' + id + '/star', {}, callbackOK, callbackError);
    },

    /**
     * Unstars solution identified by specified id
     *
     * @method Syncano#unstarSolution
     * @alias Syncano.Solutions.unstar
     * @param {number|object} id - id of solution to unstar. If param is an object the id key is taken
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    unstarSolution: function (id, callbackOK, callbackError) {
      if (typeof id === 'object') {
        id = id.id;
      }
      if (typeof id === 'undefined' || id.length === 0) {
        throw new Error('Missing solution id');
      }
      return this.request('POST', 'v1/marketplace/solutions/' + id + '/unstar', {}, callbackOK, callbackError);
    },

    /**
     * List of solution tags
     *
     * @method Syncano#listTags
     * @alias Syncano.Solutions.listTags
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    listTags: function (callbackOK, callbackError) {
      return this.request('GET', 'v1/marketplace/tags/', {}, callbackOK, callbackError);
    },

    /*********************
       TEMPLATES METHODS
    **********************/
    /**
     * Creates new template
     *
     * @method Syncano#createTemplate
     * @alias Syncano.Templatees.create
     * @param {object} params
     * @param {string} params.name - name of the template
     * @param {string} params.description - name of the template
     * @param {string} params.source - template source code
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    createTemplate: function(params, callbackOK, callbackError) {
      if (typeof params !== 'object') {
        throw new Error('Missing parameters object');
      }
      if (typeof linksObject.instance_templates === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('POST', linksObject.instance_templates, params, callbackOK, callbackError);
    },

    /**
     * Returns all defined templatees as a list
     *
     * @method Syncano#listTemplatees
     * @alias Syncano.Templatees.list
     * @param  {object} [params]
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    listTemplates: function(params, callbackOK, callbackError) {
      return this.genericList(params, 'instance_templates', callbackOK, callbackError);
    },

    /**
     * Returns the template with specified id
     *
     * @method Syncano#getTemplate
     * @alias Syncano.Templatees.get
     * @param {Number|object} id
     * @param {Number} id.id - when passed parameter is an object, we use its id property
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    getTemplate: function(name, callbackOK, callbackError) {
      return this.genericGet(name, 'instance_templates', callbackOK, callbackError);
    },

    /**
     * Updates template identified by specified id
     *
     * @method Syncano#updateTemplate
     * @alias Syncano.Templatees.update
     * @param {Number} id - template id
     * @param {Object} params - new values of the template parameters
     * @param {string} params.config -
     * @param {string} params.runtime_name - Node.js / Python / Ruby
     * @param {string} params.name - new template name
     * @param {string} params.description -
     * @param {string} params.source - source code in Node.js / Python / Ruby
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {Object} promise
     */
    updateTemplate: function(name, params, callbackOK, callbackError) {
      if (typeof name === 'object') {
        params = name;
        name = params.name;
        delete params.name;
      }

      if (typeof name === 'undefined') {
        throw new Error('Missing template name');
      }

      if (typeof linksObject.instance_templates === 'undefined') {
        throw new Error('Not connected to any instance');
      }

      return this.request('PATCH', linksObject.instance_templates + name, params, callbackOK, callbackError);
    },

    /**
     * Removes Template identified by specified id
     *
     * @method Syncano#removeTemplate
     * @alias Syncano.Templatees.remove
     * @param {Number|object} id - identifier of the Template to remove
     * @param {Number} id.id - when passed parameter is an object, we use its id property
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    removeTemplate: function(name, callbackOK, callbackError) {
      return this.genericRemove(name, 'instance_templates', callbackOK, callbackError);
    },

    /**
     * Render template
     *
     * @method Syncano#runCodeBox
     * @alias Syncano.CodeBoxes.run
     * @param {number|object} id - identifier of the CodeBox to run
     * @param {object} params
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    renderTemplate: function(name, params, callbackOK, callbackError) {
      if (typeof params !== 'object') {
        throw new Error('Missing parameters object');
      }

      if (typeof linksObject.instance_templates === 'undefined') {
        throw new Error('Not connected to any instance');
      }

      return this.request('POST', linksObject.instance_templates + name + '/render/', params, callbackOK, callbackError);
    },


    /*********************
       ADMIN METHODS
    **********************/

    /**
     * Returns all defined admins as a list
     *
     * @method Syncano#listAdmins
     * @alias Syncano.Admins.list
     * @param  {object} [params]
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    listAdmins: function (params, callbackOK, callbackError) {
      params = params || {};
      return this.genericList(params, 'instance_admins', callbackOK, callbackError);
    },

    /**
     * Updates admin identified by id
     *
     * @method Syncano#updateAdmin
     * @alias Syncano.Admins.update
     * @param  {object} [params]
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    updateAdmin: function (id, params, callbackOK, callbackError) {
      params = params || {};
      return this.request('PUT', linksObject.instance_admins + id, params, callbackOK, callbackError);
    },

    /**
     * Remove admin identified by id
     *
     * @method Syncano#removeAdmin
     * @alias Syncano.Admins.remove
     * @param {Number|object} id - id of admin to delete. If param is an object the id key is taken
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    removeAdmin: function (id, callbackOK, callbackError) {
      if (typeof id === 'object') {
        id = id.id;
      }
      return this.request('DELETE', linksObject.instance_admins + id, {}, callbackOK, callbackError);
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
    createClass: function (params, callbackOK, callbackError) {
      if (typeof linksObject.instance_classes === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      params.description = params.description || '';
      if (typeof params.schema !== 'string') {
        params.schema = params.schema.toString();
      }
      return this.request('POST', linksObject.instance_classes, params, function (result) {
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
    listClasses: function (params, callbackOK, callbackError) {
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
    removeClass: function (name, callbackOK, callbackError) {
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
    getClass: function (name, callbackOK, callbackError) {
      return this.genericGet(name, 'instance_classes', function (obj) {
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
    updateClass: function (name, params, callbackOK, callbackError) {
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
      //if (typeof params.schema !== 'string') {
      //  params.schema = params.schema.toString();
      //}
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
    createAccount: function (params, callbackOK, callbackError) {
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
    getAccount: function (callbackOK, callbackError) {
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
    updateAccount: function (params, callbackOK, callbackError) {
      return this.request('PUT', 'v1/account/', params, callbackOK, callbackError);
    },

    /**
     * Updates account of the currently logged user
     *
     * @method Syncano#changeAccountPassword
     * @alias Syncano.Accounts.changePassword
     * @param {Object} params - old and new password
     * @param {string} params.current_password - current password
     * @param {string} params.new_password - current password
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {Object} promise
     */
    changeAccountPassword: function (params, callbackOK, callbackError) {
      return this.request('POST', 'v1/account/password/', params, callbackOK, callbackError);
    },

    /**
     * Use to set a password, if your account doesn't have one - e.g. when it was created using social platform
     * like GitHub. Requires an Account Key.
     *
     * @method Syncano#setAccountPassword
     * @alias Syncano.Accounts.setPassword
     * @param {string} password - new password
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {Object} promise
     */
    setAccountPassword: function(password, callbackOK, callbackError) {
      return this.request('POST', 'v1/account/password/set/', {password: password}, callbackOK, callbackError);
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
    resetAccountKey: function (callbackOK, callbackError) {
      return this.request('POST', 'v1/account/reset_key', {}, callbackOK, callbackError);
    },

    /**
     * Reset password
     *
     * @method Syncano#accountPasswordReset
     * @alias Syncano.Accounts.accountPasswordReset
     * @param {string} email - yout email address
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {Object} promise
     */
    accountPasswordReset: function (email, callbackOK, callbackError) {
      return this.request('POST', 'v1/account/password/reset/', {email: email}, callbackOK, callbackError);
    },

    /**
     * Confirm reset password
     *
     * @method Syncano#accountPasswordResetConfirm
     * @alias Syncano.Accounts.accountPasswordResetConfirm
     * @param {Object} params - reset password object
     * @param {string} params.uid - User id query param
     * @param {string} params.token - Token query param
     * @param {string} params.new_password - new user passsword
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {Object} promise
     */
    accountPasswordResetConfirm: function (params, callbackOK, callbackError) {
      return this.request('POST', 'v1/account/password/reset/confirm/', params, callbackOK, callbackError);
    },

    /**
     * Activate account
     *
     * @method Syncano#activateAccount
     * @alias Syncano.Accounts.activateAccount
     * @param {Object} params - activate account object
     * @param {string} params.uid - User id query param
     * @param {string} params.token - Token query param
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {Object} promise
     */
    activateAccount: function (params, callbackOK, callbackError) {
      return this.request('POST', 'v1/account/activate/', params, callbackOK, callbackError);
    },

    /**
     * Resend activation email
     *
     * @method Syncano#resendActivationEmail
     * @alias Syncano.Accounts.resendActivationEmail
     * @param {string} email - email address to resend activation email
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {Object} promise
     */
    resendActivationEmail: function (email, callbackOK, callbackError) {
      if (typeof email === 'undefined') {
        throw new Error('Missing email address');
      }
      return this.request('POST', 'v1/account/resend_email/', {email: email}, callbackOK, callbackError);
    },

    /***********************
     BILLING METHODS
     ************************/

    getBillingProfile: function (callbackOK, callbackError) {
      return this.request('GET', 'v1/billing/profile/', {}, callbackOK, callbackError);
    },

    updateBillingProfile: function (params, callbackOK, callbackError) {
      return this.request('PUT', 'v1/billing/profile/', params, callbackOK, callbackError);
    },

    getBillingCard: function (callbackOK, callbackError) {
      return this.request('GET', 'v1/billing/card/', {}, callbackOK, callbackError);
    },

    updateBillingCard: function (token, callbackOK, callbackError) {
      return this.request('POST', 'v1/billing/card/', {token: token}, callbackOK, callbackError);
    },

    getBillingInvoices: function (callbackOK, callbackError) {
      return this.request('GET', 'v1/billing/invoices/', {}, callbackOK, callbackError);
    },

    getBillingUsage: function (type, callbackOK, callbackError) {
      if (!type) {
        type = 'daily';
      }
      return this.request('GET', 'v1/usage/' + type + '/', {}, callbackOK, callbackError);
    },

    getBillingPlans: function (callbackOK, callbackError) {
      return this.request('GET', 'v1/billing/plans/', {}, callbackOK, callbackError);
    },

    subscribeBillingPlan: function (planName, payload, callbackOK, callbackError) {
      return this.request('POST', 'v1/billing/plans/' + planName + '/subscribe', payload, callbackOK, callbackError);
    },

    getSubscriptions: function (callbackOK, callbackError) {
      return this.request('GET', 'v1/billing/subscriptions/', {}, callbackOK, callbackError);
    },

    cancelSubscription: function (id, callbackOK, callbackError) {
      return this.request('POST', 'v1/billing/subscriptions/' + id + '/cancel/', {}, callbackOK, callbackError);
    },

    /***********************
     USAGE
     ************************/

    getHourlyUsage: function (params, callbackOK, callbackError) {
      return this.request('GET', 'v1/usage/hourly/', params || {}, callbackOK, callbackError);
    },

    getDailyUsage: function (params, callbackOK, callbackError) {
      return this.request('GET', 'v1/usage/daily/', params || {}, callbackOK, callbackError);
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
    createDataObject: function (className, params, callbackOK, callbackError) {
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
    listDataObjects: function (className, params, callbackOK, callbackError) {
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
    removeDataObject: function (className, params, callbackOK, callbackError) {
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
    getDataObject: function (className, params, callbackOK, callbackError) {
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
    updateDataObject: function (className, params, callbackOK, callbackError) {
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

    uploadFileDataObject: function (className, params, field, callbackOK, callbackError) {

      if (typeof className === 'undefined') {
        throw new Error('Missing name of the class');
      }
      if (typeof linksObject.instance_classes === 'undefined') {
        throw new Error('Not connected to any instance');
      }

      var deferred = Deferred(),
        formData = new FormData(),
        url = normalizeUrl(baseURL + linksObject.instance_classes + className + '/objects/' + params.id + '/'),
        xhr = new XMLHttpRequest();

      formData.append(field.name, field.file);

      xhr.onload = function () {
        deferred.resolve();
      };

      xhr.open('PATCH', url, true);
      xhr.setRequestHeader('Authorization', 'Token ' + apiKey);
      xhr.send(formData);

      return deferred.promise;
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
    createApiKey: function (params, callbackOK, callbackError) {
      params = params || {};
      if (typeof linksObject.instance_api_keys === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('POST', linksObject.instance_api_keys, params, callbackOK, callbackError);
    },

    /**
     * Updates api key
     *
     * @method  Syncano#updateApiKey
     * @alias Syncano.ApiKeys.update
     * @param  {object} params
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    updateApiKey: function (id, params, callbackOK, callbackError) {
      params = params || {};
      if (typeof linksObject.instance_api_keys === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('PATCH', linksObject.instance_api_keys + '/' + id, params, callbackOK, callbackError);
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
    listApiKeys: function (params, callbackOK, callbackError) {
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
    getApiKey: function (id, callbackOK, callbackError) {
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
    removeApiKey: function (id, callbackOK, callbackError) {
      return this.genericRemove(id, 'instance_api_keys', callbackOK, callbackError);
    },

    /**
     * Reset API key identified by specified id
     *
     * @method Syncano#resetApiKey
     * @alias Syncano.ApiKeys.remove
     * @param {Number|object} id - identifier of the api key to remove
     * @param {Number} id.id - when passed parameter is an object, we use its id property
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    resetApiKey: function (id, params, callbackOK, callbackError) {
      return this.request('POST', linksObject.instance_api_keys + id + '/reset_key/', params, callbackOK, callbackError);
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
    createUser: function (params, callbackOK, callbackError) {
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
    listUsers: function (params, callbackOK, callbackError) {
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
    getUser: function (id, callbackOK, callbackError) {
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
    updateUser: function (id, params, callbackOK, callbackError) {
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
        promise = promise.then(function (res) {
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
    removeUser: function (id, callbackOK, callbackError) {
      return this.genericRemove(id, 'instance_users', callbackOK, callbackError);
    },

    /**
     * Returns Groups of User identified by specified id
     *
     * @method Syncano#getUserGroups
     * @alias Syncano.Users.getUserGroups
     * @param {Number} id - identifier of the user
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    getUserGroups: function (id, callbackOK, callbackError) {
      return this.request('GET', linksObject.instance_users + id + '/groups/', callbackOK, callbackError);
    },

    /**
     * Adds User to Group identified by specified id
     *
     * @method Syncano#addToGroup
     * @alias Syncano.Users.addToGroup
     * @param {Number} id - identifier of the user
     * @param {Number} groupId - identifier of the group
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    addToGroup: function (id, groupId, callbackOK, callbackError) {

      if (typeof groupId === 'undefined') {
        throw new Error('Missing group id');
      }
      if (typeof id === 'undefined') {
        throw new Error('Missing user id');
      }

      return this.request('POST', linksObject.instance_users + id + '/groups/', {group: groupId}, callbackOK, callbackError);
    },

    /**
     * Removes connection between User and Group, both identified by specified id
     *
     * @method Syncano#removeFromGroup
     * @alias Syncano.Users.removeFromGroup
     * @param {Number} id - identifier of the user
     * @param {Number} groupId - identifier of the group
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    removeFromGroup: function (id, groupId, callbackOK, callbackError) {

      if (typeof groupId === 'undefined') {
        throw new Error('Missing group id');
      }
      if (typeof id === 'undefined') {
        throw new Error('Missing user id');
      }

      return this.request('DELETE', linksObject.instance_users + id + '/groups/' + groupId, callbackOK, callbackError);
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
    createGroup: function (name, callbackOK, callbackError) {
      var params = {
        label: name
      };
      if (typeof linksObject.instance_groups === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('POST', linksObject.instance_groups, params, callbackOK, callbackError);
    },

    /**
     * Updates group
     *
     * @method Syncano#updateGroup
     * @alias Syncano.Groups.update
     * @param {Number|object} id
     * @param {object} [params]
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    updateGroup: function (id, params, callbackOK, callbackError) {
      if (typeof linksObject.instance_groups === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('PATCH', linksObject.instance_groups + id, params, callbackOK, callbackError);
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
    listGroups: function (params, callbackOK, callbackError) {
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
    getGroup: function (id, callbackOK, callbackError) {
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
    removeGroup: function (id, callbackOK, callbackError) {
      return this.genericRemove(id, 'instance_groups', callbackOK, callbackError);
    },

    /**
     * Returns Users of Group identified by specified id
     *
     * @method Syncano#getGroupUsers
     * @alias Syncano.Groups.getUsers
     * @param {Number} id
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    getGroupUsers: function (id, callbackOK, callbackError) {
      return this.request('GET', linksObject.instance_groups + id + '/users/', callbackOK, callbackError);
    },

    /**
     * Adds Group to User identified by specified id
     *
     * @method Syncano#addToGroup
     * @alias Syncano.Users.addToGroup
     * @param {Object} params - object containing group and user objects
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    addUserToGroup: function (params, callbackOK, callbackError) {
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
     * @param {string} params.runtime_name - Node.js / Python / Ruby
     * @param {string} params.name - name of the codebox
     * @param {string} params.description - name of the codebox
     * @param {string} params.source - source code in Node.js / Python / Ruby
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    createCodeBox: function (params, callbackOK, callbackError) {
      if (typeof params !== 'object') {
        throw new Error('Missing parameters object');
      }
      if (typeof linksObject.instance_codeboxes === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      if (typeof params.runtime_name === 'undefined') {
        params.runtime_name = 'nodejs';
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
    listCodeBoxes: function (params, callbackOK, callbackError) {
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
    listCodeBoxRuntimes: function (params, callbackOK, callbackError) {
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
    getCodeBox: function (id, callbackOK, callbackError) {
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
     * @param {string} params.runtime_name - Node.js / Python / Ruby
     * @param {string} params.name - new codebox name
     * @param {string} params.description -
     * @param {string} params.source - source code in Node.js / Python / Ruby
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {Object} promise
     */
    updateCodeBox: function (id, params, callbackOK, callbackError) {
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
    removeCodeBox: function (id, callbackOK, callbackError) {
      return this.genericRemove(id, 'instance_codeboxes', callbackOK, callbackError);
    },

    /**
     * Runs new codebox
     *
     * @method Syncano#runCodeBox
     * @alias Syncano.CodeBoxes.run
     * @param {number|object} id - identifier of the CodeBox to run
     * @param {object} params
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    runCodeBox: function (codeboxId, params, callbackOK, callbackError) {
      if (typeof params !== 'object') {
        throw new Error('Missing parameters object');
      }
      if (typeof linksObject.instance_codeboxes === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('POST', linksObject.instance_codeboxes + codeboxId + '/run', params, callbackOK, callbackError);
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
    listCodeBoxTraces: function (codeboxId, params, callbackOK, callbackError) {
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
    getCodeBoxTrace: function (codeboxId, traceId, params, callbackOK, callbackError) {
      if (typeof codeboxId === 'object') {
        codeboxId = codeboxId.id;
      }
      if (typeof traceId === 'object') {
        traceId = traceId.id;
      }
      return this.request('GET', linksObject.instance_codeboxes + traceId + '/traces/' + codeboxId + '/', params, callbackOK, callbackError);
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
    createInvitation: function (params, callbackOK, callbackError) {
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
     * Resend invitation for your instance
     *
     * @method Syncano#resendInvitation
     * @alias Syncano.Invitations.resend
     * @param {Number|object} id
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    resendInvitation: function (id, callbackOK, callbackError) {
      if (typeof linksObject.instance_invitations === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('POST', linksObject.instance_invitations + id + '/resend/', callbackOK, callbackError);
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
    listInvitations: function (params, callbackOK, callbackError) {
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
    getInvitation: function (id, callbackOK, callbackError) {
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
    removeInvitation: function (id, callbackOK, callbackError) {
      return this.genericRemove(id, 'instance_invitations', callbackOK, callbackError);
    },

    /*******************************
     ACCOUNT INVITATIONS METHODS
     *******************************/
    /**
     * Invitions from other persons to their instances
     *
     * @method Syncano#listAccountInvitations
     * @alias Syncano.AccountInvitations.list
     * @param  {object} params
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    listAccountInvitations: function (params, callbackOK, callbackError) {
      return this.request('GET', 'v1/account/invitations', params || {}, callbackOK, callbackError);
    },

    /**
     * @method Syncano#getInvitation
     * @alias Syncano.AccountInvitations.get
     * @param {object} params
     * @param {Number} id - identifier of the invitation to get
     * @param {Number|object} id.id - when passed parameter is an object, we use its id property
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    getAccountInvitation: function (invitationId, params, callbackOK, callbackError) {
      if (typeof invitationId === 'object') {
        invitationId = invitationId.id;
      };
      return this.request('GET', 'v1/account/invitations/' + invitationId + '/', params || {}, callbackOK, callbackError);
    },

    /**
     * @method Syncano#removeInvitation
     * @alias Syncano.AccountInvitations.remove
     * @param {object} params
     * @param {Number} id - identifier of the invitation to remove
     * @param {Number|object} id.id - when passed parameter is an object, we use its id property
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    removeAccountInvitation: function (invitationId, callbackOK, callbackError) {
      if (typeof invitationId === 'object') {
        invitationId = invitationId.id;
      };
      return this.request('DELETE', 'v1/account/invitations/' + invitationId + '/', {}, callbackOK, callbackError);
    },

    /**
     * @method Syncano#acceptInvitation
     * @alias Syncano.AccountInvitations.accept
     * @param {object} params
     * @param {String} key - invitation key
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */

    acceptAccountInvitation: function (invitationKey, callbackOK, callbackError) {
      var params = {invitation_key: invitationKey}
      return this.request('POST', 'v1/account/invitations/accept/', params, callbackOK, callbackError);
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
    createWebHook: function (params, callbackOK, callbackError) {
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
    listWebHooks: function (params, callbackOK, callbackError) {
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
    getWebHook: function (id, callbackOK, callbackError) {
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
    removeWebHook: function (id, callbackOK, callbackError) {
      return this.genericRemove(id, 'instance_webhooks', callbackOK, callbackError);
    },

    /**
     * Updates webhook identified by specified id
     *
     * @method Syncano#updateWebHook
     * @alias Syncano.WebHooks.update
     * @param {Number} id - webhook name
     * @param {Object} params - new values of the webhook parameters
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {Object} promise
     */
    updateWebHook: function (id, params, callbackOK, callbackError) {

      if (typeof id === 'undefined') {
        throw new Error('Missing webhook name');
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
    runWebHook: function (id, callbackOK, callbackError) {
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
    listWebHookTraces: function (webhookId, params, callbackOK, callbackError) {
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
    getWebHookTrace: function (webhookId, traceId, params, callbackOK, callbackError) {
      if (typeof webhookId === 'object') {
        webhookId = webhookId.id;
      }
      if (typeof traceId === 'object') {
        traceId = traceId.id;
      }
      return this.request('GET', linksObject.instance_webhooks + webhookId + '/traces/' + traceId + '/', params, callbackOK, callbackError);
    },

    /********************
     DATAVIEWS METHODS
     *********************/
    /**
     * Creates new DataView.
     *
     * @method Syncano#createDataView
     * @alias Syncano.DataViews.create
     * @param {object} params
     * @param {string} params.slug
     * @param {Number} params.codebox
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    createDataView: function (params, callbackOK, callbackError) {
      if (typeof params !== 'object') {
        throw new Error('Missing parameters object');
      }
      //if (typeof params.codebox === 'object') {
      //  params.codebox = params.codebox.id || params.codebox.pk;
      //}
      //if (typeof linksObject.instance_webhooks === 'undefined') {
      //  throw new Error('Not connected to any instance');
      //}
      return this.request('POST', linksObject.instance_self + 'api/objects', params, callbackOK, callbackError);
    },

    /**
     * Returns all defined webhooks as a list
     *
     * @method Syncano#listDataViews
     * @alias Syncano.DataViews.list
     * @param  {object} [params]
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    listDataViews: function (params, callbackOK, callbackError) {
      return this.request('GET', linksObject.instance_self + 'api/objects', params, callbackOK, callbackError);
    },
    //
    ///**
    // * Returns the webhook with specified id
    // *
    // * @method Syncano#getWebHook
    // * @alias Syncano.WebHooks.get
    // * @param {Number|object} id
    // * @param {Number} id.id - when passed parameter is an object, we use its id property
    // * @param {function} [callbackOK] - optional method to call on success
    // * @param {function} [callbackError] - optional method to call when request fails
    // * @returns {object} promise
    // */
    //getWebHook: function(id, callbackOK, callbackError) {
    //  return this.genericGet(id, 'instance_webhooks', callbackOK, callbackError);
    //},

    /**
     * Removes DataView identified by specified id
     *
     * @method Syncano#DataView
     * @alias Syncano.DataView.remove
     * @param {Number} id - identifier of the DataView to remove
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    removeDataView: function (id, callbackOK, callbackError) {
      return this.request('DELETE', linksObject.instance_self + 'api/objects/' + id + '/', callbackOK, callbackError);
    },

    /**
     * Updates webhook identified by specified id
     *
     * @method Syncano#updateDataView
     * @alias Syncano.DataView.update
     * @param {Number} id - dataview id
     * @param {Object} params - new values of the dataview parameters
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {Object} promise
     */
    updateDataView: function (id, params, callbackOK, callbackError) {
      if (typeof id === 'undefined') {
        throw new Error('Missing DataView slug');
      }
      if (typeof linksObject.instance_webhooks === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('PATCH', linksObject.instance_self + 'api/objects/' + id + '/', params, callbackOK, callbackError);
    },

    ///**
    // * Runs defined webhook.
    // *
    // * @method Syncano#runWebHook
    // * @alias Syncano.WebHooks.run
    // * @param  {Number} id - identifier of the webhook
    // * @param {function} [callbackOK] - optional method to call on success
    // * @param {function} [callbackError] - optional method to call when request fails
    // * @returns {object} promise
    // */
    //runWebHook: function(id, callbackOK, callbackError) {
    //  if (typeof id === 'object') {
    //    id = id.slug;
    //  }
    //  if (typeof id === 'undefined') {
    //    throw new Error('Missing webhook slug');
    //  }
    //  if (typeof linksObject.instance_webhooks === 'undefined') {
    //    throw new Error('Not connected to any instance');
    //  }
    //  return this.request('GET', linksObject.instance_webhooks + id + '/run', {}, callbackOK, callbackError);
    //},
    //
    ///**
    // * List all traces for single webhook
    // *
    // * @method Syncano#listWebHookTraces
    // * @alias Syncano.WebHooks.traces
    // * @param {Number|object} webhookId
    // * @param {object} [params]
    // * @param {function} [callbackOK] - optional method to call on success
    // * @param {function} [callbackError] - optional method to call when request fails
    // * @returns {object} promise
    // */
    //listWebHookTraces: function(webhookId, params, callbackOK, callbackError) {
    //  if (typeof webhookId === 'object') {
    //    webhookId = webhookId.id;
    //  }
    //  return this.request('GET', linksObject.instance_webhooks + webhookId + '/traces/', params, callbackOK, callbackError);
    //},
    //
    ///**
    // * Get single trace for single webhook
    // *
    // * @method Syncano#getWebHookTrace
    // * @alias Syncano.WebHooks.trace
    // * @param {Number|object} webhookId
    // * @param {Number|object} traceId
    // * @param {object} [params]
    // * @param {function} [callbackOK] - optional method to call on success
    // * @param {function} [callbackError] - optional method to call when request fails
    // * @returns {object} promise
    // */
    //getWebHookTrace: function(webhookId, traceId, params, callbackOK, callbackError) {
    //  if (typeof webhookId === 'object') {
    //    webhookId = webhookId.id;
    //  }
    //  if (typeof traceId === 'object') {
    //    traceId = traceId.id;
    //  }
    //  return this.request('GET', linksObject.instance_webhooks + webhookId + '/traces/' + traceId + '/', params, callbackOK, callbackError);
    //},

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
    createTrigger: function (params, callbackOK, callbackError) {
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
    listTriggers: function (params, callbackOK, callbackError) {
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
    getTrigger: function (id, callbackOK, callbackError) {
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
    updateTrigger: function (id, params, callbackOK, callbackError) {
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
    removeTrigger: function (id, callbackOK, callbackError) {
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
    listTriggerTraces: function (triggerId, params, callbackOK, callbackError) {
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
    getTriggerTrace: function (triggerId, traceId, params, callbackOK, callbackError) {
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
    createSchedule: function (params, callbackOK, callbackError) {
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
     * Updates schedule
     *
     * @method Syncano#updateSchedule
     * @alias Syncano.Schedules.update
     * @param {Number|object} id
     * @param {object} params
     * @param {string} params.label - name of the schedule
     * @param {Number} params.codebox - codebox to run
     * @param {string} params.interval_sec - how often (in seconds) the schedule should run
     * @param {string} params.crontab - ???
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    updateSchedule: function (id, params, callbackOK, callbackError) {
      if (typeof params !== 'object') {
        throw new Error('Missing parameters object');
      }
      if (typeof params.codebox === 'object') {
        params.codebox = params.codebox.id;
      }
      if (typeof linksObject.instance_schedules === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('PATCH', linksObject.instance_schedules + id, params, callbackOK, callbackError);
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
    listSchedules: function (params, callbackOK, callbackError) {
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
    getSchedule: function (id, callbackOK, callbackError) {
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
    removeSchedule: function (id, callbackOK, callbackError) {
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
    listScheduleTraces: function (scheduleId, params, callbackOK, callbackError) {
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
    getScheduleTrace: function (scheduleId, traceId, params, callbackOK, callbackError) {
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
    createChannel: function (params, callbackOK, callbackError) {
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
    listChannels: function (params, callbackOK, callbackError) {
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
    getChannel: function (name, callbackOK, callbackError) {
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
    removeChannel: function (name, callbackOK, callbackError) {
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
    updateChannel: function (channel, params, callbackOK, callbackError) {
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
    channelListen: function (name, callback) {
      if (typeof name !== 'string') {
        name = name.name;
      }
      if (typeof name !== 'string') {
        throw new Error('Missing channel name');
      }
      var url = normalizeUrl(baseURL + linksObject.instance_channels + name + '/poll/');
      (function poll() {
        $.ajax({
          url: url,
          success: function (data) {
            callback(data);
          },
          dataType: "json",
          complete: function (xhr) {
            if (xhr.responseJSON && xhr.responseJSON.id) {
              url = [
                normalizeUrl(baseURL + linksObject.instance_channels),
                name + '/poll/?last_id=' + xhr.responseJSON.id
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
    publishToChannel: function (name, params, callbackOK, callbackError) {
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
    getChannelHistory: function (name, params, callbackOK, callbackError) {
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
     PUSH NOIFICATIONS METHODS
     *********************/
    /**
     * Configures new APNS Push Notification
     *
     * @method Syncano#configPushNotification
     * @alias Syncano.PushNotifications.APNS.config
     * @param {Object} params
     * @param {string} params.development_certificate - name of the device
     * @param {string} params.development_certificate_name - device's registration id
     * @param {string} params.development_expiration_date - device's registration id
     * @param {string} params.development_bundle_identifier - device's registration id
     * @param {string} params.production_certificate - device's registration id
     * @param {string} params.production_certificate_name - device's registration id
     * @param {string} params.production_expiration_date - device's registration id
     * @param {string} params.production_bundle_identifier - device's registration id
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    configAPNSPushNotification: function (params, callbackOK, callbackError) {
      if (typeof linksObject.instance_self === 'undefined') {
        throw new Error('Not connected to any instance');
      }

      var deferred = Deferred(),
        formData = new FormData(),
        url = normalizeUrl(baseURL + linksObject.instance_push_notifications + 'apns/config/'),
        xhr = new XMLHttpRequest();

      Object.keys(params).forEach(function(key) {
        formData.append(key, params[key]);
      });

      xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);

        if (xhr.status >= 200 && xhr.status <= 299) {
          deferred.resolve(response);
        } else {
          deferred.reject(response);
        }
      };

      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Authorization', 'Token ' + apiKey);
      xhr.send(formData);

      return deferred.promise;
    },

    /**
     * Sends Push Notification message to specified GCM device
     *
     * @method Syncano#sendMessageToAPNSDevices
     * @alias Syncano.PushNotifications.APNS.sendMessage
     * @param {Object} params - JSON payload
     * @param {string} params.content- JSON payload
     * @param {array} params.content.registration_ids - device's registration ID
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    sendMessageToAPNSDevices: function (params, callbackOK, callbackError) {
      if (typeof linksObject.instance_self === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      if (typeof params.content.registration_ids === 'undefined') {
        throw new Error("Missing 'registrationIds' param");
      }
      var url = linksObject.instance_push_notifications + 'apns/messages/';

      return this.request('POST', url, params, callbackOK, callbackError);
    },

    /**
     * Returns APNS Push Notification config
     *
     * @method Syncano#getAPNSPushNotificationConfig
     * @alias Syncano.PushNotifications.APNS.get
     * @param {object} params - optional parameters
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    getAPNSPushNotificationConfig: function (params, callbackOK, callbackError) {
      if (typeof linksObject.instance_self === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      params = params || {};
      var url = linksObject.instance_push_notifications + 'apns/config/';
      return this.request('GET', url, params, callbackOK, callbackError);
    },

    /**
     * Configures new GCM Push Notification
     *
     * @method Syncano#configGCMPushNotification
     * @alias Syncano.PushNotifications.GCM.config
     * @param {Object} params
     * @param {string} params.production_api_key - name of the device
     * @param {string} params.development_api_key - device's registration id
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    configGCMPushNotification: function (params, callbackOK, callbackError) {
      if (typeof linksObject.instance_self === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('PUT', linksObject.instance_push_notifications + 'gcm/config/', params, callbackOK, callbackError);
    },

    /**
     * Sends Push Notification message to specified GCM device
     *
     * @method Syncano#sendMessageToGCMDevices
     * @alias Syncano.PushNotifications.GCM.sendMessage
     * @param {Object} params
     * @param {string} params.content- JSON payload
     * @param {array} params.content.registration_ids - device's registration ID
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    sendMessageToGCMDevices: function (params, callbackOK, callbackError) {
      if (typeof linksObject.instance_self === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      if (typeof params.content.registration_ids === 'undefined') {
        throw new Error("Missing 'registrationId' param");
      }
      var url = linksObject.instance_push_notifications + 'gcm/messages/';

      return this.request('POST', url, params, callbackOK, callbackError);
    },

    /**
     * Returns GCM Push Notification config
     *
     * @method Syncano#getGCMPushNotificationConfig
     * @alias Syncano.PushNotifications.GCM.get
     * @param {object} params - optional parameters
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    getGCMPushNotificationConfig: function (params, callbackOK, callbackError) {
      if (typeof linksObject.instance_self === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      params = params || {};
      var url = linksObject.instance_push_notifications + 'gcm/config/';
      return this.request('GET', url, params, callbackOK, callbackError);
    },

    /**
     * Creates new Device based on passed parameters
     *
     * @method Syncano#createDevice
     * @alias Syncano.PushNotifications.Device.create
     * @param {string} deviceType 'gcm' or 'apns'
     * @param {Object} params
     * @param {string} params.label - name of the device
     * @param {string} params.registration_id - device's registration id
     * @param {string} params.user_id - user's id
     * @param {string} params.device_id - device's id
     * @param {boolean} params.is_active - specifies if device is active
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    createDevice: function (deviceType, params, callbackOK, callbackError) {
      if (typeof linksObject.instance_self === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('POST', linksObject.instance_push_notifications + deviceType + '/devices/', params, callbackOK, callbackError);
    },

    /**
     * Updates Device based on passed parameters
     *
     * @method Syncano#updateDevice
     * @alias Syncano.PushNotifications.Device.update
     * @param {Object} params
     * @param {string} params.label - name of the device
     * @param {string} params.registration_id - device's registration id to update
     * @param {string} params.user_id - user's id
     * @param {string} params.device_id - device's id
     * @param {boolean} params.is_active - specifies if device is active
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    updateDevice: function (deviceType, params, callbackOK, callbackError) {
      if (typeof linksObject.instance_self === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('PATCH', linksObject.instance_push_notifications + deviceType + '/devices/' + params.registration_id + '/', params, callbackOK, callbackError);
    },

    /**
     * Removes device identified by specified registration ID
     *
     * @method Syncano#removeDevice
     * @alias Syncano.PushNotifications.Device.remove
     * @param {string} deviceType - device type (gcm / apns)
     * @param {string} registration_id
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    removeDevice: function (deviceType, registration_id, callbackOK, callbackError) {
      return this.request('DELETE', linksObject.instance_push_notifications + deviceType + '/devices/' + registration_id + '/', {}, callbackOK, callbackError);
    },

    /**
     * Returns all defined Android / iOS devices as a list
     *
     * @method Syncano#listDevices
     * @alias Syncano.PushNotifications.Devices.list
     * @param {string|Object} deviceType - device type (gcm / apns)
     * @param {object} [params]
     * @param {function} [callbackOK] - optional method to call on success
     * @param {function} [callbackError] - optional method to call when request fails
     * @returns {object} promise
     */
    listDevices: function (deviceType, params, callbackOK, callbackError) {
      if (typeof deviceType === 'object') {
        deviceType = deviceType.name;
      }
      if (typeof linksObject.instance_push_notifications === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('GET', linksObject.instance_push_notifications + deviceType + '/devices/', params, callbackOK, callbackError);
    },

    /********************
     GENERIC METHODS
     *********************/
    /*
     These methods are used internally by other list*, get* and remove* methods
     */
    genericList: function (params, links_url, callbackOK, callbackError) {
      params = params || {};
      var url = linksObject[links_url];
      if (typeof url === 'undefined') {
        throw new Error('Not connected to any instance');
      }
      return this.request('GET', url, params, callbackOK, callbackError);
    },

    genericGet: function (id, links_url, callbackOK, callbackError) {
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

    genericRemove: function (id, links_url, callbackOK, callbackError) {
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
     * @param {object} headers -  - request headers
     * @returns {object} promise
     */
    request: function (requestType, method, params, _callbackOK, _callbackError, headers) {
      var deferred = Deferred();
      var callbackOK = function (result) {
        typeof _callbackOK === 'function' && _callbackOK(result);
        deferred.resolve(result);
      };
      var callbackError = function (error) {
        typeof _callbackError === 'function' && _callbackError(error);
        deferred.reject(error);
      };

      if (typeof method === 'undefined') {
        callbackError('Missing request method');
      } else {
        params = params || {};
        if (typeof params.serialize === 'undefined') {
          params.serialize = true;
        }
        if (params.serialize) {
          Object.keys(params).forEach(function (key) {
            if (Array.isArray(params[key])) {
              var arr = params[key];
              params[key] = arr.join('&' + key + '=')
            }
          });
        }
        var url = normalizeUrl(baseURL + method);
        var ajaxParams = {
          type: requestType,
          url: url,
          data: params,
          headers: headers
        };
        ajaxParams.success = function (data) {
          if (typeof data === 'object' && typeof data.objects !== 'undefined' && typeof data.prev !== 'undefined' && typeof data.next !== 'undefined') {
            callbackOK(createList(this, data));
          } else {
            callbackOK(data);
          }
        }.bind(this);

        ajaxParams.error = function (xhr) {
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
  Syncano.Schema = function () {
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
    addField: function (name, type, target) {
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
    addOrderIndex: function () {
      this.data[this.data.length - 1]['order_index'] = true;
      return this;
    },

    /**
     * Defines that last added field can be used for filtering objects
     *
     * @method Syncano.Schema#addFilterIndex
     * @return {object} this - Schema object
     */
    addFilterIndex: function () {
      this.data[this.data.length - 1]['filter_index'] = true;
      return this;
    },

    /**
     * Converts schema to string (used internally)
     *
     * @method Syncano.Schema#toString
     * @return {string}
     */
    toString: function () {
      return JSON.stringify(this.data);
    }
  };

  /*
   * Simple defer/promise library
   * author Jonathan Gotti <jgotti at jgotti dot net>
   * https://github.com/malko/D.js/blob/master/lib/D.js
   */
  var Deferred = (function (undef) {
    "use strict";

    var isFunc = function (f) {
        return (typeof f === 'function');
      },
      isArray = function (a) {
        return Array.isArray ? Array.isArray(a) : (a instanceof Array);
      },
      isObjOrFunc = function (o) {
        return !!(o && (typeof o).match(/function|object/));
      },
      isNotVal = function (v) {
        return (v === false || v === undef || v === null);
      },
      slice = function (a, offset) {
        return [].slice.call(a, offset);
      }

    var nextTick = function (cb) {
      setTimeout(cb, 0);
    };

    function rethrow(e) {
      nextTick(function () {
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
        function (a) {
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
        function (a) {
          return isFunc(cb) ? cb.apply(null, isArray(a) ? a.splice(0, 0, undefined) && a : [undefined, a]) : (defer.onlyFuncs ? a : cb);
        },
        function (e) {
          return cb(e);
        }
      );
    }

    function promise_rethrow(failed) {
      return this.then(
        undef, failed ? function (e) {
          failed(e);
          throw e;
        } : rethrow
      );
    }

    var defer = function (alwaysAsync) {
      var alwaysAsyncFn = (undef !== alwaysAsync ? alwaysAsync : deferIsAlwaysAsync) ? nextTick : function (fn) {
          fn();
        },
        status = 0,
        pendings = [],
        value,
        _promise = {
          then: function (fulfilled, failed) {
            var d = defer();
            pendings.push([
              function (value) {
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
              function (err) {
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

          isPending: function () {
            return status === 0;
          },

          getStatus: function () {
            return status;
          }
        };

      _promise.toSource = _promise.toString = _promise.valueOf = function () {
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
          return function (x) {
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
        alwaysAsyncFn(function () {
          value = val;
          status = 1;
          execCallbacks();
        });
        return this;
      }

      function _reject(Err) {
        status || alwaysAsyncFn(function () {
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

    defer.resolved = defer.fulfilled = function (value) {
      return defer(true).resolve(value).promise;
    };

    defer.rejected = function (reason) {
      return defer(true).reject(reason).promise;
    };

    defer.wait = function (time) {
      var d = defer();
      setTimeout(d.resolve, time || 0);
      return d.promise;
    };

    defer.delay = function (fn, delay) {
      var d = defer();
      setTimeout(function () {
        try {
          d.resolve(isFunc(fn) ? fn.apply(null) : fn);
        } catch (e) {
          d.reject(e);
        }
      }, delay || 0);
      return d.promise;
    };

    defer.promisify = function (promise) {
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
        var resolver = function (i) {
          promises[i] = defer.promisify(promises[i]);
          promises[i].then(
            function (v) {
              args[i] = returnPromises ? promises[i] : v;
              (--c) || d.resolve(args);
            },
            function (e) {
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
      return promise.then(isFunc(zenValue) ? zenValue : function () {
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

    defer.all = function () {
      return multiPromiseResolver(arguments, false);
    };

    defer.resolveAll = function () {
      return multiPromiseResolver(arguments, true);
    };

    defer.sequence = function () {
      return sequencePromiseResolver(arguments);
    };
    return defer;

  })();

  return Syncano;

})();

if (isNode || isWebpack) {
  module.exports = Syncano;
}
