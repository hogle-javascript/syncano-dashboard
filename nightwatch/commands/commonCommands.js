export default {
  clickButton(button, client) {
    return [
      this
        .waitForElementPresent(button)
        .click(button),
      client.pause(1000)
    ]
  },
  selectFromDropdown(field, value, client) {
    return [
      this.waitForElementVisible(field).click(field),
      client.pause(1000),
      this.waitForElementVisible(value).click(value),
      client.pause(1000)
    ]
  },
  fillInputField(field, value, client) {
    return [
      this
        .waitForElementVisible(field)
        .clearValue(field)
        .setValue(field, value),
      client.pause(1000)
    ]
  },
  clickDropdown(element, client) {
    return [
      this
        .waitForElementVisible(element)
        .waitForElementNotPresent({
          selector: '//span[@class="synicon-dots-vertical"]/preceding-sibling::span/div',
          locateStrategy: 'xpath'
        })
        .click(element),
      client.pause(1000)
    ]
  }
};
