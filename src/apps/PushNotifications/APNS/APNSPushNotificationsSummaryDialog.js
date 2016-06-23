import React from 'react';
import Reflux from 'reflux';

import Store from './APNSPushNotificationsSummaryDialogStore';
import APNSPushNotificationsStore from './APNSPushNotificationsStore';
import SessionStore from '../../Session/SessionStore';

import { DialogMixin } from '../../../mixins';
import { CodePreview, Dialog } from '../../../common/';
import { Card, CardTitle, CardText } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'APNSPPushNotificationsSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(APNSPushNotificationsStore, 'APNSPPushNotifications'),
    DialogMixin
  ],

  render() {
    const { open, APNSPPushNotifications } = this.state;
    const item = APNSPushNotificationsStore.data.items[0];
    const token = SessionStore.getToken();
    const currentInstance = SessionStore.getInstance();
    const showSummaryDialog = (!item || !currentInstance || !token || APNSPPushNotifications.isLoading);

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="You've just created a APNS Push Notification!"
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.handleCancel}
        loading={APNSPPushNotifications.isLoading}
        open={open}
      >
        <div style={{ position: 'absolute', top: 0, left: 24 }}>
          <span
            className="synicon-socket-push"
            style={{
              color: Colors.indigo300,
              fontSize: 32
            }}
          />
        </div>
        {showSummaryDialog ? null : (
          <div>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
                  <p>
                    APNS Push Notification you just configurated can always be modified later. Push Notification
                    Sockets allow for sending messages directly to your users devices. Thanks to this functionality,
                    your users can be quickly informed about changes taking place within your application.
                  </p>
                </div>
              </div>
            </Dialog.ContentSection>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <Card>
                  <CardTitle title="Use in your App" />
                  <CardText>
                    <p>Choose your favorite language below and copy the code.</p>
                    <CodePreview>
                      <CodePreview.Item
                        title="cURL"
                        languageClassName="markup"
                        code={`curl -X GET\n-H "X-API-KEY: ${token}"\n"https://api.syncano.io/v1.1/instances/` +
                        `${currentInstance.name}/triggers/${item.id}/"`}
                      />
                      <CodePreview.Item
                        title="Python"
                        languageClassName="python"
                        code={`my_trigger = Trigger.please.get(id=${item.id}, instance_name=` +
                        `"${currentInstance.name}")\n\nprint(my_trigger.label)`}
                      />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={`Trigger\n  .please()\n  .get({instanceName: '${currentInstance.name}',` +
                        ` id: ${item.id}})\n  .then(function(trigger) {});`}
                      />
                    </CodePreview>
                  </CardText>
                </Card>
              </div>
            </Dialog.ContentSection>
          </div>
        )}
      </Dialog.FullPage>
    );
  }
});
