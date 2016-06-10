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
  },
  jinjaTemplate() {
    return `{% set objects = response.objects %}{% if objects %}{{- timestamp -}}{{',' -}}{% for object in objects %}
      {% for key, value in object.iteritems() %}{{- key -}}{{',' -}}{% endfor %}{% endfor %}{% endif %}`;
  },
  randomString(length) {
    const possible = 'ABCDEFabcdef0123456789';
    let apiKey = '';

    for (let i = 0; i < length; i++) {
      apiKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return apiKey;
  },
  randomInt(min, max) {
    return Math.floor((Math.random() * max) + min);
  },
  getGreyedOutStyle(client) {
    if (client.capabilities.browserName === 'chrome') {
      return 'color: rgba(0, 0, 0, 0.298039)';
    } else if (client.capabilities.browserName === 'firefox') {
      return 'color: rgba(0, 0, 0, 0.3)';
    }
  }
};
