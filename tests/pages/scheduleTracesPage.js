import Globals from '../globals';

module.exports = {
  url: `https://localhost:8080/#/instances/${Globals.instanceName}/tasks/schedule/1/traces`,
  elements: {
    lastTraceDate: {
      selector: '//div[@class="col-date"]/span[1]',
      locateStrategy: 'xpath'
    },
    lastTraceTime: {
      selector: '//div[@class="col-date"]/span[2]',
      locateStrategy: 'xpath'
    }
  }
};
