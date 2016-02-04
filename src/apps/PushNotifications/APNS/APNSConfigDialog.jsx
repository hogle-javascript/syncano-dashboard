import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import Dropzone from 'react-dropzone';

// Utils
import {DialogMixin, FormMixin} from '../../../mixins';

// Stores and Actions
import Actions from './APNSPushNotificationsActions';
import Store from './APNSConfigDialogStore';

// Components
import {FlatButton, RaisedButton, FontIcon, Styles} from 'syncano-material-ui';
import {Loading} from 'syncano-components';
import {Dialog} from '../../../common';

export default Radium(React.createClass({
  displayName: 'APNSConfigDialog',

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
      apiKeys: {
        paddingLeft: 30
      },
      GDClink: {
        margin: '80px 0',
        cursor: 'pointer',
        color: Styles.Colors.blue400
      },
      actionsContainer: {
        padding: 20
      },
      dropZone: {
        display: 'webkit-flex; display: flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: '100%',
        borderStyle: 'dashed',
        borderWidth: 1,
        opacity: '0.4',
        borderColor: Styles.Colors.grey500,
        backgroundColor: Styles.Colors.grey200,
        color: Styles.Colors.grey500,
        ':hover': {
          opacity: '1',
          borderColor: Styles.Colors.blue500,
          backgroundColor: Styles.Colors.blue200,
          color: Styles.Colors.blue500
        }
      },
      uploadButton: {
        marginBottom: 20,
        fontWeight: 600,
        width: '50%',
        color: Styles.Colors.grey500
      },
      uploadButtonIcon: {
        color: Styles.Colors.grey500,
        fontSize: 18,
        paddingRight: 8
      },
      dropZoneDescription: {
        lineHeight: '24px',
        maxWidth: 150,
        textAlign: 'center',
        fontSize: '24px'
      },
      uploadIcon: {
        color: Styles.Colors.grey500,
        fontSize: '70px'
      }
    };
  },

  onDrop(fieldName, files) {
    let state = {};

    state[fieldName] = files[0];
    this.setState(state);
  },

  handleAddSubmit() {
    let params = {
      development_certificate: this.state.development_certificate,
      development_certificate_name: this.state.development_certificate_name,
      development_expiration_date: this.state.development_expiration_date,
      development_bundle_identifier: this.state.development_bundle_identifier,
      production_certificate: this.state.production_certificate,
      production_certificate_name: this.state.production_certificate_name,
      production_expiration_date: this.state.production_expiration_date,
      production_bundle_identifier: this.state.production_bundle_identifier
    };

    Actions.configAPNSPushNotification(params);
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
        title="Configure Push Notification Socket - APNS"
        actions={dialogStandardActions}
        actionsContainerStyle={styles.actionsContainer}
        onRequestClose={this.handleCancel}
        open={this.state.open}>
        <div className="row align-center hp-2-l hp-2-r">
          <div dangerouslySetInnerHTML={{__html: require('../../../assets/img/phone-apple.svg')}}>
          </div>
          <div className="col-flex-1 hm-3-l">
            <RaisedButton
              style={styles.uploadButton}
              backgroundColor={Styles.Colors.grey200}
              labelColor={Styles.Colors.grey500}>
              <div className="row align-center align-middle">
                <FontIcon
                  style={styles.uploadButtonIcon}
                  className="synicon-cloud-upload"/>
                <div>UPLOAD .p12 CERTYFICATE</div>
              </div>
            </RaisedButton>
            <Dropzone
              className="cert-dropzone"
              ref="dropzone"
              disableClick={true}
              onDrop={this.onDrop.bind(this, 'cert')}
              style={styles.dropZone}>
              <div
                style={styles.dropZoneDescription}>
                <FontIcon
                  style={styles.uploadIcon}
                  className="synicon-cloud-upload"/>
                <div>
                  Drag & Drop to upload
                </div>
              </div>
            </Dropzone>
            <div className="vm-4-t">
              If you don't have any certificates generated yet read
              <a
                style={styles.GDClink}
                href="https://console.developers.google.com"> here</a> to get them.
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
}));
