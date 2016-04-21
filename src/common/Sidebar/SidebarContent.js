import React from 'react';
import {ScrollLockMixin} from '../../mixins';

export default React.createClass({
  displayName: 'SidebarContent',

  mixins: [ScrollLockMixin],

  componentDidMount() {
    this.scrollLock();
  },

  componentWillUnmount() {
    this.scrollRelease();
  },

  getStyles() {
    return {
      width: 256,
      paddingBottom: 56,
      maxHeight: '100%',
      overflow: 'auto',
      position: 'fixed'
    };
  },

  render() {
    const {children} = this.props;
    const styles = this.getStyles();

    return (
      <div style={styles}>
        {children}
      </div>
    );
  }
});
