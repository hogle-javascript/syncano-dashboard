import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';

import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

import Actions from './TriggersActions';
import Store from './TriggersStore';
import SnippetsActions from '../Snippets/SnippetsActions';

import TriggersList from './TriggersList';
import TriggerDialog from './TriggerDialog';
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
    SnippetsActions.fetch();
  },

  showTriggerDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <Container>
        <TriggerDialog />

        <Common.InnerToolbar title="Trigger Sockets">
          <Common.Socket.Trigger
            tooltipPosition="bottom-left"
            onTouchTap={this.showTriggerDialog}/>
        </Common.InnerToolbar>

        <TriggersList
          name="Triggers"
          isLoading={this.state.isLoading}
          items={this.state.items}
          hideDialogs={this.state.hideDialogs}
          emptyItemHandleClick={this.showTriggerDialog}
          emptyItemContent="Create a Trigger"/>
      </Container>
    );
  }
});
