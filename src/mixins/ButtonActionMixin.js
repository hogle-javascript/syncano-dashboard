var ButtonActionMixin = {
  handleButtonClick: function (buttonName) {
    var buttons = this.buttons;

    if (typeof buttons === 'function') {
      buttons = buttons.call(this);
    }

    var buttonConf = buttons[buttonName],
        params = typeof buttonConf.params === 'function' ? buttonConf.params(): buttonConf.params;
    buttonConf.action(params);
  },
};

module.exports = ButtonActionMixin;