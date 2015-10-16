import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import CodeBoxesStore from '../CodeBoxes/CodeBoxesStore';

// Components
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'SchedulesList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      items: this.props.items,
      isLoading: this.props.isLoading
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      isLoading: nextProps.isLoading
    });
  },

  // List
  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
  },

  handleItemClick(itemId) {
    // Redirect to traces screen
    this.transitionTo('schedule-traces', {
      instanceName: this.getParams().instanceName,
      scheduleId: itemId
    });
  },

  renderItem(item) {
    let codeBox = CodeBoxesStore.getCodeBoxById(item.codebox);
    let codeBoxLabel = codeBox ? codeBox.label : '';

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}
        handleClick={this.handleItemClick.bind(null, item.id)}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='camera-timer'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.handleItemIconClick}>
          {item.label}
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Desc className="col-sm-6">{codeBoxLabel}</Column.Desc>
        <Column.Desc>{item.crontab}</Column.Desc>
        <Column.Date date={item.scheduled_next}/>
        <Column.Date date={item.created_at}/>
      </Common.ColumnList.Item>
    );
  },

  renderList() {
    let items = this.state.items.map((item) => this.renderItem(item));

    if (items.length > 0) {
      items.reverse();
      return items;
    }

    return (
      <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </Common.ColumnList.EmptyItem>
    );
  },

  render() {
    return (
      <Common.Lists.Container>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-sm-6">
            CodeBox
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Crontab</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Next run</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.state.isLoading}>
            {this.renderList()}
          </Common.Loading>
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});

