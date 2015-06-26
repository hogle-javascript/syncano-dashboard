jest.dontMock('../Label.react');

describe('Label.react', function() {
  it('testing component', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Label = require('../Label.react');

    // Render component and test its text content
    var labelRenderedWithText = TestUtils.renderIntoDocument(<Label text="test" />);
    expect(labelRenderedWithText.getDOMNode().textContent).toBe("test');

    // Check rendered DOM element class name
    var div = React.findDOMNode(labelRenderedWithText);
    expect(div.className).toBe("label');
    
    // Check if children is span, text content of span and if its the only children
    expect(div.children.length).toBe(1);
    expect(div.children[0].tagName).toBe("SPAN');
    expect(div.children[0].innerHTML).toBe("test');
  });
});
