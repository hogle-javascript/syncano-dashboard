jest.dontMock("../AvatarInitials.react");
jest.dontMock("../../Color/ColorStore");

describe("AvatarInitials.react", function() {

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var AvatarInitials = require('../AvatarInitials.react');

  it("should display single initial", function() {

    var renderedComponent = TestUtils.renderIntoDocument(<AvatarInitials name="George" />);
    var node = React.findDOMNode(renderedComponent);
    expect(node.textContent).toBe('G');

  });

  it("should display single initial (forced)", function() {

    var renderedComponent = TestUtils.renderIntoDocument(<AvatarInitials name="George R. R. Martin" singleInitial />);
    var node = React.findDOMNode(renderedComponent);
    expect(node.textContent).toBe('G');

  });

  it("should display two initials of first and last name fragment", function() {

    var renderedComponent = TestUtils.renderIntoDocument(<AvatarInitials name="George R. R. Martin" />);
    var node = React.findDOMNode(renderedComponent);
    expect(node.textContent).toBe('GM');
    expect(node.textContent).not.toBe('GRRM');

  });

  it("should change background color", function() {

    var renderedComponent = TestUtils.renderIntoDocument(<AvatarInitials name="George R. R. Martin" backgroundColor="rgb(255, 255, 255)" />);
    var node = React.findDOMNode(renderedComponent);
    expect(node.style.backgroundColor).toBe('rgb(255, 255, 255)');

  });

});