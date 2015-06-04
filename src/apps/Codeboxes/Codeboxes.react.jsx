var React               = require('react'),

    Reflux              = require('reflux'),

    // Stores and Actions
    CodeBoxesActions    = require('./CodeBoxesActions'),
    CodeBoxesStore      = require('./CodeBoxesStore'),
    AuthStore           = require('../Account/AuthStore'),

    // Components
    Item                = require('../../common/ColumnList/Item.react'),
    Column              = require('../../common/ColumnList/ItemColumn.react'),
    Header              = require('../../common/ColumnList/Header.react'),
    ColNameDesc         = require('../../common/ColumnList/ColNameDesc.react');


module.exports = React.createClass({

  displayName: 'CodeBoxes',

  mixins: [
    Reflux.connect(CodeBoxesStore),
    //React.addons.LinkedStateMixin,
    //ValidationMixin,
  ],

  handleItemIconClick: function (id, state) {
    var checkedItemNumber;
    if (state) {
      checkedItemNumber = ++this.state.checkedItemNumber;
    } else {
      checkedItemNumber = --this.state.checkedItemNumber;
    }

    this.setState({
      checkingState: checkedItemNumber > 0,
      checkedItemNumber: checkedItemNumber,
    });

    console.log('checked', checkedItemNumber)
  },

  generateItem: function () {
    return (<Item key="1">
      <Column grid="1">
        <CheckIcon
          id="some_id1"
          icon="notifications"
          background="blue" width='40px'
          handleClick={this.handleItemIconClick}/>
      </Column>
      <Column grid="5">
        <ColNameDesc name="My Codebox" description="Description of my codebox"/>
      </Column>
      <Column grid="3">
        <span><strong>2345</strong></span>
      </Column>
      <Column grid="3">
        <span><strong>January 2011</strong></span>
      </Column>
    </Item>)

  },

  render: function () {

    var dummyClick = function (action) {
      console.log('Click!', action);
    };

    var listGroupCss = {
      'margin-bottom': 50,
    };

    var columns = [
      {'name': 'CodeBoxes', space: 1, style: {fontSize: '20px'}},
      {'name': '', space: 5},
      {'name': 'ID', space: 3},
      {'name': 'Created', space: 3},
    ];

    var items = [this.generateItem()];

    return (
      <div className="container" style={{marginTop: 50}}>
        <div style={listGroupCss}>
          <Header checkedItemsNumber={this.state.checkedItemNumber} columns={columns}>
            <MaterialIcon name="group_add" handleClick={dummyClick}/>
            <MaterialIcon name="home" handleClick={dummyClick}/>
          </Header>

          <List viewMode="stream">
            {items}
          </List>
        </div>
      </div>
    );
  }

});