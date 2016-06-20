import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Grid, Breakpoint } from 'react-responsive-grid';
import SessionStore from '../apps/Session/SessionStore';
import ProfileBillingPlanStore from '../apps/Profile/ProfileBillingPlanStore';
import { UpgradeNowToolbar, Header, NoMobileInfo } from '../common/';

class Dashboard extends Component {
  componentDidMount() {
    const { router } = this.props;

    if (SessionStore.getSignUpMode()) {
      SessionStore.removeSignUpMode();
      router.push({ name: 'setup' });
    }

    ProfileBillingPlanStore.init();
  }

  renderUpgradeToolbar() {
    const plan = ProfileBillingPlanStore.getPlan();
    const endDate = ProfileBillingPlanStore.getActiveSubscriptionEndDate();

    if (plan !== 'builder') {
      return null;
    }

    return <UpgradeNowToolbar subscriptionEndDate={endDate} />;
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Grid style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Breakpoint
            minWidth={768}
            widthMethod="componentWidth"
            style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
          >
            <Header />
            {this.props.children}
            {this.renderUpgradeToolbar()}
          </Breakpoint>
          <Breakpoint maxWidth={767} widthMethod="componentWidth">
            <NoMobileInfo />
          </Breakpoint>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Dashboard);
