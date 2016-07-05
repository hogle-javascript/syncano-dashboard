import React from 'react';
import Reflux from 'reflux';

import Store from './ScheduleSummaryDialogStore';
import SchedulesStore from './SchedulesStore';
import SessionStore from '../Session/SessionStore';

import { DialogMixin } from '../../mixins';
import { CodePreview, Dialog, Loading } from '../../common/';
import { Card, CardTitle, CardText } from 'material-ui';
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
    const showSummaryDialog = (!item || !currentInstance || !token || Schedules.isLoading);

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={!showSummaryDialog ? "You've just created a Schedule!" : ''}
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.handleCancel}
        loading={Schedules.isLoading}
        open={open}
      >
        {!showSummaryDialog && (
          <div style={{ position: 'absolute', top: 0, left: 24 }}>
            <span
              className="synicon-socket-schedule"
              style={{ color: Colors.lime400, fontSize: 32 }}
            />
          </div>
        )}
        {showSummaryDialog ? <Loading show={true} /> : (
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
                  <CardTitle title="Use in your App" />
                  <CardText>
                    <p>Choose your favorite language below and copy the code.</p>
                    <CodePreview>
                      <CodePreview.Item
                        title="cURL"
                        languageClassName="markup"
                        code={`curl -X GET\n-H "X-API-KEY: ${token}"\n"${SYNCANO_BASE_URL}v1.1/instances/` +
                        `${currentInstance.name}/schedules/${item.id}"`}
                      />
                      <CodePreview.Item
                        title="Python"
                        languageClassName="python"
                        code={`import syncano\nfrom syncano.models import Schedule\n\nsyncano.connect(api_key=` +
                        `'${token}')\n\nschedule = Schedule.please.get(instance_name='${currentInstance.name}',` +
                        `id='${item.id}')\nprint(schedule.label)`}
                      />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={`var Syncano = require('syncano');\nvar connection = Syncano({accountKey: ` +
                        `'${token}'});\nvar Schedule = connection.Schedule;\n\n` +
                        `Schedule\n  .please()\n  .get({instanceName: '${currentInstance.name}',` +
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
