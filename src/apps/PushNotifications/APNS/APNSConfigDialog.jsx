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
import {Loading} from 'syncano-components';
import {Dialog, DropZone} from '../../../common';

export default Radium(React.createClass({
  displayName: 'APNSConfigDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin
  ],

  getInitialState() {
    return {
      certType: 'development'
    };
  },

  componentWillMount() {
    Actions.fetch();
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
      certType: {
        fontSize: 11,
        paddingBottom: 10
      },
      closeIconColor: {
        color: Styles.Colors.grey400
      },
      closeIcon: {
        position: 'absolute',
        right: 5,
        top: -15
      }
    };
  },

  onDrop(file) {
    let cert = file;

    if (_.isArray(file)) {
      cert = file[0];
    }

    this.setState({
      form: {
        development_certificate_name: cert.name,
        development_certificate: cert,
        production_certificate_name: cert.name,
        production_certificate: cert
      }
    }, () => console.error(this.state));
  },

  isDevelopment() {
    return this.state.certType === 'development';
  },

  handleAddSubmit() {
    const form = this.state.form;
    const certType = this.state.certType;
    let params = {};

    _.keys(form)
      .filter((key) => _.includes(key, certType))
      .forEach((properKey) => params[properKey] = form[properKey]);

    console.error('confirm: ', params);
    Actions.configAPNSPushNotification(params);
  },

  handleCertTypeChange(event, index, value) {
    this.setState({
      certType: value
    });
  },

  clearCertificate() {
    let form = this.state.form;

    _.keys(form).forEach((key) => form[key] = null);

    console.error(form);
    this.setState(form);
  },

  renderDropzoneDescription() {
    const styles = this.getStyles();
    const certType = this.state.certType;
    const form = this.state.form;
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

    if (form.development_certificate || form.production_certificate) {
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
                  valueLink={this.linkState(`${certType}_certificate_name`)}
                  defaultValue={form.development_certificate_name}
                  floatingLabelText="Apple Push Notification Certificate Name"/>
              </div>
              <div className="col-xs-12">
                <SelectField
                  autoWidth={true}
                  fullWidth={true}
                  value={certType}
                  onChange={this.handleCertTypeChange}
                  floatingLabelText="Type">
                  {dropdownItems}
                </SelectField>
              </div>
            </div>
            <div className="row align-middle">
              <div className="col-xs-23">
                <TextField
                  fullWidth={true}
                  valueLink={this.linkState(`${certType}_bundle_identifier`)}
                  defaultValue={form.development_bundle_identifier}
                  floatingLabelText="Bundle Identifier"/>
              </div>
              <div className="col-xs-12">
                <div style={styles.certType}>Expiration Date</div>
                {form[`${certType}_expiration_date`]}
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
        <div className="row align-center hp-2-l hp-2-r">
          <div dangerouslySetInnerHTML={{__html: require('../../../assets/img/phone-apple.svg')}}></div>
          <div className="col-flex-1">
            <DropZone
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
