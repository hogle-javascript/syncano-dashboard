import React from 'react';
import {IconButton} from 'syncano-material-ui';
import ArrowDropDown from 'syncano-material-ui/lib/svg-icons/navigation/arrow-drop-down';
import ArrowDropUp from 'syncano-material-ui/lib/svg-icons/navigation/arrow-drop-up';

export default React.createClass({
  displayName: 'TogglePanel',

  getInitialState() {
    return {
      open: this.props.initialOpen
    };
  },

  render() {
    const {open} = this.state;
    const {children, title} = this.props;
    const iconColor = 'rgba(74,74,74,.25)';

    return (
      <div style={{padding: '3px 0'}}>
        <div style={{display: 'flex', padding: '0 20px'}}>
          <div style={{
            flex: 1, lineHeight: '48px', color: '#aaa', fontSize: 10, fontWeight: 800, textTransform: 'uppercase'}}>
            {title}
          </div>
          <IconButton onTouchTap={() => this.setState({open: !open})}>
            {open ? <ArrowDropUp color={iconColor}/> : <ArrowDropDown color={iconColor}/>}
          </IconButton>
        </div>
        <div style={{padding: '0 20px'}}>
          {open ? children : null}
        </div>
      </div>
    );
  }
});
