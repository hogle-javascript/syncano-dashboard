var React = require('react'),

    mui           = require('material-ui'),
    StylePropable = mui.Mixins.StylePropable,

    Label = require('../Label/Label.react');


module.exports = React.createClass({

  displayName: 'FABList',

  mixins: [StylePropable],

  propTypes: {
    handleClick: React.PropTypes.func.isRequired,
  },

  getStyles: function() {
    var styles = {
      position: 'fixed',
      right: '50px',
      zIndex: 9,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    };
    return this.mergeStyles(styles, this.props.style);
  },

  render: function() {
    return (
      <div style={this.getStyles()}>
        {this.props.children}
      </div>
    );
  }
});

//<FAB button={button} label={button.label} handleClick={this.props.handleClick}/>