import React from 'react';

import {DialogMixin} from '../../../mixins';

import Actions from './APNSDevicesActions';

import {Dialog, FlatButton, RaisedButton, Styles} from 'syncano-material-ui';

export default React.createClass({

  displayName: 'SendAPNSMessageDialog',

  mixins: [DialogMixin],

  getStyles() {
    return {
      sendDialogHeader: {
        fontSize: 12,
        padding: '8px 6px',
        backgroundColor: Styles.Colors.grey100,
        color: Styles.Colors.grey400,
        borderRadius: '2px',
        border: '1px solid'
      },
      sendDialogHeaderData: {
        fontWeight: 700
      }
    };
  },

  handleSendMessage() {
    Actions.sendMessageToAPNS();
    this.handleCancel();
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
        onTouchTap={this.handleSendMessage}/>

      /* handleSuccessfullValidation */
    ];

    return (
      <Dialog
        key='dialog'
        ref='dialog'
        title="Send message APNS"
        autoDetectWindowHeight={true}
        actions={dialogStandardActions}
        actionsContainerStyle={styles.base}
        onRequestClose={this.handleCancel}
        open={this.state.open}>
        <div style={styles.sendDialogHeader}>
          <div className="row">
            <div className="col-sm-10">
              User:
            </div>
            <div className="col-sm-10">
              Device label:
            </div>
            <div className="col-sm-15">
              Device UUID:
            </div>
          </div>
          <div
            style={styles.sendDialogHeaderData}
            className="row">
            <div className="col-sm-10">
              User
            </div>
            <div className="col-sm-10">
              Label
            </div>
            <div className="col-sm-15">
              USer UUID
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
});
