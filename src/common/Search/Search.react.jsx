let React = require('react');

//let ViewActions = require('../actions/ViewActions');
//let ServerActions = require('../actions/ServerActions');

require('./Search.css');

module.exports = React.createClass({

  displayName: 'Search',

  componentDidMount: function() {
    this.refs.input.getDOMNode().focus()
  },

  handleKeyUp: function(e) {
    let query = this.refs.input.getDOMNode().value;
    if (e.keyCode === 13) {
      if (query.indexOf('create instance') > -1) {
        let instance = {
          name: query.split(' ')[2]
        };
        ServerActions.createInstance(instance);
      }
      ViewActions.closeSearch();
    } else if (e.keyCode === 27) {
      ViewActions.closeSearch();
    }
  },

  render: function() {
    return (
      <div className="search">
        <div className="search-inner">
          <div className="search-input">
            <input type="text" ref="input" onKeyUp={this.handleKeyUp}/>
          </div>
        </div>
      </div>
    );
  }

});