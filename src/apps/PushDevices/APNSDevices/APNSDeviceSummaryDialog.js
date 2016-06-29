import React from 'react';
import Reflux from 'reflux';

import Store from './APNSDeviceSummaryDialogStore';
import APNSDevicesStore from './APNSDevicesStore';
import SessionStore from '../../Session/SessionStore';

import { DialogMixin } from '../../../mixins';
import { CodePreview, Dialog } from '../../../common/';
import { Card, CardTitle, CardText } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'APNSDeviceSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(APNSDevicesStore, 'APNSDevices'),
    DialogMixin
  ],

  render() {
    const { open, APNSDevices } = this.state;
    const item = APNSDevicesStore.data.items[0];
    const token = SessionStore.getToken();
    const currentInstance = SessionStore.getInstance();
    const showSummaryDialog = (!item || !currentInstance || !token || APNSDevices.isLoading);

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="You've just added iOS Device!"
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.handleCancel}
        loading={APNSDevices.isLoading}
        open={open}
      >
        <div style={{ position: 'absolute', top: 0, left: 24 }}>
          <span
            className="synicon-apple"
            style={{
              backgroundColor: Colors.blue500,
              color: '#fff',
              fontSize: 24,
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center' }}
          />
        </div>
        {showSummaryDialog ? null : (
          <div>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
                  <p>
                    iOS Device you just created can always be modified later. Now You can Send Push Notification
                    Messages to this device.
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
                        code={`curl -X POST \\\n-H "X-API-KEY: ${token}" \\\n-H "Content-Type: application/json" ` +
                        `\\\n-d '{"content": {"environment": "development","aps": {"alert": "hello"}}' \\\n` +
                        `"https://api.syncano.io/v1.1/instances/${currentInstance.name}/push_notifications/` +
                        `apns/devices/${item.registration_id}/send_message/`}
                      />
                      <CodePreview.Item
                        title="Python"
                        languageClassName="python"
                        code={`device = APNSDevice.please.get(\n  instance_name='${currentInstance.name}', ` +
                        `\n  registration_id='${item.registration_id}'\n) \n\ndevice.send_message(\n  content={\n` +
                        "    'environment': 'development',\n    'aps': {'alert': 'hello'}\n  }\n)"}
                      />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={`var query = {\n  instanceName: "${currentInstance.name}",\n  ` +
                        `registration_id: "${item.registration_id}" \n};\n` +
                        'var content = {\n  environment: "development",\n  aps: {alert: "hello"}\n};' +
                        `\n\n\APNSDevice\n  .please()\n  .sendMessage(query, content)\n  .then(calback);`}
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
