import React from 'react';
import Radium from 'radium';
import {Tabs, Tab, Styles} from 'syncano-material-ui';
import Preview from './Preview';
import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';

export default Radium(({icon, color, onIconChange, onColorChange}) => {
  const getStyles = () => ({
    headline: {
      color: 'rgba(0, 0, 0, 0.498039)',
      fontSize: 12,
      lineHeight: '18px'
    },
    tab: {
      color: Styles.Colors.blue400,
      fontSize: 13,
      lineHeight: '18px',
      fontWeight: 800
    },
    inkBarStyle: {
      background: Styles.Colors.blue400
    },
    contentContainerStyle: {
      paddingTop: 25
    },
    tabItemContainerStyle: {
      background: 'transparent',
      borderBottom: '1px solid #b8c0c9'
    }
  });

  return (
    <div>
      <p style={getStyles().headline}>
        Instance icon
      </p>

      <Preview
        color={color}
        icon={icon}/>

      <Tabs
        inkBarStyle={getStyles().inkBarStyle}
        contentContainerStyle={getStyles().contentContainerStyle}
        tabItemContainerStyle={getStyles().tabItemContainerStyle}>
        <Tab
          style={getStyles().tab}
          label="COLOR">
          <ColorPicker
            selectedColor={color}
            onColorChange={onColorChange} />
        </Tab>
        <Tab
          style={getStyles().tab}
          label="ICON">
          <IconPicker
            selectedIcon={icon}
            onIconChange={onIconChange} />
        </Tab>
      </Tabs>
    </div>
  );
});
