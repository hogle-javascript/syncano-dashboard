import React from 'react';
import Reflux from 'reflux';

import Store from './ClassSummaryDialogStore';
import ClassesStore from './../Classes/ClassesStore';
import SessionStore from '../Session/SessionStore';

import { DialogMixin } from '../../mixins';
import { CodePreview, Dialog, Color } from '../../common/';
import { Card, CardTitle, CardText } from 'material-ui';

export default React.createClass({
  displayName: 'ClassSummaryDialog',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(ClassesStore, 'classes'),
    DialogMixin
  ],

  render() {
    const { classes, open } = this.state;
    const item = ClassesStore.data.items[0];
    const token = SessionStore.getToken();
    const currentInstance = SessionStore.getInstance();
    const showSummaryDialog = (!item || !currentInstance || !token || classes.isLoading);
    const { icon, color } = item ? item.metadata : {};

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="You've just created a Class!"
        titleStyle={{ paddingLeft: 72 }}
        onRequestClose={this.handleCancel}
        loading={classes.isLoading}
        open={open}
      >
        <div style={{ position: 'absolute', top: 0, left: 24 }}>
          <span
            className={`synicon-${icon}`}
            style={{
              backgroundColor: Color.getColorByName(color),
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
                    Class you just created can always be modified later. You can update the schema of the class,
                    the color or icon, or edit the permissions of the class. To do this, open your Dashboard,
                    click on "Classes" in the left sidebar, and click the three dot edit button on the right side
                    of the class row.
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
                        `\\\n-d '{"schema":[{"type":"string","name":"String"},{"type":"array","name":"Array"}]}' \\\n` +
                        `"https://api.syncano.io/v1.1/instances/${currentInstance.name}/classes/${item.name}"/`}
                      />
                      <CodePreview.Item
                        title="Python"
                        languageClassName="python"
                        code={`class_instance = Class.please.get(instance_name='${currentInstance.name}', ` +
                        `name='${item.name}') \n\nclass_instance.schema.add(\n` +
                        `  {"type": "string", "name": "String"},\n  {"type": "array", "name": "Array"}\n)\n` +
                        'class_instance_save()'}
                      />
                      <CodePreview.Item
                        title="JavaScript"
                        languageClassName="javascript"
                        code={'var update = {\n  "schema": [\n    {"type":"string","name":"String"},\n    ' +
                        `{"type":"array","name":"Array"}\n  ]\n};\n\nClass\n  .please()\n  ` +
                        `.update({name: '${item.name}', instanceName: '` +
                        `${currentInstance.name}'}, update)\n  .then(calback);`}
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
