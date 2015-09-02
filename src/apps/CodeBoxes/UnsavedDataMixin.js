import Actions from './CodeBoxActions';

export default {

  statics: {
    willTransitionFrom(transition, component) {
      if (!component.isSaved()) {
        transition.abort();
        component.showDialog('unsavedCodeBoxWarn');
        component.state.interuptedTransitionPath = transition.path
      }
    }
  },

  handleSaveAndLeave() {
    let unsavedData = {};

    if (this.isActive('codebox-config')) {
      unsavedData = {config: this.refs.editorConfig.editor.getValue()};
    } else {
      unsavedData = {source: this.refs.editorSource.editor.getValue()};
    }

    Actions.updateCodeBox(this.state.currentCodeBox.id, unsavedData).then(() => {
      this.transitionTo(this.state.interuptedTransitionPath);
      this.hideDialogs(true);
    })
  },

  isSaved() {
    let initialCodeBoxData = null;
    let currentCodeBoxData = null;

    if (this.isActive('codebox-config')) {
      initialCodeBoxData = JSON.stringify(this.state.currentCodeBox.config, null, 2);
      currentCodeBoxData = this.refs.editorConfig.editor.getValue();
    } else {
      initialCodeBoxData = this.state.currentCodeBox.source;
      currentCodeBoxData = this.refs.editorSource.editor.getValue();
    }

    return initialCodeBoxData === currentCodeBoxData;
  }
};
