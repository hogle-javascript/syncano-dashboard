import React from 'react';
import Radium from 'radium';

import { Paper, Avatar, FlatButton } from 'material-ui';

export default Radium(React.createClass({
  displayName: 'WelcomeDialog',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState() {
    return {
      visible: this.props.visible
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    });
  },

  getStyles() {
    return {
      main: {
        display: this.state.visible ? 'block' : 'none'
      },
      paper: {
        position: 'fixed',
        top: '50%',
        width: 400,
        transform: 'translate(-50%, -50%)',
        left: '50%',
        zIndex: 1020
      },
      text: {
        backgroundImage: 'url(/img/bg.png)',
        backgroundColor: this.context.muiTheme.rawTheme.palette.primary1Color,
        padding: '35px 30px',
        width: '100%',
        textAlign: 'center',
        fontSize: '2rem',
        lineHeight: '2.1rem',
        height: 340
      },
      overlay: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 8,
        background: 'rgba(0, 0, 0, 0.541176)'
      }

    };
  },

  handleCloseDialog() {
    this.setState({ visible: false });
    this.props.getStarted();
  },

  render() {
    const styles = this.getStyles();

    return (
      <div className="welcome-dialog" style={styles.main}>
        <div style={styles.overlay}></div>
        <Paper
          ref="dialog"
          style={styles.paper}
        >
          <div style={{ color: 'white', height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={styles.text}>
              <Avatar size={80} src={'/img/fox.png'} />

              <div style={{ paddingTop: 16, paddingBottom: 24 }}>
                Welcome to your <strong>Syncano</strong> dashboard!
              </div>
              <div style={{ fontSize: '1.8rem' }}>
                This is where the <strong>magic</strong> happens. Now get to work, you <strong>superstar</strong> you.
              </div>
            </div>

            <FlatButton
              style={{ margin: '24px auto', width: '80%' }}
              label="Go to your first instance!"
              primary={true}
              onClick={this.handleCloseDialog}
            />
          </div>
        </Paper>
      </div>
    );
  }
}));

