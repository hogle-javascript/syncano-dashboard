jest.dontMock("../ButtonSocialAuthList.react");

describe("ButtonSocialAuthList.react", function() {
  it("should render two buttons", function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var ButtonSocialAuthList = require('../ButtonSocialAuthList.react');

    var buttons = [{
      icon: 'github',
      text: 'Log in with Github',
    }, {
      icon: 'google',
      text: 'Log in with Google',
    }];

    var mockFn = jest.genMockFn();

    var buttonSocialAuthList = TestUtils.renderIntoDocument(<ButtonSocialAuthList buttons={buttons} />);
    var node = TestUtils.findRenderedDOMComponentWithClass(buttonSocialAuthList, "button-social-auth-list");

    expect(node.props.children.length).toEqual(2);

  });
});