import React from 'react';

export default React.createClass({
  displayName: 'ListContainer',

  propTypes: {
    style: React.PropTypes.object,
    className: React.PropTypes.string
  },

  getStyles() {
    const styles = {
      marginBottom: 48
    };

    return {...styles, ...this.props.style};
  },

  render() {
    const styles = this.getStyles();

    return (
      <div
        style={styles}
        className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
});
