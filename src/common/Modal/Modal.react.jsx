var React         = require('react');
var classNames    = require('classnames');

//var ViewActions   = require('../actions/ViewActions');
//var ServerActions = require('../actions/ServerActions');

//var InstanceStore = require('../stores/InstanceStore');
//var ModalStore    = require('../stores/ModalStore');
//var ErrorStore    = require('../stores/ErrorStore');

var FieldList     = require('../Field/FieldList.react');
var Tabs          = require('../Tabs/Tabs.react');
var ButtonGroup   = require('../Button/ButtonGroup.react');
var ProgressBar   = require('../ProgressBar/ProgressBar.react');
var ColorPicker   = require('../Color/ColorPicker.react');
var IconPicker    = require('../Icon/IconPicker.react');


require('./Modal.css');

module.exports = React.createClass({

  displayName: 'Modal',

  getInitialState: function() {
    return {
      modal: ModalStore.getModal(),
      errorFields: ErrorStore.getErrorFields(),
    }
  },

  componentDidMount: function() {
    ErrorStore.addChangeListener(this.onErrorStoreChange);
    ModalStore.addChangeListener(this.onModalStoreChange);
  },

  componentWillUnmount:function(){
    ErrorStore.removeChangeListener(this.onErrorStoreChange);
    ModalStore.removeChangeListener(this.onModalStoreChange);
  },

  onErrorStoreChange: function() {
    this.setState({errorFields: ErrorStore.getErrorFields()});
  },

  onModalStoreChange: function() {
    this.setState({modal: ModalStore.getModal()});
  },

  onModalGroupClick: function() {
    ViewActions.closeModal();
    ViewActions.closeFieldOptions();
  },

  onModalClick: function(e) {
    e.stopPropagation();
    ViewActions.closeFieldOptions();
  },

  getFormData: function() {
    var formData = {};
    this.state.modal.fields.forEach(function(field){
      var value;
      var input = this.refs.fieldList.refs[field.name].refs.input;
      if (field.type === "password" || field.name === "source") {
        value = input.getDOMNode().value;
      } else if (field.type === "select") {
        value = this.refs.fieldList.refs[field.name].state.selectedOptionName;
      } else if (field.name === "schema") {
        value = JSON.stringify(input.getDOMNode().value);
      } else {
        value = input.getDOMNode().textContent;
      }
      formData[field.name] = value;
    }.bind(this));
    return formData;
  },

  handleButtonClick: function(action) {
    ViewActions.modalLoading();
    if (action === "confirm" && this.state.modal.intent === "create") {
      ServerActions.createResource(this.state.modal.resourceType, this.getFormData());
    } else if (action === "confirm" && this.state.modal.intent === "update") {
      ServerActions.updateResource(this.state.modal.resourceWrapper, this.getFormData());
    } else if (action === "confirm" && this.state.modal.intent === "delete") {
      ServerActions.deleteResource(this.state.modal.resourceWrapper);
    } else if (action === "confirm" && this.state.modal.intent === "customize") {
      ServerActions.updateResource(this.state.modal.resourceWrapper, {metadata: {
        color: this.state.modal.color || this.state.modal.resourceWrapper.data.metadata.color,
        icon: this.state.modal.icon || this.state.modal.resourceWrapper.data.metadata.icon
      }});
    } else if (action === "cancel") {
      ViewActions.closeModal();
    }
  },

  handleTabClick: function(tabName) {
    ViewActions.switchModalTab(tabName)
  },

  render: function() {
    var backgroundCSSClasses = classNames('modal-group', {
      'modal-visible': this.state.modal.visible,
      'modal-loading': this.state.modal.loading,
    });
    var modalCSSClasses = classNames('modal',
      ['modal', this.state.modal.intent, this.state.modal.resourceType].join('-'),
      ['modal', this.state.modal.intent].join('-'));
    var buttons = [{
      name: "cancel",
      displayName: "Cancel",
      type: "flat",
    }, {
      name: "confirm",
      displayName: "Confirm",
      type: "flat",
      isDefault: true,
    }];
    var tabs = [{
      name: "customizeColor",
      displayName: "Color",
    },{
      name: "customizeIcon",
      displayName: "Icon",
    }];
    if (this.state.modal.visible && this.state.modal.intent === "customize") {
      var customizeTabComponent;
      var selectedColor = this.state.modal.color || this.state.modal.resourceWrapper.data.metadata.color;
      var selectedIcon = this.state.modal.icon || this.state.modal.resourceWrapper.data.metadata.icon;
      if (this.state.modal.tab === "customizeColor") {
        customizeTabComponent = <ColorPicker {...this.props} selectedColor={selectedColor} />;
      } else if (this.state.modal.tab === "customizeIcon") {
        customizeTabComponent = <IconPicker {...this.props} selectedIcon={selectedIcon} />;
      }
      return (
        <div className={backgroundCSSClasses} ref="modalGroup" onClick={this.onModalGroupClick}>
          <div className={modalCSSClasses} ref="modal" onClick={this.onModalClick}>
            <div className="modal-header">
              <h1>{this.state.modal.title}</h1>
            </div>
            <Tabs tabs={tabs} activeTab={this.state.modal.tab} handleTabClick={this.handleTabClick} />
            {customizeTabComponent}
            <div className="modal-footer">
              <ButtonGroup buttons={buttons} handleClick={this.handleButtonClick} />
            </div>
            <ProgressBar />
          </div>
        </div>
      );
    } else if (this.state.modal.visible && (this.state.modal.intent === "create" || this.state.modal.intent === "update")) {
      return (
        <div className={backgroundCSSClasses} ref="modalGroup" onClick={this.onModalGroupClick}>
          <div className={modalCSSClasses} ref="modal" onClick={this.onModalClick}>
            <div className="modal-header">
              <h1>{this.state.modal.title}</h1>
            </div>
            <div className="modal-content">
              <FieldList {...this.props} fields={this.state.modal.fields} errorFields={this.state.errorFields} ref="fieldList" />
            </div>
            <div className="modal-footer">
              <ButtonGroup buttons={buttons} handleClick={this.handleButtonClick} />
            </div>
            <ProgressBar />
          </div>
        </div>
      );
    } else if (this.state.modal.visible && this.state.modal.intent === "delete") {
      return (
        <div className={backgroundCSSClasses} ref="modalGroup" onClick={this.onModalGroupClick}>
          <div className={modalCSSClasses} ref="modal" onClick={this.onModalClick}>
            <div className="modal-header">
              <h1>{this.state.modal.title}</h1>
            </div>
            <div className="modal-content">
              <p>{this.state.modal.text}</p>
            </div>
            <div className="modal-footer">
              <ButtonGroup buttons={buttons} handleClick={this.handleButtonClick} />
            </div>
            <ProgressBar />
          </div>
        </div>
      );
    } else {
      return (
        <div className={backgroundCSSClasses} ref="modalGroup" onClick={this.onModalGroupClick}></div>
      );
    }
  }

});