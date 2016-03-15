import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './DataEndpointsActions';
import Store from './DataEndpointsStore';

// Components
import {Container, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import DataList from './DataEndpointsList';
import DataDialog from './DataEndpointDialog';

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

  showDataEndpointDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <div>
        <DataDialog/>

        <InnerToolbar title="Data Endpoints">
          <Socket.Data
            tooltipPosition="bottom-left"
            onClick={this.showDataEndpointDialog}/>
        </InnerToolbar>

        <Container>
          <DataList
            name="Data Endpoints"
            isLoading={this.state.isLoading}
            items={this.state.items}
            hideDialogs={this.state.hideDialogs}
            emptyItemHandleClick={this.showDataEndpointDialog}
            emptyItemContent="Create a Data Endpoint"/>
        </Container>
      </div>
    );
  }
});
