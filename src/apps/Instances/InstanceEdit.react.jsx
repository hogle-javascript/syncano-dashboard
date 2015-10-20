import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Actions & Stores
import Actions from './InstancesActions';
import InstanceDialogActions from './InstanceDialogActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

// Utils
import {Dialogs} from '../../mixins';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import InstanceDialog from './InstanceDialog.react';
import Container from '../../common/Container/Container.react';

export default Radium(React.createClass({

  displayName: 'InstanceEdit',

  mixins: [
    Router.State,
    Router.Navigation,
    Reflux.connect(SessionStore),
    React.addons.LinkedStateMixin,
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
    }
  },

  getStyles() {
    return {
      container: {
        padding: '5px 10px'
      },
      subTabsHeader: {
        backgroundColor: 'transparent'
      },
      tabs: {
      },
      tab: {
        color: '#444',
        borderBottom: '1px solid #DDDDDD'
      },
      title: {
        fontSize: '20px',
        fontWeight: 500,
        color: 'rgba(0,0,0,.54)',
        font: '"Avenir", sans-serif;',
        marginBottom: '20px'
      },
      nameSection: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 40
      },
      nameField: {
        minWidth: '60%'
      },
      createButton: {
        alignSelf: 'center',
        marginRight: 20
      },
      confirmButton: {
        marginLeft: '30px',
        marginTop: 50
      },
      content: {
        height: 300,
        marginBottom: 50,
        padding: '10px 8px',
        width: '100%'
      },
      generalTab: {
        margin: '25px 20px 0 20px'
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

  handleIconColorChange(ColorIcon) {
    const instance = this.state.instance;

    if (ColorIcon.color) {
      instance.metadata.color = ColorIcon.color;

      this.setState({instance});
    }
    if (ColorIcon.icon) {
      instance.metadata.icon = ColorIcon.icon;
      this.setState({instance});
    }
  },

  showAddInstanceDialog() {
    InstanceDialogActions.showDialog();
  },

  redirectToNewInstance() {
    let instanceName = this.refs.addInstanceDialog.refs.name.getValue();

    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName});
  },

  render() {
    const instance = this.state.instance;
    const styles = this.getStyles();

    if (!instance) {
      return null;
    }

    return (
      <Container style={styles.container}>
        <InstanceDialog
          ref="addInstanceDialog"
          handleSubmit={this.redirectToNewInstance}/>
        <div style={styles.title}>
          Edit an Instance
        </div>
        <div style={styles.content}>
          <MUI.Tabs
            tabItemContainerStyle={styles.subTabsHeader}
            style={styles.tabs}>
            <MUI.Tab
              label="General"
              style={styles.tab}>
              <div style={styles.generalTab}>
                <div style={styles.nameSection}>
                  <MUI.TextField
                    ref="name"
                    floatingLabelText="Instance name"
                    disabled={true}
                    defaultValue={instance.name}
                    style={styles.nameField} />
                  <MUI.RaisedButton
                    onClick={this.showAddInstanceDialog}
                    label="Create an Instance"
                    secondary={true}
                    style={styles.createButton} />
                </div>
                <div>
                  <MUI.TextField
                    ref="description"
                    floatingLabelText="Instance description"
                    defaultValue={instance.description}
                    fullWidth={true}
                    multiLine={true} />
                </div>
              </div>
            </MUI.Tab>
            <MUI.Tab
              label="Colors"
              style={styles.tab}>
              <div style={styles.content}>
                <Common.ColorIconPicker
                  ref="color"
                  pickerType="color"
                  selectedIcon={instance.metadata.icon}
                  selectedColor={instance.metadata.color}
                  handleChange={this.handleIconColorChange}
                />
              </div>
            </MUI.Tab>
            <MUI.Tab
              label="Icons"
              style={styles.tab}>
              <div style={styles.content}>
                <Common.ColorIconPicker
                  ref="icon"
                  pickerType="icon"
                  selectedColor={instance.metadata.color}
                  selectedIcon={instance.metadata.icon}
                  handleChange={this.handleIconColorChange}
                />
              </div>
            </MUI.Tab>
          </MUI.Tabs>
        </div>
        <MUI.RaisedButton
          onClick={this.handleUpdate}
          type="submit"
          label="Update"
          secondary={true}
          style={styles.confirmButton} />
      </Container>
    );
  }
}));
