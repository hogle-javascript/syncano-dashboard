import _ from 'lodash';

import _Connection from '../Session/Connection.js';
import Hello from '../Account/Hello.js';
import Constants from '../../constants/Constants';

let Connection = _Connection.get();

export default {

  resendActivationEmail(email) {
    Connection
      .Accounts
      .resendActivationEmail(email)
      .then(this.completed)
      .catch(this.failure);
  },

  activate(payload) {
    Connection
      .Accounts
      .activate(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordSignIn(payload) {
    Connection
      .connect(payload.email, payload.password)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordSignUp(payload) {
    Connection
      .Accounts
      .create({
        email    : payload.email,
        password : payload.password
      })
      .then(this.completed)
      .catch(this.failure);
  },

  passwordReset(email) {
    Connection
      .Accounts
      .passwordReset(email)
      .then(this.completed)
      .catch(this.failure);
  },

  passwordResetConfirm(payload) {
    Connection
      .Accounts
      .passwordResetConfirm(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  socialLogin(network) {
    Hello
      .login(network)
      .then(auth => {
        Connection
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

  fetchAdmins() {
    Connection
      .Admins
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateAdmin(name, payload) {
    Connection
      .Admins
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeAdmins(admins) {
    let promises = admins.map(admin => {
      Connection.Admins.remove(admin)
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchInvitations() {
    Connection
      .Invitations
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createInvitation(payload) {
    Connection
      .Invitations
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeInvitation(items) {
    let promises = items.map(item => {
      Connection.Invitations.remove(item.id);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  resendInvitation(items) {
    let promises = items.map(item => {
      Connection.Invitations.resend(item.id);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchApiKeys() {
    Connection
      .ApiKeys
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createApiKey(payload) {
    Connection
      .ApiKeys
      .create({
        description       : payload.description,
        allow_user_create : payload.allow_user_create,
        ignore_acl        : payload.ignore_acl
      })
      .then(this.completed)
      .catch(this.failure);
  },

  updateApiKey(name, payload) {
    Connection
      .ApiKeys
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeApiKeys(names) {
    names.map(name => {
      Connection
        .ApiKeys
        .remove(name)
        .then(this.completed)
        .catch(this.failure);
    });
  },

  resetApiKey(id) {
    Connection
      .ApiKeys
      .reset(id)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchChannels() {
    Connection
      .Channels
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createChannel(payload) {
    Connection
      .Channels.create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  updateChannel(channelName, params) {
    Connection
      .Channels.update(channelName, params)
      .then(this.completed)
      .catch(this.failure);
  },

  removeChannels(names) {
    let promises = names.map(id => {
      return Connection.Channels.remove(id);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchClasses() {
    Connection
      .Classes
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createClass(payload) {
    Connection
      .Classes
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  updateClass(classname, payload) {
    Connection
      .Classes
      .update(classname, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeClasses(classnames) {
    let promises = classnames.map(classname => {
      return Connection.Classes.remove(classname);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchCodeBox(codeboxId) {
    Connection
      .CodeBoxes
      .get(codeboxId)
      .then(this.completed)
      .catch(this.failure);
  },

  updateCodeBox(codeboxId, params) {
    Connection
      .CodeBoxes.update(codeboxId, params)
      .then(this.completed)
      .catch(this.failure);
  },

  runCodeBox(params) {
    Connection
      .CodeBoxes.run(params.id, {payload: params.payload})
      .then(this.completed)
      .catch(this.failure);
  },

  fetchCodeBoxes() {
    Connection
      .CodeBoxes
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createCodeBox(payload) {
    Connection
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
      return Connection.CodeBoxes.remove(id);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchCodeBoxTrace(codeboxId, traceId) {
    Connection
      .CodeBoxes.trace(traceId, codeboxId, {})
      .then(this.completed)
      .catch(this.failure);
  },

  fetchCodeBoxTraces(codeboxId) {
    Connection
      .CodeBoxes.traces(codeboxId, {})
      .then(this.completed)
      .catch(this.failure);
  },

  fetchCodeBoxRuntimes() {
    Connection
      .CodeBoxes.listRuntimes()
      .then(this.completed)
      .catch(this.failure);
  },
  createDataView(payload) {
    Connection
      .DataViews
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchDataViews() {
    Connection
      .DataViews
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateDataView(id, payload) {
    Connection
      .DataViews
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeDataViews(dataviews) {
    let promises = dataviews.map(dataview => {
      return Connection.DataViews.remove(dataview.name);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },
  createWebhook(payload) {
    Connection
      .WebHooks
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchWebhooks() {
    Connection
      .WebHooks
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateWebhook(id, payload) {
    Connection
      .WebHooks
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeWebhooks(ids) {

    let promises = ids.map(id => {
      return Connection.WebHooks.remove(id);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchCurrentClassObj(className) {
    Connection
      .Classes
      .get(className)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchDataObjects(className) {
    Connection
      .DataObjects
      .list(className, {
        page_size : Constants.DATAOBJECTS_PAGE_SIZE,
        order_by  : '-created_at'
      })
      .then(this.completed)
      .catch(this.failure);
  },

  subFetchDataObjects(payload) {

    Connection
      .DataObjects
      .list(payload.className, payload.params)
      .then(this.completed)
      .catch(this.failure);
  },

  createDataObject(payload) {

    Connection
      .DataObjects
      .create(payload.className, payload.params)
      .then(createdItem => {

        let promises = payload.fileFields.map(file => {
          return Connection.DataObjects.uploadFile(payload.className, createdItem, file)
        });

        D.all(promises)
          .success(this.completed)
          .error(this.failure);
      });
  },

  updateDataObject(payload) {

    Connection
      .DataObjects
      .update(payload.className, payload.params)
      .then(updatedItem => {

        let promises = payload.fileFields.map(file => {
          return Connection.DataObjects.uploadFile(payload.className, updatedItem, file)
        });

        D.all(promises)
          .success(this.completed)
          .error(this.failure);
      });
  },

  removeDataObjects(className, dataobjects) {

    let promises = dataobjects.map(dataobject => {
      return Connection.DataObjects.remove(className, dataobject)
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchInstances() {
    Connection
      .Instances
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createInstance(payload) {
    Connection
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
    Connection
      .Instances
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeInstances(names) {

    let promises = names.map(name => {
      return Connection.Instances.remove(name);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  updateSettings(payload) {
    Connection
      .Accounts
      .update({
        first_name: payload.firstName,
        last_name: payload.lastName
      })
      .then(this.completed)
      .catch(this.failure);
  },

  changePassword(payload) {
    Connection
      .Accounts
      .changePassword({
        current_password : payload.currentPassword,
        new_password     : payload.newPassword
      })
      .then(this.completed)
      .catch(this.failure);
  },

  fetchBillingProfile() {
    Connection
      .Billing
      .getProfile()
      .then(this.completed)
      .catch(this.failure);
  },

  updateBillingProfile(payload) {
    Connection
      .Billing
      .updateProfile(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  resetKey() {
    Connection
      .Accounts
      .resetKey()
      .then(this.completed)
      .catch(this.failure);
  },

  fetchBillingCard() {
    Connection
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
      Connection
        .Billing
        .updateCard(response.id)
        .then(this.completed)
        .catch(this.failure);
    });
  },

  fetchInvoices() {
    Connection
      .Billing
      .getInvoices()
      .then(this.completed)
      .catch(this.failure);
  },

  fetchAccountInvitations() {
    Connection
      .AccountInvitations
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  acceptInvitations(items) {
    let promises = items.map(item => {
      return Connection.AccountInvitations.accept(item.key);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  declineInvitations(items) {
    let promises = items.map(item => {
      return Connection.AccountInvitations.remove(item.id);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchUser(token) {
    Connection
      .setApiKey(token)
      .Accounts
      .get()
      .then(this.completed)
      .catch(this.failure)
  },

  fetchInstance(name) {
    Connection
      .setInstance(name)
      .then(this.completed)
      .catch(this.failure)
  },

  fetchSolution(solutionId) {
    Connection
      .Solutions
      .get(solutionId)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchSolutionVersions(solutionId) {
    Connection
      .Solutions
      .listVersions(solutionId)
      .then(this.completed)
      .catch(this.failure);
  },

  createVersion(solutionId, payload) {
    Connection
      .Solutions
      .createVersion(solutionId, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  installSolution(payload) {
    Connection
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
    Connection
      .Solutions
      .remove(solutionId)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchSolutions() {
    Connection
      .Solutions
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createSolution(payload) {
    Connection
      .Solutions
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  starSolution(id) {
    Connection
      .Solutions
      .star(id)
      .then(this.completed)
      .catch(this.failure);
  },

  unstarSolution(id) {
    Connection
      .Solutions
      .unstar(id)
      .then(this.completed)
      .catch(this.failure);
  },

  createSchedule(payload) {
    Connection
      .Schedules
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchSchedules() {
    Connection
      .Schedules
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateSchedule(id, payload) {
    Connection
      .Schedules
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeSchedules(schedules) {

    let promises = schedules.map(schedule => {
      return Connection.Schedules.remove(schedule.id);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  createTrigger(payload) {
    Connection
      .Triggers
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchTriggers() {
    Connection
      .Triggers
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateTrigger(id, payload) {
    Connection
      .Triggers
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeTriggers(ids) {

    let promises = ids.map(id => {
      return Connection.Triggers.remove(id);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  getTraces(objectId) {
    Connection
      .CodeBoxes.traces(objectId, {})
      .then(this.completed)
      .catch(this.failure);
  },

  createGroup(label) {
    Connection
      .Groups
      .create(label)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchGroups() {
    Connection
      .Groups
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateGroup(id, payload) {
    Connection
      .Groups
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeGroups(ids) {

    let promises = ids.map(id => {
      return Connection.Groups.remove(id);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchGroupUsers(groupId) {
    Connection
      .Groups
      .getUsers(groupId)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchUsers() {
    Connection
      .Users
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createUser(payload, groups) {

    if (groups.newGroups) {
      Connection
        .Users
        .create(payload)
        .then(user => {
          let addUserToGroups = groups.newGroups.map(group => {
            return addToGroup(user.id, group.id);
          });

          D.all(addUserToGroups)
            .success(this.completed)
            .error(this.failure);
        })
        .catch(this.failure);
    } else {
      Connection
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

      D.all(removeUserFromGroups, addUserToGroups)
        .success(this.completed)
        .error(this.failure);
    });
  },

  removeUsers(users) {

    let promises = users.map(user => {
      return Connection.Users.remove(user.id);
    });

    D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  addToGroup(user, group) {
    Connection
      .Users
      .addToGroup(user, group)
      .then(this.completed)
      .catch(this.failure);
  },

  removeFromGroup(user, group) {
    Connection
      .Users
      .removeFromGroup(user, group)
      .then(this.completed)
      .catch(this.failure);
  },

  getUserGroups(user) {
    Connection
      .Users
      .getUserGroups(user)
      .then(this.completed)
      .catch(this.failure);
  }
};

