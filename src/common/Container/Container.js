import React from 'react';

export default React.createClass({
  displayName: 'Container',

  propTypes: {
    style: React.PropTypes.object
  },

  getStyles() {
    let styles = {
      padding: '32px 24px 64px'
    };

    return {...styles, ...this.props.style};
  },

  render() {
    const styles = this.getStyles();
    const {id, children} = this.props;

    return (
      <div
        id={id}
        style={styles}>
        {children}
      </div>
    );
  }
});
