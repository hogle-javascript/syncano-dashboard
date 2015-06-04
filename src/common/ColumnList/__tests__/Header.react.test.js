jest.dontMock("../Header.react");

describe("Header", function () {
  it("testing component", function () {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Header = require('../Header.react');

    var columns = [
      {'name': 'Codebox', space: 1, style: {fontSize: '20px'}},
      {'name': '', space: 5},
      {'name': 'ID', space: 2},
      {'name': 'ID', space: 2},
      {'name': 'ID', space: 2},
    ];

    var component = TestUtils.renderIntoDocument(<Header columns={columns}/>);

  });
});