jest.dontMock('../IconPickerItem.react');
jest.dontMock('../store');

describe('IconPicker', function () {
  it('renders object', function () {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var IconPickerItem = require('../IconPickerItem.react');

    var picker = TestUtils.renderIntoDocument(
      <IconPickerItem icon="bug-report" />
    );
  });
});