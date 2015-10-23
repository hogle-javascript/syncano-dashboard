import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Actions & Stores
import Actions from './InstancesActions';
import Store from './InstancesStore';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

// Utils
import {Dialogs} from '../../mixins';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

export default Radium(React.createClass({

  displayName: 'InstanceEdit',

  mixins: [
    Router.State,
    Router.Navigation,
    Reflux.connect(SessionStore),
    Reflux.connect(Store),
    Dialogs
  ],

  validatorConstraints: {
    description: {
      length: {
        minimum: 256
      }
    }
  },

  componentWillMount() {
    const params = this.getParams();

    if (params.instanceName) {
      SessionActions.fetchInstance(params.instanceName);
      Actions.fetch();
    }
  },

  getStyles() {
    return {
      container: {
        padding: '5px 10px'
      },
      title: {
        fontSize: '20px',
        fontWeight: 500,
        color: 'rgba(0,0,0,.54)',
        font: '"Avenir", sans-serif;',
        marginBottom: '20px'
      },
      nameSection: {
        width: '50%',
        display: '-webkit-inline-flex; display: inline-flex',
        justifyContent: 'space-between',
        marginBottom: 40
      },
      instanceIconButton: {
        minWidth: 48,
        height: 48,
        fontSize: 18,
        lineHeight: '20px',
        display: '-webkit-inline-flex; display: inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        color: '#FFF',
        margin: '10px 16px 0 0',
        alignSelf: 'center'
      },
      instanceIcon: {
        color: '#FFF'
      },
      nameField: {
        flex: 5
      },
      buttonsSection: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      confirmButton: {
        margin: '20px 10px'
      },
      content: {
        height: 300,
        marginBottom: 50,
        margin: '25px 20px 0 20px',
        padding: '10px 8px',
        width: '100%'
      }
    };
  },

  handleUpdate() {
    const instance = SessionStore.getInstance();
    const params = {
      description: this.refs.description.getValue(),
      metadata: {
        icon: this.state.instance.metadata.icon,
        color: this.state.instance.metadata.color
      }
    };

    Actions.updateInstance(instance.name, params);
  },

  handleDelete() {
    let instance = this.state.instance;
    let remove = {
      user: Actions.removeInstances.bind(this, [instance]),
      shared: Actions.removeSharedInstance.bind(this, [instance], SessionStore.getUser().id)
    };
    let ownage = Store.amIOwner(instance) ? 'user' : 'shared';

    remove[ownage]();
  },

  handleIconColorChange(color, icon) {
    let instance = this.state.instance;

    instance.metadata = {
      color,
      icon
    };
    this.setState({instance});
  },

  initDialogs() {
    let instance = this.state.instance;
    let metadata = instance ? instance.metadata : {icon: null, color: null};

    return [
      {
        dialog: Common.ColorIconPicker.Dialog,
        params: {
          key: 'pickColorIconDialog',
          ref: 'pickColorIconDialog',
          mode: 'add',
          initialColor: metadata.color,
          initialIcon: metadata.icon,
          handleClick: this.handleIconColorChange
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          key: 'deleteInstanceDialog',
          ref: 'deleteInstanceDialog',
          title: 'Delete an Instance',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Confirm', onClick: this.handleDelete}
          ],
          modal: true,
          children: [
            'Deleting this Instance can cause problems with your applications that are connected to it.' +
            'Do you really want to delete this Instance?', this.getDialogList([instance]),
            <Common.Loading
              type="linear"
              position="bottom"
              show={this.state.isLoading} />
          ]
        }
      }
    ];
  },

  render() {
    const styles = this.getStyles();
    const instance = this.state.instance;
    const defaultIcon = Common.ColumnList.ColumnListConstans.DEFAULT_ICON;
    const defaultIconColor = Common.ColumnList.ColumnListConstans.DEFAULT_BACKGROUND;
    let icon = instance ? instance.metadata.icon : defaultIcon;
    let color = instance ? instance.metadata.color : defaultIconColor;
    let iconBackgroundColor = {
      backgroundColor: Common.Color.getColorByName(color, 'dark') || defaultIconColor
    };

    if (!instance) {
      return null;
    }

    return (
      <Container style={styles.container}>
        {this.getDialogs()}
        <div style={styles.title}>
          General
        </div>
        <div style={styles.content}>
          <div style={styles.nameSection}>
            <MUI.IconButton
              tooltip="Change Instance icon"
              iconStyle={styles.instanceIcon}
              style={[styles.instanceIconButton, iconBackgroundColor]}
              iconClassName={'synicon-' + icon}
              onClick={this.showDialog.bind(this, 'pickColorIconDialog')}/>
            <MUI.TextField
              ref="name"
              floatingLabelText="Instance name"
              disabled={true}
              defaultValue={instance.name}
              style={styles.nameField} />
          </div>
          <div>
            <MUI.TextField
              ref="description"
              floatingLabelText="Instance description"
              defaultValue={instance.description}
              fullWidth={true}
              multiLine={true} />
          </div>
          <div style={styles.buttonsSection}>
            <MUI.RaisedButton
              onTouchTap={this.handleUpdate}
              type="submit"
              label="Update"
              secondary={true}
              style={styles.confirmButton} />
            <MUI.FlatButton
              label="Delete an Instance"
              style={styles.confirmButton}
              onTouchTap={this.showDialog.bind(null, 'deleteInstanceDialog')} />
          </div>
        </div>
      </Container>
    );
  }
}));
