import globals from '../globals';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/script-endpoints/${globals.scriptEndpointName}/traces`,
  elements: {
    instancesDropdown: {
      selector: '.instances-dropdown'
    },
    scriptEndpointTracesEmptyView: {
      selector: '//span[text()="There are no traces for this "]',
      locateStrategy: 'xpath'
    }
  }
};
