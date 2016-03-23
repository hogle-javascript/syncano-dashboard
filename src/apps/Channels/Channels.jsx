import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ChannelsActions';
import Store from './ChannelsStore';

// Components
import {RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';
import {InnerToolbar, SocketsDropdown} from '../../common';

// Local components
import ChannelsList from './ChannelsList';
import ChannelDialog from './ChannelDialog';

export default React.createClass({
  displayName: 'Channels',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Channels::componentDidMount');
    Actions.fetch();
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showChannelDialog();
    }
    Actions.fetch();
  },

  render() {
    const {isLoading, items, hideDialogs} = this.state;

    return (
      <div>
        <ChannelDialog />

        <InnerToolbar menu={<SocketsDropdown/>}>
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={Actions.showDialog} />
        </InnerToolbar>

        <Container>
          <ChannelsList
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs} />
        </Container>
      </div>
    );
  }
});
