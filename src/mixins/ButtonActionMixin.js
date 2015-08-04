export default {
  handleButtonClick(buttonName) {
    let buttons = this.buttons;

    if (typeof buttons === 'function') {
      buttons = buttons.call(this);
    }

    let buttonConf = buttons[buttonName],
      params = typeof buttonConf.params === 'function' ? buttonConf.params() : buttonConf.params;
    buttonConf.action(params);
  },
};
