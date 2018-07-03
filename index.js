'use strict';

module.exports = {
  name: 'explorviz-frontend-extension-archconfcheck',
  
  included: function(app) {
    this._super.included.apply(this, arguments);    
    app.import('vendor/style.css');
  },

  isDevelopingAddon() {
    return true;
  }

};
