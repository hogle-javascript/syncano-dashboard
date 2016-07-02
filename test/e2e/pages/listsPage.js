export default {
  commands: [],
  elements: {
    addButton: {
      selector: '//span[text()="Add"]',
      locateStrategy: 'xpath'
    },
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    optionsMenu: {
      selector: '//span[@class="synicon-dots-vertical"]',
      locateStrategy: 'xpath'
    },
    selectedItem: {
      selector: '//span[@class="synicon-checkbox-marked-outline"]',
      locateStrategy: 'xpath'
    },
    emptyListItem: {
      selector: '.empty-list-item'
    },
    deleteTitleHeading: {
      selector: '//h3[contains(text(),"Delete a")]',
      locateStrategy: 'xpath'
    },
    firstItemCheckbox: {
      selector: '(//span[@class="synicon-arrow-up-bold"])[1]',
      locateStrategy: 'xpath'
    },
    highlightedCheckbox: {
      selector: '//span[@class="synicon-checkbox-blank-outline"]',
      locateStrategy: 'xpath'
    },
    firstItemOptionsMenu: {
      selector: '(//span[@class="synicon-dots-vertical"])[2]',
      locateStrategy: 'xpath'
    },
    firstItemRowName: {
      selector: '(//div[@class="col-xs-12"]/div)[2]',
      locateStrategy: 'xpath'
    },
    firstItemRowDescription: {
      selector: '(//div[@class="description-field col-flex-1"])[1]',
      locateStrategy: 'xpath'
    },
    addTitleHeading: {
      selector: '//h3[contains(text(),"Add a")]',
      locateStrategy: 'xpath'
    },
    inputName: {
      selector: 'input[name="name"]'
    },
    inputContentType: {
      selector: 'input[name="content_type"]'
    },
    inputLabel: {
      selector: 'input[name="label"]'
    },
    inputRegistrationId: {
      selector: 'input[name="registration_id"]'
    },
    inputDeviceId: {
      selector: 'input[name="device_id"]'
    },
    firstAndroidCheckbox: {
      selector: '(//span[contains(@class, "synicon-android")]/../../../button[@type="button"])[1]',
      locateStrategy: 'xpath'
    },
    firstAppleCheckbox: {
      selector: '(//span[@class="synicon-apple"])[1]',
      locateStrategy: 'xpath'
    },
    summaryDialogCloseButton: {
      selector: '//span[@class="synicon-close"]',
      locateStrategy: 'xpath'
    }
  }
};
