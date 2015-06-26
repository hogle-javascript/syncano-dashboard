jest.dontMock('../ButtonGroup.react');

describe('ButtonGroup.react', function() {
  it('testing component', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var ButtonGroup = require('../ButtonGroup.react');

    TestUtils = React.addons.TestUtils;
    //Test data
    buttons = [{
      type: "flat",
      isDefault: false,
      name: "cancel",
      displayName: "Cancel",
    }, {
      type: "flat",
      isDefault: true,
      name: "confirm",
      displayName: "Confirm",
    }];
    mockFn = jest.genMockFn();

    // Render component
    buttonGroup = TestUtils.renderIntoDocument(<ButtonGroup buttons={buttons} handleClick={mockFn} />);

    // TODO
    //// Search component for "div" tag
    //renderedDiv = TestUtils.findRenderedDOMComponentWithTag(buttonGroup, "div');
    //// Check if "div" tag have correct className
    //expect(renderedDiv.getDOMNode().className).toEqual("button-group');
    //// Check if rendered "div" tag has children
    ////expect(renderedDiv.props.children.length).toBeGreaterThan(0);
    //// Check if "div" content Buttons components
    //expect(renderedDiv.props.children[0].type.displayName).toBe("Button');
    //// Check if Button have defined "data" prop
    //expect(renderedDiv.props.children[0].props.data.type).toBeDefined();
  });
});
