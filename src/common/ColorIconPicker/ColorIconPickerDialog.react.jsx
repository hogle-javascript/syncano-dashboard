import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'ColorIconPickerDialog',

  propTypes: {
    color: React.PropTypes.string,
    icon: React.PropTypes.string,
    initialColor: React.PropTypes.string,
    initialIcon: React.PropTypes.string,
    handleClick: React.PropTypes.func
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    LinkedStateMixin
  ],

  getInitialState() {
    return {
      initialColor: this.props.initialColor,
      initialIcon: this.props.initialIcon
    };
  },

  componentWillReceiveProps(nextProps) {
    console.info('ColorIconPickerDialog::componentWillReceiveProps');
    this.setState({
      color: nextProps.initialColor,
      icon: nextProps.initialIcon
    });
  },

  getStyles() {
    return {
      tabContent: {
        height: 370,
        padding: '20px 20px 0'
      },
      inkBar: {
        backgroundColor: this.context.muiTheme.rawTheme.palette.accent2Color
      },
      body: {
        padding: 0
      },
      content: {
        paddingBottom: 24
      }
    };
  },

  handleSubmit() {
    console.info('InstancesAddDialog::handleSubmit');
    this.props.handleClick(this.state.color, this.state.icon);
    this.dismiss();
  },

  handleCancel() {
    this.setState({
      errors: {}
    });
    this.dismiss();
  },

  handleChange(ColorIcon) {
    console.info('ColorIconPickerDialog::handleChange', ColorIcon);
    if (ColorIcon.color) {
      this.setState({color: ColorIcon.color});
    }
    if (ColorIcon.icon) {
      this.setState({icon: ColorIcon.icon});
    }
  },

  show() {
    this.refs.dialog.show();
  },

  dismiss() {
    this.refs.dialog.dismiss();
  },

  render() {
    let styles = this.getStyles();
    let dialogStandardActions = [
      {
        text: 'Cancel',
        ref: 'cancel',
        onTouchTap: this.handleCancel
      },
      {
        text: 'Confirm',
        ref: 'submit',
        onTouchTap: this.handleSubmit
      }
    ];

    return (
      <Common.Dialog
        ref="dialog"
        bodyStyle={styles.body}
        contentInnerStyle={styles.content}
        actions={dialogStandardActions}>
        <MUI.Tabs inkBarStyle={styles.inkBar}>
          <MUI.Tab label="Colors">
            <div style={styles.tabContent}>
              <Common.ColorIconPicker
                ref="color"
                pickerType="color"
                selectedIcon={this.state.icon}
                selectedColor={this.state.color}
                handleChange={this.handleChange}/>
            </div>
          </MUI.Tab>
          <MUI.Tab label="Icons">
            <div style={styles.tabContent}>
              <Common.ColorIconPicker
                ref="icon"
                pickerType="icon"
                selectedColor={this.state.color}
                selectedIcon={this.state.icon}
                handleChange={this.handleChange}/>
            </div>
          </MUI.Tab>
        </MUI.Tabs>
      </Common.Dialog>
    );
  }
});
