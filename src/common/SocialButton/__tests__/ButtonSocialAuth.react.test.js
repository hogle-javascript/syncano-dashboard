jest.dontMock("../ButtonSocialAuth.react");

describe("ButtonSocialAuth", function () {
  it("testing component", function () {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var ButtonSocialAuth = require('../ButtonSocialAuth.react');

    // Test data
    socialAuthButtons = {
      type: 'github',
      text: 'Log in with Github',
    };
    mockFn = jest.genMockFn();

    // Render component
    buttonSocialAuth = TestUtils.renderIntoDocument(
      <ButtonSocialAuth
        handleClick={mockFn}
        type={socialAuthButtons.type}
        text={socialAuthButtons.text}/>)

    // Check if "li" element was rendered with correct class
    renderedLi = TestUtils.findRenderedDOMComponentWithClass(buttonSocialAuth, "button-social-auth");
    // Check if "onClick" event calls handleClick method
    TestUtils.Simulate.click(renderedLi);
    expect(mockFn.mock.calls.length).toBe(1);
    // Check if "div" element was rendered with correct class and content
    renderedDiv = TestUtils.findRenderedDOMComponentWithClass(buttonSocialAuth, "button-text");
    expect(renderedDiv.getDOMNode().textContent).toEqual(socialAuthButtons.text);
    // Check if "li" element have children "Icon"
    expect(renderedLi.props.children[0].type.displayName).toBe("Icon");
  });
});