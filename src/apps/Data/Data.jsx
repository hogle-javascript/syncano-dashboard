import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './DataViewsActions';
import Store from './DataViewsStore';

// Components
import {Container, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import DataList from './DataViewsList';
import DataDialog from './DataViewDialog';

export default React.createClass({
  displayName: 'Data',

  mixins: [
    State,
    Navigation,
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Data::componentDidMount');
    Actions.fetch();
  },

  showDataViewDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <div>
        <DataDialog/>

        <InnerToolbar title="Data Sockets">
          <Socket.Data
            tooltipPosition="bottom-left"
            onClick={this.showDataViewDialog}/>
        </InnerToolbar>

        <Container>
          <DataList
            name="Data Sockets"
            isLoading={this.state.isLoading}
            items={this.state.items}
            hideDialogs={this.state.hideDialogs}
            emptyItemHandleClick={this.showDataViewDialog}
            emptyItemContent="Create a Data Socket"/>
        </Container>
      </div>
    );
  }
});
