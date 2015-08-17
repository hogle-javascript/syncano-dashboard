module.exports = {};

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
  },
}
