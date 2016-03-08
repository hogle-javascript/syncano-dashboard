import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ClassesActions';
import Store from './ClassesStore';

// Components
import {Container, Socket} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import ClassDialog from './ClassDialog';
import ClassesList from './ClassesList';

export default React.createClass({
  displayName: 'Classes',

  mixins: [
    State,
    Navigation,
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Classes::componentDidMount');
    Actions.fetch();
  },

  showClassDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <div>
        <ClassDialog/>

        <InnerToolbar title="Classes">
          <Socket
            tooltip="Create a Class"
            onTouchTap={this.showClassDialog}/>
        </InnerToolbar>

        <Container>
          <ClassesList
            name="Classes"
            items={this.state.items}
            triggers={this.state.triggers}
            hideDialogs={this.state.hideDialogs}
            emptyItemHandleClick={this.showClassDialog}
            emptyItemContent="Create a Class"/>
        </Container>
      </div>
    );
  }
});
