var React       = require('react'),
    Moment      = require('moment'),
    classNames  = require('classnames'),
    Paper       = require('material-ui/lib/paper');


var Header = React.createClass({
  render: function () {
    return (
        <div className={"col s4"}>
          {this.props.children}
        </div>
    )
  }
});

module.exports = React.createClass({

  displayName: 'ColumnName',

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

  handleMouseOver: function () {
    this.setState({'color': this.props.hoverColor})
  },

  handleMouseLeave: function () {
    this.setState({'color': this.props.color})
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
      color: this.state.color,
    };

    var cssClasses = classNames('col', 's4');

    return (
      <div
        className   = {cssClasses}
        style       = {style}
        onMouseOver = {this.handleMouseOver}
        onMouseOut  = {this.handleMouseLeave}
        onClick     = {this.handleClick}>
        {this.props.children}
      </div>
    );

  }
});