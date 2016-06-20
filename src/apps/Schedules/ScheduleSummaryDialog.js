import React from 'react';
import Reflux from 'reflux';

import Store from './ScheduleSummaryDialogStore';
import SchedulesStore from './SchedulesStore';
import SessionStore from '../Session/SessionStore';

import { DialogMixin } from '../../mixins';
import { CodePreview, Dialog } from '../../common/';
import { Card, CardTitle, CardText, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

export default React.createClass({
  displayName: 'ScheduleSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(SchedulesStore, 'Schedules'),
    DialogMixin
  ],

  render() {
    const { open, Schedules } = this.state;
    const item = SchedulesStore.data.items[0];
    const token = SessionStore.getToken();
    const currentInstance = SessionStore.getInstance();

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="You've just created a Schedule!"
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.handleCancel}
        loading={Schedules.isLoading}
        open={open}
      >
        <div style={{ position: 'absolute', top: 0, left: 24 }}>
          <span
            className="synicon-socket-schedule"
            style={{ color: Colors.lime400, fontSize: 32 }}
          />
        </div>
        {!item || !currentInstance || !token || Schedules.isLoading ? null : (
          <div>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <div style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)' }}>
                  <p>
                    Schedule you just created can always be modified later. You can change which Script should be
                    run and the time when it will be execute. You can also set timezone based on your needs.
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
                        Click the link on the right to open your Schedule in a new browser tab.
                      </div>
                      <div style={{ paddingLeft: 20 }}>
                        <RaisedButton
                          primary={true}
                          label="Open Schedule in new tab"
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
                        `${currentInstance.name}/schedules/${item.id}"`}
                      />
                      <CodePreview.Item
                        title="Python"
                        languageClassName="python"
                        code={`schedule = Schedule.please.get(instance_name='${currentInstance.name}',` +
                        `id='${item.id}')\nprint(schedule.label)`}
                      />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={`Schedule\n  .please()\n  .get({instanceName: '${currentInstance.name}',` +
                        `id: '${item.id}'})\n  .then(function(schedules) {});`}
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
