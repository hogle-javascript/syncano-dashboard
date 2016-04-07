import React from 'react';
import Reflux from 'reflux';
import {RaisedButton} from 'syncano-material-ui';
import {Container, Loading} from 'syncano-components';
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
    const {scripts, templates} = this.state;

    return (
      <div>
        <ScriptDialog/>
        <TemplateDialog/>

        <SnippetsInnerToolbar>
          <RaisedButton
            label="Add a Script"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={ScriptsActions.showDialog} />
          <RaisedButton
            label="Add a Template"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={TemplatesActions.showDialog} />
        </SnippetsInnerToolbar>

        <Container>
          <div style={{clear: 'both', height: '100%'}}>
            <Loading show={scripts.isLoading || templates.isLoading}>
              <ScriptsList
                isLoading={scripts.isLoading}
                items={scripts.items}
                hideDialogs={scripts.hideDialogs} />
              <TemplatesList
                isLoading={templates.isLoading}
                items={templates.items}
                hideDialogs={templates.hideDialogs} />
            </Loading>
          </div>
        </Container>
      </div>
    );
  }
});
