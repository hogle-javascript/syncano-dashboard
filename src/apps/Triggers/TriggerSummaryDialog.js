import React from 'react';
import Reflux from 'reflux';

import Store from './TriggerSummaryDialogStore';
import TriggersStore from './TriggersStore';
import SessionStore from '../Session/SessionStore';

import { DialogMixin } from '../../mixins';
import { CodePreview, Dialog } from '../../common/';
import { Card, CardTitle, CardText, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'TriggerSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(TriggersStore, 'dataEndpoints'),
    DialogMixin
  ],

  render() {
    const { open, dataEndpoints } = this.state;
    const item = TriggersStore.data.items[0];
    const token = SessionStore.getToken();
    const currentInstance = SessionStore.getInstance();

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="You've just created a Trigger!"
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.handleCancel}
        loading={dataEndpoints.isLoading}
        open={open}
      >
        <div style={{ position: 'absolute', top: 0, left: 24 }}>
          <span
            className="synicon-socket-trigger"
            style={{
              color: Colors.amber300,
              fontSize: 32
            }}
          />
        </div>
        {!item || !currentInstance || !token || dataEndpoints.isLoading ? null : (
          <div>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
                  <p>
                    Trigger you just created can always be modified later. Trigger Sockets execute a Script when a
                    Data Object inside selected Class is created, updated or deleted (depends on "signal" field value).
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
                        Click the link on the right to open your Trigger in a new browser tab.
                      </div>
                      <div style={{ paddingLeft: 20 }}>
                        <RaisedButton
                          primary={true}
                          label="Open Trigger in new tab"
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
