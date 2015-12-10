import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './SnippetsActions';
import Store from './SnippetsStore';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container';

// Local components
import SnippetsList from './SnippetsList';
import SnippetDialog from './SnippetDialog';

export default React.createClass({

  displayName: 'Snippets',

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
    console.info('Snippets::componentDidMount');
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showSnippetDialog();
    }
    Actions.fetch();
  },

  showSnippetDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <Container>
        <SnippetDialog />

        <Common.InnerToolbar title="Snippets">
          <Common.Socket
            tooltip="Create a Snippet"
            tooltipPosition="bottom-left"
            onTouchTap={this.showSnippetDialog}/>
        </Common.InnerToolbar>

        <SnippetsList
          name="Snippets"
          items={this.state.items}
          emptyItemHandleClick={this.showSnippetDialog}
          emptyItemContent="Create a Snippet"/>
      </Container>
    );
  }
});
