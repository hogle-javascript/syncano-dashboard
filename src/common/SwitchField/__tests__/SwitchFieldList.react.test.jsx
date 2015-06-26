jest.dontMock('../SwitchFieldList.react');
jest.dontMock('../SwitchField.react');

describe('SwitchFieldList.react', function() {
  beforeEach(function() {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    SwitchFieldList = require('../SwitchFieldList.react');

    // Test data
    mockFn = jest.genMockFn();
    switchFields = [{
        name: 'limit',
        enabled: true,
        heading: 'Limit',
        textEnabled: 'Hard limit is currently enabled. Your account will stop working when the limit is reached.',
        textDisabled: 'Hard limit is currently disabled. Your account will stop working when the limit is reached.',
      }, {
        name: 'alert',
        enabled: false,
        heading: 'Alert',
        textEnabled: 'Alert is currently enabled. Your account will stop working when the limit is reached.',
        textDisabled: 'Alert is currently disabled. Your account will stop working when the limit is reached.',
      }];
  });

  it('tests if items are rendered correctly', function() {
    var component = TestUtils.renderIntoDocument(<SwitchFieldList 
                                         handleSwitchClick={mockFn}
                                         handleFieldLinkClick={mockFn}
                                         fields={switchFields} />);
    var node = React.findDOMNode(component);
    // Check component class name
    expect(node.className).toBe('switch-field-list');
    // Check component childrens props
    expect(node.children.length).toBe(switchFields.length);
    expect(component.refs[switchFields[0].name]).toBeDefined();
    expect(component.refs[switchFields[0].name].props.name).toBe(switchFields[0].name);
    expect(component.refs[switchFields[0].name].props.handleFieldLinkClick).toBeDefined();
    expect(component.refs[switchFields[0].name].props.handleSwitchClick).toBeDefined();
    expect(component.refs[switchFields[0].name].props.toggled).toBeTruthy();
    expect(component.refs[switchFields[0].name].props.textEnabled).toBe(switchFields[0].textEnabled);
    expect(component.refs[switchFields[0].name].props.textDisabled).toBe(switchFields[0].textDisabled);
    // Check if handleSwitchClick() and handleFieldLinkClick() was not called
    expect(mockFn).not.toBeCalled();
  });
});
