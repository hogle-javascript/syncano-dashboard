var React         = require('react'),

    ThemeManager  = require('material-ui/lib/styles/theme-manager')(),

    ListHeader    = require('../common/Lists/ListHeader.react'),
    ListItem      = require('../common/Lists/ListItem.react'),
    List          = require('../common/Lists/List.react'),
    Dropdown      = require('../common/Dropdown/Dropdown.react'),

    Item          = require('../common/ColumnList/Item.react'),
    Column        = require('../common/ColumnList/ItemColumn.react'),
    Header        = require('../common/ColumnList/Header.react'),
    ColNameDesc   = require('../common/ColumnList/ColNameDesc.react');


require('./Examples.css');


module.exports = React.createClass({

  displayName: 'Examples',

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount: function () {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  },

  getDefaultProps: function () {
  },

  getInitialState: function () {
    return {
      checkingState: false,
      checkedItemNumber: 0
    }
  },

  componentDidMount: function () {
  },

  handleIconClick: function (id, state) {
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

  render: function () {
    var dummyClick = function (action) {
      console.log('Click!', action);
    };
    var list = {
      heading: "My instances",
      uuid: "myInstances",
      viewMode: 'stream',
      avatarStyle: 'icon',
      handleItemClick: dummyClick,
      handleHeaderMenuClick: dummyClick,
      data: [{
        'name': 'Some name',
        'description': 'Some description which is a little bit longer',
      }, {
        'name': 'Some name1',
        'description': 'Some description which is a little bit longer1',
      }],
      emptyText: "There are no Instances here. Click here to generate one.",
      emptyIcon: "vpn-key",

      itemContextMenu: [{
        displayName: 'Customize',
        name: 'customize',
      }],

      headerContextMenu: [{
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
    };


    var data = list.data;
    var items = [];
    if (data.length > 0) {
      console.log('Iterate over items', data);
      items = Object.keys(data).map(function (item, i) {
        return (<ListItem
          key={i}
          item={data[item]}
          actions={list.itemContextMenu}
          handleItemMenuClick={dummyClick}
          style={list.viewMode}
          avatarStyle={list.avatarStyle}/>)
      }.bind(this));
    } else if (data.length === 0) {
      items = (<ListItemEmpty icon={this.props.list.emptyIcon}
                              text={this.props.list.emptyText}/>)
    }

    var listGroupCss = {
      'margin-bottom': '50px',
    };

    columns = [
      {'name': 'Codebox', space: 1, style: {fontSize: '20px'}},
      {'name': '', space: 5},
      {'name': 'ID', space: 2},
      {'name': 'ID', space: 2},
      {'name': 'ID', space: 2},
    ];

    return (
      <div className="examplesContainer">
        <h2>Examples</h2>

        <div className="exampleBox">
          <h4>List</h4>

          <div className="content-group">
            <div style={listGroupCss}>
              <ListHeader topic={list.heading}>
                <Dropdown icon="more-horiz" actions={list.headerContextMenu} handleItemClick={dummyClick}/>
              </ListHeader>
              <List viewMode={list.viewMode}>
                {items}
              </List>
            </div>

            <div style={listGroupCss}>
              <ListHeader topic={list.heading}>
                <Dropdown icon="more-horiz" actions={list.headerContextMenu} handleItemClick={dummyClick}/>
              </ListHeader>
              <List viewMode={list.viewMode}>
                {items}
              </List>
            </div>
          </div>
        </div>

        <div className="exampleBox">
          <h4>ColumnList</h4>

          <div className="content-group">
            <div style={listGroupCss}>
              <Header checkedItemsNumber={this.state.checkedItemNumber} columns={columns}>
                <MaterialIcon name="group_add" handleClick={dummyClick} />
                <MaterialIcon name="home" handleClick={dummyClick} />
              </Header>

              <List viewMode={list.viewMode}>
                <Item key="1">
                  <Column grid="1">
                    <CheckIcon id="some_id1" icon="notifications" background="blue" width='40px' handleClick={this.handleIconClick}/>
                  </Column>
                  <Column grid="5">
                    <ColNameDesc name="My Codebox" description="Description of my codebox"/>
                  </Column>
                  <Column grid="2">
                    <span><strong>2345</strong></span>
                  </Column>
                  <Column grid="2">
                    <span><strong>2345</strong></span>
                  </Column>
                  <Column grid="2">
                    <span><strong>2345</strong></span>
                  </Column>
                </Item>
                <Item key="2">
                  <Column grid="1">
                    <CheckIcon id="some_id2" checkingState={this.state.checkingState} icon="notifications" background="blue" width='40px' handleClick={this.handleIconClick}/>
                  </Column>
                  <Column grid="5">
                    <ColNameDesc name="My Codebox" description="Description of my codebox"/>
                  </Column>
                  <Column grid="2">
                    <span><strong>2345</strong></span>
                  </Column>
                  <Column grid="2">
                    <span><strong>2345</strong></span>
                  </Column>
                  <Column grid="2">
                    <span><strong>2345</strong></span>
                  </Column>

                </Item>

              </List>
            </div>
          </div>
        </div>
      </div>
    );
  }

});