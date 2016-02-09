import React from 'react';

import {DialogMixin, FormMixin} from '../../../mixins';

import Actions from './GCMDevicesActions';

import {
  Dialog,
  FlatButton,
  RaisedButton,
  TextField,
  Styles
} from 'syncano-material-ui';
import {Loading} from 'syncano-components';
import DialogTitleWithIcon from '../../../common/Dialog/DialogTitleWithIcon';

export default React.createClass({

  displayName: 'SendGCMMessageDialog',

  mixins: [
    DialogMixin,
    FormMixin
  ],

  getStyles() {
    return {
      sendDialogHeader: {
        fontSize: 12,
        padding: '8px 6px',
        backgroundColor: Styles.Colors.grey50,
        color: Styles.Colors.grey400,
        borderRadius: '4px',
        border: '1px solid ' + Styles.Colors.grey200
      },
      sendDialogHeaderData: {
        fontWeight: 600
      }
    };
  },

  handleSendMessage() {
    Actions.sendMessageToGCM();
    this.handleCancel();
  },

  renderDialogTitle() {
    return <DialogTitleWithIcon iconClassName="synicon-android">Send Message To Android Device</DialogTitleWithIcon>;
  },

  render() {
    const styles = this.getStyles();
    const {item} = this.props;
    const dialogStandardActions = [
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
        onTouchTap={this.handleSendMessage}/>

      /* handleSuccessfullValidation */
    ];

    return (
      <Dialog
        key='dialog'
        ref='dialog'
        title={this.renderDialogTitle()}
        autoDetectWindowHeight={true}
        actions={dialogStandardActions}
        actionsContainerStyle={styles.base}
        onRequestClose={this.handleCancel}
        open={this.state.open}>
        <div style={styles.sendDialogHeader}>
          <div className="row">
            <div className="col-sm-10">
              User
            </div>
            <div className="col-sm-10">
              Device label
            </div>
            <div className="col-sm-15">
              Device UUID
            </div>
          </div>
          <div
            style={styles.sendDialogHeaderData}
            className="row">
            <div className="col-sm-10">
              {item ? item.userName : null}
            </div>
            <div className="col-sm-10">
              {item ? item.label : null}
            </div>
            <div className="col-sm-15">
              {item ? item.device_id : null}
            </div>
          </div>
        </div>
        <div className="row align-center hp-1-l hp-1-r vm-4-t">
          <div dangerouslySetInnerHTML={{__html: require('./phone-android-empty-screen.svg')}}></div>
          <div className="col-flex-1 hm-3-l">
            <TextField
              ref="push_notification_text"
              name="push_notification_text"
              valueLink={this.linkState('push_notification_text')}
              fullWidth={true}
              floatingLabelText="Push notification Text"
              errorText={this.getValidationMessages('push_notification_text').join(' ')}/>
          </div>
        </div>
        <Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading}/>
      </Dialog>
    );
  }
});
