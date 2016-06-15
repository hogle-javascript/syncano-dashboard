import React from 'react';
import AlertPageContent from '../common/AlertPageContent';

export default () => {
  return (
    <AlertPageContent
      imgSrc={require('!file-loader!../assets/img/illustrations/no-active-plan.svg')}
      headline="No active plan"
      message={`Oh no! You have reached the end of your free trial. Simply upgrade your account for access to all of
        Syncano’s features.`}
      buttonLinkTo="profile-billing-plan"
      buttonLabel="Upgrade My Plan"
      buttonDescription="(Plans start as low as $25)"
    />
  );
};
