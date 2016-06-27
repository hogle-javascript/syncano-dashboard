import React from 'react';
import Reflux from 'reflux';

import Store from './ScriptSummaryDialogStore';
import ScriptsStore from './ScriptsStore';
import SessionStore from '../Session/SessionStore';

import { DialogMixin } from '../../mixins';
import { CodePreview, Dialog } from '../../common/';
import { Card, CardTitle, CardText } from 'material-ui';

export default React.createClass({
  displayName: 'ScriptSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(ScriptsStore, 'Scripts'),
    DialogMixin
  ],

  hideDialog() {
    this.dismiss();
    this.resetDialogState();
    const params = {
      ...SessionStore.getParams(),
      scriptId: ScriptsStore.data.items[0].id
    };
    SessionStore.getRouter().push({ name: 'script', params });
  },

  render() {
    const { open, Scripts } = this.state;
    const item = ScriptsStore.data.items[0];
    const token = SessionStore.getToken();
    const currentInstance = SessionStore.getInstance();
    const showSummaryDialog = (!item || !currentInstance || !token || Scripts.isLoading);
    const runtime = item ? ScriptsStore.getRuntimeColorIcon(item.runtime_name) : {};

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="You've just created a Script!"
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.hideDialog}
        loading={Scripts.isLoading}
        open={open}
      >
        <div style={{ position: 'absolute', top: 0, left: 24 }}>
          <span
            className={`synicon-${runtime.icon}`}
            style={{
              backgroundColor: runtime.color,
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
                    Script is a piece of code that can be run in the cloud. Technology used for the environments
                    created during the code execution is powered by Docker. Scripts can be run directly, by Triggers,
                    Schedules and Script Endpoint Sockets.
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
                        code={`curl -X POST \\\n-H "X-API-KEY: ${token}" \\\n-H "Content-Type: application/json" \\\n` +
                        `-d '{"payload":{"KEY":"VALUE"}}' \\\n"https://api.syncano.io/v1.1/instances/` +
                        `${currentInstance.name}/snippets/scripts/${item.id}/run/"`}
                      />
                      <CodePreview.Item
                        title="Python"
                        languageClassName="python"
                        code={`trace = Script.please.run(\n  instance_name="${currentInstance.name}",\n` +
                        `  id="${item.id}",\n  payload={'KEY': 'VALUE'}\n)`}
                      />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={`var payload = {"payload": {"KEY":"VALUE"}};\n\nScript\n  .please()\n  ` +
                        `.run({instanceName: '${currentInstance.name}', id: ${item.id}}, payload)\n` +
                        '  .then(calback);'}
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
