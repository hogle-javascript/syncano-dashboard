export default {
  elements: {
    androidDevicesHeading: {
      selector: '//span[text()="Android Devices"]',
      locateStrategy: 'xpath'
    },
    iosDevicesHeading: {
      selector: '//span[text()="iOS Devices"]',
      locateStrategy: 'xpath'
    },
    firstDevice: {
      selector: '(//div[@class="col-sm-14"]/div/div/div)[1]',
      locateStrategy: 'xpath'
    },
    apiTab: {
      selector: 'a[name="raw-tab"]'
    },
    apiContentTextarea: {
      selector: '//label/../div/textarea',
      locateStrategy: 'xpath'
    },
    apiPostButton: {
      selector: '(//button[text()="POST"])[2]',
      locateStrategy: 'xpath'
    },
    apiResponseHeader: {
      selector: '//span[@class="meta nocode"]/b[1]',
      locateStrategy: 'xpath'
    },
    apiResponseBody: {
      selector: '//span[contains(@class, "str") and contains(text(), "registration_ids")]/following-sibling::span[@class="str"][1]',
      locateStrategy: 'xpath'
    }
  }
};
