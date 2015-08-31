import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import DataViewsActions from './DataViewsActions';
import DataViewDialogStore from './DataViewDialogStore';
import ClassesActions from '../Classes/ClassesActions';
import ClassesStore from '../Classes/ClassesStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'DataViewDialog',

  mixins: [
    Reflux.connect(DataViewDialogStore),
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    name: {
      presence: true
    },
    class: {
      presence: true
    }
  },

  isEnabled(list, field) {
    if (!list) {
      return false;
    }
    return list.replace(/ /g, '').split(',').indexOf(field) > -1;
  },

  handleDialogShow() {
    console.info('DataViewDialog::handleDialogShow');
    ClassesActions.fetch();
  },

  handleAddSubmit() {
    DataViewsActions.createDataView({
      name: this.state.name,
      class: this.state.class,
      description: this.state.description,
      order_by: this.state.order_by,
      page_size: this.state.page_size,
      fields: this.state.fields,
      expand: this.state.expand
    });
  },

  handleEditSubmit() {
    DataViewsActions.updateDataView(
      this.state.name, {
        class: this.state.class,
        description: this.state.description,
        order_by: this.state.order_by,
        page_size: this.state.page_size,
        fields: this.state.fields,
        expand: this.state.expand
      }
    );
  },

  handleToggle(fieldsType, fieldName, event, value) {
    console.info('DataViewDialog::handleToggle', arguments);

    let genList = (list, name, val) => {
      let arr = list.replace(/ /g, '').split(',').filter((listItem) => listItem);

      if (val) {
        arr.push(name);
      } else {
        arr = arr.filter((arrItem) => arrItem !== name);
      }

      return arr.join(',');
    };

    let fields = '';

    if (fieldsType === 'showFields') {
      fields = genList(this.state.fields, fieldName, value);
      this.setState({fields});
    }
    if (fieldsType === 'expandFields') {
      fields = genList(this.state.expand, fieldName, value);
      this.setState({expand: fields});
    }
  },

  renderFields() {
    console.info('DataViewDialog::renderFields', this.state.class);

    let fields = [
      <div className='row' style={{marginBottom: 20}}>
        <div className='col-flex-1'>Class Fields</div>
        <div className='col-xs-8'>Expand</div>
      </div>
    ];

    if (this.state.class) {
      return fields.concat(ClassesStore.getClassFields(this.state.class).map((field) => {
        return (
          <div className='row'>
            <div className='col-flex-1'>
              <MUI.Toggle
                key={field.name}
                name={field.name}
                value={field.name}
                label={field.name}
                defaultToggled={this.isEnabled(this.state.fields, field.name)}
                onToggle={this.handleToggle.bind(this, 'showFields', field.name)}
                />
            </div>
            <div className='col-xs-8'>
              <Common.Show if={field.type === 'reference'}>
                <MUI.Checkbox
                  name="expand"
                  defaultChecked={this.isEnabled(this.state.expand, field.name)}
                  disabled={!this.isEnabled(this.state.fields, field.name)}
                  onCheck={this.handleToggle.bind(this, 'expandFields', field.name)}
                  />
              </Common.Show>
            </div>
          </div>
        )
      }))
    }
  },

  renderOptions() {
    console.info('DataViewDialog::renderOrderBy', this.state.class);
    let orderField = <div style={{paddingTop: '24px'}}>Add schema fields with order index</div>;
    let orderFields = ClassesStore.getClassOrderFieldsPayload(this.state.class);

    if (orderFields.length > 0) {
      orderField = (
        <MUI.SelectField
          ref="order_by"
          name="order_by"
          floatingLabelText="Order by"
          fullWidth={true}
          valueLink={this.linkState('order_by')}
          errorText={this.getValidationMessages('order_by').join(' ')}
          valueMember="payload"
          displayMember="text"
          menuItems={orderFields} />
      );
    }

    return [
      <div>Response options</div>,
      orderField,
      <MUI.TextField
        ref='page_size'
        name='page_size'
        fullWidth={true}
        valueLink={this.linkState('page_size')}
        errorText={this.getValidationMessages('page_size').join(' ')}
        hintText='Number'
        floatingLabelText='Number of records in data set'/>
    ]
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Add';
    let dialogStandardActions = [
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        type="submit"
        key="confirm"
        label="Confirm"
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    let fields = null;
    let options = null;

    if (this.state.class) {
      fields = this.renderFields();
      options = this.renderOptions();
    }

    return (
      <form
        onSubmit={this.handleFormValidation}
        method="post"
        acceptCharset="UTF-8">
        <Common.Dialog
          ref='dialog'
          title={title + ' a Data Endpoint'}
          openImmediately={this.props.openImmediately}
          actions={dialogStandardActions}
          onShow={this.handleDialogShow}
          onDismiss={this.resetDialogState}
          modal={true}>

          <div>
            {this.renderFormNotifications()}
            <div>Main settings</div>
            <div className='row'>
              <div className='col-xs-12'>
                <MUI.TextField
                  ref='name'
                  name='name'
                  fullWidth={true}
                  disabled={this.hasEditMode()}
                  valueLink={this.linkState('name')}
                  errorText={this.getValidationMessages('name').join(' ')}
                  hintText='Name of the endpoint'
                  floatingLabelText='Endpoint'/>
              </div>
              <div className='col-flex-1' style={{paddingLeft: 15}}>
                <MUI.TextField
                  ref='description'
                  name='description'
                  fullWidth={true}
                  valueLink={this.linkState('description')}
                  errorText={this.getValidationMessages('description').join(' ')}
                  hintText='Description of the endpoint'
                  floatingLabelText='Description'/>
              </div>
            </div>
            <div className='row'>
              <div className='col-flex-1'>
                <MUI.SelectField
                  ref="class"
                  name="class"
                  fullWidth={true}
                  floatingLabelText="Class"
                  valueLink={this.linkState('class')}
                  errorText={this.getValidationMessages('class').join(' ')}
                  valueMember="payload"
                  displayMember="text"
                  menuItems={this.state.classes}/>
              </div>
            </div>
            <div className="row" style={{marginTop: 30}}>
              <div className="col-flex-1">
                {fields}
              </div>
              <div className="col-flex-1" style={{paddingLeft: 40}}>
                {options}
              </div>
            </div>
          </div>
        </Common.Dialog>
      </form>
    );
  }
});

