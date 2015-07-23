var React                       = require('react'),
    Reflux                      = require('reflux'),

    SessionStore                = require('../Session/SessionStore'),
    ProfileActions              = require('./ProfileActions'),
    ProfileBillingInvoicesStore = require('./ProfileBillingInvoicesStore'),

    MUI                         = require('material-ui'),
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

  handlePDFClick: function(invoice) {
    let pdfUrl = SYNCANO_BASE_URL + invoice.links.pdf.replace('/', '');
    pdfUrl += '?api_key=' + SessionStore.getToken('');
    location.href = pdfUrl;
  },

  renderListItem: function(invoice) {
    return (
      <Item key = {invoice.id}>
        <ColumnDesc>{invoice.period}</ColumnDesc>
        <ColumnDesc>{invoice.id}</ColumnDesc>
        <ColumnDesc>{invoice.amount}</ColumnDesc>
        <ColumnDesc>{invoice.status}</ColumnDesc>
        <ColumnDesc>
          <MUI.FlatButton
            label   = "VIEW"
            primary = {true}
            onClick = {this.handlePDFClick.bind(null, invoice)} />
        </ColumnDesc>
      </Item>
    );
  },

  render: function () {
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