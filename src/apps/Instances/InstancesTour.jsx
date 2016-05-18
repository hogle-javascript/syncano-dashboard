import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';

import Actions from './InstancesActions';
import Store from './InstancesStore';

import {IconButton, Styles} from 'syncano-material-ui';
import {Tour} from '../../common/';

export default React.createClass({
  displayName: 'InstancesTour',

  mixins: [
    Reflux.connect(Store)
  ],

  componentDidMount() {
    console.info('Instances::componentDidMount');
    Actions.setTourConfig(this.getTourConfig());
  },

  getStyles() {
    return {
      tourHighlight: {
        color: Styles.Colors.blue500
      },
      secondLine: {
        marginTop: 16,
        fontSize: '0.8em',
        lineHeight: '1.5em'
      },
      link: {
        color: Styles.Colors.blue500
      }
    };
  },

  getTourConfig() {
    const styles = this.getStyles();

    function toggleAccountMenu() {
      // Header.Actions.toggleAccountMenu();
    }

    return [
      {
        node: ReactDOM.findDOMNode(this.refs.myInstancesList),
        text: <div>All your <strong style={styles.tourHighlight}>Instances</strong> will be listed here.<br />
          <div style={styles.secondLine}>
            Instance is a place for all of your
            data and all of your code. Every time you start a new app - we recommend creating
            a new Instance.
          </div>
        </div>,
        radius: 200
      },
      {
        node: ReactDOM.findDOMNode(this.refs.addInstanceButton),
        text: <div>You can add a new <strong style={styles.tourHighlight}>Instance</strong> by clicking here
          <div style={styles.secondLine}>
            You will see a similar button placed in same screen corner, on other views as well - you will
            use it to add new items in Classes, Snippets, Schedules, Triggers, Users, Groups and Channels
          </div>
        </div>,
        radius: 95
      },
      {
        node: document.getElementById('menu-account'),
        text: <div>
          Use this link to go into your <strong style={styles.tourHighlight}>Account</strong> settings
          <div style={styles.secondLine}>
            Your profile, authentication info and pending invitations list or Billing information (your billing
            plan, payment methods or list of invoices).
          </div>
        </div>,
        radius: 350,
        top: -20,
        left: -180,
        run: toggleAccountMenu
      },
      {
        node: document.getElementById('menu-solutions'),
        text: <div>
            Use this link to go into <strong style={styles.tourHighlight}>Solutions</strong> listing<br />
            Browse and install existing Solutions or create a new one.
            <div style={styles.secondLine}>
              Solutions are Syncano app templates made by other users and are a great way to speed up the development
              process of your app.
            </div>
            <div style={styles.secondLine}>
              Read more on Solutions
              in <a style={styles.link} href="http://docs.syncano.com/docs/solutions" target="_blank">our docs</a>.
            </div>
          </div>,
        radius: 100,
        top: -14,
        left: 20
      }
    ];
  },

  onNextStep() {
    Actions.setTourConfig(this.getTourConfig());
    Actions.nextStep();
  },

  render() {
    return (
      <div>
        <div style={{position: 'fixed', left: 10, bottom: 10}}>
          <IconButton
            ref="addInstanceButton"
            iconClassName="synicon-help-circle"
            onClick={this.onNextStep}
            touch={true}
            iconStyle={{color: 'rgba(0,0,0,.4)'}}/>
        </div>

        <Tour
          config={this.state.tourConfig}
          currentStep={this.state.currentStep}
          visible={this.state.isTourVisible}
          onClick={this.onNextStep}
          showDots={true}/>
      </div>
    );
  }
});
