import React from 'react';
import Reflux from 'reflux';
import {State} from 'react-router';

// Stores and Actions
import SessionStore from '../../apps/Session/SessionStore';
import SessionActions from '../../apps/Session/SessionActions';

// Components
import {FlatButton} from 'syncano-material-ui';
import Dialog from './Dialog';

export default React.createClass({
  displayName: 'ProlongDialog',

  mixins: [
    State,
    Reflux.connect(SessionStore)
  ],

  render() {
    let params = this.getParams();
    let dialogStandardActions = [
      <FlatButton
        key="cancel"
        primary={true}
        label="Close"
        onTouchTap={SessionActions.setProlongDialog.bind(null, false)}
        ref="cancel"/>
    ];

    // open={this.state.open}
    return (
      <Dialog
        key='dialog'
        ref='dialog'
        title="Prolong instance lifetime"
        actions={dialogStandardActions}
        open={this.state.isProlongDialogVisible} >
        {`You canceled the archiving of your instance ${params.instanceName}.
        Close this dialog to continue work with your instance.`}
      </Dialog>
    );
  }
});
