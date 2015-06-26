jest.dontMock('../SwitchField.react');

describe('SwitchField.react', function() {
  beforeEach(function() {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    SwitchField = require('../SwitchField.react');
   
    // Test data
    dummyClick = jest.genMockFn();
    dummyClick.mockClear();
  })

  it('tests initial state', function() {
    var component = TestUtils.renderIntoDocument(<SwitchField toggled={true} />);
    expect(component.state.toggled).toBeTruthy();
  });

  it('tests component class names', function() {
    var component = TestUtils.renderIntoDocument(<SwitchField 
                                                   heading="dummy heading" 
                                                   togled={true} />)
    var node = React.findDOMNode(component);
    var nodeText = React.findDOMNode(node.children[0]);
    
    expect(node.className).toBe('switch-field');
    expect(node.children[1].className).toBe('switch-field-input');
    expect(nodeText.className).toBe('switch-field-text');
    
    expect(nodeText.children[0].className).toBe('switch-field-heading');
    expect(nodeText.textContent).toBe(component.props.heading);
    expect(nodeText.children[1].className).toBe('switch-field-description');
  });

  it('tests getText() method', function() {
    var component = TestUtils.renderIntoDocument(<SwitchField 
                                                   name="react skills" 
                                                   heading="React skills" 
                                                   toggled={false} 
                                                   textEnabled="Dummy text enabled" 
                                                   textDisabled="dummy text disabled" />);
    expect(component.getText()).toBe(component.props.textDisabled);
    component.setState({toggled: true});
    var linkNode = TestUtils.findRenderedDOMComponentWithTag(component, "span');
    expect(component.getText().props.children[0]).toBe(component.props.textEnabled);
    expect(linkNode.getDOMNode().textContent).toBe(' Change " + component.props.name  + ".")
  });

  it('tests handleFieldLinkClick() method', function() {
    var component = TestUtils.renderIntoDocument(<SwitchField 
                                                   handleFieldLinkClick={dummyClick}
                                                   name="react skills" 
                                                   toggled={true} 
                                                   textEnabled="Dummy text enabled" 
                                                   textDisabled="dummy text disabled" />);
    var linkNode = React.findDOMNode(component.refs.changeLink);
    TestUtils.Simulate.click(linkNode)
    expect(dummyClick).toBeCalled;
    expect(dummyClick.mock.calls.length).toBe(1);
  });

  it('tests handleSwitchClick() method', function() {
    var component = TestUtils.renderIntoDocument(<SwitchField 
                                                   handleSwitchClick={dummyClick}
                                                   toggled={true} />);
    expect(component.state.toggled).toBeTruthy();
    // Simulate click on Material UI component
    component.refs.MUIToggle.props.onToggle();
    expect(dummyClick).toBeCalled();
    expect(dummyClick.mock.calls.length).toBe(1);
    expect(component.state.toggled).toBeFalsy();
  })
});
