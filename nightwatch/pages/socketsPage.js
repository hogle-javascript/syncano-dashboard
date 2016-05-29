import utils from '../utils';
import globals from '../globals';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/sockets`,
  elements: {
    instancesDropdown: {
      selector: '.instances-dropdown'
    },
    cogIcon: {
      selector: '.synicon-cog'
    },
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    addCodeBoxButton: {
      selector: '//span[text()="Add"]',
      locateStrategy: 'xpath'
    },
    codeBoxSocketItem: {
      selector: '//div[text()="webhook_description"]',
      locateStrategy: 'xpath'
    },
    codeBoxSocketItemTraces: {
      selector: '//div[text()="webhook_description"]/following-sibling::div[2]/a',
      locateStrategy: 'xpath'
    },
    addCodeBoxModalTitle: {
      selector: '//div[text()="Start building your app here"]',
      locateStrategy: 'xpath'
    },
    modalNameInput: {
      selector: '//input[@name="name"]',
      locateStrategy: 'xpath'
    },
    modalDescriptionInput: {
      selector: '//input[@name="description"]',
      locateStrategy: 'xpath'
    },
    channelModalDescriptionInput: {
      selector: '//textarea[@name="description"]',
      locateStrategy: 'xpath'
    },
    addCodeBoxModalScriptDropdown: {
      selector: '//div[@class="script-dropdown"]',
      locateStrategy: 'xpath'
    },
    codeBoxTableRow: {
      selector: `//div[text()="${utils.addSuffix('script')}"]`,
      locateStrategy: 'xpath'
    },
    codeBoxTableRowDescription: {
      selector: `//div[text()="${utils.addSuffix('script')}"]/../../../following-sibling::div[1]`,
      locateStrategy: 'xpath'
    },
    deleteCodeBoxModalTitle: {
      selector: '//h3[text()="Delete a Script Endpoint"]',
      locateStrategy: 'xpath'
    },
    editCodeBoxModalTitle: {
      selector: '//h3[text()="Edit a Script Endpoint"]',
      locateStrategy: 'xpath'
    },
    dataListItem: {
      selector: '//div[text()="data_view"]',
      locateStrategy: 'xpath'
    },
    dataEndpointListItemTitle: {
      selector: '//div[text()="Data Endpoints"]',
      locateStrategy: 'xpath'
    },
    codeBoxToSelect: {
      selector: '.col-xs-12 .synicon-arrow-up-bold'
    },
    checkboxToSelect: {
      selector: '.synicon-checkbox-blank-outline'
    },
    checkboxSelected: {
      selector: '.synicon-checkbox-marked-outline'
    },
    selectMultipleButton: {
      selector: '.synicon-checkbox-multiple-marked-outline'
    },
    deselectMultipleButton: {
      selector: '.synicon-checkbox-multiple-blank-outline'
    },
    emptyListItem: {
      selector: '.empty-list-item'
    },
    emptySocketsHeading: {
      selector: '//div[text()="Start building your app here"]',
      locateStrategy: 'xpath'
    },
    channelSocketsListTitle: {
      selector: '//div[text()="Channels"]',
      locateStrategy: 'xpath'
    },
    addChannelButton: {
      selector: '//span[@class="synicon-socket-channel"]',
      locateStrategy: 'xpath'
    },
    addChannelModalTitle: {
      selector: '//h3[text()="Add a Channel Socket"]',
      locateStrategy: 'xpath'
    },
    editChannelModalTitle: {
      selector: '//h3[text()="Edit a Channel Socket"]',
      locateStrategy: 'xpath'
    },
    deleteChannelModalTitle: {
      selector: '//h3[text()="Delete a Channel Socket"]',
      locateStrategy: 'xpath'
    },
    channelTableRow: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]`,
      locateStrategy: 'xpath'
    },
    selectChannelTableRow: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]/../../div[1]/span`,
      locateStrategy: 'xpath'
    },
    channelTableRowDescription: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]/../../../following-sibling::div[1]`,
      locateStrategy: 'xpath'
    },
    channelSocketDropDown: {
      selector: `//div[text()="${utils.addSuffix('channel')}"]/../../../..//button`,
      locateStrategy: 'xpath'
    },
    addScriptEndpoint: {
      selector: '//div[text()="Script Endpoint"]/following::div[2]',
      locateStrategy: 'xpath'
    },
    addScriptButton: {
      selector: '//button//span[text()="Add"]',
      locateStrategy: 'xpath'
    },
    addApnsSocket: {
      selector: '//div[text()="APNS Push Notifications (BETA)"]/following::div[2]',
      locateStrategy: 'xpath'
    },
    uploadApnsDevCert: {
      selector: 'input[name="hiddenInput"]'
    },
    addGcmSocket: {
      selector: '//div[text()="GCM Push Notifications (BETA)"]/following::div[2]',
      locateStrategy: 'xpath'
    },
    inputGcmDevKey: {
      selector: 'input[name="development_api_key"]'
    },
    gcmSocket: {
      selector: '//div[text()="Google Cloud Messaging (GCM)"]',
      locateStrategy: 'xpath'
    },
    inputGcmProdKey: {
      selector: 'input[name="production_api_key"]'
    },
    apnsBundleInput: {
      selector: '//label[text()="Bundle Identifier"]/../input',
      locateStrategy: 'xpath'
    },
    apnsCertNameInput: {
      selector: '//label[text()="Apple Push Notification Certificate Name"]/../input',
      locateStrategy: 'xpath'
    },
    apnsSocket: {
      selector: '//div[text()="Apple Push Notification service (APNs)"]',
      locateStrategy: 'xpath'
    },
    removeCert: {
      selector: '//div[@class="row"]//span[@class="synicon-close"]',
      locateStrategy: 'xpath'
    },
    certDragAndDrop: {
      selector: '(//span[@class="synicon-cloud-upload"]/following-sibling::div)[2]',
      locateStrategy: 'xpath'
    },
    gcmTitleHeading: {
      selector: '//h3[text()="Configure Push Notification Socket - GCM"]',
      locateStrategy: 'xpath'
    },
    socketsDropDownAll: {
      selector: '//span[text()="Sockets:"]/../..//div[text()="All"]',
      locateStrategy: 'xpath'
    }
  }
};
