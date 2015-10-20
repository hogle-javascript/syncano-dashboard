import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Actions & Stores
import Actions from './InstancesActions';
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';

// Utils
import {Dialogs} from '../../mixins';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

export default React.createClass({

  displayName: 'InstanceEdit',

  mixins: [
    Router.State,
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
      title: {
        fontSize: '20px',
        fontWeight: 500,
        color: 'rgba(0,0,0,.54)',
        font: '"Avenir", sans-serif;',
        marginBottom: '20px'
      },
      textField: {
        marginBottom: '25px',
        width: '100%'
      },
      confirmButton: {
        marginLeft: '8px',
        marginTop: 50
      },
      picker: {
        height: 300,
        marginBottom: 50,
        padding: '10px 8px'
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

  render() {
    const instance = this.state.instance;
    const styles = this.getStyles();

    if (!instance) {
      return null;
    }

    return (
      <Container style={styles.container}>
        <div style={styles.title}>
          Edit an Instance
        </div>
        <div className="col-xs-16">
          <MUI.TextField
            ref="name"
            floatingLabelText="Instance name"
            disabled={true}
            defaultValue={instance.name}
            style={styles.textField} />
        </div>
        <div className="col-xs-16">
          <MUI.TextField
            ref="description"
            floatingLabelText="Instance description"
            defaultValue={instance.description}
            multiLine={true}
            style={styles.textField} />
        </div>
        <div style={styles.picker}>
          <MUI.Tabs>
            <MUI.Tab label="Colors">
              <div style={styles.picker}>
                <Common.ColorIconPicker
                  ref="color"
                  pickerType="color"
                  selectedIcon={instance.metadata.icon}
                  selectedColor={instance.metadata.color}
                  handleChange={this.handleIconColorChange}
                />
              </div>
            </MUI.Tab>
            <MUI.Tab label="Icons">
              <div style={styles.picker}>
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
});
