import React from 'react';
import Reflux from 'reflux';

import SessionStore from '../Session/SessionStore';
import Actions from './ProfileActions';
import Store from './ProfileBillingInvoicesStore';

import {FlatButton} from 'syncano-material-ui';
import {ColumnList, Container, Loading, Show} from 'syncano-components';
import {InnerToolbar, Lists} from '../../common';

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
    let pdfUrl = SYNCANO_BASE_URL.slice(0, -1) + invoice.links.pdf;

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
          <FlatButton
            label="VIEW"
            primary={true}
            onClick={this.handlePDFClick.bind(null, invoice)}/>
        </Column.Desc>
      </ColumnList.Item>
    );
  },

  render() {
    return (
      <Loading show={this.state.isLoading}>
        <InnerToolbar title="Invoices"/>

        <Show if={this.state.invoices.length < 1}>
          <Container.Empty
            icon='synicon-file-outline'
            text='You have no invoices'/>
        </Show>

        <Show if={this.state.invoices.length > 0}>
          <Lists.Container
            style={{width: '100%', margin: '65px 0px 0px 0px'}}
            className='invoices-list'>
            <ColumnList.Header>
              <Column.ColumnHeader columnName="DESC">Period</Column.ColumnHeader>
              <Column.ColumnHeader columnName="DESC">Invoice ID</Column.ColumnHeader>
              <Column.ColumnHeader columnName="DESC">Amount</Column.ColumnHeader>
              <Column.ColumnHeader columnName="DESC">Status</Column.ColumnHeader>
              <Column.ColumnHeader columnName="DESC">Action</Column.ColumnHeader>
            </ColumnList.Header>
            <Lists.List key="invoices-list">
              {this.state.invoices.map(this.renderListItem)}
            </Lists.List>
          </Lists.Container>
        </Show>
      </Loading>
    );
  }
});
