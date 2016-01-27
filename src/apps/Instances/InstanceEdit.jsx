import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

// Actions & Stores
import Actions from './InstancesActions';
import Store from './InstancesStore';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import RenameDialog from './RenameDialog';
import RenameDialogActions from './RenameDialogActions';

// Utils
import {DialogsMixin} from '../../mixins';

// Components
import {Utils, IconButton, RaisedButton, TextField} from 'syncano-material-ui';
import {Color, ColumnList, Container, Loading} from 'syncano-components';
import {InnerToolbar, ColorIconPicker, Dialog} from '../../common';

export default React.createClass({
  displayName: 'InstanceEdit',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    State,
    Navigation,
    Reflux.connect(SessionStore),
    Reflux.connect(Store),
    DialogsMixin,
    Utils.Styles
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
      }
    };
  },

  handleUpdate() {
    const instance = this.state.instance;
    const params = {
      description: this.refs.description.getValue(),
      metadata: {
        icon: instance.metadata.icon,
        color: instance.metadata.color
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
    let deleteText = Store.amIOwner(instance) ? ['Delete', 'Deleting'] : ['Leave', 'Leaving'];
    let metadata = instance ? instance.metadata : {icon: null, color: null};

    return [
      {
        dialog: ColorIconPicker.Dialog,
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
        dialog: Dialog.Delete,
        params: {
          key: 'deleteInstanceDialog',
          ref: 'deleteInstanceDialog',
          title: `${deleteText[0]} an Instance`,
          handleConfirm: this.handleDelete,
          isLoading: this.props.isLoading,
          items: Store.getCheckedItems(),
          groupName: 'Channel',
          children: (
            <div>
              {`${deleteText[1]} this Instance can cause problems with your applications that are connected to it.
              Do you really want to ${deleteText[0].toLowerCase()} this Instance?`}
              {this.getDialogList([instance])}
              <Loading
                type="linear"
                position="bottom"
                show={this.state.isLoading}/>
            </div>
          )
        }
      }
    ];
  },

  render() {
    const styles = this.getStyles();
    const instance = this.state.instance;
    const deleteButtonText = Store.amIOwner(instance) ? 'Delete' : 'Leave';
    const defaultIcon = ColumnList.ColumnListConstans.DEFAULT_ICON;
    const defaultIconColor = ColumnList.ColumnListConstans.DEFAULT_BACKGROUND;
    let icon = instance ? instance.metadata.icon : defaultIcon;
    let color = instance ? instance.metadata.color : defaultIconColor;
    let iconBackgroundColor = {
      backgroundColor: Color.getColorByName(color, 'dark') || defaultIconColor
    };

    if (!instance) {
      return null;
    }

    return (
      <div>
        {this.getDialogs()}

        <RenameDialog/>

        <InnerToolbar title="General">
          <IconButton
            style={{fontSize: 25, marginTop: 5}}
            iconClassName="synicon-pencil"
            tooltip="Rename an Instance"
            onTouchTap={RenameDialogActions.showDialog.bind(null, this.state.instance)}/>
          <IconButton
            style={{fontSize: 25, marginTop: 5}}
            iconClassName="synicon-delete"
            tooltip={`${deleteButtonText} an Instance`}
            tooltipPosition="bottom-left"
            onTouchTap={this.showDialog.bind(null, 'deleteInstanceDialog')}/>
        </InnerToolbar>

        <Container>
          <div style={{width: '50%'}}>
            <div className="col-flex-1">
              <div>
                <div style={styles.customizeSection}>
                  <IconButton
                    tooltip="Click to customize Instance"
                    tooltipStyles={styles.tooltip}
                    iconStyle={styles.instanceIcon}
                    style={this.mergeAndPrefix(styles.instanceIconButton, iconBackgroundColor)}
                    iconClassName={`synicon-${icon}`}
                    onClick={this.showDialog.bind(this, 'pickColorIconDialog')}/>
                  <TextField
                    className="instance-name-field"
                    ref="name"
                    floatingLabelText="Instance name"
                    disabled={true}
                    fullWidth={true}
                    defaultValue={instance.name}
                    style={styles.textField}/>
                  <TextField
                    ref="description"
                    floatingLabelText="Instance description"
                    defaultValue={instance.description}
                    multiLine={true}
                    fullWidth={true}
                    style={styles.textField}/>
                </div>
                <div style={styles.buttonsSection}>
                  <RaisedButton
                    onTouchTap={this.handleUpdate}
                    type="submit"
                    label="Update"
                    secondary={true}/>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
});
