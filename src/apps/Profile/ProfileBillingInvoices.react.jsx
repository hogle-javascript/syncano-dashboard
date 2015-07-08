var React                       = require('react'),
    Reflux                      = require('reflux'),
    _                           = require('lodash'),

    ProfileActions              = require('./ProfileActions'),
    ProfileBillingInvoicesStore = require('./ProfileBillingInvoicesStore'),

    mui                         = require('material-ui'),
    Loading                     = require('../../common/Loading/Loading.react'),
    Show                        = require('../../common/Show/Show.react'),

    // List
    ListContainer             = require('../../common/Lists/ListContainer.react'),
    List                      = require('../../common/Lists/List.react'),
    Item                      = require('../../common/ColumnList/Item.react'),
    Header                    = require('../../common/ColumnList/Header.react'),
    ColumnDesc                = require('../../common/ColumnList/Column/Desc.react');

module.exports = React.createClass({

  displayName: 'ProfileBillingInvoices',

  mixins: [
    Reflux.connect(ProfileBillingInvoicesStore)
  ],

  componentDidMount: function() {
    ProfileActions.fetchInvoices();
  },

  renderListItem: function(invoice) {
    return (
      <Item key = {invoice.id}>
        <ColumnDesc>{invoice.period}</ColumnDesc>
        <ColumnDesc>{invoice.id}</ColumnDesc>
        <ColumnDesc>{invoice.amount}</ColumnDesc>
        <ColumnDesc>{invoice.status}</ColumnDesc>
        <ColumnDesc>
          <a href={invoice.links.pdf}>VIEW</a>
        </ColumnDesc>
      </Item>
    );
  },

  render: function () {
    console.log(this.state);
    return (
      <Loading show={this.state.isLoading}>
        <Show if={this.state.invoices.length === 0}>
          <div>
            <p>You have no invoices</p>
          </div>
        </Show>

        <Show if={this.state.invoices.length > 0}>
          <ListContainer>
            <Header>
              <ColumnDesc.Header>Period</ColumnDesc.Header>
              <ColumnDesc.Header>Invoice ID</ColumnDesc.Header>
              <ColumnDesc.Header>Amount</ColumnDesc.Header>
              <ColumnDesc.Header>Status</ColumnDesc.Header>
              <ColumnDesc.Header>Action</ColumnDesc.Header>
            </Header>
            <List>
              {this.state.invoices.map(this.renderListItem)}
            </List>
          </ListContainer>
        </Show>
      </Loading>
    );
  }

});