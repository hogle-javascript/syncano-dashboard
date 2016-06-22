/* eslint-disable */
import _ from 'lodash';

export default {
  list() {
    const url = SYNCANO_DEMO_APPS_SCRIPT_ENDPOINT;

    this.Promise
      .get(url)
      .then(this.completed)
      .catch(this.failure);
  },

  install(payload) {
    const { accountKey, email, instanceName } = payload;
    const config = {
      method: 'post',
      url: `${SYNCANO_BASE_URL}v1.1/instances/${instanceName}/invitations/?api_key=${accountKey}`,
      data: {
        instanceName,
        email,
        role: 'read'
      }
    };

    this.Promise
      .request(config)
      .then(() => this.NewLibConnection.Invitation.please().list())
      .then((invitations) => {
        const invitationToAccept = _.find(invitations, (invitation) => invitation.instance === instanceName);

        return this.NewLibConnection
          .Invitation
          .please()
          .accept(invitationToAccept.key)
      })
      .then(this.completed)
      .catch(this.failure);
  }
};
