import utils from '../utils';
import globals from '../globals';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/triggers`,
  elements: {
    triggersListMenu: {
      selector: '//div[@class="triggers-list"]/div[1]/div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    triggerDropdown: {
      selector: `//div[text()="${utils.addSuffix('trigger')}"]/../../../following-sibling::div[@class="col-menu"]//button`,
      locateStrategy: 'xpath'
    },
    confirm: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    triggerListItem: {
      selector: '//div[text()="trigger_123"]',
      locateStrategy: 'xpath'
    },
    addTriggerButton: {
      selector: '//button//span[text()="Add"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalTitle: {
      selector: '//h3[text()="Add a Trigger Socket"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalLabel: {
      selector: '//input[@name="label"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalSignal: {
      selector: '//div[@class="signal-dropdown"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalClass: {
      selector: '//div[@class="class-dropdown"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalScript: {
      selector: '//div[@class="script-dropdown"]',
      locateStrategy: 'xpath'
    },
    triggerTableRow: {
      selector: `//div[text()="${ utils.addSuffix('trigger')}"]`,
      locateStrategy: 'xpath'
    },
    signalTriggerTableRow: {
      selector: `//div[text()="${utils.addSuffix('trigger')}"]/../../parent::div/following-sibling::div[text()="post_update"]`,
      locateStrategy: 'xpath'
    }
  }
};
