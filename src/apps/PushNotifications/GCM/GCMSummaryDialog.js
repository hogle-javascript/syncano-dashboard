import React from 'react';
import Reflux from 'reflux';

import Store from './GCMSummaryDialogStore';
import GCMPushNotificationsStore from './GCMPushNotificationsStore';
import SessionStore from '../../Session/SessionStore';

import { DialogMixin } from '../../../mixins';
import { CodePreview, Dialog, Loading } from '../../../common/';
import { Card, CardTitle, CardText } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'GCMSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(GCMPushNotificationsStore, 'GCMs'),
    DialogMixin
  ],

  render() {
    const { open, GCMs } = this.state;
    const token = SessionStore.getToken();
    const item = GCMPushNotificationsStore.data.items[0];
    const currentInstance = SessionStore.getInstance();
    const showSummaryDialog = (!currentInstance || !token || GCMs.isLoading);

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={!showSummaryDialog ? "You've just configured Push Notification Socket - GCM!" : ''}
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.handleCancel}
        loading={GCMs.isLoading}
        open={open}
      >
        {!showSummaryDialog && (
          <div style={{ position: 'absolute', top: 0, left: 24 }}>
            <span
              className="synicon-socket-push"
              style={{ color: Colors.indigo300, fontSize: 32 }}
            />
          </div>
        )}
        {showSummaryDialog ? <Loading show={true} /> : (
          <div>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
                  <p>
                    Push Notification Sockets allow for sending messages directly to your users devices.
                    Thanks to this functionality, your users can be quickly informed about changes taking place
                    within your application.
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
                        code={`curl -X PATCH \\\n-H "X-API-KEY: ${token}" \\\n-H "Content-Type: application/json" ` +
                        `\\\n-d '{"production_api_key":"${item.production_api_key}","development_api_key":` +
                        `"${item.development_api_key}"}' \\\n"https://api.syncano.io/v1.1/instances/` +
                        `${currentInstance.name}/push_notifications/gcm/config/"`}
                      />
                      <CodePreview.Item
                        title="Python"
                        languageClassName="python"
                        code={`import syncano\nfrom syncano.models import GCMConfig\n\nsyncano.connect(api_key=` +
                        `'${token}')\n\ngcm_config = GCMConfig.please.get(instance_name="${currentInstance.name}")` +
                        `\n\ngcm_config.development_api_key = "${item.development_api_key}"\n` +
                        `gcm_config.production_api_key = "${item.production_api_key}"\n\ngcm_config.save()`}
                      />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={`var Syncano = require('syncano');\nvar connection = Syncano({accountKey: ` +
                        `'${token}'});\nvar GCMConfig = connection.GCMConfig;\n\n` +
                        `var update = {\n  production_api_key: "${item.production_api_key}",\n  ` +
                        `development_api_key: "${item.development_api_key}"\n};\n\nGCMConfig\n  .please()\n  ` +
                        `.update({instanceName: '${currentInstance.name}'}, update)\n  .then(calback);`}
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
