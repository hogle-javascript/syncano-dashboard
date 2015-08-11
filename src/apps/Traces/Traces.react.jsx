import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores and Actions
import Store from './TracesStore';
import Actions from './TracesActions';

// Components
import MUI from 'material-ui';
import Container from '../../common/Container/Container.react';

// Local components
import TracesList from './TracesList.react';


export default Radium(React.createClass({

  displayName: 'Traces',

  propTypes: {
    tracesFor: React.PropTypes.oneOf(['webhook', 'codebox', 'trigger', 'schedule']),
    objectId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  },

  mixins: [
    Router.Navigation,
    Router.State,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin
  ],

  getDefaultProps() {
    return {
      tracesFor: 'codebox',
      showHeader: false
    }
  },

  getStyles() {
    let styles = {
      toolbar: {
        position: 'fixed',
        top: 64,
        right: 0,
        zIndex: 8,
        paddingLeft: 256,
        background: 'rgba(215,215,215,0.6)',
        padding: '0px 32px 0 24px'
      },
      list: {
        position: 'relative',
        top: '35px'
      },
      cBList: {
       top: '-45px'
      }
    };

    return styles;
  },

  getConfig() {
    return {
      webhook: {
        route: 'data',
        backLabel: 'Go back to Data Views'
      },
      codebox: {
        route: 'codeboxes',
        backLabel: 'Go back to CodeBoxes list'
      },
      trigger: {
        route: 'tasks',
        backLabel: 'Go back to Tasks list'
      },
      schedule: {
        route: 'tasks',
        backLabel: 'Go back to Tasks list'
      }
    }[this.props.tracesFor];
  },

  componentDidMount() {
    Actions.setCurrentObjectId(this.props.objectId, this.props.tracesFor);
  },

  handleBackClick() {
    const config = this.getConfig();
    this.transitionTo(config.route, this.getParams());
  },

  renderToolbarTitle() {
    let tracesFor = this.props.tracesFor === 'codebox' ? 'CodeBox' : this.props.tracesFor.charAt(0).toUpperCase() + this.props.tracesFor.slice(1);
    let toolbarTitleText = this.state.currentObjectName ? `${tracesFor}: ${this.state.currentObjectName} (id: ${this.props.objectId})` : '';

    return (
      <MUI.ToolbarGroup>
        <MUI.ToolbarTitle text={toolbarTitleText}/>
      </MUI.ToolbarGroup>
    )
  },

  render() {
    const config = this.getConfig();
    const styles = this.getStyles();

    return (
      <div>
        <MUI.Toolbar style={styles.toolbar}>
          <MUI.ToolbarGroup>
            <MUI.IconButton
              iconClassName="synicon-arrow-left"
              tooltip={config.backLabel}
              tooltipPosition="bottom-right"
              onClick={this.handleBackClick}
              touch={true}
              style={{marginTop: 4}}
              iconStyle={{color: 'rgba(0,0,0,.4)'}}/>
          </MUI.ToolbarGroup>

          {this.renderToolbarTitle()}
        </MUI.Toolbar>
        <div style={[styles.list, this.isActive('codebox-traces') && styles.cBList]}>
          <TracesList
            tracesFor={this.props.tracesFor}
            name="Traces"
            items={this.state.traces}/>
        </div>
      </div>
    );
  }
}));
