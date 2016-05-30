import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Grid, Breakpoint} from 'react-responsive-grid';
import SessionStore from '../apps/Session/SessionStore';
import {Header, Sidebar, NoMobileInfo} from '../common/';

class Dashboard extends Component {
  componentDidMount() {
    const {router} = this.props;

    if (SessionStore.getSignUpMode()) {
      SessionStore.removeSignUpMode();
      router.push({name: 'setup'});
    }
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
        <Grid style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <Breakpoint
            minWidth={768}
            widthMethod="componentWidth"
            style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <Header/>
            {this.props.children}
          </Breakpoint>
          <Breakpoint maxWidth={767} widthMethod="componentWidth">
            <div className="row">
              <Sidebar
                logoCentered="true"
                style={{width: '100%'}}>
                <NoMobileInfo/>
              </Sidebar>
            </div>
          </Breakpoint>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Dashboard);
