import React from 'react';
import Reflux from 'reflux';
import Select from 'react-select';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './CreateDialogActions';
import Store from './CreateDialogStore';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'SolutionDialog',

  mixins: [
    Reflux.connect(Store),

    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    label: {
      presence: true,
      length: {
        minimum: 5
      }
    }
  },

  handleAddSubmit() {
    Actions.createSolution({
      label: this.state.label,
      description: this.state.description,
      public: this.state.public,
      tags: this.state.tags
    });
  },

  handleEditSubmit() {
    Actions.updateSolution(this.state.id, {
      label: this.state.label,
      description: this.state.description,
      public: this.state.public,
      tags: this.state.tags
    });
  },

  handleTagsListChange(tagsString, tagsArray) {
    this.setState({
      tags: tagsArray.map((item) => item.value)
    });
  },

  handleToogle(event, status) {
    let state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  render() {
    let title = this.hasEditMode() ? 'Update' : 'Create';
    let dialogCustomActions = [
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        key="confirm"
        label="Confirm"
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <Common.Dialog
        key='dialog'
        ref="dialog"
        title={`${title} a Solution`}
        defaultOpen={this.props.defaultOpen}
        onRequestClose={this.handleCancel}
        open={this.state.open}
        actions={dialogCustomActions}>
        <div>
          {this.renderFormNotifications()}
          <MUI.TextField
            ref='label'
            name='label'
            fullWidth={true}
            valueLink={this.linkState('label')}
            errorText={this.getValidationMessages('label').join(' ')}
            hintText='Short name for your Solution'
            floatingLabelText='Name' />
          <MUI.TextField
            ref='description'
            name='description'
            fullWidth={true}
            valueLink={this.linkState('description')}
            errorText={this.getValidationMessages('description').join(' ')}
            hintText='Description of a Solution (optional)'
            floatingLabelText='Description'
            className='vm-4-b'/>
          <Select
            value={this.state.tags}
            delimiter=","
            multi={true}
            allowCreate={true}
            placeholder="Select tags"
            options={Store.getTagsOptions()}
            onChange={this.handleTagsListChange}
            className='vm-3-b'/>
          <MUI.Toggle
            ref='public'
            name='public'
            defaultToggled={this.state.public}
            onToggle={this.handleToogle}
            label='Make this solution public?'/>
        </div>
      </Common.Dialog>
    );
  }
});

