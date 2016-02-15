import React from 'react';
import {List} from 'syncano-material-ui';
import ListSubHeader from './ListSubHeader';

export default ({subHeader, children}) => {
  const styles = {
    list: {
      paddingTop: 0,
      paddingBottom: 10,
      backgroundColor: 'transparent'
    }
  };

  return (
    <div>
      <ListSubHeader text={subHeader}/>
      <List style={styles.list}>
        {children}
      </List>
    </div>
  );
};
