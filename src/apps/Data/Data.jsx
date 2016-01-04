import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './DataViewsActions';
import Store from './DataViewsStore';

// Components
import {Container, InnerToolbar, Socket} from '../../common';

// Local components
import DataList from './DataViewsList';
import DataDialog from './DataViewDialog';

export default React.createClass({

  displayName: 'Data',

  mixins: [
    State,
    Navigation,
    Reflux.connect(Store),
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
