var React       = require('react'),

  ThemeManager  = require('material-ui/lib/styles/theme-manager')(),

  ListHeader    = require('../common/Lists/ListHeader.react'),
  ListItem      = require('../common/Lists/ListItem.react'),
  List          = require('../common/Lists/List.react'),
  Dropdown      = require('../common/Dropdown/Dropdown.react');

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

  componentWillMount: function () {
  },

  componentDidMount: function () {
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

    return (
      <div className="examplesContainer">
        <h1>Examples</h1>

        <div className="exampleBox">
          <h2>List</h2>

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
      </div>
    );
  }

});