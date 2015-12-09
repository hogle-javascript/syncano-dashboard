import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';
import MUI from 'syncano-material-ui';

// Stores and Actions
import Actions from './DataViewsActions';
import Store from './DataViewsStore';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container';

// Local components
import DataList from './DataViewsList';
import DataDialog from './DataViewDialog';

export default Radium(React.createClass({

  displayName: 'Data',

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
    console.info('Data::componentDidMount');
    Actions.fetch();
  },

  uncheckAll() {
    console.info('Data::uncheckAll');
    Actions.uncheckAll();
  },

  showDataViewDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <Container>
        <DataDialog/>

        <Common.InnerToolbar title="Sockets">
          <MUI.IconButton
            iconClassName="synicon-socket-data"
            tooltip="Create Data Socket"
            onClick={Actions.showDialog}/>
        </Common.InnerToolbar>

        <DataList
          name="Data Socket"
          isLoading={this.state.isLoading}
          items={this.state.items}
          hideDialogs={this.state.hideDialogs}
          emptyItemHandleClick={this.showDataViewDialog}
          emptyItemContent="Create a Data Socket"/>
      </Container>
    );
  }
}));
