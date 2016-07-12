// Custom command that clears specified element by using CTRL+A and then DELETE
// oparation. Created as a workaround for AceEditor clearing.
exports.command = function clearInput(element) {
  const mainKey = process.platform === 'darwin' ? this.Keys.COMMAND : this.Keys.CONTROL;

  return this
    .moveToElement(element, 0, 0)
    .click(element)
    .keys(mainKey)
    .keys('a')
    .keys(this.Keys.NULL)
    .pause(1000)
    .keys(this.Keys.DELETE)
    .keys(this.Keys.NULL);
};
