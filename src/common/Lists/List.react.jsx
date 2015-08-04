let React = require('react'),
  classNames = require('classnames');

module.exports = React.createClass({

  displayName: 'List',

  propTypes: {},

  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

});