var React                     = require('react'),
    Reflux                    = require('reflux'),

    // Utils
    HeaderMixin               = require('../Header/HeaderMixin'),
    DialogsMixin              = require('../../mixins/DialogsMixin'),
    Show                      = require('../../common/Show/Show.react'),

    // Stores and Actions
    ProfileInvitationsActions = require('./ProfileInvitationsActions'),
    ProfileInvitationsStore   = require('./ProfileInvitationsStore'),

    // Components
    mui                       = require('material-ui'),
    Colors                    = mui.Styles.Colors,
    Dialog                    = mui.Dialog,
    FontIcon                  = mui.FontIcon,
    FabList                   = require('../../common/Fab/FabList.react'),
    FabListItem               = require('../../common/Fab/FabListItem.react'),
    Container                 = require('../../common/Container/Container.react'),

    // List
    ListContainer             = require('../../common/Lists/ListContainer.react'),
    List                      = require('../../common/Lists/List.react'),
    Item                      = require('../../common/ColumnList/Item.react'),
    Header                    = require('../../common/ColumnList/Header.react'),
    LoadingItem               = require('../../common/ColumnList/LoadingItem.react'),
    ColumnDesc                = require('../../common/ColumnList/Column/Desc.react'),
    ColumnDate                = require('../../common/ColumnList/Column/Date.react'),
    ColumnCheckIcon           = require('../../common/ColumnList/Column/CheckIcon.react');


module.exports = React.createClass({

  displayName: 'ProfileInvitations',

  mixins: [
    Reflux.connect(ProfileInvitationsStore),
    HeaderMixin,
    DialogsMixin
  ],

  headerBreadcrumbs: [
    {
      route: 'dashboard',
      label: 'Home'
    },
    {
      route: 'profile-settings',
      label: 'Account'
    },
    {
      route: 'profile-invitations',
      label: 'Invitations'
    }
  ],

  headerMenuItems: [
    {
      route: 'profile-settings',
      label: 'Profile'
    },
    {
      route: 'profile-authentication',
      label: 'Authentication'
    },
    {
      route: 'profile-billing',
      label: 'Billing'
    },
    {
      route: 'profile-invitations',
      label: 'Invitations'
    }
  ],

  initDialogs: function () {
    var checked = ProfileInvitationsStore.getCheckedItems().length;

    return [
      {
        dialog: Dialog,
        params: {
          ref:    "acceptInvitationsDialog",
          title:  "Accept Invitation",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Yes, I'm sure.", onClick: this.handleAccept}
          ],
          modal: true,
          children: 'Do you really want to accept ' + checked +' Invitations?'
        }
      },
      {
        dialog: Dialog,
        params: {
          ref  : "declineInvitationsDialog",
          title:  "Decline Invitation",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Yes, I'm sure.", onClick: this.handleDecline}
          ],
          modal: true,
          children: 'Do you really want to decline ' + checked +' Invitations?'
        }
      }
    ]
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.info('ProfileInvitations::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount: function() {
    console.info('ProfileInvitations::componentDidMount');
    ProfileInvitationsActions.fetch();
  },

  uncheckAll: function() {
    console.info('ProfileInvitations::uncheckAll');
    ProfileInvitationsActions.uncheckAll();
  },

  checkItem: function(id, state){
    console.info('ProfileInvitations::checkItem');
    ProfileInvitationsActions.checkItem(id, state);
  },

  handleAccept: function() {
    console.info('ProfileInvitations::handleAccept');
    ProfileInvitationsActions.acceptInvitations(ProfileInvitationsStore.getCheckedItems());
  },

  handleDecline: function() {
    console.info('ProfileInvitations::handleDecline');
    ProfileInvitationsActions.declineInvitations(ProfileInvitationsStore.getCheckedItems());
  },

  getStyles: function() {
    return {
      container: {
        margin       : '64px auto',
        textAlign    : 'center'
      },
      icon: {
        fontSize     : 96,
        lineHeight   : 1,
        marginBottom : 16,
        color        : 'rgba(0, 0, 0, 0.24)'
      },
      text: {
        color        : 'rgba(0, 0, 0, 0.87)',
        fontSize     : 34,
        margin       : 0
      }
    }
  },

  renderItem: function (item) {
    return (
      <Item
        checked = {item.checked}
        key     = {item.id}>
        <ColumnCheckIcon
          id              = {item.id.toString()}
          icon            = 'account'
          background      = {Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.checkItem} >
          {item.instance}
        </ColumnCheckIcon>
        <ColumnDesc>{item.inviter}</ColumnDesc>
        <ColumnDesc>{item.role}</ColumnDesc>
        <ColumnDate>{item.created_at}</ColumnDate>
      </Item>
    )
  },

  renderList: function () {
    if (this.state.isLoading) {
      return <LoadingItem />;
    }

    var items = this.state.items.map(function (item) {
      return this.renderItem(item)
    }.bind(this));

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
  },

  render: function () {
    var styles             = this.getStyles(),
        checkedInvitations = ProfileInvitationsStore.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <Show if={checkedInvitations > 0}>
          <FabList position="top">

            <FabListItem
              label         = "Click here to unselect all"
              mini          = {true}
              onClick       = {this.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline" />

            <FabListItem
              label         = "Click here to accept Invitations"
              mini          = {true}
              onClick       = {this.showDialog('acceptInvitationsDialog')}
              iconClassName = "synicon-check" />

            <FabListItem
              label         = "Click here to decline Invitations"
              mini          = {true}
              onClick       = {this.showDialog('declineInvitationsDialog')}
              iconClassName = "synicon-delete" />

          </FabList>
        </Show>

        <Show if={this.state.items.length < 1}>
          <div style={styles.container}>
            <FontIcon style={styles.icon} className="synicon-email-outline" />
            <p style={styles.text}>You have no invitations</p>
          </div>
        </Show>

        <Show if={this.state.items.length > 0}>
          <ListContainer>
            <Header>
              <ColumnCheckIcon.Header>Invitations</ColumnCheckIcon.Header>
              <ColumnDesc.Header>From</ColumnDesc.Header>
              <ColumnDesc.Header>Role</ColumnDesc.Header>
              <ColumnDate.Header>Created</ColumnDate.Header>
            </Header>
            <List>
              {this.renderList()}
            </List>
          </ListContainer>
        </Show>
      </Container>
    );
  }

});