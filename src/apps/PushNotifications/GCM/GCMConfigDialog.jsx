import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../../mixins';

// Stores and Actions
import Actions from './GCMPushNotificationsActions';
import Store from './GCMConfigDialogStore';

// Components
import {FlatButton, RaisedButton, TextField, Styles} from 'syncano-material-ui';
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
        presence: true
      }
    };
  },

  componentWillMount() {
    Actions.fetch();
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
    let params = {
      production_api_key: this.state.production_api_key,
      development_api_key: this.state.development_api_key
    };

    Actions.configGCMPushNotification(params);
  },

  render() {
    let styles = this.getStyles();
    let dialogStandardActions = [
      <FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <RaisedButton
        key="confirm"
        type="submit"
        label="Confirm"
        secondary={true}
        onTouchTap={this.handleFormValidation}/>
    ];

    return (
      <Dialog
        key='dialog'
        ref='dialog'
        title="Configure Push Notification Socket - GCM"
        actions={dialogStandardActions}
        actionsContainerStyle={styles.actionsContainer}
        onRequestClose={this.handleCancel}
        open={this.state.open}>
        <div className="row align-center hp-2-l hp-2-r">
          <div dangerouslySetInnerHTML={{__html: require('../../../assets/img/phone-android.svg')}}>
          </div>
          <div className="col-flex-1 hm-3-l">
            <TextField
              ref="development_api_key"
              name="development_api_key"
              disabled={this.hasEditMode()}
              valueLink={this.linkState('development_api_key')}
              fullWidth={true}
              floatingLabelText="Google Cloud Messaging Development API key"
              errorText={this.getValidationMessages('development_api_key').join(' ')}/>
            <TextField
              ref="production_api_key"
              name="production_api_key"
              disabled={this.hasEditMode()}
              valueLink={this.linkState('production_api_key')}
              fullWidth={true}
              floatingLabelText="Google Cloud Messaging Production API key"
              errorText={this.getValidationMessages('production_api_key').join(' ')}/>
            <div className="vm-4-t">
              You can find this key in
              <a
                style={styles.GDClink}
                href="https://console.developers.google.com"> Google Developer Console</a>
            </div>
          </div>
        </div>
        <Loading
          type='linear'
          position='bottom'
          show={this.state.isLoading}/>
      </Dialog>
    );
  }
});
