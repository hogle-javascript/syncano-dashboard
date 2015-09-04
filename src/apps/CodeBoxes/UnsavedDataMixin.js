import _ from 'lodash';

export default {

  componentDidMount() {
    if (!_.isFunction(this.isSaved)) {
      throw Error('invalid `isSaved` type. Expected type: function');
    }
    if (!_.isFunction(this.initDialogs)) {
      throw Error('invalid `initDialogs` type. Expected type: function');
    }
  },

  statics: {
    willTransitionFrom(transition, component) {
      if (!component.isSaved() && !component.state.ignoreUnsavedChanges) {
        transition.abort();
        component.showDialog('unsavedCodeBoxWarn');
        component.state.interuptedTransitionPath = transition.path
      }
    }
  },

  getInitialState() {
    return {
      ignoreUnsavedChanges: false
    }
  },

  handleContinueTransition() {
    this.setState({
      ignoreUnsavedChanges: true
    });
    this.transitionTo(this.state.interuptedTransitionPath);
    this.hideDialogs(true);
  }
};
