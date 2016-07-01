import React from 'react';
import _ from 'lodash';

import { Show } from '../../common/';

export default ({ data }) => {
  const styles = {
    cell: {
      lineHeight: '1.5em',
      whiteSpace: 'nowrap'
    }
  };

  return (
    <div className="row">
      <div
        className="col-md-9"
        style={styles.cell}
      >
        <div>API calls</div>
        <div>Script seconds</div>
      </div>
      <div
        className="col-md-9"
        style={styles.cell}
      >
        <div><strong>{parseInt(data.api.included, 10).toLocaleString()} / month</strong></div>
        <div><strong>{parseInt(data.cbx.included, 10).toLocaleString()} / month</strong></div>
      </div>
      <Show if={data.api.overage && data.cbx.overage}>
        <div
          className="col-md-8"
          style={_.merge({}, styles.cell, { textAlign: 'right' })}
        >
          <div>+{data.api.overage}</div>
          <div>+{data.cbx.overage}</div>
        </div>
      </Show>
      <Show if={data.api.overage && data.cbx.overage}>
        <div
          className="col-md-9"
          style={styles.cell}
        >
          <div style={{ whiteSpace: 'nowrap' }}>per extra call</div>
          <div style={{ whiteSpace: 'nowrap' }}>per extra second</div>
        </div>
      </Show>
    </div>
  );
};
