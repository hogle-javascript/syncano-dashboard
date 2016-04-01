import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './DataEndpointsActions';
import Store from './DataEndpointsStore';

// Components
import {RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';

// Local components
import SocketsInnerToolbar from '../Sockets/SocketsInnerToolbar';
import DataEndpointsList from './DataEndpointsList';
import DataEndpointDialog from './DataEndpointDialog';

export default React.createClass({
  displayName: 'Data',

  mixins: [
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

        <SocketsInnerToolbar>
          <RaisedButton
            style={{marginRight: 0}}
            label="Add"
            primary={true}
            onTouchTap={Actions.showDialog}/>
        </SocketsInnerToolbar>

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
