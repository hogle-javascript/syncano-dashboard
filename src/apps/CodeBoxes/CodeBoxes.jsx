import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import {InstanceTabsMixin} from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

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
    Reflux.connect(Store),
    InstanceTabsMixin,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Data::componentDidMount');
    this.fetch();
  },

  showCodeBoxDialog() {
    Actions.showDialog();
  },

  fetch() {
    Actions.fetch();
  },

  render() {
    return (
      <div>
        <CodeBoxDialog />

        <InnerToolbar title="CodeBox Sockets">
          <Socket.CodeBox
            tooltipPosition="bottom-left"
            onTouchTap={this.showCodeBoxDialog}/>
        </InnerToolbar>

        <Container>
          <CodeBoxesList
            name="CodeBox Sockets"
            isLoading={this.state.isLoading}
            items={this.state.items}
            hideDialogs={this.state.hideDialogs}
            emptyItemHandleClick={this.showCodeBoxDialog}
            emptyItemContent="Create a CodeBox Socket"/>
        </Container>
      </div>
    );
  }
});
