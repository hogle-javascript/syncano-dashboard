import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ScriptsActions';
import Store from './ScriptsStore';

// Components
import RaisedButton from 'syncano-material-ui';
import {Container} from 'syncano-components';
import {InnerToolbar} from '../../common';

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
        <ScriptDialog />

        <InnerToolbar title="Scripts">
          <RaisedButton
            label="Create"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={Actions.showDialog} />
        </InnerToolbar>

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
