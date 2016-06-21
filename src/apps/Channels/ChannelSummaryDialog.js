import React from 'react';
import Reflux from 'reflux';

import Store from './ChannelSummaryDialogStore';
import ChannelsStore from './ChannelsStore';
import SessionStore from '../Session/SessionStore';

import { DialogMixin } from '../../mixins';
import { CodePreview, Dialog } from '../../common/';
import { Card, CardTitle, CardText } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'ChannelSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(ChannelsStore, 'channels'),
    DialogMixin
  ],

  render() {
    const { open, channels } = this.state;
    const item = ChannelsStore.data.items[0];
    const token = SessionStore.getToken();
    const currentInstance = SessionStore.getInstance();
    const showSummaryDialog = (!item || !currentInstance || !token || channels.isLoading);

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="You've just created a Channel!"
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.handleCancel}
        loading={channels.isLoading}
        open={open}
      >
        <div style={{ position: 'absolute', top: 0, left: 24 }}>
          <span
            className="synicon-socket-channel"
            style={{ color: Colors.blue500, fontSize: 32 }}
          />
        </div>
        {showSummaryDialog ? null : (
          <div>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
                  <p>
                    Channel you just created can always be modified later. Channels are a way of providing
                    realtime communication functionality in Syncano. Users can subscribe to Channels in order
                    to get notifications about changes that happen to Data Objects connected to those Channels.
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
                        code={`curl -X GET \\\n-H "X-API-KEY: ${token}" \\\n"https://api.syncano.io/v1.1/instances/` +
                        `${currentInstance.name}/channels/${item.name}/poll/"`}
                      />
                      <CodePreview.Item
                        title="Python"
                        languageClassName="python"
                        code={`def callback(message=None):\n  print message.payload\n  return True\n\n` +
                        `channel = Channel.please.get(instance_name="${currentInstance.name}", name="${item.name}")` +
                        `\n\nchannel.poll(callback=callback)`}
                      />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={`var poll = Channel\n  .please()\n  .poll({ instanceName: '${currentInstance.name}',` +
                        ` name: '${item.name}' });\n\npoll.on('create', function(data) {\n` +
                        `  console.log('poll::create', data)\n});\n\npoll.on('update', function(data) {\n` +
                        `  console.log('poll::update', data)\n});\n\npoll.on('delete', function(data) {\n` +
                        `  console.log('poll::delete', data)\n});`}
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
