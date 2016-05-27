import React from 'react';
import {withRouter} from 'react-router';
import {IconButton} from 'material-ui';
import {colors as Colors} from 'material-ui/styles/';

const DataObjectsAmount = React.createClass({
  displayName: 'DataObjectsAmount',

  contextTypes: {
    params: React.PropTypes.object
  },

  handleIconTap() {
    const {params} = this.context;
    const {router, className} = this.props;
    const pushParams = {...params, className};

    router.push({name: 'classes-data-objects', params: pushParams});
  },

  render() {
    const {className, dataObjects} = this.props;
    const itemsAmount = dataObjects < 1000 ? dataObjects : `~ ${dataObjects}`;

    return (
      <div>
        {itemsAmount}
        <IconButton
          onTouchTap={this.handleIconTap}
          iconClassName="synicon-table"
          tooltip={<div>Data Objects in <strong>{className}</strong> Class</div>}
          iconStyle={{color: Colors.blue400, fontSize: 18, verticalAlign: 'bottom'}} />
      </div>
    );
  }
});

export default withRouter(DataObjectsAmount);
