jest.dontMock("../IconPickerItem.react");
jest.dontMock("../Icon.react")
jest.dontMock("../store");

describe("IconPicker", function () {
  beforeEach(function() {
    React = require("react/addons");
    TestUtils = React.addons.TestUtils;
    IconPickerItem = require("../IconPickerItem.react");

    // Test data
    mockFn = jest.genMockFn();
  });

  it("tests css classes and if props are correctly applied", function () {
  	// Check if class 'selected' is not applied
    var component = TestUtils.renderIntoDocument(<IconPickerItem />);
    var node = React.findDOMNode(component);
    expect(node.className).toBe("icon-picker-list-item");
    expect(node.className).not.toContain("selected");

    // Check if 'selected' css class is applied if props selected is equal 'true'
    var component = TestUtils.renderIntoDocument(<IconPickerItem selected={true} />);
    var node = React.findDOMNode(component);
    expect(node.className).toBe("icon-picker-list-item icon-picker-list-item-selected");
  });

  it("tests if 'selected' props is correctly manipulate 'selected' state", function() {
  	// Check behaviour of state if 'selected' props is not defined
    var component = TestUtils.renderIntoDocument(<IconPickerItem />);
    expect(component.props.selected).toBeUndefined();
    expect(component.state.selected).toBeDefined();
    expect(component.state.selected).toBeFalsy();

    // Check 'selected' state if 'selected' props is defined
    var component = TestUtils.renderIntoDocument(<IconPickerItem selected={true} />);
    expect(component.props.selected).toBeDefined();
    expect(component.props.selected).toBeTruthy();
    expect(component.state.selected).toBeDefined();
    expect(component.state.selected).toBeTruthy();
  });

  it("tests component handleClick() method", function() {
    // Test if click event occur handleClick() method wont be called (props undefined)
  	var component = TestUtils.renderIntoDocument(<IconPickerItem />);
  	var node = React.findDOMNode(component);
  	TestUtils.Simulate.click(node);
  	expect(mockFn).not.toBeCalled();

  	// Test if click event occur it calls handleClick() method 
  	var component = TestUtils.renderIntoDocument(<IconPickerItem handleClick={mockFn} />);
  	var node = React.findDOMNode(component);
  	TestUtils.Simulate.click(node);
  	expect(mockFn).toBeCalled();
  	expect(mockFn.mock.calls.length).toBe(1);
  })
});