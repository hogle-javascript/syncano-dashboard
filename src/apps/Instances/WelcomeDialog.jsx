import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';


import MUI from 'material-ui';
import Common from '../../common';

export default Radium(React.createClass({

  displayName: 'WelcomeDialog',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    })
  },

  getInitialState() {
    return {
      visible: this.props.visible
    }
  },

  handleCloseDialog() {
    this.setState({visible: false});
    this.props.getStared();
  },

  getStyles() {
    return {
      main: {
        display: this.state.visible || 'none'
      },
      paper: {
        position: 'fixed',
        top: 200,
        width: 400,
        transform: 'translateX(-50%)', left: '50%',
        zIndex: 1020
      },
      text: {
        backgroundImage: 'url(/img/bg.png)',
        backgroundColor: this.context.muiTheme.palette.primary1Color,
        padding: 35,
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

    }
  },

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.main}>
        <div style={styles.overlay}/>
        <MUI.Paper
          ref="dialog"
          style={styles.paper}>
          <div style={{color: 'white', height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
            <div style={styles.text}>
              <MUI.Avatar size={80} src={'/img/fox.png'}/>

              <div style={{paddingTop: 16, paddingBottom: 24, fontStyle: 'regular'}}>
                Welcome to your <strong>Syncano</strong> dashboard!
              </div>
              <div>
                This is where the <strong>magic</strong> happens. Now get to work, you <strong>superstar</strong> you.
              </div>
            </div>

            <MUI.FlatButton
              style={{margin: '24px auto', width: '80%'}}
              label='Create your first Instance now!'
              primary={true}
              onClick={this.handleCloseDialog}/>
          </div>

        </MUI.Paper>
      </div>
    );
  }
}));

