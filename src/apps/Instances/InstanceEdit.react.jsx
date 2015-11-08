import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Actions & Stores
import Actions from './InstancesActions';
import Store from './InstancesStore';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

// Utils
import {Dialogs} from '../../mixins';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

export default React.createClass({

  displayName: 'InstanceEdit',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Router.State,
    Router.Navigation,
    Reflux.connect(SessionStore),
    Reflux.connect(Store),
    Dialogs,
    MUI.Utils.Styles
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
        padding: '5px 10px',
        width: '50%'
      },
      title: {
        fontSize: '20px',
        fontWeight: 500,
        color: 'rgba(0,0,0,.54)',
        font: '"Avenir", sans-serif',
        marginBottom: '20px'
      },
      tooltip: {
        top: 0,
        left: 50
      },
      customizeSection: {
        display: '-webkit-flex; display: flex',
        flexDirection: 'column',
        marginBottom: 48
      },
      textField: {
        marginBottom: 16
      },
      instanceIconButton: {
        minWidth: 48,
        height: 48,
        fontSize: 18,
        lineHeight: '20px',
        display: '-webkit-inline-flex; display: inline-flex',
        borderRadius: '50%',
        color: '#FFF',
        marginBottom: 16
      },
      instanceIcon: {
        color: '#FFF'
      },
      buttonsSection: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      deleteButton: {
        backgroundColor: this.context.muiTheme.rawTheme.palette.accent2Color,
        color: '#FFF',
        ':hover': {
          opacity: 0.4
        }
      },
      content: {
        marginTop: 30,
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
            'Deleting this Instance can cause problems with your applications that are connected to it. ' +
            'Do you really want to delete this Instance?', this.getDialogList([instance]),
            <Common.Loading
              type="linear"
              position="bottom"
              show={this.state.isLoading}/>
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
          <div style={styles.customizeSection}>
            <MUI.IconButton
              tooltip="Click to customize Instance"
              tooltipStyles={styles.tooltip}
              iconStyle={styles.instanceIcon}
              style={this.mergeAndPrefix(styles.instanceIconButton, iconBackgroundColor)}
              iconClassName={'synicon-' + icon}
              onClick={this.showDialog.bind(this, 'pickColorIconDialog')}/>
            <MUI.TextField
              className="instance-name-field"
              ref="name"
              floatingLabelText="Instance name"
              disabled={true}
              fullWidth={true}
              defaultValue={instance.name}
              style={styles.textField}/>
            <MUI.TextField
              ref="description"
              floatingLabelText="Instance description"
              defaultValue={instance.description}
              multiLine={true}
              fullWidth={true}
              style={styles.textField}/>
          </div>
          <div style={styles.buttonsSection}>
            <MUI.RaisedButton
              onTouchTap={this.handleUpdate}
              type="submit"
              label="Update"
              secondary={true}/>
            <MUI.FlatButton
              label="Delete an Instance"
              style={styles.deleteButton}
              onTouchTap={this.showDialog.bind(null, 'deleteInstanceDialog')}/>
          </div>
        </div>
      </Container>
    );
  }
});
