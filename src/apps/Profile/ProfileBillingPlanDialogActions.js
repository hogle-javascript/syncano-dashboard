import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions({
    withDialog : true,
  },
  {
    fetch         : {},
    setInstances  : {},

    fetchBillingPlans: {
      asyncResult : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Billing.listPlans'
    },
    subscribePlan: {
      asyncResult : true,
      asyncForm   : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Billing.subscribePlan'
    },
    fetchBillingCard: {
      asyncResult : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Billing.getCard'
    },
    fetchBillingSubscriptions: {
      asyncResult : true,
      asyncForm   : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Billing.listSubscriptions'
    },
    updateCard: {
      asyncResult : true,
      asyncForm   : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Billing.updateCard'
    },
  }
);