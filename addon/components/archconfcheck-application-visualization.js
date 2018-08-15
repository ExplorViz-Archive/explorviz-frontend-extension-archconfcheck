import layout from '../templates/components/archconfcheck-application-visualization';
import ApplicationRendering from 'explorviz-frontend/components/visualization/rendering/application-rendering';
import {inject as service} from '@ember/service';

import THREE from "three";

import applyKlayLayout from
 'explorviz-frontend/utils/landscape-rendering/klay-layouter';

export default ApplicationRendering.extend({
  layout,
  reloadHandler: service("reload-handler"),
  renderingService: service("rendering-service"),
  configurationService: service("color-configuration"),
  coreConfiguration: service("configuration"),
  archConfCheckRepo : service("archconfcheck-repository"),

  // @Override
  cleanup() {
    this._super(...arguments);

    this.debug("cleanup application rendering");

    // remove foundation for re-rendering
    this.get('foundationBuilder').removeFoundation(this.get('store'));

    this.set('applicationID', null);
    this.set('application3D', null);

    this.get('renderingService').off('redrawScene');

    // clean up mergedRepo for visualization template
    this.set('archConfCheckRepo.archConfCheckApplication', null);

    this.get('interaction').removeHandlers();
  },

  //coloring of components and classes
  addComponentToScene(component, color) {

  	let asModelledFoundation = this.get('configurationService').get('asModelledApplicationColors.foundation');
  	let asModelledComponentOdd = this.get('configurationService').get('asModelledApplicationColors.componentOdd');
  	let asModelledComponentEven = this.get('configurationService').get('asModelledApplicationColors.componentEven');
  	let asModelledClazz = this.get('configurationService').get('asModelledApplicationColors.clazz');
  	
  	let warningFoundation = this.get('configurationService').get('warningApplicationColors.foundation');
  	let warningComponentOdd = this.get('configurationService').get('warningApplicationColors.componentOdd');
  	let warningComponentEven = this.get('configurationService').get('warningApplicationColors.componentEven');
  	let warningClazz = this.get('configurationService').get('warningApplicationColors.clazz');

  	let ghostFoundation = this.get('configurationService').get('ghostApplicationColors.foundation');
  	let ghostComponentOdd = this.get('configurationService').get('ghostApplicationColors.componentOdd');
  	let ghostComponentEven = this.get('configurationService').get('ghostApplicationColors.componentEven');
  	let ghostClazz = this.get('configurationService').get('ghostApplicationColors.clazz');
  	
    console.log("name des Comp: ");
    console.log(component.get("name"));
    console.log("    " + component.get('extensionAttributes.status'));

    //this is true when a foundation is wanted!
    if(color === 0xCECECE){
      switch(component.get('extensionAttributes.status')){
        case("ASMODELLED"):
        color = asModelledFoundation;
        break;
        case("WARNING"):
        color = warningFoundation;
        break;
        case("GHOST"):
        console.log("ich male jetzt eine ghost foundation!");
        color = ghostFoundation;
        break;
        default:
        break;
      }
    }

    this.createBox(component, color, false);

    component.set('color', color);

    const clazzes = component.get('clazzes');
    const children = component.get('children');

    clazzes.forEach((clazz) => {
      if (component.get('opened')) {
        switch(clazz.get('extensionAttributes.status')){
        case("WARNING"):
        	this.createBox(clazz, warningClazz , true);
        	break;
        case("GHOST"):
        	this.createBox(clazz, ghostClazz , true);
        	break;
        case("ASMODELLED"):
        	this.createBox(clazz, asModelledClazz , true);
        	break;
        default:
        	this.createBox(clazz, "rgb(206,206,206)" , true);
        	break;
        }
      }
    });

    children.forEach((child) => {
		if (component.get('opened')) {
			switch(child.get('extensionAttributes.status')){
			case("WARNING"):
				if(component.get('color') === warningComponentEven || component.get('color') === warningFoundation || component.get('color') === asModelledFoundation || component.get('color') === ghostFoundation){
					this.addComponentToScene(child, warningComponentOdd);
				}else{
					this.addComponentToScene(child, warningComponentEven);
				}
				break;
			case("GHOST"):
				if(component.get('color') === ghostComponentEven  || component.get('color') === warningFoundation || component.get('color') === asModelledFoundation || component.get('color') === ghostFoundation){
					this.addComponentToScene(child, ghostComponentOdd);
				}else{
					this.addComponentToScene(child, ghostComponentEven);
				}
				break;
			case("ASMODELLED"):
				if(component.get('color') === asModelledComponentEven  || component.get('color') === warningFoundation || component.get('color') === asModelledFoundation || component.get('color') === ghostFoundation){
					this.addComponentToScene(child, asModelledComponentOdd);
				}else{
					this.addComponentToScene(child, asModelledComponentEven);
				}
				break;
			default:
				switch(child.get('extensionAttributes.status')){
					case("WARNING"):
						this.addComponentToScene(child, warningComponentOdd);	
						break;
					case("GHOST"):
						this.addComponentToScene(child, ghostComponentOdd);	
						break;
					case("ASMODELLED"):
						this.addComponentToScene(child, asModelledComponentOdd);	
						break;
				}
			}
		}
	});
  } // END addComponentToScene
});