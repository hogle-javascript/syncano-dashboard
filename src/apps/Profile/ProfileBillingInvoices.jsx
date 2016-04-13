import React from 'react';
import Reflux from 'reflux';

import SessionStore from '../Session/SessionStore';
import Actions from './ProfileActions';
import Store from './ProfileBillingInvoicesStore';

import {RaisedButton} from 'syncano-material-ui';
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

  render() {
    const {isLoading, invoices} = this.state;

    return (
      <Loading show={isLoading}>
        <InnerToolbar title="Invoices"/>

        <Show if={invoices.length < 1}>
          <Container.Empty
            icon="synicon-file-outline"
            text="You have no invoices"/>
        </Show>

        <Show if={invoices.length > 0}>
          <Container>
            <Lists.Container className='invoices-list'>
              <ColumnList.Header>
                <Column.ColumnHeader columnName="DESC">Period</Column.ColumnHeader>
                <Column.ColumnHeader columnName="DESC">Invoice ID</Column.ColumnHeader>
                <Column.ColumnHeader columnName="DESC">Amount</Column.ColumnHeader>
                <Column.ColumnHeader columnName="DESC">Status</Column.ColumnHeader>
                <Column.ColumnHeader columnName="DESC">Action</Column.ColumnHeader>
              </ColumnList.Header>
              <Lists.List key="invoices-list">
                {invoices.map((invoice) => (
                  <ColumnList.Item key={invoice.id}>
                    <Column.Desc>{invoice.period}</Column.Desc>
                    <Column.Desc>{invoice.id}</Column.Desc>
                    <Column.Desc>{invoice.amount}</Column.Desc>
                    <Column.Desc>{invoice.status}</Column.Desc>
                    <Column.Desc>
                      <RaisedButton
                        label="VIEW"
                        primary={true}
                        onClick={() => this.handlePDFClick(invoice)}/>
                    </Column.Desc>
                  </ColumnList.Item>
                ))}
              </Lists.List>
            </Lists.Container>
          </Container>
        </Show>
      </Loading>
    );
  }
});
