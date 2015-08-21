import React from 'react';
import objectAssign from 'object-assign';
import validate from 'validate.js';

import Notification from '../common/Notification/Notification.react';

validate.moment = require('moment');

export default {

  getInitialState() {
    return this.getInitialFormState();
  },

  getInitialFormState() {
    return {
      errors: {},
      feedback: null,
      canSubmit: true
    }
  },

  renderFormErrorFeedback() {
    if (!this.state.errors || typeof this.state.errors.feedback === 'undefined') {
      return;
    }

    return <Notification type='error'>{this.state.errors.feedback}</Notification>;
  },

  renderFormFeedback() {
    if (!this.state.feedback || typeof this.state.feedback === 'undefined') {
      return
    }

    return <Notification>{this.state.feedback}</Notification>;
  },

  renderFormNotifications() {
    return this.renderFormErrorFeedback() || this.renderFormFeedback()
  },

  resetForm() {
    this.setState(this.getInitialFormState());
  },

  validate(...args) {
    let key = null;
    let callback = null;
    let constraints = this.validatorConstraints || {};
    let attributes = this.getValidatorAttributes || this.state;

    if (typeof constraints === 'function') {
      constraints = constraints.call(this);
    }

    if (typeof attributes === 'function') {
      attributes = attributes.call(this);
    }

    // f***ing js
    if (key !== null) {
      let keyConstraints = {};
      let keyAttributes  = {};

      keyConstraints[key] = constraints[key];
      constraints = keyConstraints;
      keyAttributes[key] = attributes[key];
      attributes = keyAttributes;
    }

    let errors = objectAssign(
      {},
      (key !== null) ? this.state.errors : {},
      validate(attributes, constraints)
    );

    this.setState({errors}, this._invokeCallback.bind(this, key, callback));
  },

  handleFormValidation(event) {
    if (event) {
      event.preventDefault();
    }

    // FormMixin compatibility
    if (typeof this.state.canSubmit !== 'undefined' && this.state.canSubmit === false) {
      return;
    }

    this.validate(function(isValid, errors) {
      if (isValid === true) {
        if (typeof this.handleSuccessfullValidation !== 'undefined') {
          this.handleSuccessfullValidation.call(this)
        }
      } else if (typeof this.handleFailedValidation !== 'undefined') {
        this.handleFailedValidation.call(this, errors);
      }
    }.bind(this));
  },

  handleValidation(key, callback) {
    return function(event) {
      event.preventDefault();
      this.validate(key, callback);
    }.bind(this);
  },

  getValidationMessages(key) {
    let errors = this.state.errors || {};

    if (Object.keys(errors).length === 0) {
      return [];
    }

    if (typeof key === 'undefined') {
      let flattenErrors = [];

      for (let error in errors) {
        flattenErrors.push.apply(flattenErrors, errors[error]);
      }
      return flattenErrors;
    }

    return errors[key] ? errors[key] : [];
  },

  clearValidations() {
    this.setState({
      errors: {}
    });
  },

  isInputDisabled(inputName) {
    let hasProtectedFromEditProperty = this.state.protectedFromEdit;

    if (hasProtectedFromEditProperty && hasProtectedFromEditProperty.fields) {
      return hasProtectedFromEditProperty.fields.indexOf(inputName) > -1;
    }
    return false;
  },

  isValid(key) {
    return typeof this.state.errors[key] === 'undefined' || this.state.errors[key] === null;
  },

  _invokeCallback(key, callback) {
    if (typeof callback !== 'function') {
      return;
    }

    if (typeof key !== 'undefined') {
      callback(this.isValid(key), this.state.errors[key]);
    } else {
      callback(Object.keys(this.state.errors).length === 0, this.state.errors);
    }
  }

};
