/* eslint-disable */
import Syncano from 'syncano';
import _ from 'lodash';

export default {
  list() {
    const connection = Syncano({
      baseUrl: SYNCANO_BASE_URL,
      accountKey: SYNCANO_DEMO_APPS_ACCOUNT_KEY
    })

    connection
      .Instance
      .please()
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  install(payload) {
    const { email, instanceName } = payload;
    const connection = Syncano({
      baseUrl: SYNCANO_BASE_URL,
      accountKey: SYNCANO_DEMO_APPS_ACCOUNT_KEY,
      defaults: {
        instanceName
      }
    });
    const invitationParams = {
      instanceName,
      email,
      role: 'read'
    }
    // const config = {
    //   method: 'post',
    //   url: `${SYNCANO_BASE_URL}v1.1/instances/${instanceName}/invitations/?api_key=${SYNCANO_DEMO_APPS_ACCOUNT_KEY}`,
    //   data: {
    //     instanceName,
    //     email,
    //     role: 'read'
    //   }
    // };

    connection
      .InstanceInvitation
      .please()
      .create(invitationParams)
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

    // this.Promise
    //   .request(config)
    //   .then(() => this.NewLibConnection.Invitation.please().list())
    //   .then((invitations) => {
    //     const invitationToAccept = _.find(invitations, (invitation) => invitation.instance === instanceName);
    //
    //     return this.NewLibConnection
    //       .Invitation
    //       .please()
    //       .accept(invitationToAccept.key)
    //   })
    //   .then(this.completed)
    //   .catch(this.failure);
  }
};
