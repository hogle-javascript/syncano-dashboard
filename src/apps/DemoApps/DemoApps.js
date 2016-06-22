import React from 'react';
import Reflux from 'reflux';

import { DialogsMixin } from '../../mixins';

import Actions from './DemoAppsActions';
import Store from './DemoAppsStore';
import SessionStore from '../Session/SessionStore';

import DemoAppsList from './DemoAppsList';
import { Dialog } from '../../common';

export default React.createClass({
  displayName: 'DemoApps',

  mixins: [
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    Actions.fetch();
  },

  getStyles() {
    return {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      title: {
        marginTop: 20,
        fontWeight: 500,
        fontSize: 32
      }
    };
  },

  initDialogs() {
    const { clickedAppName, isLoading } = this.state;
    const email = SessionStore.getUser() ? SessionStore.getUser().email : null;
    const params = {
      email,
      accountKey: Store.getKey(),
      instanceName: clickedAppName
    };

    return [{
      dialog: Dialog.FullPage,
      params: {
        key: 'installDemoAppDialog',
        ref: 'installDemoAppDialog',
        contentSize: 'small',
        title: `Install ${clickedAppName} Demo App`,
        onRequestClose: () => this.handleCancel('installDemoAppDialog'),
        isLoading,
        actions: (
          <Dialog.StandardButtons
            disabled={isLoading}
            handleCancel={() => this.handleCancel('installDemoAppDialog')}
            handleConfirm={() => Actions.installDemoApp(params)}
          />
        ),
        children: (
          <div>
            This action will install Demo App {clickedAppName}. You will be redirected to new Instance.
          </div>
        )
      }
    }];
  },

  render() {
    const { isLoading, items } = this.state;
    const styles = this.getStyles();

    return (
      <div
        style={styles.container}
        className="vm-3-t align-center"
      >
        {this.getDialogs()}
        <div style={styles.title}>
          Syncano DEMO Apps
        </div>
        <DemoAppsList
          handleClickInstall={() => this.showDialog('installDemoAppDialog')}
          isLoading={isLoading}
          items={items}
        />
      </div>
    );
  }
});
