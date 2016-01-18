const _ = require('lodash');

export default {
  suffix: '_' + new Date().getTime() + _.random(0, 99999),
  addSuffix(text) {
    if (typeof text === 'undefined') {
      return this.suffix;
    }
    return text.toString() + this.suffix;
  },
  testBaseUrl() {
    return 'https://localhost:8080';
  }
};
