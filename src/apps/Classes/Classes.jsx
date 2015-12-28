import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './ClassesActions';
import Store from './ClassesStore';

// Components
import {InnerToolbar, Socket, Container} from '../../common';

// Local components
import ClassesList from './ClassesList';

export default React.createClass({

  displayName: 'Classes',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store),
    Mixins.Dialog,
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Classes::componentDidMount');
    Actions.fetch();
  },

  redirectToAddClassView() {
    this.transitionTo('classes-add', this.getParams());
  },

  render() {
    return (
      <div>
        <InnerToolbar title="Classes">
          <Socket
            tooltip="Create a Class"
            onTouchTap={this.redirectToAddClassView}/>
        </InnerToolbar>

        <Container>
          <ClassesList
            name="Classes"
            items={this.state.items}
            triggers={this.state.triggers}
            hideDialogs={this.state.hideDialogs}
            emptyItemHandleClick={this.redirectToAddClassView}
            emptyItemContent="Create a Class"/>
        </Container>
      </div>
    );
  }
});
