module.exports = {}

module.exports.toggleMenuMixin = {

  handleClickOutside(evt) {
    this.clearMenuVisability();
  },

  toggleMenu(name, e) {
    e.stopPropagation();

    let state = {};
    state[name] = !this.state[name];

    this.setState(state);
  },

  clearMenuVisability() {
    let newState = {};
    this.state.toggleArgs.map(function(item) {
      newState[item] = false;
    });
    this.setState(newState);
  }
}


module.exports.dropdownClickMixin = {

  handleClick(e) {
    this.props.handleClick(this.props.action.name);
    e.stopPropagation();
    //ViewActions.closeDropdown();

    //let action = this.props.action.name;
    //if (Constants.VIEW_MODES.indexOf(Constants.VIEW_ACTIONS_MAP[action]) != -1) {
    //  ViewActions.updateViewMode(this.props.list.uuid, action);
    //}
    //if (Constants.SORT_MODES.indexOf(action) != -1) {
    //  ViewActions.updateSortMode(this.props.list.uuid, action);
    //}
  },
}
