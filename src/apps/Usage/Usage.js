import React, { Component } from 'react';
import Helmet from 'react-helmet';

// Components
import { Container, InnerToolbar } from '../../common/';
import Chart from '../Profile/ProfileBillingChart';

class Usage extends Component {
  render() {
    return (
      <div>
        <Helmet title="Usage" />
        <InnerToolbar title="Usage" />
        <Container>
          <Chart />
        </Container>
      </div>
    );
  }
}

export default Usage;
