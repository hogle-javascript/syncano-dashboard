import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Stores and Actions
import Actions from './CodeBoxesActions';
import Store from './CodeBoxesStore';

// Components
import {Container, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import CodeBoxesList from './CodeBoxesList';
import CodeBoxDialog from './CodeBoxDialog';

export default React.createClass({
  displayName: 'Data',

  mixins: [
    Router.State,
    Router.Navigation,
    Reflux.connect(Store)
  ],

  componentDidMount() {
    console.info('Data::componentDidMount');
    Actions.fetch();
  },

  showCodeBoxDialog() {
    Actions.showDialog();
  },

  render() {
    const {items, hideDialogs, isLoading} = this.state;

    return (
      <div>
        <CodeBoxDialog />

        <InnerToolbar title="Script Sockets">
          <Socket.CodeBox
            tooltipPosition="bottom-left"
            onTouchTap={this.showCodeBoxDialog}/>
        </InnerToolbar>

        <Container>
          <CodeBoxesList
            name="Script Sockets"
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs}
            emptyItemHandleClick={this.showCodeBoxDialog}
            emptyItemContent="Create a Script Socket"/>
        </Container>
      </div>
    );
  }
});
