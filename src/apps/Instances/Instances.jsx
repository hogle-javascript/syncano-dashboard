import React from 'react';
import Reflux from 'reflux';
import {withRouter} from 'react-router';
import Helmet from 'react-helmet';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import Actions from './InstancesActions';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';

// Components
import {RaisedButton} from 'material-ui';
import {Container, Show, InnerToolbar} from '../../common/';

import InstancesList from './InstancesList';
import SharedInstancesList from './SharedInstancesList';
import InstanceDialog from './InstanceDialog';
// import WelcomeDialog from './WelcomeDialog';

import './Instances.sass';

const Instances = React.createClass({
  displayName: 'Instances',

  mixins: [Reflux.connect(Store)],

  componentDidMount() {
    console.info('Instances::componentDidMount');
    Actions.fetch();
  },

  showInstanceDialog() {
    InstanceDialogActions.showDialog();
  },

  transitionToFirstInstance() {
    const {router} = this.props;
    const {myInstances} = this.state;
    const firstInstance = myInstances.length ? myInstances[0].name : null;

    if (firstInstance) {
      router.push({name: 'instance', instanceName: firstInstance});
    }

    SessionStore.hideWelcomeDialog();
  },

  render() {
    const {blocked, isLoading, hideDialogs, myInstances, sharedInstances} = this.state;
    const title = 'Instances';

    if (blocked) {
      return (
        <div className="row vp-5-t">
          <Helmet title="Account blocked"/>
          <Container.Empty
            icon='synicon-block-helper'
            text={blocked}/>
        </div>
      );
    }

    return (
      <div>
        <Helmet title={title}/>
        <InstanceDialog />

        <InnerToolbar title={title}>
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={InstanceDialogActions.showDialog} />
        </InnerToolbar>

        <Container id="instances">
          <InstancesList
            ref="myInstancesList"
            name="My instances"
            items={myInstances}
            isLoading={isLoading}
            hideDialogs={hideDialogs}
            emptyItemHandleClick={this.showInstanceDialog}
            emptyItemContent="Create an instance" />

          <Show if={sharedInstances.length && !isLoading}>
            <SharedInstancesList
              ref="otherInstancesList"
              items={sharedInstances}
              hideDialogs={hideDialogs}
              isLoading={isLoading}/>
          </Show>
        </Container>
      </div>
    );
  }
});

export default withRouter(Instances);
