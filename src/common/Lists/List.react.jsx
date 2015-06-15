var React       = require('react'),
    classNames  = require('classnames');


module.exports = React.createClass({

  displayName: 'List',

  propTypes: {
    viewMode: React.PropTypes.string.isRequired,
  },

  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

});