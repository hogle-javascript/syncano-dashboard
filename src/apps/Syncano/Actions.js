import _ from 'lodash';

import Hello from '../Account/Hello.js';
import Constants from '../../constants/Constants';

export default {

  // Accounts
  resendActivationEmail(email) {
    this.Connection
      .Accounts
      .resendActivationEmail(email)
      .then(this.completed)
      .catch(this.failure);
  },

  activate(payload) {
    this.Connection
      .Accounts
      .activate(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordSignIn(payload) {
    this.Connection
      .connect(payload.email, payload.password)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordSignUp(payload) {
    this.Connection
      .Accounts
      .create({
        email    : payload.email,
        password : payload.password
      })
      .then(this.completed)
      .catch(this.failure);
  },

  passwordReset(email) {
    this.Connection
      .Accounts
      .passwordReset(email)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordResetConfirm(payload) {
    this.Connection
      .Accounts
      .passwordResetConfirm(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  socialLogin(network) {
    Hello
      .login(network)
      .then(auth => {
        this.Connection
          .socialConnect(
            auth.network,
            auth.authResponse.access_token
          )
          .then(payload => {
            payload.network = network;
            return payload;
          })
          .then(this.completed)
          .catch(this.failure);
      });
  },

  // Admins
  fetchAdmins() {
    this.Connection
      .Admins
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateAdmin(name, payload) {
    this.Connection
      .Admins
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeAdmins(admins) {
    let promises = admins.map(admin => {
      this.Connection.Admins.remove(admin)
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  // Invitations
  fetchInvitations() {
    this.Connection
      .Invitations
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createInvitation(payload) {
    this.Connection
      .Invitations
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeInvitation(items) {
    let promises = items.map(item => {
      this.Connection.Invitations.remove(item.id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  resendInvitation(items) {
    let promises = items.map(item => {
      this.Connection.Invitations.resend(item.id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  // ApiKeys
  fetchApiKeys() {
    this.Connection
      .ApiKeys
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createApiKey(payload) {
    this.Connection
      .ApiKeys
      .create({
        description       : payload.description,
        allow_user_create : payloathis.d.allow_user_create,
        ignore_acl        : payload.ignore_acl
      })
      .then(this.completed)
      .catch(this.failure);
  },

  updateApiKey(name, payload) {
    this.Connection
      .ApiKeys
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeApiKeys(names) {
    names.map(name => {
      this.Connection
        .ApiKeys
        .remove(name)
        .then(this.completed)
        .catch(this.failure);
    });
  },

  resetApiKey(id) {
    this.Connection
      .ApiKeys
      .reset(id)
      .then(this.completed)
      .catch(this.failure);
  },

  // Channels
  fetchChannels() {
    this.Connection
      .Channels
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createChannel(payload) {
    this.Connection
      .Channels.create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  updateChannel(channelName, params) {
    this.Connection
      .Channels.update(channelName, params)
      .then(this.completed)
      .catch(this.failure);
  },

  removeChannels(names) {
    let promises = names.map(id => {
      return this.Connection.Channels.remove(id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  // Classes
  fetchClasses() {
    this.Connection
      .Classes
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createClass(payload) {
    this.Connection
      .Classes
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  updateClass(classname, payload) {
    this.Connection
      .Classes
      .update(classname, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeClasses(classnames) {
    let promises = classnames.map(classname => {
      return this.Connection.Classes.remove(classname);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  // CodeBox
  fetchCodeBox(codeboxId) {
    this.Connection
      .CodeBoxes
      .get(codeboxId)
      .then(this.completed)
      .catch(this.failure);
  },

  updateCodeBox(codeboxId, params) {
    this.Connection
      .CodeBoxes.update(codeboxId, params)
      .then(this.completed)
      .catch(this.failure);
  },

  runCodeBox(params) {
    this.Connection
      .CodeBoxes.run(params.id, {payload: params.payload})
      .then(this.completed)
      .catch(this.failure);
  },

  fetchCodeBoxes() {
    this.Connection
      .CodeBoxes
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createCodeBox(payload) {
    this.Connection
      .CodeBoxes.create({
        runtime_name : payload.runtime_name,
        label        : payload.label,
        description  : payload.description,
        source       : '# Start coding!'
      })
      .then(this.completed)
      .catch(this.failure);
  },

  removeCodeBoxes(ids) {
    let promises = ids.map(id => {
      return this.Connection.CodeBoxes.remove(id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchCodeBoxTrace(codeboxId, traceId) {
    this.Connection
      .CodeBoxes.trace(traceId, codeboxId, {})
      .then(this.completed)
      .catch(this.failure);
  },

  fetchCodeBoxTraces(codeboxId) {
    this.Connection
      .CodeBoxes.traces(codeboxId, {})
      .then(this.completed)
      .catch(this.failure);
  },

  fetchCodeBoxRuntimes() {
    this.Connection
      .CodeBoxes.listRuntimes()
      .then(this.completed)
      .catch(this.failure);
  },

  getTraces(objectId) {
    this.Connection
      .CodeBoxes.traces(objectId, {})
      .then(this.completed)
      .catch(this.failure);
  },

  // DataView
  createDataView(payload) {
    this.Connection
      .DataViews
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchDataViews() {
    this.Connection
      .DataViews
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateDataView(id, payload) {
    this.Connection
      .DataViews
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeDataViews(dataviews) {
    let promises = dataviews.map(dataview => {
      return this.Connection.DataViews.remove(dataview.name);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  // Webhook
  createWebhook(payload) {
    this.Connection
      .WebHooks
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchWebhooks() {
    this.Connection
      .WebHooks
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateWebhook(id, payload) {
    this.Connection
      .WebHooks
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeWebhooks(ids) {

    let promises = ids.map(id => {
      return this.Connection.WebHooks.remove(id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchCurrentClassObj(className) {
    this.Connection
      .Classes
      .get(className)
      .then(this.completed)
      .catch(this.failure);
  },

  // Data Objects
  fetchDataObjects(className) {
    this.Connection
      .DataObjects
      .list(className, {
        page_size : Constants.DATAOBJECTS_PAGE_SIZE,
        order_by  : '-created_at'
      })
      .then(this.completed)
      .catch(this.failure);
  },

  subFetchDataObjects(payload) {

    this.Connection
      .DataObjects
      .list(payload.className, payload.params)
      .then(this.completed)
      .catch(this.failure);
  },

  createDataObject(payload) {

    this.Connection
      .DataObjects
      .create(payload.className, payload.params)
      .then(createdItem => {

        let promises = payload.fileFields.map(file => {
          return this.Connection.DataObjects.uploadFile(payload.className, createdItem, file)
        });

        this.D.all(promises)
          .success(this.completed)
          .error(this.failure);
      });
  },

  updateDataObject(payload) {

    this.Connection
      .DataObjects
      .update(payload.className, payload.params)
      .then(updatedItem => {

        let promises = payload.fileFields.map(file => {
          return this.Connection.DataObjects.uploadFile(payload.className, updatedItem, file)
        });

        this.D.all(promises)
          .success(this.completed)
          .error(this.failure);
      });
  },

  removeDataObjects(className, dataobjects) {

    let promises = dataobjects.map(dataobject => {
      return this.Connection.DataObjects.remove(className, dataobject)
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  // Instances
  fetchInstances() {
    this.Connection
      .Instances
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createInstance(payload) {
    this.Connection
      .Instances
      .create({
        name        : payload.name,
        description : payload.description,
        metadata    : payload.metadata
      })
      .then(this.completed)
      .catch(this.failure);
  },

  updateInstance(name, payload) {
    this.Connection
      .Instances
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeInstances(names) {

    let promises = names.map(name => {
      return this.Connection.Instances.remove(name);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  // Accounts
  updateSettings(payload) {
    this.Connection
      .Accounts
      .update({
        first_name: payload.firstName,
        last_name: payload.lastName
      })
      .then(this.completed)
      .catch(this.failure);
  },

  changePassword(payload) {
    this.Connection
      .Accounts
      .changePassword({
        current_password : payload.currentPassword,
        new_password     : payload.newPassword
      })
      .then(this.completed)
      .catch(this.failure);
  },

  fetchUser(token) {
    this.Connection
      .setApiKey(token)
      .Accounts
      .get()
      .then(this.completed)
      .catch(this.failure)
  },

  resetKey() {
    this.Connection
      .Accounts
      .resetKey()
      .then(this.completed)
      .catch(this.failure);
  },

  // Billing
  fetchBillingProfile() {
    this.Connection
      .Billing
      .getProfile()
      .then(this.completed)
      .catch(this.failure);
  },

  updateBillingProfile(payload) {
    this.Connection
      .Billing
      .updateProfile(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchBillingCard() {
    this.Connection
      .Billing
      .getCard()
      .then(this.completed)
      .catch(this.failure);
  },

  updateBillingCard(payload) {
    Stripe.card.createToken(payload, (status, response) => {
      if (response.error) {
        return this.failure(response.error);
      }
      this.Connection
        .Billing
        .updateCard(response.id)
        .then(this.completed)
        .catch(this.failure);
    });
  },

  fetchInvoices() {
    this.Connection
      .Billing
      .getInvoices()
      .then(this.completed)
      .catch(this.failure);
  },

  // Account Invitations
  fetchAccountInvitations() {
    this.Connection
      .AccountInvitations
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  acceptInvitations(items) {
    let promises = items.map(item => {
      return this.Connection.AccountInvitations.accept(item.key);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  declineInvitations(items) {
    let promises = items.map(item => {
      return this.Connection.AccountInvitations.remove(item.id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchInstance(name) {
    this.Connection
      .setInstance(name)
      .then(this.completed)
      .catch(this.failure)
  },

  // Solutions
  fetchSolution(solutionId) {
    this.Connection
      .Solutions
      .get(solutionId)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchSolutionVersions(solutionId) {
    this.Connection
      .Solutions
      .listVersions(solutionId)
      .then(this.completed)
      .catch(this.failure);
  },

  createVersion(solutionId, payload) {
    this.Connection
      .Solutions
      .createVersion(solutionId, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  installSolution(payload) {
    this.Connection
      .Solutions
      .install(
        payload.solutionId,
        payload.versionId,
        payload.instanceName
      )
      .then(this.completed)
      .catch(this.failure);
  },

  removeSolution(solutionId) {
    this.Connection
      .Solutions
      .remove(solutionId)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchSolutions() {
    this.Connection
      .Solutions
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createSolution(payload) {
    this.Connection
      .Solutions
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  starSolution(id) {
    this.Connection
      .Solutions
      .star(id)
      .then(this.completed)
      .catch(this.failure);
  },

  unstarSolution(id) {
    this.Connection
      .Solutions
      .unstar(id)
      .then(this.completed)
      .catch(this.failure);
  },

  // Schedules
  createSchedule(payload) {
    this.Connection
      .Schedules
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchSchedules() {
    this.Connection
      .Schedules
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateSchedule(id, payload) {
    this.Connection
      .Schedules
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeSchedules(schedules) {

    let promises = schedules.map(schedule => {
      return this.Connection.Schedules.remove(schedule.id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  // Triggers
  createTrigger(payload) {
    this.Connection
      .Triggers
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchTriggers() {
    this.Connection
      .Triggers
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateTrigger(id, payload) {
    this.Connection
      .Triggers
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeTriggers(ids) {

    let promises = ids.map(id => {
      return this.Connection.Triggers.remove(id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  // Groups
  createGroup(label) {
    this.Connection
      .Groups
      .create(label)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchGroups() {
    this.Connection
      .Groups
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateGroup(id, payload) {
    this.Connection
      .Groups
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeGroups(ids) {

    let promises = ids.map(id => {
      return this.Connection.Groups.remove(id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchGroupUsers(groupId) {
    this.Connection
      .Groups
      .getUsers(groupId)
      .then(this.completed)
      .catch(this.failure);
  },

  // Users
  fetchUsers() {
    this.Connection
      .Users
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createUser(payload, groups) {

    if (groups.newGroups) {
      this.Connection
        .Users
        .create(payload)
        .then(user => {
          let addUserToGroups = groups.newGroups.map(group => {
            return addToGroup(user.id, group.id);
          });

          this.D.all(addUserToGroups)
            .success(this.completed)
            .error(this.failure);
        })
        .catch(this.failure);
    } else {
      this.Connection
        .Users
        .create(payload)
        .then(this.completed)
        .catch(this.failure);
    }
  },

  updateUser(id, payload, groups) {

    let addedGroups = _.difference(groups.newGroups, groups.groups),
      removedGroups = _.difference(groups.groups, groups.newGroups),
      addUserToGroups = addedGroups.map(group => {
        return addToGroup(id, group);
      });

    getUserGroups(id).then(groups => {
      let userGroups = Object.keys(groups).map(key => {
        return groups[key];
      });

      let removeUserFromGroups = removedGroups.map(group => {
        let userGroupId = _.findIndex(userGroups, userGroup => {
          return userGroup.group.id === group.id
        });

        return removeFromGroup(id, userGroups[userGroupId].id);
      });

      this.D.all(removeUserFromGroups, addUserToGroups)
        .success(this.completed)
        .error(this.failure);
    });
  },

  removeUsers(users) {

    let promises = users.map(user => {
      return this.Connection.Users.remove(user.id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  addToGroup(user, group) {
    this.Connection
      .Users
      .addToGroup(user, group)
      .then(this.completed)
      .catch(this.failure);
  },

  removeFromGroup(user, group) {
    this.Connection
      .Users
      .removeFromGroup(user, group)
      .then(this.completed)
      .catch(this.failure);
  },

  getUserGroups(user) {
    this.Connection
      .Users
      .getUserGroups(user)
      .then(this.completed)
      .catch(this.failure);
  }
};

