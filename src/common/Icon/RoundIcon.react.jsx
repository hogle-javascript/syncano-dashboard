var React = require('react'),

    mui           = require('material-ui'),
    StylePropable = mui.Mixins.StylePropable,

    MaterialIcon = require('../Icon/MaterialIcon.react');


module.exports = React.createClass({

  displayName: 'RoundIcon',

  mixins: [StylePropable],

  propTypes: {
    id: React.PropTypes.string,
    icon: React.PropTypes.string,
    background: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func,
  },

  handleClick: function () {
    if (this.props.handleClick) {
      this.props.handleClick(this.props.id);
    }
  },

  getStyles: function() {
    var style = {
      icon: {
        backgroundColor: this.props.background,
        color: 'white',
        margin: '0 auto',
        borderRadius: '100%',
        padding: '12px',
      },
      back: {
        'width': '50px',
        'height': '50px',
      },
    };

    return this.mergeStyles(style, this.props.style);
  },

  render: function () {

    var styles = this.getStyles();

    return (
      <div
        style={styles.back}
        onClick={this.handleClick}>
        <MaterialIcon name={this.props.icon} style={styles.icon}/>
      </div>
    )

  }
});