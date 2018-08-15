import Component from '@ember/component';
import { inject as service } from "@ember/service";
import layout from '../templates/components/navbar-resetview-arch-conf-check';


export default Component.extend({

	layout,

	tagName: '',

	archConfCheckRepo: service('archconfcheck-repository'),
	renderingService: service("rendering-service"),
	
	actions:{
		resetApplication(){
			console.log("das hier wird auch aufgerufen wie es geplant war von anfang an");
			this.set('archConfCheckRepo.archConfCheckApplication', null);
			this.get('renderingService').reSetupScene();
		}
	}

});

