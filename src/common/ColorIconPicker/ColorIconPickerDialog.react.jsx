import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import MUI from 'material-ui';
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
        contentInnerStyle={{paddingBottom: 24, padding: '0px'}}
        actions={dialogStandardActions}
        >
        <MUI.Tabs>
          <MUI.Tab label="Colors">
            <div style={{height: 300, padding: '20px 20px 0'}}>
              <Common.ColorIconPicker
                ref="color"
                pickerType="color"
                selectedIcon={this.state.icon}
                selectedColor={this.state.color}
                handleChange={this.handleChange}
                />
            </div>
          </MUI.Tab>
          <MUI.Tab label="Icons">
            <div style={{height: 300, paddingTop: 20}}>
              <Common.ColorIconPicker
                ref="icon"
                pickerType="icon"
                selectedColor={this.state.color}
                selectedIcon={this.state.icon}
                handleChange={this.handleChange}
                />
            </div>
          </MUI.Tab>
        </MUI.Tabs>
      </Common.Dialog>
    );
  }
});

