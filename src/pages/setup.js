import React, {Component} from 'react';
import {withRouter} from 'react-router';
import Syncano from 'syncano';

import SessionActions from '../apps/Session/SessionActions';
import SessionStore from '../apps/Session/SessionStore';
import InstanceDialogStore from '../apps/Instances/InstanceDialogStore';
import {Dialog, Loading} from '../common/';

class SetupPage extends Component {
  componentDidMount() {
    const connection = new Syncano({baseUrl: SYNCANO_BASE_URL, accountKey: SessionStore.getToken()});
    const {router} = this.props;
    const name = InstanceDialogStore.genUniqueName();

    connection.Instance.please().create({name}).then((instance) => {
      SessionActions.fetchInstance(instance.name);
      router.push({name: 'instance', params: {instanceName: instance.name}});
    });
  }

  render() {
    return (
      <Dialog.FullPage
        open={true}
        contentSize="small"
        showCloseButton={false}
      >
        <div
          className="vm-3-b"
          style={{textAlign: 'center'}}>
          {`We're preparing your account, please wait...`}
        </div>
        <Loading show={true} />
      </Dialog.FullPage>
    );
  }
}

export default withRouter(SetupPage);
