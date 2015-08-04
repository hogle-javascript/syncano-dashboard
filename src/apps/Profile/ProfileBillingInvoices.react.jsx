import React from 'react';
import Reflux from 'reflux';

import SessionStore from '../Session/SessionStore';
import Actions from './ProfileActions';
import Store from './ProfileBillingInvoicesStore';

import MUI from 'material-ui';
import Common from '../../common';
import EmptyContainer from '../../common/Container/EmptyContainer.react';

let ColumnList = Common.ColumnList;
let Column = ColumnList.Column;

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
      <ColumnList.Item key={invoice.id}>
        <Column.Desc>{invoice.period}</Column.Desc>
        <Column.Desc>{invoice.id}</Column.Desc>
        <Column.Desc>{invoice.amount}</Column.Desc>
        <Column.Desc>{invoice.status}</Column.Desc>
        <Column.Desc>
          <MUI.FlatButton
            label="VIEW"
            primary={true}
            onClick={this.handlePDFClick.bind(null, invoice)}/>
        </Column.Desc>
      </ColumnList.Item>
    );
  },

  render() {
    return (
      <Common.Loading show={this.state.isLoading}>
        <Common.Show if={this.state.invoices.length < 1}>
          <EmptyContainer
            icon='synicon-file-outline'
            text='You have no invoices'/>
        </Common.Show>

        <Common.Show if={this.state.invoices.length > 0}>
          <Common.Lists.Container style={{width: '100%', margin: '65px 0px 0px 0px'}}>
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
