import LandscapeRepo from 'explorviz-frontend/services/repos/landscape-repository';

/**
* This service provides the merged landscape and application to the addon's namespace. 
*
* @class Merged-Repository-Service
* @extends Landscape-Repository-Service
*/
export default LandscapeRepo.extend({

  archConfCheckLandscape: null,

  archConfCheckApplication: null,

  triggerUpdate(){
  	console.log("wir triggern ein update auf dem archconfcheckRepo");
  	console.log(this.get('archConfCheckLandscape'));
  	console.log("app:");
  	console.log(this.get('archConfCheckApplication'));
    this.trigger("updated", this.get("archConfCheckLandscape"));
  }

});