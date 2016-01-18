const _ = require('lodash');

export default {
  suffix: '_' + new Date().getTime() + _.random(0, 99999),
  addSuffix(text) {
    if (typeof text === 'undefined') {
      return this.suffix;
    }
    return text.toString() + this.suffix;
  },
  // Method to determine wether to use COMMAND or CONTROL key
  // Based on the operating system. The unicode values are taken from the W3 Webdriver spec:
  // https://www.w3.org/TR/webdriver/#character-types
  cmdOrCtrl() {
    if (process.platform === 'darwin') {
      return '\uE03D';
    }
    return '\uE009';
  },
  testBaseUrl() {
    return 'https://localhost:8080';
  }
};
