import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import _ from 'lodash';

// Utils
import {DialogMixin, FormMixin} from '../../../mixins';

// Stores and Actions
import Actions from './APNSPushNotificationsActions';
import Store from './APNSConfigDialogStore';

// Components
import {IconButton, TextField, Styles} from 'syncano-material-ui';
import {Show} from 'syncano-components';
import {Dialog, DropZone, Notification} from '../../../common';

export default Radium(React.createClass({
  displayName: 'APNSConfigDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    const {certificateTypes} = this.state;
    let validator = {};

    _.forEach(certificateTypes, (certificateType) => {
      if (this.state[`${certificateType}_certificate`]) {
        validator[`${certificateType}_certificate_name`] = {
          presence: true,
          length: {
            maximum: 200
          }
        };
        validator[`${certificateType}_bundle_identifier`] = {
          presence: true,
          length: {
            maximum: 200
          }
        };
      }
    });

    return validator;
  },

  componentWillUpdate(nextProps, nextState) {
    if (!this.state._dialogVisible && nextState._dialogVisible) {
      Actions.fetch();
    }
  },

  getStyles() {
    return {
      dropzoneContainer: {
        padding: '20px 0'
      },
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
      dropzoneWithFileTitle: {
        color: Styles.Colors.black,
        fontSize: 16,
        fontWeight: 500
      },
      dropzoneWithFileContainer: {
        position: 'relative',
        width: '100%'
      },
      certificateType: {
        fontSize: 11,
        paddingBottom: 10
      },
      closeIconColor: {
        color: Styles.Colors.grey400
      },
      closeIcon: {
        position: 'absolute',
        right: 0,
        top: -25
      }
    };
  },

  onDrop(file, type) {
    let certificate = file;

    if (_.isArray(file)) {
      certificate = file[0];
    }

    const state = {
      development: {
        development_certificate_name: certificate.name,
        development_certificate: certificate
      },
      production: {
        production_certificate_name: certificate.name,
        production_certificate: certificate
      }
    };

    this.setState(state[type]);
  },

  handleAddSubmit() {
    const state = this.state;
    let params = {
      production_certificate_name: state.production_certificate_name,
      production_certificate: state.production_certificate,
      production_bundle_identifier: state.production_bundle_identifier,
      production_expiration_date: state.production_expiration_date,
      development_certificate_name: state.development_certificate_name,
      development_certificate: state.development_certificate,
      development_expiration_date: state.development_expiration_date,
      development_bundle_identifier: state.development_bundle_identifier
    };

    _.forEach(params, (value, key) => {
      if (_.isEmpty(value)) {
        delete params[key];
      }
    });
    Actions.configAPNSPushNotification(params);
  },

  clearCertificate(type) {
    const keys = {
      production: {
        production_certificate_name: null,
        production_certificate: null,
        production_bundle_identifier: null,
        production_expiration_date: null
      },
      development: {
        development_certificate_name: null,
        development_certificate: null,
        development_expiration_date: null,
        development_bundle_identifier: null
      }
    };

    this.setState(keys[type]);
  },

  renderDropzoneDescription(type) {
    const styles = this.getStyles();
    const state = this.state;

    if (state[`${type}_certificate`]) {
      return (
        <div
          className="row"
          style={styles.dropzoneWithFileContainer}>
          <IconButton
            onTouchTap={() => this.clearCertificate(type)}
            style={styles.closeIcon}
            iconStyle={styles.closeIconColor}
            tooltip="Remove cerificate"
            iconClassName="synicon-close"/>
          <div className="col-flex-1">
            <div style={styles.dropzoneWithFileTitle}>{_.capitalize(type)} certificate</div>
            <div className="row align-middle">
              <div className="col-xs-23">
                <TextField
                  fullWidth={true}
                  valueLink={this.linkState(`${type}_certificate_name`)}
                  defaultValue={state[`${type}_certificate_name`]}
                  errorText={this.getValidationMessages(`${type}_certificate_name`).join(' ')}
                  floatingLabelText="Apple Push Notification Certificate Name"/>
              </div>
              <div className="col-xs-12">
                <TextField
                  underlineShow={false}
                  disabled={true}
                  autoWidth={true}
                  fullWidth={true}
                  value={_.capitalize(type)}
                  floatingLabelText="Type"/>
              </div>
            </div>
            <div className="row align-middle">
              <div className="col-xs-23">
                <TextField
                  fullWidth={true}
                  valueLink={this.linkState(`${type}_bundle_identifier`)}
                  defaultValue={state[`${type}_bundle_identifier`]}
                  errorText={this.getValidationMessages(`${type}_bundle_identifier`).join(' ')}
                  floatingLabelText="Bundle Identifier"/>
              </div>
              <div className="col-xs-12">
                <div style={styles.certificateType}>Expiration Date</div>
                {state[`${type}_expiration_date`]}
              </div>
            </div>
          </div>
        </div>
      );
    }
  },

  renderDropZones() {
    const {certificateTypes} = this.state;

    return _.map(certificateTypes, (type) => {
      return (
        <div
          key={`dropzone${type}`}
          style={[type === 'production' && {marginTop: 16}]}>
          <DropZone
            certificateType={type}
            isLoading={this.state.isCertLoading}
            handleButtonClick={(file) => this.onDrop(file, type)}
            onDrop={(file) => this.onDrop(file, type)}
            disableClick={true}
            withButton={true}
            uploadButtonLabel="UPLOAD .p12 CERTIFICATE">
            {this.renderDropzoneDescription(type)}
          </DropZone>
        </div>
      );
    });
  },

  renderCertificateErrors() {
    const {certificateTypes} = this.state;

    return _.map(certificateTypes, (type) => {
      return (
        <Show
          key={`certificateError${type}`}
          if={this.getValidationMessages(`${type}_certificate`).length > 0}>
          <div className="vm-2-t">
            <Notification type="error">
              {this.getValidationMessages(`${type}_certificate`).join(' ')}
            </Notification>
          </div>
        </Show>
      );
    });
  },

  render() {
    const styles = this.getStyles();

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        contentSize="large"
        title="Configure Push Notification Socket - APNS"
        autoDetectWindowHeight={true}
        actionsContainerStyle={styles.actionsContainer}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        isLoading={this.state.isLoading}
        actions={
          <Dialog.StandardButtons
            disabled={!this.state.canSubmit}
            handleCancel={this.handleCancel}
            handleConfirm={this.handleFormValidation}/>
        }>
        <div className="row align-center hp-2-l hp-2-r vm-2-b">
          <div
            className="hm-2-r"
            dangerouslySetInnerHTML={{__html: require('./phone-apple.svg')}}></div>
          <div className="col-flex-1">
            {this.renderDropZones()}
            <div className="vm-4-t">
              If you don't have any certificates generated yet read
              <a
                style={styles.GDClink}
                href="https://developer.apple.com/membercenter"> here</a> to get them.
            </div>
            {this.renderCertificateErrors()}
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
}));
