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
import {
  FlatButton,
  RaisedButton,
  IconButton,
  TextField,
  SelectField,
  MenuItem,
  Styles
} from 'syncano-material-ui';
import {Loading, Show} from 'syncano-components';
import {Dialog, DropZone, Notification} from '../../../common';

export default Radium(React.createClass({
  displayName: 'APNSConfigDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints() {
    let certificateType = this.state.certificateType;
    let validator = {};

    validator[`${certificateType}_certificate_name`] = {length: {maximum: 200}};
    validator[`${certificateType}_bundle_identifier`] = {length: {maximum: 200}};
    validator[`${certificateType}_certificate`] = {presence: {message: "Certificate can't be blank"}};

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

  onDrop(file) {
    let cert = file;

    if (_.isArray(file)) {
      cert = file[0];
    }

    let state = {
      development_certificate_name: cert.name,
      development_certificate: {file: cert, name: 'development_certificate'},
      production_certificate_name: cert.name,
      production_certificate: {file: cert, name: 'production_certificate'}
    };

    this.setState(state);
  },

  isDevelopment() {
    return this.state.certificateType === 'development';
  },

  handleAddSubmit() {
    const state = this.state;
    const certificateType = this.state.certificateType;
    let params = {};

    _.keys(state)
      .filter((key) => _.includes(key, certificateType))
      .forEach((properKey) => params[properKey] = state[properKey]);

    let file = params[`${certificateType}_certificate`];

    delete params[`${certificateType}_certificate`];
    Actions.configAPNSPushNotification(params, file);
  },

  handleCertificateTypeChange(event, index, value) {
    this.setState({
      certificateType: value
    });
  },

  clearCertificate() {
    let state = this.state;

    _.keys(state).forEach((key) => {
      if (_.includes(key, ['development']) || _.includes(key, ['production'])) {
        state[key] = null;
      }
    });

    this.setState(state);
  },

  renderDropzoneDescription() {
    const styles = this.getStyles();
    const certificateType = this.state.certificateType;
    const state = this.state;
    const dropdownItems = [
      <MenuItem
        key="dropdown-production"
        value="production"
        primaryText="Production"/>,
      <MenuItem
        key="dropdown-development"
        value="development"
        primaryText="Development"/>
    ];

    if (state.development_certificate || state.production_certificate) {
      return (
        <div
          className="row"
          style={styles.dropzoneWithFileContainer}>
          <IconButton
            onTouchTap={this.clearCertificate}
            style={styles.closeIcon}
            iconStyle={styles.closeIconColor}
            tooltip="Remove cerificate"
            iconClassName="synicon-close"/>
          <div className="col-flex-1">
            <div style={styles.dropzoneWithFileTitle}>Current certificate</div>
            <div className="row align-middle">
              <div className="col-xs-23">
                <TextField
                  fullWidth={true}
                  valueLink={this.linkState(`${certificateType}_certificate_name`)}
                  defaultValue={state[`${certificateType}_certificate_name`]}
                  errorText={this.getValidationMessages(`${certificateType}_certificate_name`).join(' ')}
                  floatingLabelText="Apple Push Notification Certificate Name"/>
              </div>
              <div className="col-xs-12">
                <SelectField
                  autoWidth={true}
                  fullWidth={true}
                  value={certificateType}
                  onChange={this.handleCertificateTypeChange}
                  floatingLabelText="Type">
                  {dropdownItems}
                </SelectField>
              </div>
            </div>
            <div className="row align-middle">
              <div className="col-xs-23">
                <TextField
                  fullWidth={true}
                  valueLink={this.linkState(`${certificateType}_bundle_identifier`)}
                  defaultValue={state[`${certificateType}_bundle_identifier`]}
                  errorText={this.getValidationMessages(`${certificateType}_bundle_identifier`).join(' ')}
                  floatingLabelText="Bundle Identifier"/>
              </div>
              <div className="col-xs-12">
                <div style={styles.certificateType}>Expiration Date</div>
                {state[`${certificateType}_expiration_date`]}
              </div>
            </div>
          </div>
        </div>
      );
    }
  },

  render() {
    let styles = this.getStyles();
    let dialogStandardActions = [
      <FlatButton
        style={{marginRight: 10}}
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
        autoDetectWindowHeight={true}
        actions={dialogStandardActions}
        actionsContainerStyle={styles.actionsContainer}
        onRequestClose={this.handleCancel}
        open={this.state.open}>
        {this.renderFormNotifications()}
        <div className="row align-center hp-2-l hp-2-r">
          <div dangerouslySetInnerHTML={{__html: require('./phone-apple.svg')}}></div>
          <div className="col-flex-1">
            <DropZone
              isLoading={this.state.isCertLoading}
              handleButtonClick={this.onDrop}
              onDrop={this.onDrop}
              disableClick={true}
              withButton={true}
              uploadButtonLabel="UPLOAD .p12 CERTIFICATE">
              {this.renderDropzoneDescription()}
            </DropZone>
            <div className="vm-4-t">
              If you don't have any certificates generated yet read
              <a
                style={styles.GDClink}
                href="https://developer.apple.com/membercenter"> here</a> to get them.
            </div>
            <Show if={this.getValidationMessages(`${this.state.certificateType}_certificate`).length > 0}>
              <div className="vm-2-t">
                <Notification type="error">
                  {this.getValidationMessages(`${this.state.certificateType}_certificate`).join(' ')}
                </Notification>
              </div>
            </Show>
          </div>
        </div>
        <Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading}/>
      </Dialog>
    );
  }
}));
