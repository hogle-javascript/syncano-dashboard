import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './DataEndpointsActions';
import Store from './DataEndpointsStore';

// Components
import {RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import DataEndpointsList from './DataEndpointsList';
import DataEndpointDialog from './DataEndpointDialog';

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

  render() {
    const {items, hideDialogs, isLoading} = this.state;

    return (
      <div>
        <DataEndpointDialog/>

        <InnerToolbar title="Data Endpoints">
          <RaisedButton
            style={{marginRight: 0}}
            label="Add"
            primary={true}
            onTouchTap={Actions.showDialog}/>
        </InnerToolbar>

        <Container>
          <DataEndpointsList
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs} />
        </Container>
      </div>
    );
  }
});
