import React from 'react';
import Helmet from 'react-helmet';
import { Container, InnerToolbar } from '../../common/';
import Chart from '../Profile/ProfileBillingChart';

const Usage = () => (
  <div>
    <Helmet title="Usage" />
    <InnerToolbar title="Usage" />
    <Container>
      <Chart />
    </Container>
  </div>
);

export default Usage;
