jest.dontMock('../Dropdown.react');

describe('Dropdown', function () {
  it('renders object', function () {

    var React = require('react/addons');
    var Dropdown = require('../Dropdown.react');

    var TestUtils = React.addons.TestUtils;

    var actions = [{
      displayName: 'Sort by name',
      name: 'sortByName',
    }, {
      displayName: 'Sort by date',
      name: 'sortByDate',
    }, {
      displayName: 'Switch to list view',
      name: 'switchToListView',
      iconType: 'view-stream',
    }, {
      displayName: 'Switch to card view',
      name: 'switchToCardView',
      iconType: 'view-module',
    }]

    var handleClick = function (event) {};

    var dropdown = TestUtils.renderIntoDocument(
      <Dropdown actions={actions} handleItemClick={handleClick} />
    );
  });
});