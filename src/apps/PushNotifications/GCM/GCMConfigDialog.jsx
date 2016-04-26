import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../../mixins';

// Stores and Actions
import Actions from './GCMPushNotificationsActions';
import Store from './GCMConfigDialogStore';

// Components
import {TextField, Styles} from 'syncano-material-ui';
import {Loading} from 'syncano-components';
import {Dialog} from '../../../common';

export default React.createClass({
  displayName: 'GCMConfigDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    return {
      development_api_key: {
        length: {
          maximum: 200
        }
      },
      production_api_key: {
        length: {
          maximum: 200
        }
      }
    };
  },

  componentWillUpdate(nextProps, nextState) {
    if (!this.state._dialogVisible && nextState._dialogVisible) {
      Actions.fetch();
    }
  },

  getStyles() {
    return {
      actionsContainer: {
        padding: 20
      },
      apiKeys: {
        padding: '0 30px'
      },
      GDClink: {
        margin: '80px 0',
        cursor: 'pointer',
        color: Styles.Colors.blue400
      }
    };
  },

  handleAddSubmit() {
    const {production_api_key, development_api_key} = this.state;

    Actions.configGCMPushNotification({production_api_key, development_api_key});
  },

  render() {
    const styles = this.getStyles();

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title="Configure Push Notification Socket - GCM"
        actionsContainerStyle={styles.actionsContainer}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={!this.state.canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              GCM Push Notification Sockets allow for sending messages directly to your users Android devices. Thanks
               to this functionality, your users can be quickly informed about changes taking place within your
               application.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Development and Production API keys">
              Those are your API keys from Google Developer Console. At least one of them is required to send Push
               Notification messages to devices.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/push-notification-sockets-android">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }>
        <div className="row align-center hp-2-l hp-2-r vp-2-t">
          <div dangerouslySetInnerHTML={{__html: require('./phone-android.svg')}}>
          </div>
          <div className="col-flex-1 hm-3-l">
            <Loading show={this.state.isCertLoading}>
              <TextField
                ref="development_api_key"
                name="development_api_key"
                autoFocus={true}
                valueLink={this.linkState('development_api_key')}
                fullWidth={true}
                floatingLabelText="Google Cloud Messaging Development API key"
                errorText={this.getValidationMessages('development_api_key').join(' ')}/>
              <TextField
                ref="production_api_key"
                name="production_api_key"
                valueLink={this.linkState('production_api_key')}
                fullWidth={true}
                floatingLabelText="Google Cloud Messaging Production API key"
                errorText={this.getValidationMessages('production_api_key').join(' ')}/>
            </Loading>
            <div className="vm-4-t">
              You can find this key in
              <a
                style={styles.GDClink}
                href="https://console.developers.google.com"> Google Developer Console</a>
            </div>
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
});
