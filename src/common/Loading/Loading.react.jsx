var React            = require('react'),
    classNames       = require('classnames'),
    Radium           = require('radium'),
    mui              = require('material-ui'),
    CircularProgress = mui.CircularProgress,
    LinearProgress   = mui.LinearProgress;

module.exports = Radium(React.createClass({

  displayName: 'Loading',

  propTypes: {
    size: React.PropTypes.number,
    type: React.PropTypes.oneOf(['circular', 'linear'])
  },

  getDefaultProps: function() {
    return {
      type : 'circular',
      size : 1
    }
  },

  getStyles: function() {
    var styles = {
      base: {
        display: 'flex',
        justifyContent: 'center',
        width: "100%",
        left: 0
      },
      top: {
        position: "absolute",
        top: 0
      },
      bottom: {
        position: "absolute",
        bottom: 0
      }
    };

    return [styles.base,
            this.props.position === "top" && styles.top,
            this.props.position === "bottom" && styles.bottom,
            this.props.style];
  },

  renderItem: function(type) {
    if (this.props.show === true) {
      if (type === 'linear') {
        return <LinearProgress mode='indeterminate' />
      }
      return <CircularProgress
               mode = 'indeterminate'
               size = {this.props.size} />
    }
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div style={styles} >
        {this.renderItem(this.props.type)}
      </div>
    )
  }

}));