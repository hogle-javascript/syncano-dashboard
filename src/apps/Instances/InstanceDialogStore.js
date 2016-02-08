import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin} from '../../mixins';

// Stores & Actions
import Actions from './InstanceDialogActions';
import InstancesActions from './InstancesActions';
import InstancesStore from './InstancesStore';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState() {
    return {
      name: null,
      isLoading: false,
      metadata: {}
    };
  },

  init() {
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
    let rnd = Math.floor(Math.random() * 9000) + 1000;
    let noun = nouns[Math.floor(Math.random() * nouns.length)];
    let adj = adjs[Math.floor(Math.random() * adjs.length)];

    return adj + '-' + noun + '-' + rnd;
  },

  onCreateInstance() {
    this.trigger({isLoading: true});
  },

  onCreateInstanceCompleted() {
    console.debug('InstanceDialogStore::onCreateInstanceCompleted');
    this.dismissDialog();
    InstancesActions.fetchInstances();
  },

  onCreateInstanceFailure() {
    this.trigger({isLoading: false});
  },

  onUpdateInstance() {
    this.trigger({isLoading: true});
  },

  onUpdateInstanceCompleted() {
    console.debug('InstanceDialogStore::onUpdateInstanceCompleted');
    this.dismissDialog();
    InstancesActions.fetchInstances();
  },

  onUpdateInstanceFailure() {
    this.trigger({isLoading: false});
  },

  onRenameInstance() {
    this.trigger({isLoading: true});
  },

  onRenameInstanceCompleted() {
    this.dismissDialog();
    InstancesActions.fetchInstances();
    InstancesStore.redirectToInstancesList();
  },

  onRenameInstanceFailure() {
    this.trigger({isLoading: false});
  },

  onRenameAndUpdateInstance() {
    this.trigger({isLoading: true});
  },

  onRenameAndUpdateInstanceCompleted() {
    this.dismissDialog();
    InstancesActions.fetchInstances();
    InstancesStore.redirectToInstancesList();
  },

  onRenameAndUpdateInstanceFailure() {
    this.trigger({isLoading: false});
  }
});
