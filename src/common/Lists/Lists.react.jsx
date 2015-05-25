var React            = require('react');

var ListWithOptions  = require('./ListWithOptions.react');

module.exports = React.createClass({

  displayName: 'Lists',

  render: function() {
    var lists = this.props.lists.filter(function(list, i){
      return list.data.length > 0;
    }).map(function(list, i){
      return <ListWithOptions {...this.props} key={i} list={list} />
    }.bind(this));

    return (
      <div className="lists-group">
        {lists}
      </div>
    );
  }
});