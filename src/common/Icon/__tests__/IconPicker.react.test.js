jest.dontMock("../IconPicker.react");
jest.dontMock("../store");

describe("IconPicker", function () {
  beforeEach(function() {
    React = require("react/addons");
    TestUtils = React.addons.TestUtils;
    IconPicker = require("../IconPicker.react");
    IconStore = require("../store");

    // Test data
    mockFn = jest.genMockFn();
  });

  it("tests IconPicker props", function () {
    var component = TestUtils.renderIntoDocument(<IconPicker selectedIcon="account-child" />);
    expect(component.props.selectedIcon).toBe("account-child");
  });

  it("tests getIcons() method", function() {
    var component = TestUtils.renderIntoDocument(<IconPicker 
                                                   selectedIcon="account-child" 
                                                   handleClickListItem={mockFn} />);
    // Check if first returned node proparies are correct
    expect(component.getIcons()[0].props.icon).toBe("accessibility");
    expect(component.getIcons()[0].ref).toBe("accessibility");
    expect(component.getIcons()[0].key).toBe("accessibility");
    expect(component.getIcons()[0].props.selected).toBeFalsy();
    // Check if selected icon hac correct proparties
    expect(component.getIcons()[1].props.icon).toBe("account-child");
    expect(component.getIcons()[1].props.selected).toBeTruthy();
    // Check if getIcon() method returns correct number of nodes
    expect(component.getIcons().length).toBe(IconStore.getIconPickerIcons().length);
  });

  it("tests setSelectedIcon() method", function() {
  	// If handleClickListItem is defined in props
    var component = TestUtils.renderIntoDocument(<IconPicker 
                                                   selectedIcon="account-child" 
                                                   handleClickListItem={mockFn} />);
    expect(component.state.selectedIcon).toBe("account-child");
    component.setSelectedIcon("dummy_icon");
    expect(component.state.selectedIcon).toBe("dummy_icon");
    expect(mockFn).toBeCalled();
    expect(mockFn.mock.calls.length).toBe(1);

    // If handleClickListItem is undefined
    mockFn.mockClear();
    var component = TestUtils.renderIntoDocument(<IconPicker selectedIcon="account-child" />);
    expect(component.state.selectedIcon).toBe("account-child");
    component.setSelectedIcon("dummy_icon");
    expect(component.state.selectedIcon).toBe("dummy_icon");
    expect(mockFn).not.toBeCalled();
    expect(mockFn.mock.calls.length).toBe(0);
  });

  it("tests rendered content and its classNames", function() {
    var component = TestUtils.renderIntoDocument(<IconPicker selectedIcon="account-child" />);
    var node = React.findDOMNode(component);
    expect(node.className).toBe("icon-picker");
    expect(node.children.length).toBe(IconStore.getIconPickerIcons().length);
  });
});

