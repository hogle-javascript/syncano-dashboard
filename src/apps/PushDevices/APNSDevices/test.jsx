import React from 'react';
import Reflux from 'reflux';

import {DialogMixin, FormMixin} from '../../../mixins';

import Actions from './APNSSendMessagesActions';
import Store from './APNSSendMessagesDialogStore';

import {
  Dialog,
  FlatButton,
  RaisedButton,
  TextField,
  Toggle,
  SelectField,
  MenuItem,
  Utils,
  Styles
} from 'syncano-material-ui';
import {Loading, CharacterCounter, Show} from 'syncano-components';
import {Dialog as CommonDialog, Editor, Notification} from '../../../common';

export default React.createClass({

  displayName: 'SendGCMMessageDialog',

  mixins: [
    Reflux.connect(Store),
    DialogMixin,
    FormMixin,
    Utils.Styles
  ],

  getInitialState() {
    return {
      isJSONMessage: false,
      JSONMessage: '',
      appName: 'App name',
      content: 'Your push notification text would go here.',
      environment: 'development'
    };
  },

  getStyles() {
    return {
      greyBoxContainer: {
        backgroundColor: Styles.Colors.grey50,
        color: Styles.Colors.grey400,
        border: '1px solid ' + Styles.Colors.grey200
      },
      sendDialogHeader: {
        borderRadius: '4px',
        padding: '8px 6px',
        fontSize: 12
      },
      sendDialogHeaderData: {
        fontWeight: 600
      },
      phoneContainer: {
        position: 'relative',
        lineHeight: '12px'
      },
      messagePreview: {
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
        fontSize: 10,
        borderRadius: '2px',
        position: 'absolute',
        top: 146,
        left: 18,
        width: 165,
        height: 50
      },
      messageTextContainer: {
        overflow: 'hidden'
      },
      messageCircle: {
        minWidth: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: Styles.Colors.blueGrey200
      },
      appNameContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 4
      },
      appName: {
        fontWeight: 700,
        WebkitLineClamp: 1,
        maxWidth: 70
      },
      messageText: {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
      },
      toggle: {
        padding: '20px 0 0 0',
        width: '45%'
      }
    };
  },

  handleSendMessage() {
    const deviceRegistrationId = this.state.registration_id;
    let payload = {
      content: {
        environment: this.state.environment,
        notification: {
          title: this.state.appName,
          body: this.state.content
        }
      }
    };

    if (this.state.isJSONMessage) {
      console.error(this.state.JSONMessage);
      payload = JSON.parse(this.state.JSONMessage);
    }

    Actions.sendMessageToGCM(deviceRegistrationId, payload);
  },

  handleEditSubmit() {
    this.handleSendMessage();
  },

  handleChangeDropdown(event, index, value) {
    this.setState({
      environment: value
    });
  },

  toggleJSONMessage() {
    this.setState({
      isJSONMessage: !this.state.isJSONMessage
    });
  },

  updateJSONMessage(value) {
    this.setState({
      JSONMessage: value
    });
  },

  renderDialogTitle() {
    return (
      <CommonDialog.TitleWithIcon iconClassName="synicon-android">
        Send Message To Android Device
      </CommonDialog.TitleWithIcon>
    );
  },

  renderMessageFields() {
    if (this.state.isJSONMessage) {
      return (
        <div>
          <CharacterCounter
            text="JSON Editor"
            position="right"
            charactersCountWarn={-1}
            maxCharacters={4096}
            characters={this.state.JSONMessage.length}/>
          <Editor
            ref="JSONMessage"
            minLines={16}
            maxLines={16}
            onChange={this.updateJSONMessage}
            mode="javascript"
            theme="tomorow"
            value={this.state.JSONMessage}/>
        </div>
      );
    }

    return (
      <div>
        <TextField
          ref="appName"
          name="content"
          valueLink={this.linkState('appName')}
          fullWidth={true}
          floatingLabelText="App name"/>
        <TextField
          ref="content"
          name="content"
          valueLink={this.linkState('content')}
          fullWidth={true}
          floatingLabelText="Push notification Text"/>
      </div>
    );
  },

  render() {
    console.error(this.state);
    const styles = this.getStyles();
    const state = this.state;
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
        onTouchTap={this.handleFormValidation}/>
    ];

    return (
      <Dialog
        key='dialog'
        ref='dialog'
        title={this.renderDialogTitle()}
        autoDetectWindowHeight={true}
        repositionOnUpdate={false}
        actions={dialogStandardActions}
        actionsContainerClassName="vm-1-t"
        onRequestClose={this.handleCancel}
        open={this.state.open}>
        <div style={this.mergeStyles(styles.greyBoxContainer, styles.sendDialogHeader)}>
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
              {state.userName}
            </div>
            <div className="col-sm-10">
              {state.label}
            </div>
            <div className="col-sm-15">
              {state.device_id}
            </div>
          </div>
        </div>
        <div className="row hp-1-l hp-1-r vm-4-t">
          <div style={styles.phoneContainer}>
            <div dangerouslySetInnerHTML={{__html: require('./phone-apple-empty-screen.svg')}}></div>
            <div style={this.mergeStyles(styles.messagePreview, styles.greyBoxContainer)}>
              <div style={styles.messageCircle}></div>
              <div
                style={styles.messageTextContainer}
                className="col-sm-30">
                <div style={styles.appNameContainer}>
                  <div style={this.mergeStyles(styles.messageText, styles.appName)}>
                    {this.state.appName}
                  </div>
                  <div>
                    5:09 PM
                  </div>
                </div>
                <div style={styles.messageText}>
                  {this.state.content}
                </div>
              </div>
            </div>
          </div>
          <div className="col-flex-1 hm-3-l">
            <div className="row align-middle vm-1-t">
              <div className="col-sm-20">
                <SelectField
                  autoWidth={true}
                  fullWidth={true}
                  value={this.state.environment}
                  onChange={this.handleChangeDropdown}>
                  <MenuItem
                    value="development"
                    primaryText="Development"/>
                  <MenuItem
                    value="production"
                    primaryText="Production"/>
                </SelectField>
              </div>
              <div className="col-sm-15">
                <Toggle
                  label="JSON message"
                  onToggle={this.toggleJSONMessage}
                  toggled={this.state.isJSONMessage}/>
              </div>
            </div>
            {this.renderMessageFields()}
          </div>
        </div>
        <Show if={this.getValidationMessages('content').length > 0}>
          <div className="vm-3-t">
            <Notification type="error">
              {this.getValidationMessages('content').join(' ')}
            </Notification>
          </div>
        </Show>
        <Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading}/>
      </Dialog>
    )
      ;
  }
});
