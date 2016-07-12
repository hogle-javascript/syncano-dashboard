import React from 'react';
import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';

const DialogTitleWithIcon = ({ iconClassName, children, style }) => {
  const styles = {
    container: {
      padding: '24px 24px 0'
    },
    title: {
      fontSize: 25,
      fontWeight: 500
    },
    titleIconContainer: {
      marginRight: 10,
      padding: '7px 7px 1px 7px',
      backgroundColor: Colors.grey50,
      border: '1px solid ' + Colors.grey200,
      borderRadius: '6px'
    }
  };

  return (
    <div style={{ ...styles.container, ...style }}>
      <span style={styles.title}>
        <span style={styles.titleIconContainer}>
          <FontIcon className={iconClassName} />
        </span>
        {children}
      </span>
    </div>
  );
};

DialogTitleWithIcon.propTypes = {
  style: React.PropTypes.object,
  iconClassName: React.PropTypes.string.isRequired
};

export default DialogTitleWithIcon;
