import BaseRoute from 'explorviz-frontend/routes/base-route';
import AlertifyHandler from 'explorviz-frontend/mixins/alertify-handler';
import {inject as service} from '@ember/service';

export default BaseRoute.extend(AlertifyHandler, {

	archConfCheckRepo: service('archconfcheck-repository'),
	store: service(),
	renderingService: service("rendering-service"),

  actions: {
    // @Override BaseRoute
    resetRoute() {
      // your cleanup code here
    },
    switchLandscape(){
		this.set('archConfCheckRepo.archConfCheckApplication', null);
	}
  }

});