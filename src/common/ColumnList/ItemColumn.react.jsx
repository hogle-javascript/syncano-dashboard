var React       = require('react'),
    Moment      = require('moment'),
    classNames  = require('classnames'),
    Paper       = require('material-ui/lib/paper');


module.exports = React.createClass({

  displayName: 'ItemColumn',

  propTypes: {
  },

  render: function () {
    var style = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    };

    var cssClasses = classNames('col', 's' + this.props.grid);

    return (
      <div className={cssClasses} style={style}>
        {this.props.children}
      </div>
    );

  }
});