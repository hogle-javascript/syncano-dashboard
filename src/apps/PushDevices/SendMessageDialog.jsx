import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import _ from 'lodash';

import {DialogMixin, FormMixin} from '../../mixins';

import {TextField, Toggle, SelectField, MenuItem, Utils, Styles} from 'syncano-material-ui';
import {Show, Truncate, Dialog, Editor, Notification} from '../../common/';

export default (store, props) => {
  return Radium(React.createClass({

    displayName: `${store.getConfig().type}SendMessageDialog`,

    mixins: [
      Reflux.connect(store),
      DialogMixin,
      FormMixin,
      Utils.Styles
    ],

    getInitialState() {
      return {
        isHeaderExpanded: false,
        isJSONMessage: false,
        JSONMessage: '',
        appName: 'App name',
        content: 'Your push notification text would go here.',
        environment: 'development'
      };
    },

    getStyles() {
      return {
        sendDialogHeaderContainer: {
          borderRadius: '4px',
          borderTop: '1px solid ' + Styles.Colors.grey200,
          borderRight: '1px solid ' + Styles.Colors.grey200,
          borderLeft: '1px solid ' + Styles.Colors.grey200,
          color: Styles.Colors.grey400
        },
        greyBoxContainer: {
          borderBottom: '1px solid ' + Styles.Colors.grey200,
          backgroundColor: Styles.Colors.grey100
        },
        sendDialogHeader: {
          margin: 0,
          borderBottom: '1px solid ' + Styles.Colors.grey200,
          padding: '8px 6px',
          fontSize: 12
        },
        sendDialogHeaderItem: {
          fontWeight: 600,
          margin: 0,
          backgroundColor: Styles.Colors.grey50,
          borderBottom: '1px solid ' + Styles.Colors.grey200,
          padding: '8px 6px',
          fontSize: 12
        },
        sendDialogHeaderEvenItem: {
          backgroundColor: Styles.Colors.grey100
        },
        seeMoreVisible: {
          color: Styles.Colors.blue500,
          visibility: 'visible',
          cursor: 'pointer',
          ':hover': {
            textDecoration: 'underline'
          }
        },
        seeMoreHidden: {
          visibility: 'hidden'
        },
        phoneContainer: {
          position: 'relative',
          lineHeight: '12px'
        },
        messagePreview: {
          backgroundColor: Styles.Colors.grey50,
          color: Styles.Colors.grey400,
          border: '1px solid ' + Styles.Colors.grey200,
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
        messageGCMCircle: {
          minWidth: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: Styles.Colors.blueGrey200
        },
        messageAPNSCircle: {
          minWidth: 11,
          height: 11,
          borderRadius: '2px'
        },
        appNameContainer: {
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: 4
        },
        gcmAppName: {
          fontWeight: 700,
          WebkitLineClamp: 1,
          maxWidth: 70
        },
        apnsAppName: {
          paddingRight: 4
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

    getDefaultJSONMessage() {
      const {appName, content} = this.state;
      const type = store.getConfig().type;

      if (type === 'APNS') {
        return {
          title: appName,
          body: content
        };
      }

      if (type === 'GCM') {
        return {
          title: appName,
          body: content
        };
      }
    },

    handleSendMessage() {
      const {onSendMessage} = props;
      const {registration_id, appName, content, environment, isJSONMessage, JSONMessage} = this.state;
      const type = store.getConfig().type;
      const checkedItems = props.getCheckedItems().map((item) => item.registration_id);
      const registrationIds = checkedItems.length ? checkedItems : [registration_id];
      let payload = {
        environment
      };

      if (!isJSONMessage && type === 'APNS') {
        payload.aps = {
          alert: {
            title: appName,
            body: content
          }
        };
      }

      if (!isJSONMessage && type === 'GCM') {
        payload.notification = {
          title: appName,
          body: content
        };
      }

      if (isJSONMessage && type === 'APNS') {
        payload = _.merge(payload, {aps: {alert: JSON.parse(JSONMessage)}});
      }

      if (isJSONMessage && type === 'GCM') {
        payload = _.merge(payload, {notification: JSON.parse(JSONMessage)});
      }

      onSendMessage(registrationIds, payload);
    },

    handleToggleEnvironment(environment) {
      this.setState({environment: environment === 'development' ? 'production' : 'development'});
    },

    handleEditSubmit() {
      this.handleSendMessage();
    },

    handleAddSubmit() {
      this.handleSendMessage();
    },

    renderMessageFields() {
      const {isJSONMessage, JSONMessage} = this.state;

      if (isJSONMessage) {
        return (
          <div className="vm-3-t">
            <Editor
              ref="JSONMessage"
              minLines={16}
              maxLines={16}
              onChange={(value) => this.setState({JSONMessage: value})}
              mode="javascript"
              theme="tomorow"
              value={JSONMessage || JSON.stringify(this.getDefaultJSONMessage(), null, '\t')} />
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

    renderCheckedItemsData() {
      const styles = this.getStyles();
      const {userName, label, registration_id, isHeaderExpanded} = this.state;
      const checkedItems = props.getCheckedItems();
      let itemNodes = [
        <div
          key="clickedItem"
          style={styles.sendDialogHeaderItem}
          className="row">
          <div className="col-sm-3">
            1.
          </div>
          <div className="col-sm-8">
            {userName}
          </div>
          <div className="col-sm-9">
            <Truncate text={label} />
          </div>
          <div className="col-sm-15">
            <Truncate text={registration_id} />
          </div>
        </div>
      ];

      if (checkedItems.length) {
        itemNodes = checkedItems.map((item, index) => {
          return (
            <div
              key={`item${item.registration_id}`}
              style={[styles.sendDialogHeaderItem, (index + 1) % 2 === 0 && styles.sendDialogHeaderEvenItem]}
              className="row">
              <div className="col-sm-3">
                {`${index + 1}.`}
              </div>
              <div className="col-sm-8">
                {item.userName}
              </div>
              <div className="col-sm-9">
                <Truncate text={item.label} />
              </div>
              <div className="col-sm-15">
                <Truncate text={item.registration_id} />
              </div>
            </div>
          );
        });
      }

      return isHeaderExpanded ? itemNodes : itemNodes.slice(0, 3);
    },

    renderCertificateTypeFields(type) {
      const {environment} = this.state;

      const field = {
        GCM: (
          <SelectField
            floatingLabelText="Certificate type"
            autoWidth={true}
            fullWidth={true}
            value={environment}
            onChange={(event, index, value) => this.setState({environment: value})}>
            <MenuItem
              value="development"
              primaryText="Development"/>
            <MenuItem
              value="production"
              primaryText="Production"/>
          </SelectField>
        ),
        APNS: (
          <div className="vm-3-t">
            <Toggle
              label="Use Sandbox"
              onToggle={() => this.handleToggleEnvironment(environment)}
              toggled={environment === 'development'}/>
          </div>
        )
      };

      return field[type];
    },

    render() {
      const {open, isLoading, appName, content, isJSONMessage, isHeaderExpanded} = this.state;
      const config = store.getConfig();
      const isAPNS = config.type === 'APNS';
      const styles = this.getStyles();

      return (
        <Dialog.FullPage
          key="dialog"
          ref="dialog"
          title={
            <Dialog.TitleWithIcon iconClassName={config.icon}>
              {`Send Message To ${config.device} Device`}
            </Dialog.TitleWithIcon>
          }
          actionsContainerClassName="vm-1-t"
          onRequestClose={this.handleCancel}
          open={open}
          isLoading={isLoading}
          actions={
            <Dialog.StandardButtons
              disabled={!this.state.canSubmit}
              handleCancel={this.handleCancel}
              handleConfirm={this.handleFormValidation}/>
          }>
          <div style={styles.sendDialogHeaderContainer}>
            <div
              style={styles.sendDialogHeader}
              className="row">
              <div className="col-sm-3">
                No.
              </div>
              <div className="col-sm-8">
                User
              </div>
              <div className="col-sm-9">
                Device label
              </div>
              <div className="col-sm-15">
                Registration ID
              </div>
            </div>
            {this.renderCheckedItemsData()}
          </div>
          <div
            style={[styles.seeMoreHidden, props.getCheckedItems().length > 3 && styles.seeMoreVisible]}
            onClick={() => this.setState({isHeaderExpanded: !isHeaderExpanded})}
            className="row align-center vp-2-t">
            {isHeaderExpanded ? `SHOW LESS` : `SHOW MORE (${props.getCheckedItems().length - 3})`}
          </div>
          <div className="row hp-1-l hp-1-r vm-4-t vm-3-b">
            <div style={styles.phoneContainer}>
              {props.phoneIcon}
              <div style={styles.messagePreview}>
                <div style={[styles.messageGCMCircle, isAPNS && styles.messageAPNSCircle]}></div>
                <div
                  style={styles.messageTextContainer}
                  className="col-sm-30">
                  <div style={styles.appNameContainer}>
                    <div style={[styles.messageText, styles.gcmAppName, isAPNS && styles.apnsAppName]}>
                      {appName}
                    </div>
                    <div>
                      5:09 PM
                    </div>
                  </div>
                  <div style={styles.messageText}>
                    {content}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-flex-1 hm-3-l">
              <div className="row align-middle">
                <div className="col-sm-17">
                  {this.renderCertificateTypeFields(config.type)}
                </div>
                <div className="col-sm-18 vm-3-t">
                  <Toggle
                    label="JSON message"
                    onToggle={() => this.setState({isJSONMessage: !isJSONMessage})}
                    toggled={isJSONMessage}/>
                </div>
              </div>
              {this.renderMessageFields()}
            </div>
          </div>
          {this.renderFormNotifications()}
          <Show if={this.getValidationMessages('content').length}>
            <div className="vm-2-t">
              <Notification type="error">
                {this.getValidationMessages('content').join(' ')}
              </Notification>
            </div>
          </Show>
        </Dialog.FullPage>
      );
    }
  }));
};
