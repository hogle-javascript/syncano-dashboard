var React  = require('react'),
    Reflux = require('reflux'),

    // Utils
    ValidationMixin = require('../../mixins/ValidationMixin'),

    // Components
    mui    = require('material-ui'),
    Dialog = mui.Dialog,
    Tabs   = mui.Tabs,
    Tab    = mui.Tab,

    ColorIconPicker = require('./ColorIconPicker.react');


module.exports = React.createClass({

  displayName: 'ColorIconPickerDialog',

  mixins: [
    React.addons.LinkedStateMixin,
  ],

  propTypes: {
    color: React.PropTypes.string,
    icon : React.PropTypes.string,
    initialColor: React.PropTypes.string,
    initialIcon: React.PropTypes.string,
    handleClick: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      initialColor: this.props.initialColor,
      initialIcon: this.props.initialIcon,
    }
  },

  componentWillReceiveProps: function(nextProps) {
    console.info('ColorIconPickerDialog::componentWillReceiveProps');
    this.setState({
      color: nextProps.initialColor,
      icon: nextProps.initialIcon,
    })
  },

  show: function() {
    this.refs.dialog.show();
  },

  dismiss: function() {
    this.refs.dialog.dismiss();
  },

  handleSubmit: function (event) {
    console.info('InstancesAddDialog::handleSubmit');
    this.props.handleClick(this.state.color, this.state.icon);
    event.preventDefault();
    this.dismiss();

  },

  handleCancel: function(event) {
    this.setState({
      errors: {}});
    this.dismiss();
  },

  handleChange: function(ColorIcon) {
    console.info('ColorIconPickerDialog::handleChange', ColorIcon);
    if (ColorIcon.color) {
      this.setState({color:  ColorIcon.color});
    }
    if (ColorIcon.icon) {
      this.setState({icon:  ColorIcon.icon});
    }
  },

  render: function () {

    var modalState = true;

    var dialogStandardActions = [
      {text: 'Cancel', onClick: this.handleCancel, ref: 'cancel'},
      {text: 'Confirm', onClick: this.handleSubmit, ref: 'submit'}
    ];

    return (
      <Dialog
        ref="dialog"
        contentInnerStyle={{paddingBottom: 24, padding: '0px'}}
        actions={dialogStandardActions}
        modal={modalState}>
        <Tabs>

          <Tab label="Colors">
            <div style={{height: 300, padding: '20px 20px 0'}}>
              <ColorIconPicker
                ref           = "color"
                pickerType    = "color"
                selectedIcon  = {this.state.icon}
                selectedColor = {this.state.color}
                handleChange  = {this.handleChange}/>
            </div>
          </Tab>

          <Tab label="Icons">
            <div style={{height: 300, paddingTop: 20}}>
              <ColorIconPicker
                ref           = "icon"
                pickerType    = "icon"
                selectedColor = {this.state.color}
                selectedIcon  = {this.state.icon}
                handleChange  = {this.handleChange}/>
            </div>
          </Tab>

        </Tabs>
      </Dialog>
    );
  }

});

