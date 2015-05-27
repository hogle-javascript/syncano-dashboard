jest.dontMock("../ButtonSocialAuth.react");

describe("ButtonSocialAuth", function () {
  it("testing component", function () {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var ButtonSocialAuth = require('../ButtonSocialAuth.react');

    var button = {
      icon: 'github',
      text: 'Log in with Github',
    };

    var mockFn = jest.genMockFn();

    var buttonSocialAuth = TestUtils.renderIntoDocument(
      <ButtonSocialAuth
        handleClick={mockFn}
        icon={button.icon}
        text={button.text}/>
    );
    var node = TestUtils.findRenderedDOMComponentWithClass(buttonSocialAuth, "button-social-auth");
    TestUtils.Simulate.click(node);
    expect(mockFn.mock.calls.length).toBe(1);

    var textNode = TestUtils.findRenderedDOMComponentWithClass(buttonSocialAuth, "button-text");
    expect(textNode.getDOMNode().textContent).toEqual(button.text);

  });
});