var React             = require('react'),
    Reflux            = require('reflux'),

    SolutionsActions  = require('./SolutionsActions'),
    SolutionsStore    = require('./SolutionsStore'),

    SolutionsListItem = require('./SolutionsListItem.react.jsx');

module.exports = React.createClass({

  displayName: 'SolutionsList',

  mixins: [
    Reflux.connect(SolutionsStore)
  ],

  componentWillMount: function() {
    console.info('SolutionsList::componentWillMount');
    SolutionsStore.fetch();
  },

  getStyles: function() {
    return {
      list: {
        listStyle: 'none',
        margin: 40,
        padding: 0
      },
      listItem: {
        padding: '0 20px',
        marginBottom: 24
      }
    }
  },

  getListItems: function() {
    var styles    = this.getStyles(),
        listItems = this.state.items.map(function(item) {
          return (
            <li
              className = "col-xs-11"
              style     = {styles.listItem}>
              <SolutionsListItem data={item} />
            </li>
          )
        });

    return listItems;
  },

  render: function() {
    var styles    = this.getStyles();

    return (
      <ul className="row align-center" style={styles.list}>
        {this.getListItems()}
      </ul>
    );
  }
});
