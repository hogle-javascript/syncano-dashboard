var React             = require('react'),
    Reflux            = require('reflux'),

    SolutionsListItem = require('./SolutionsListItem.react');

module.exports = React.createClass({

  displayName: 'SolutionsList',

  getStyles: function() {
    return {
      list: {
        listStyle    : 'none',
        margin       : '0 40px',
        padding      : 0
      },
      listItem: {
        padding      : '0 15px',
        marginBottom : 40,
        minWidth     : 346,
        maxWidth     : 346
      }
    }
  },

  getListItems: function() {
    var styles    = this.getStyles(),
        listItems = this.props.items.map(function(item) {
          return (
            <li
              className = "col-flex-1"
              style     = {styles.listItem}
            >
              <SolutionsListItem data={item} />
            </li>
          )
        });

    return listItems;
  },

  render: function() {
    var styles    = this.getStyles();

    return (
      <ul
        className = "row"
        style     = {styles.list}
      >
        {this.getListItems()}
      </ul>
    );
  }
});
