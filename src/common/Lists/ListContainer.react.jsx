let React = require('react'),
  classNames = require('classnames'),

  mui = require('material-ui'),
  StylePropable = mui.Mixins.StylePropable;

module.exports = React.createClass({

  displayName: 'ListContainer',

  mixins: [StylePropable],

  propTypes: {
    style: React.PropTypes.object,
    className: React.PropTypes.string
  },

  getStyles: function() {
    let styles = {
      margin: '65px auto',
      width: '80%'
    };
    return this.mergeStyles(styles, this.props.style);
  },

  render: function() {
    let styles = this.getStyles();

    return (
      <div
        style={styles}
        className={this.props.className}
        >
        {this.props.children}
      </div>
    );
  }
});
