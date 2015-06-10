var React       = require('react'),
    classNames  = require('classnames');


module.exports = React.createClass({

  displayName: 'List',

  propTypes: {
    viewMode: React.PropTypes.string.isRequired,
  },

  render: function () {
    var cssClasses = classNames('list', 'items-list', 'view-' + this.props.viewMode);

    return (
      <div className={cssClasses}>
        {this.props.children}
      </div>
    );
  }

});