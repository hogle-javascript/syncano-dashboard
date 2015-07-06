var React        = require('react'),
    objectAssign = require('object-assign'),
    validate     = require('validate.js'),

    Notification = require('../common/Notification/Notification.react');

validate.moment = require('moment');

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
  },

  validate: function(key, callback) {
    if (typeof key === 'function') {
      callback = key;
      key = undefined;
    }

    var constraints = this.validatorConstraints   || {},
        attributes  = this.getValidatorAttributes || this.state;

    if (typeof constraints === 'function') {
      constraints = constraints.call(this);
    }

    if (typeof attributes === 'function') {
      attributes = attributes.call(this);
    }

    // f***ing js
    if (key !== undefined) {
      var keyConstraints = {},
          keyAttributes  = {};

      keyConstraints[key] = constraints[key];
      constraints         = keyConstraints;
      keyAttributes[key]  = attributes[key];
      attributes          = keyAttributes;
    }

    var errors = objectAssign(
      {},
      (key !== undefined) ? this.state.errors : {},
      validate(attributes, constraints)
    );

    this.setState({
      errors: errors
    }, this._invokeCallback.bind(this, key, callback));

  },

  handleFormValidation: function(event) {
    event.preventDefault();

    // FormMixin compatibility
    if (this.state.canSubmit !== undefined && this.state.canSubmit === false) {
      return;
    }

    this.validate(function(isValid, errors) {
      if (isValid === true) {
        if (this.handleSuccessfullValidation !== undefined) {
          this.handleSuccessfullValidation.call(this)
        }
      } else if (this.handleFailedValidation !== undefined) {
        this.handleFailedValidation.call(this, errors);
      }
    }.bind(this));
  },

  handleValidation: function(key, callback) {
    return function(event) {
      event.preventDefault();
      this.validate(key, callback);
    }.bind(this);
  },

  getValidationMessages: function(key) {
    var errors = this.state.errors || {};

    if (Object.keys(errors).length === 0) {
      return [];
    }

    if (key === undefined) {
      var flattenErrors = [];
      for (var error in errors) {
        flattenErrors.push.apply(flattenErrors, errors[error]);
      }
      return flattenErrors;
    }

    return errors[key] ? errors[key] : [];
  },

  clearValidations: function() {
    this.setState({
      errors: {}
    });
  },

  isInputDisabled: function(inputName) {
    var hasProtectedFromEditProperty = this.state.protectedFromEdit;
    if (hasProtectedFromEditProperty && hasProtectedFromEditProperty.fields) {
      return hasProtectedFromEditProperty.fields.indexOf(inputName) > -1;
    }
    return false;
  },

  isValid: function(key) {
    return this.state.errors[key] === undefined || this.state.errors[key] === null;
  },

  _invokeCallback: function(key, callback) {
    if (typeof callback !== 'function') {
      return;
    }

    if (key !== undefined) {
      callback(this.isValid(key), this.state.errors[key]);
    } else {
      callback(Object.keys(this.state.errors).length === 0, this.state.errors);
    }
  }

};

module.exports = FormMixin;
