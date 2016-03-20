import React from 'react';
import _ from 'lodash';
import {State, Navigation} from 'react-router';
import {IconButton, Styles} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'DataObjectsAmount',

  mixins: [
    State,
    Navigation
  ],

  render() {
    const {className, dataObjects} = this.props;
    const itemsAmount = dataObjects < 1000 ? dataObjects : `~ ${dataObjects}`;

    return (
      <div>
        {itemsAmount}
        <IconButton
          onTouchTap={() => this.transitionTo('classes-data-objects', _.merge({}, this.getParams(), {className}))}
          iconClassName="synicon-table"
          tooltip={<div>Data Objects in <strong>{className}</strong> Class</div>}
          iconStyle={{color: Styles.Colors.blue400, fontSize: 18, verticalAlign: 'bottom'}} />
      </div>
    );
  }
});

