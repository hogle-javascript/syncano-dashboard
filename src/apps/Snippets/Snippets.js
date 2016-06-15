import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import { RaisedButton } from 'material-ui';
import { Container, Loading } from '../../common/';

import SnippetsInnerToolbar from './SnippetsInnerToolbar';
import ScriptsActions from '../Scripts/ScriptsActions';
import ScriptsStore from '../Scripts/ScriptsStore';
import ScriptDialog from '../Scripts/ScriptDialog';
import ScriptsList from '../Scripts/ScriptsList';
import TemplatesActions from '../Templates/TemplatesActions';
import TemplatesStore from '../Templates/TemplatesStore';
import TemplateDialog from '../Templates/TemplateDialog';
import TemplatesList from '../Templates/TemplatesList';

export default React.createClass({
  displayName: 'Snippets',

  mixins: [
    Reflux.connect(ScriptsStore, 'scripts'),
    Reflux.connect(TemplatesStore, 'templates')
  ],

  componentDidMount() {
    console.info('Snippets::componentDidMount');
    ScriptsActions.fetch();
    TemplatesActions.fetch();
  },

  render() {
    const { scripts, templates } = this.state;

    return (
      <div>
        <Helmet title="Snippets" />
        <ScriptDialog />
        <TemplateDialog />

        <SnippetsInnerToolbar>
          <RaisedButton
            label="Add a Script"
            primary
            style={{ marginRight: 0 }}
            onTouchTap={ScriptsActions.showDialog}
          />
          <RaisedButton
            label="Add a Template"
            primary
            style={{ marginRight: 0 }}
            onTouchTap={TemplatesActions.showDialog}
          />
        </SnippetsInnerToolbar>

        <Container>
          <div style={{ clear: 'both', height: '100%' }}>
            <Loading show={scripts.isLoading || templates.isLoading}>
              <ScriptsList
                isLoading={scripts.isLoading}
                items={scripts.items}
                hideDialogs={scripts.hideDialogs}
              />
              <TemplatesList
                isLoading={templates.isLoading}
                items={templates.items}
                hideDialogs={templates.hideDialogs}
              />
            </Loading>
          </div>
        </Container>
      </div>
    );
  }
});
