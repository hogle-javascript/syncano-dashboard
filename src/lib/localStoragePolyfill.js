(() => {
  let isSupported = true;
  const mod = 'syncano';
  const polyfill = {
    _data: {},

    setItem: function(id, val) {
      return this._data[id] = String(val);
    },

    getItem: function(id) {
      return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },

    removeItem: function(id) {
      return delete this._data[id];
    },

    clear: function() {
      return this._data = {};
    }
  };

  try {
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
  } catch(e) {
    isSupported = false;
  }

  if (isSupported === true) {
    return;
  }

  try {
    window.localStorage = polyfill;
  } catch (e) {
    Storage.prototype._setItem    = Storage.prototype.setItem;
    Storage.prototype._getItem    = Storage.prototype.getItem;
    Storage.prototype._removeItem = Storage.prototype.removeItem;
    Storage.prototype._clear      = Storage.prototype.clear;

    Storage.prototype._data      = {};
    Storage.prototype.setItem    = polyfill.setItem;
    Storage.prototype.getItem    = polyfill.getItem;
    Storage.prototype.removeItem = polyfill.removeItem;
    Storage.prototype.clear      = polyfill.clear;
  }
})();
