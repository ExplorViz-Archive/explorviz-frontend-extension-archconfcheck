import AlertifyHandler from 'explorviz-frontend/mixins/alertify-handler';
import { inject as service } from "@ember/service";
import Service from '@ember/service';

/**
* This service loads the modell landscape.
*
* @class Modell-Load-Service
* @extends Ember.Service
*/
export default Service.extend(AlertifyHandler, {

store: service('store'),



  receiveMergedLandscape(timestamps){
    const self = this;

    this.debug("start archConfCheck-landscape-fetch");
    this.get("store").adapterFor('landscape').set('namespace', 'extension/archconfcheck');
    this.get("store").queryRecord("landscape", "landscape/archconfcheck/" + timestamps).then(success, failure).catch(error);

    //------------- Start of inner functions of updateObject ---------------
    function success(landscape){
      self.set('archConfCheckRepo.archConfCheckLandscape', landscape);
      self.get('archConfCheckRepo').triggerUpdate();
      self.debug("end archConfCheck-landscape-fetch");
      self.get("store").adapterFor('landscape').set('namespace', 'landscape');
    }

    function failure(e){
      self.showAlertifyMessage("ArchConfCheck Landscape couldn't be requested!" +
        " Backend offline?");
      self.debug("ArchConfCheck Landscape couldn't be requested!", e);
      self.get("store").adapterFor('landscape').set('namespace', 'landscape');
    }

    function error(e){
      this.showAlertifyMessage(e);
      self.get("store").adapterFor('landscape').set('namespace', 'landscape');
    }
  }
});