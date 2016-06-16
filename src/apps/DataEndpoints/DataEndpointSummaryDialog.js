/* eslint-disable */
import React from 'react';
import {Link} from 'react-router';
import Reflux from 'reflux';

import Store from './DataEndpointSummaryDialogStore';
import DataEndpointsStore from './DataEndpointsStore';
import SessionStore from '../Session/SessionStore';

import {DialogMixin} from '../../mixins';
import {CodePreview, Dialog, Notification} from '../../common/';
import {Card, CardTitle, CardText, RaisedButton} from 'material-ui';
import {colors as Colors} from 'material-ui/styles/'

export default React.createClass({
  displayName: 'DataEndpointSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },  

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(DataEndpointsStore, 'dataEndpoints'),
    DialogMixin
  ],

  render() {
    const {params} = this.context;
    const {open, dataEndpoints} = this.state;
    const item = DataEndpointsStore.data.items[0];
    const token = SessionStore.getToken();
    const currentInstance = SessionStore.getInstance();

    console.log(token);
    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="You've just created a Data Endpoint!"
        titleStyle={{paddingLeft: 72}}
        onRequestClose={this.handleCancel}
        loading={dataEndpoints.isLoading}
        open={open}>
        <div style={{position: 'absolute', top: 0, left: 24}}>
          <span
            className="synicon-socket-data"
            style={{
              color: Colors.green400,
              fontSize: 32
            }} />
        </div>
        {!item || !currentInstance || !token || dataEndpoints.isLoading ? null : (
          <div>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <div style={{fontSize: 16, lineHeight: 1.6, color: 'rgba(68,68,68, .8)'}}>
                  <p>
                    Data Endpoint you just created can always be modified later. You can change which Data Object fields
                    should be hidden, which should stay visible and which reference fields to expand. You
                    can also apply search queries on top of filtering.
                  </p>
                </div>
              </div>
            </Dialog.ContentSection>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <Notification>
                  You have chosen the "{item.class}" Class but it doesn't contain any custom fields in the Class
                  schema. To use the full power of Data Endpoints, we suggest
                  <Link
                    to={{
                      name: 'classEdit',
                      params: {...params, className: item.class, action: 'edit'}
                    }}
                    style={{fontWeight: 700}}>
                    {` clicking here to add custom fields for your Data Objects.`}
                  </Link>
                </Notification>
              </div>
            </Dialog.ContentSection>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <Card>
                  <CardTitle title="Preview Data" />
                  <CardText>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <div style={{flex: 1}}>
                        Click the link on the right to open your Endpoint in a new browser tab.
                      </div>
                      <div style={{paddingLeft: 20}}>
                        <RaisedButton
                          primary={true}
                          label="Open Endpoint in new tab"
                          linkButton={true}
                          target="_blank"
                          href={`
                            ${SYNCANO_BASE_URL.slice(0, -1)}${item.links.get}?api_key=${token}
                          `} />
                      </div>
                    </div>
                  </CardText>
                </Card>
              </div>
            </Dialog.ContentSection>
            <Dialog.ContentSection>
              <div className="col-flex-1">
                <Card>
                  <CardTitle title="Use in your App"/>
                  <CardText>
                    <p>Choose your favorite language below and copy the code.</p>
                    <CodePreview>
                      <CodePreview.Item
                        title="cURL"
                        languageClassName="markup"
                        code={`curl -X GET\n-H "X-API-KEY: ${token}"\n"https://api.syncano.io/v1.1/instances/${currentInstance.name}/endpoints/data/${item.name}/get/"`} />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={`DataEndpoint\n  .please()\n  .fetchData({name: '${item.name}', instanceName: '${currentInstance.name}'})\n  .then(function(dataObjects) {});`} />
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
