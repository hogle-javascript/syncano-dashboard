import React from 'react';
import Reflux from 'reflux';

import Store from './ScriptEndpointSummaryDialogStore';
import ScriptEndpointsStore from './ScriptEndpointsStore';
import SessionStore from '../Session/SessionStore';

import { DialogMixin } from '../../mixins';
import { CodePreview, Dialog } from '../../common/';
import { Card, CardTitle, CardText, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'ScriptEndpointSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(ScriptEndpointsStore, 'scriptEndpoints'),
    DialogMixin
  ],

  render() {
    const { open, scriptEndpoints } = this.state;
    const item = ScriptEndpointsStore.data.items[0];
    const token = SessionStore.getToken();
    const currentInstance = SessionStore.getInstance();

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="You've just created a Script Endpoint!"
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.handleCancel}
        loading={scriptEndpoints.isLoading}
        open={open}
      >
        <div style={{ position: 'absolute', top: 0, left: 24 }}>
          <span
            className="synicon-socket-script-endpoint"
            style={{
              color: Colors.red400,
              fontSize: 32
            }}
          />
        </div>
        {!item || !currentInstance || !token || scriptEndpoints.isLoading ? null : (
          <div>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
                  <p>
                    Script Endpoint you just created can always be modified later. You can find list of your Script
                    Endpoints, under Sockets tab in our Dashboard. If a Script Endpoint is public, you can see a
                    clip icon in the Public column. You can click it to copy the link.
                  </p>
                </div>
              </div>
            </Dialog.ContentSection>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <Card>
                  <CardTitle title="Preview Data" />
                  <CardText>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        Click the link on the right to open your Script Endpoint in a new browser tab.
                      </div>
                      <div style={{ paddingLeft: 20 }}>
                        <RaisedButton
                          primary={true}
                          label="Open Endpoint in new tab"
                          linkButton={true}
                          target="_blank"
                          href={`
                            ${SYNCANO_BASE_URL.slice(0, -1)}${item.links.self}?api_key=${token}
                          `}
                        />
                      </div>
                    </div>
                  </CardText>
                </Card>
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
                        `${currentInstance.name}/endpoints/scripts/${item.name}"`}
                      />
                      <CodePreview.Item
                        title="Python"
                        languageClassName="python"
                        code={`script_endpoint = ScriptEndpoint.please.get(\n  instance_name='` +
                        `${currentInstance.name}',\n  name='${item.name}'\n)\n\nprint(script_endpoint.script)`}
                      />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={`ScriptEndpoint\n  .please()\n  .get({instanceName: '${currentInstance.name}',` +
                        `name: '${item.name}'})\n  .then(function(scriptEndpoint){});`}
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
