import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ScriptEndpointsActions';
import ScriptsActions from '../Scripts/ScriptsActions';
import Store from './ScriptEndpointsStore';

// Components
import {RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';

// Local components
import SocketsInnerToolbar from '../Sockets/SocketsInnerToolbar';
import ScriptEndpointsList from './ScriptEndpointsList';
import ScriptEndpointDialog from './ScriptEndpointDialog';

export default React.createClass({
  displayName: 'ScriptEndpoints',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Data::componentDidMount');
    Actions.fetch();
    ScriptsActions.fetch();
  },

  render() {
    const {items, hideDialogs, isLoading} = this.state;

    return (
      <div>
        <Helmet title="Script Endpoints" />
        <ScriptEndpointDialog />

        <SocketsInnerToolbar>
          <RaisedButton
            label="Add"
            style={{marginRight: 0}}
            primary={true}
            onTouchTap={Actions.showDialog}/>
        </SocketsInnerToolbar>

        <Container>
          <ScriptEndpointsList
            isLoading={isLoading}
            items={items}
            hideDialogs={hideDialogs} />
        </Container>
      </div>
    );
  }
});
