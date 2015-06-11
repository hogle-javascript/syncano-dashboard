var React       = require('react'),
    Moment      = require('moment'),
    classNames  = require('classnames'),
    Paper       = require('material-ui/lib/paper');

// Same classes for column and it's header
var cssClasses = classNames('col', 's4');

var Header = React.createClass({
  render: function () {
    return (
        <div className={cssClasses}>
          {this.props.children}
        </div>
    )
  }
});

module.exports = React.createClass({

  displayName: 'ColumnDesc',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func,
  },

  statics :{
    Header: Header,
  },


  getDefaultProps: function() {
    return {
      color: '#999',
      hoverColor: '#0091EA',
    };
  },

  getInitialState: function () {
    return {
      color: this.props.color,
      hoverColor: this.props.hoverColor,
    }
  },

  handleClick: function () {
    this.props.handleClick(this.props.id);
  },

  render: function () {
    var style = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontSize: 16,
      color: this.props.color,
    };

    return (
      <div
        className={cssClasses}
        style={style}
        onClick={this.handleClick}>
        {this.props.children}
      </div>

    );

  }
});