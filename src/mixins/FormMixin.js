var Notification = require('./common/Notification/Notification.react');


var FormMixin = function (options) {

  return {
    renderErrorFeedback: function () {
      if (!this.state.errors || this.state.errors.feedback === undefined) {
        return;
      }

      return (
        <Notification type='error'>{this.state.errors.feedback}</Notification>
      );
    },

    renderFeedback: function () {
      if (!this.state.feedback || this.state.feedback === undefined) {
        return
      }

      return (
        <Notification>{this.state.feedback}</Notification>
      );
    },

    renderNotifications: function () {
      return this.renderErrorFeedback() || this.renderFeedback()
    }

  }
};

module.exports = FormMixin;