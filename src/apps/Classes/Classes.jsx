import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './ClassesActions';
import Store from './ClassesStore';

// Components
import {IconButton} from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container';

// Local components
import ClassesList from './ClassesList';

export default React.createClass({

  displayName: 'Classes',

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
    console.info('Classes::componentDidMount');
    Actions.fetch();
  },

  redirectToAddClassView() {
    this.transitionTo('classes-add', this.getParams());
  },

  render() {
    return (
      <Container>
        <Common.InnerToolbar title="Classes">
          <IconButton
            iconClassName="synicon-plus"
            tooltip="Click here to add a Class"
            onTouchTap={this.redirectToAddClassView}/>
        </Common.InnerToolbar>

        <ClassesList
          name="Classes"
          items={this.state.items}
          triggers={this.state.triggers}
          hideDialogs={this.state.hideDialogs}
          emptyItemHandleClick={this.redirectToAddClassView}
          emptyItemContent="Create a Class"/>
      </Container>
    );
  }
});
