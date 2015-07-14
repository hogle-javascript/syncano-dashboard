var React           = require('react'),
    Radium          = require('radium'),

    mui             = require('material-ui'),
    StylePropable   = mui.Mixins.StylePropable,
    Colors          = mui.Styles.Colors,
    Paper           = mui.Paper;

module.exports = Radium(React.createClass({

  displayName: 'Item',

  mixins: [StylePropable],

  getDefaultProps: function() {
    return {
      hoverable   : false
    }
  },

  getStyles: function() {
    return {
      base: {
        display         : 'flex',
        marginBottom    : 0,
        justifyContent  : 'center'
      },
      checked: {
        backgroundColor : Colors.lightBlue50
      },
      hoverable: {
        ':hover': {
          backgroundColor: Colors.grey100,
          cursor         : 'pointer'
        }
      },
      cursor: {
        cursor: 'pointer'
      }
    };
  },

  handleClick: function() {
    this.props.handleClick(this.props.id);
  },

  render: function () {
    var styles  = this.getStyles(),
      cursor    = (this.props.hoverable || this.props.handleClick),
      hoverable = cursor && !this.props.checked;


    return (
      <Paper
        onClick   = {this.props.handleClick ? this.handleClick : null}
        zDepth    = {1}
        style     = {[styles.base,
                    this.props.checked && styles.checked,
                    hoverable && styles.hoverable,
                    cursor && styles.cursor]}
        rounded   = {false}>
        {this.props.children}
      </Paper>
    )
  }
}));
