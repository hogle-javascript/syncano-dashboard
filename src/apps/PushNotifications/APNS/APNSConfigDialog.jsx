import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import _ from 'lodash';
import Syncano from 'syncano';

// Utils
import {DialogMixin, FormMixin} from '../../../mixins';

// Stores and Actions
import Actions from './APNSPushNotificationsActions';
import Store from './APNSConfigDialogStore';

// Components
import {IconButton, TextField} from 'material-ui';
import {colors as Colors} from 'material-ui/styles/';
import {Show, Dialog, DropZone, Notification} from '../../../common/';

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
        color: Colors.blue400
      },
      actionsContainer: {
        padding: 20
      },
      dropzoneWithFileTitle: {
        color: Colors.black,
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
        color: Colors.grey400
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
        development_certificate: Syncano.file(certificate)
      },
      production: {
        production_certificate_name: certificate.name,
        production_certificate: Syncano.file(certificate)
      }
    };

    this.setState(state[type]);
  },

  handleAddSubmit() {
    Actions.configAPNSPushNotification(this.removeEmptyParams(this.state));
  },

  removeEmptyParams(params) {
    return _.omitBy(params, _.isEmpty);
  },

  clearCertificate(type) {
    const params = {
      [`${type}_certificate`]: false,
      [`${type}_certificate_name`]: null,
      [`${type}_bundle_identifier`]: null
    };

    Actions.removeCertificate(params);
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
                  value={this.state[`${type}_certificate_name`]}
                  onChange={(event, value) => this.setState({[`${type}_certificate_name`]: value})}
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
                  value={this.state[`${type}_bundle_identifier`]}
                  onChange={(event, value) => this.setState({[`${type}_bundle_identifier`]: value})}
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
        }
        sidebar={
          <Dialog.SidebarBox>
            <Dialog.SidebarSection>
              <strong>APNS Push Notification Socket</strong> allows you to send messages to your iOS devices. You can
              easily notify users about updates etc.
              <br/><br/>
              <i>
                NOTE: At least one production or development certificate must be uploaded to send Push Notifications.
              </i>
            </Dialog.SidebarSection>
            <Dialog.SidebarSection title="Certificates">
              Certificates are IDs that uniquely identify your application.
              <br/><br/>
              <i>
                NOTE: If you don't have any certificates generated yet, click link below to learn how to generate them
                 from our docs.
              </i>
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/docs/push-notification-sockets-ios">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>
        }>
        <div className="row align-center hp-2-l hp-2-r vm-2-b vm-2-t">
          <div
            className="hm-2-r"
            dangerouslySetInnerHTML={{__html: require('./phone-apple.svg')}}></div>
          <div className="col-flex-1">
            {this.renderDropZones()}
            {this.renderCertificateErrors()}
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
}));
