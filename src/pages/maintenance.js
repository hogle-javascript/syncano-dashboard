import React from 'react';
import { RaisedButton } from 'material-ui';
import AlertPageContent from '../common/AlertPageContent';

export default () => {
  return (
    <AlertPageContent
      imgSrc={require('!file-loader!../assets/img/illustrations/our-platform-is-currently-undergoing-maintenance.svg')}
      headline="Our platform is currently undergoing maintenance."
      message={<span>We'll be back as soon as we update a few things.<br />Thank you for your patience!</span>}
      buttonSet={
        <div>
          <a href="https://www.syncano.io/" target="_blank">
            <RaisedButton
              label="Go to our website"
              backgroundColor="#FFCC01"
              labelColor="#1D2228"
              style={{ height: 44, width: 210, boxShadow: 'none', margin: '0 10px' }}
              labelStyle={{ fontWeight: 700 }}
            />
          </a>
          <a href="http://status.syncano.com/" target="_blank">
            <RaisedButton
              label="Syncano Status Page"
              backgroundColor="#E0E0E0"
              labelColor="#1D2228"
              style={{ height: 44, width: 210, boxShadow: 'none', margin: '0 10px' }}
              labelStyle={{ fontWeight: 700 }}
            />
          </a>
        </div>
      }
      bottomText={
        <span>
          Our <a href="http://status.syncano.com/" target="_blank">status page</a> is reporting a status of <br />
          <strong>Partial Outage</strong>
        </span>
      }
    />
  );
};
