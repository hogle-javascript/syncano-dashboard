jest.dontMock('../IconPicker.react');
jest.dontMock('../store');

describe('IconPicker', function () {
  it('renders object', function () {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var IconPicker = require('../IconPicker.react');

    var picker = TestUtils.renderIntoDocument(
      <IconPicker icon="bug-report" />
    );
  });
});