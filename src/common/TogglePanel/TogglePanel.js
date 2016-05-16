import React from 'react';
import {Utils} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'TogglePanel',

  getInitialState() {
    return {
      open: this.props.initialOpen
    };
  },

  render() {
    const {open} = this.state;
    const {children, title, style} = this.props;

    return (
      <div style={Utils.Styles.mergeStyles({padding: '3px 0', width: '100%'}, style)}>
        <div style={{display: 'flex', padding: '0 20px'}}>
          <div style={{
            flex: 1, lineHeight: '48px', color: '#aaa', fontSize: 10, fontWeight: 800, textTransform: 'uppercase'}}>
            {title}
          </div>
        </div>
        <div style={{padding: '0 20px 20px', flex: 1, display: 'flex'}}>
          {open ? children : null}
        </div>
      </div>
    );
  }
});
