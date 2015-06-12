jest.dontMock("../IconStore");

describe("Icon store", function () {
  beforeEach(function() {
    IconStore = require("../IconStore");
    
    // Test data
    existingIcon = "account-child";
    nonExistingIcon = "dummy_icon";
  });

  it("tests Icon store methods", function() {
    var allIcons = IconStore.getAllIcons();
    var pickerIcons = IconStore.getIconPickerIcons();
    expect(allIcons.length).toBeGreaterThan(0);
    expect(pickerIcons.length).toBeGreaterThan(0);
    expect(IconStore.contains(existingIcon)).toBeTruthy();
    expect(IconStore.contains(nonExistingIcon)).toBeFalsy();
  });

  it("tests if allIcons store contain icons", function () {
    var array = IconStore.getAllIcons();
    expect(array).toContain(existingIcon);
    expect(array).not.toContain(nonExistingIcon);
  });

  it("tests if pickerIcons store contain icons", function() {
    var array = IconStore.getIconPickerIcons();
    expect(array).toContain(existingIcon);
    expect(array).not.toContain(nonExistingIcon);
  });

});