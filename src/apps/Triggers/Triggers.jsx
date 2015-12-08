import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';

import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

import Actions from './TriggersActions';
import Store from './TriggersStore';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';

import TriggersList from './TriggersList';
import TriggerDialog from './TriggerDialog';
import {IconButton} from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container';

export default React.createClass({

  displayName: 'TriggerSockets',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentWillMount() {
    Actions.fetch();
    CodeBoxesActions.fetch();
  },

  checkTrigger(id, state) {
    console.info('Triggers::checkTrigger');
    Actions.checkItem(id, state);
  },

  showTriggerDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <Container>
        <TriggerDialog />

        <Common.InnerToolbar title="Trigger Sockets">
          <IconButton
            iconClassName="synicon-arrow-up-bold"
            tooltip="Click here to create a Trigger"
            onTouchTap={this.showTriggerDialog}/>
        </Common.InnerToolbar>

        <TriggersList
          name="Triggers"
          checkItem={this.checkTrigger}
          isLoading={this.state.isLoading}
          items={this.state.items}
          hideDialogs={this.state.hideDialogs}
          emptyItemHandleClick={this.showTriggerDialog}
          emptyItemContent="Create a Trigger"/>
      </Container>
    );
  }
});
