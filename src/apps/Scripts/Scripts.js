import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';
import Helmet from 'react-helmet';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ScriptsActions';
import Store from './ScriptsStore';

// Components
import {RaisedButton} from 'syncano-material-ui';
import {Container} from '../../common/';
import SnippetsInnerToolbar from '../Snippets/SnippetsInnerToolbar';

// Local components
import ScriptsList from './ScriptsList';
import ScriptDialog from './ScriptDialog';

export default React.createClass({
  displayName: 'Scripts',

  mixins: [
    State,
    Navigation,
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Scripts::componentDidMount');
    if (this.getParams().action === 'add') {
      Actions.showDialog();
    }
    Actions.fetch();
  },

  render() {
    const {items, hideDialogs, isLoading} = this.state;

    return (
      <div>
        <Helmet title="Scripts" />
        <ScriptDialog />

        <SnippetsInnerToolbar>
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={Actions.showDialog} />
        </SnippetsInnerToolbar>

        <Container>
          <ScriptsList
            items={items}
            hideDialogs={hideDialogs}
            isLoading={isLoading} />
        </Container>
      </div>
    );
  }
});
