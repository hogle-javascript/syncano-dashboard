import React from 'react';
import Reflux from 'reflux';

import SessionStore from '../Session/SessionStore';
import Actions from './ProfileActions';
import Store from './ProfileBillingInvoicesStore';

import MUI from 'material-ui';
import Common from '../../common';
import EmptyContainer from '../../common/Container/EmptyContainer.react';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ProfileBillingInvoices',

  mixins: [
    Reflux.connect(Store)
  ],

  componentDidMount() {
    Actions.fetchInvoices();
  },

  handlePDFClick(invoice) {
    let pdfUrl = SYNCANO_BASE_URL + invoice.links.pdf.replace('/', '');
    pdfUrl += '?api_key=' + SessionStore.getToken('');
    location.href = pdfUrl;
  },

  renderListItem(invoice) {
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

  render() {
    return (
      <Common.Loading show={this.state.isLoading}>
        <Common.Show if={this.state.invoices.length < 1}>
          <EmptyContainer
            icon = 'synicon-file-outline'
            text = 'You have no invoices'/>
        </Common.Show>

        <Common.Show if={this.state.invoices.length > 0}>
          <Common.Lists.Container>
            <Common.ColumnList.Header>
              <Column.Desc.Header>Period</Column.Desc.Header>
              <Column.Desc.Header>Invoice ID</Column.Desc.Header>
              <Column.Desc.Header>Amount</Column.Desc.Header>
              <Column.Desc.Header>Status</Column.Desc.Header>
              <Column.Desc.Header>Action</Column.Desc.Header>
            </Common.ColumnList.Header>
            <Common.Lists.List>
              {this.state.invoices.map(this.renderListItem)}
            </Common.Lists.List>
          </Common.Lists.Container>
        </Common.Show>
      </Common.Loading>
    );
  }
});
