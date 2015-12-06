import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './CodeBoxesActions';
import Store from './CodeBoxesStore';

// Components
import {IconButton, Styles} from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import CodeBoxesList from './CodeBoxesList.react';
import CodeBoxDialog from './CodeBoxDialog.react';

export default React.createClass({

  displayName: 'CodeBoxes',

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
    console.info('CodeBoxes::componentDidMount');
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showCodeBoxDialog();
    }
    Actions.fetch();
  },

  showCodeBoxDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <Container>
        <CodeBoxDialog />

        <Common.InnerToolbar title="Snippets">
          <IconButton
            iconClassName="synicon-socket-codebox"
            iconStyle={{color: Styles.Colors.red300, fontSize: 35}}
            tooltip="Click here to add CodeBox"
            onTouchTap={this.showCodeBoxDialog}/>
        </Common.InnerToolbar>

        <CodeBoxesList
          name="Snippets"
          items={this.state.items}
          emptyItemHandleClick={this.showCodeBoxDialog}
          emptyItemContent="Create a CodeBox"/>
      </Container>
    );
  }
});
