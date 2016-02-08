import React from 'react';
import Radium from 'radium';
import IconStore from '../Icon/IconStore';
import {FontIcon, Styles} from 'syncano-material-ui';

export default Radium(({selectedIcon, onIconChange}) => {
  const getStyles = () => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      height: '100%',
      cursor: 'pointer'
    },
    item: {
      margin: 5,
      height: 20,
      width: 20,
      fontSize: 21,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#b8c0c9'
    }
  });

  const renderIconItem = (icon) => {
    let styles = getStyles().item;

    if (icon === selectedIcon) {
      styles.color = Styles.Colors.blue400;
    }

    return (
      <FontIcon
        key={icon}
        id={icon}
        className={`synicon-${icon}`}
        style={styles}
        onClick={() => onIconChange(icon)} />
    );
  };

  return (
    <div style={getStyles().container}>
      {IconStore.getIconPickerIcons().map((icon) => renderIconItem(icon))}
    </div>
  );
});
