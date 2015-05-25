jest.dontMock('../store');

describe('store', function () {
  it('have icons', function () {

    var IconStore = require('../store');

    var existingIcon = "account-child";
    var nonexistingIcon = "dummy_icon";

    var array = IconStore.getAllIcons();
    expect(array).toContain(existingIcon);
    expect(array).not.toContain(nonexistingIcon);
  })
});

describe('store', function () {
  it('have picker icons', function () {

    var IconStore = require('../store');

    var existingPickerIcon = "accessibility";
    var nonexistingPickerIcon = "dummy_icon";

    var array = IconStore.getIconPickerIcons();
    expect(array).toContain(existingPickerIcon);
    expect(array).not.toContain(nonexistingPickerIcon);
  })
});

describe('store', function () {
  it('can check if have icon', function () {

    var IconStore = require('../store');

    var existingIcon = "account-child";
    var nonexistingIcon = "dummy_icon";

    expect(IconStore.contains(existingIcon)).toBe(true);
    expect(IconStore.contains(nonexistingIcon)).not.toBe(true);

  })
});