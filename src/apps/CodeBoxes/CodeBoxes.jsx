import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './CodeBoxesActions';
import Store from './CodeBoxesStore';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container';

// Local components
import CodeBoxesList from './CodeBoxesList';
import CodeBoxDialog from './CodeBoxDialog';

export default React.createClass({

  displayName: 'CodeBoxes',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('CodeBoxes::componentDidMount');
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showCodeBoxDialog();
    }
    Actions.fetch();
  },

  showCodeBoxDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <Container>
        <CodeBoxDialog />

        <Common.InnerToolbar title="Snippets">
          <Common.Socket.Webhook
            tooltipPosition="bottom-left"
            onTouchTap={this.showCodeBoxDialog}/>
        </Common.InnerToolbar>

        <CodeBoxesList
          name="Snippets"
          items={this.state.items}
          emptyItemHandleClick={this.showCodeBoxDialog}
          emptyItemContent="Create a CodeBox"/>
      </Container>
    );
  }
});
