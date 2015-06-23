var React         = require('react'),
    Radium        = require('radium'),

    mui           = require('material-ui'),
    StylePropable = mui.Mixins.StylePropable,

    MaterialIcon  = require('../Icon/MaterialIcon.react');


module.exports = Radium(React.createClass({

  displayName: 'RoundIcon',

  mixins: [StylePropable],

  propTypes: {
    id: React.PropTypes.string,
    icon: React.PropTypes.string,
    background: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func
  },

  handleClick: function () {
    if (this.props.handleClick) {
      this.props.handleClick(this.props.id);
    }
  },

  getStyles: function() {
    var styles = {
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: this.props.background,
        margin: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return this.mergeStyles(styles, this.props.style);
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <div
        style   = {styles}
        onClick = {this.handleClick}>
        {this.props.children}
      </div>
    )
  }

}));
