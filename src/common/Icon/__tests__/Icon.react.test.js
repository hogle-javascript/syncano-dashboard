jest.dontMock('../Icon.react');
describe('Icon', function () {
  it('renders object', function () {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Icon = require('../Icon.react');


    var dropdown = TestUtils.renderIntoDocument(
      <Icon icon="bug-report" />
    );
  });
});