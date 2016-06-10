exports.command = function clickDropdownDelete(element) {
  return this
    .waitForElementVisible(element)
    .click(element)
    .waitForElementNotPresent('//span[@class="synicon-dots-vertical"]/preceding-sibling::span/div')
    .click('//div[contains(text(), "Delete")]')
    .pause(1000)
    .waitForElementVisible('//span[text()="Confirm"]')
    .click('//span[text()="Confirm"]')
    .waitForElementNotPresent('//iframe/following-sibling::div/div')
    .pause(1000);
};
