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
import {Container, InnerToolbar, Socket} from '../../common';

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
      <div>
        <SnippetDialog />

        <InnerToolbar title="Snippets">
          <Socket
            tooltip="Create a Snippet"
            tooltipPosition="bottom-left"
            onTouchTap={this.showSnippetDialog}/>
        </InnerToolbar>

        <Container>
          <SnippetsList
            name="Snippets"
            items={this.state.items}
            emptyItemHandleClick={this.showSnippetDialog}
            emptyItemContent="Create a Snippet"/>
        </Container>
      </div>
    );
  }
});