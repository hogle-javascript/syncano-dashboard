var React = require('react'),

    mui    = require('material-ui'),
    Common = require('../../common');


module.exports = React.createClass({

  displayName: 'ProfileContainer',

  getStyles: function() {
    return {
      container: {
        marginTop       : 96,
        marginBottom    : 96
      },
      header: {
        padding         : 48,
        color           : 'rgba(0, 0, 0, 0.87)',
        fontSize        : 20,
        lineHeight      : '24px'
      }
    }
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div
        className = "container"
        style     = {styles.container}>
        <div className="row align-center">
          <div className="col-md-25">
            <mui.Paper
              zDepth  = {1}
              rounded = {false}
            >
              <div style={styles.header}>
                {this.props.headerText}
              </div>
              <Common.Loading show={this.props.show}>
                {this.props.children}
              </Common.Loading>
            </mui.Paper>
          </div>
        </div>
      </div>
    );
  }
});
