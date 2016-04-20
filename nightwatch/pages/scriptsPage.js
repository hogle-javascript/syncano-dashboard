import utils from '../utils';
import globals from '../globals';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/scripts`,
  elements: {
    scriptListItem: {
      selector: '//div[text()="snippet"]',
      locateStrategy: 'xpath'
    }
  }
};
