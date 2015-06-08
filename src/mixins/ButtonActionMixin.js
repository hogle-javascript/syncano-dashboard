var ButtonActionMixin = {
  handleButtonClick: function (buttonName) {
    var buttonConf = this.genButtons()[buttonName],
        params = typeof buttonConf.params === 'function' ? buttonConf.params(): buttonConf.params;
    buttonConf.action(params);
  },
};

module.exports = ButtonActionMixin;