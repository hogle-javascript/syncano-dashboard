/* eslint-disable */
import React from 'react';

import DialogMixin from '../../mixins/DialogMixin';

import {FlatButton, Tabs, Tab} from 'syncano-material-ui';
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
    DialogMixin
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
    this.handleCancel();
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

  render() {
    let styles = this.getStyles();
    let dialogStandardActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleCancel}/>,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}/>
    ];

    return (
      <Common.Dialog
        key="dialog"
        ref="dialog"
        bodyStyle={styles.body}
        contentInnerStyle={styles.content}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogStandardActions}>
        <Tabs inkBarStyle={styles.inkBar}>
          <Tab label="Colors">
            <div style={styles.tabContent}>
              <Common.ColorIconPicker
                ref="color"
                pickerType="color"
                selectedIcon={this.state.icon}
                selectedColor={this.state.color}
                handleChange={this.handleChange}/>
            </div>
          </Tab>
          <Tab label="Icons">
            <div style={styles.tabContent}>
              <Common.ColorIconPicker
                ref="icon"
                pickerType="icon"
                selectedColor={this.state.color}
                selectedIcon={this.state.icon}
                handleChange={this.handleChange}/>
            </div>
          </Tab>
        </Tabs>
      </Common.Dialog>
    );
  }
});
