var React        = require('react'),
    Notification = require('../common/Notification/Notification.react');


var FormMixin = {

  getInitialState: function() {
    return this.getInitialFormState();
  },

  getInitialFormState: function() {
    return {
      errors    : {},
      feedback  : null,
      canSubmit : true
    }
  },

  renderFormErrorFeedback: function() {
    if (!this.state.errors || this.state.errors.feedback === undefined) {
      return;
    }

    return <Notification type='error'>{this.state.errors.feedback}</Notification>;
  },

  renderFormFeedback: function() {
    if (!this.state.feedback || this.state.feedback === undefined) {
      return
    }

    return <Notification>{this.state.feedback}</Notification>;
  },

  renderFormNotifications: function() {
    return this.renderFormErrorFeedback() || this.renderFormFeedback()
  },

  resetForm: function() {
    this.setState(this.getInitialFormState());
  }

};

module.exports = FormMixin;