var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    Actions = require('./InstanceDialogActions'),
    InstancesActions = require('./InstancesActions');

var InstanceDialogStore = Reflux.createStore({
  listenables : Actions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      name        : null,
      description : null
    };
  },

  init: function() {
    this.listenToForms();
  },

  genUniqueName() {
    // Move it it some other store/utils?
    let adjs = [
      'autumn', 'hidden', 'bitter', 'misty', 'silent', 'empty', 'dry', 'dark',
      'summer', 'icy', 'delicate', 'quiet', 'white', 'cool', 'spring', 'winter',
      'patient', 'twilight', 'dawn', 'crimson', 'wispy', 'weathered', 'blue',
      'billowing', 'broken', 'cold', 'damp', 'falling', 'frosty', 'green',
      'long', 'late', 'lingering', 'bold', 'little', 'morning', 'muddy', 'old',
      'red', 'rough', 'still', 'small', 'sparkling', 'throbbing', 'shy',
      'wandering', 'withered', 'wild', 'black', 'young', 'holy', 'solitary',
      'fragrant', 'aged', 'snowy', 'proud', 'floral', 'restless', 'divine',
      'polished', 'ancient', 'purple', 'lively', 'nameless'
    ];

    let nouns = [
      'waterfall', 'river', 'breeze', 'moon', 'rain', 'wind', 'sea', 'morning',
      'snow', 'lake', 'sunset', 'pine', 'shadow', 'leaf', 'dawn', 'glitter',
      'forest', 'hill', 'cloud', 'meadow', 'sun', 'glade', 'bird', 'brook',
      'butterfly', 'bush', 'dew', 'dust', 'field', 'fire', 'flower', 'firefly',
      'feather', 'grass', 'haze', 'mountain', 'night', 'pond', 'darkness',
      'snowflake', 'silence', 'sound', 'sky', 'shape', 'surf', 'thunder',
      'violet', 'water', 'wildflower', 'wave', 'water', 'resonance', 'sun',
      'wood', 'dream', 'cherry', 'tree', 'fog', 'frost', 'voice', 'paper',
      'frog', 'smoke', 'star'
    ];
    let rnd  = Math.floor(Math.random() * 9000) + 1000;
    let noun = nouns[Math.floor(Math.random() * nouns.length)];
    let adj  = adjs[Math.floor(Math.random() * adjs.length)];
    return adj + '-' + noun + '-' + rnd;
  },

  onCreateInstanceCompleted: function() {
    console.debug('InstanceDialogStore::onCreateInstanceCompleted');
    this.dismissDialog();
    InstancesActions.fetchInstances();
  },

  onUpdateInstanceCompleted: function() {
    console.debug('InstanceDialogStore::onUpdateInstanceCompleted');
    this.dismissDialog();
    InstancesActions.fetchInstances();
  }

});

module.exports = InstanceDialogStore;
