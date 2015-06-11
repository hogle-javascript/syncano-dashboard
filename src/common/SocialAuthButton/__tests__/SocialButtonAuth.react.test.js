jest.dontMock("../SocialAuthButton.react");

describe("SocialButtonAuth", function () {
  it("testing component", function () {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var SocialAuthButton = require('../SocialAuthButton.react');

    var button = {
      icon: 'github',
      label: 'Log in with Github',
      handleClick: jest.genMockFn()
    };

    var SocialAuthButton = TestUtils.renderIntoDocument(
      <SocialAuthButton
        handleClick={button.handleClick}
        icon={button.icon}
        label={button.label}/>
    );
    //var node = TestUtils.scryRenderedDOMComponentsWithClass(SocialAuthButton, "social-auth-button");
    //TestUtils.Simulate.click(node);
    //expect(button.handleClick.mock.calls.length).toBe(1);
    //
    //var textNode = TestUtils.scryRenderedDOMComponentsWithTag(SocialAuthButton, "span");
    //expect(textNode.getDOMNode().textContent).toEqual(button.text);
  });
});