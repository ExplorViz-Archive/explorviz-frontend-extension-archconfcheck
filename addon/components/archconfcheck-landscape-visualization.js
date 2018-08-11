import layout from '../templates/components/archconfcheck-landscape-visualization';
import LandscapeRendering from 'explorviz-frontend/components/visualization/rendering/landscape-rendering';
import {inject as service} from '@ember/service';

import THREE from "three";

import applyKlayLayout from
 'explorviz-frontend/utils/landscape-rendering/klay-layouter';

export default LandscapeRendering.extend({
  layout,

	renderingService: service("rendering-service"),
	configurationService: service("color-configuration"),
	ArchConfCheckRepo : service("archconfcheck-repository"),


	hammerManager: null,

	interaction: null,
	labeler: null,
	imageLoader: null,
	centerAndZoomCalculator: null,

	openSymbol: null,
	closeSymbol: null,

	//here the colors of the planes are set.
 	createPlane(model) {

		const emberModelName = model.constructor.modelName;
		const asmodelled = "ASMODELLED";
		const warning = "WARNING";
		const ghost = "GHOST";

		let material = null;

		switch(model.get('extensionAttributes.status')){
		case asmodelled:
			material = new THREE.MeshBasicMaterial({
				color: this.get('configurationService.asModelledLandscapeColors.' + emberModelName)
			});
			break;
		case ghost:
			material = new THREE.MeshBasicMaterial({
				color: this.get('configurationService.ghostLandscapeColors.' + emberModelName)
			});
			break;
		case warning:
			material = new THREE.MeshBasicMaterial({
				color: this.get('configurationService.warningLandscapeColors.' + emberModelName)
			});
			break;
		default:
			material = new THREE.MeshBasicMaterial({
				color: this.get('configurationService.asModelledLandscapeColors.' + emberModelName)
			});
			break;
		}

      // const material = new THREE.MeshBasicMaterial({
      //   color: self.get('configuration.landscapeColors.' + emberModelName)
      // });

		const plane = new THREE.Mesh(new THREE.PlaneGeometry(model.get('width'),
		model.get('height')), material);

		plane.userData['model'] = model;
		return plane;

	},
	createLine(tile, tiles, parent, centerPoint) {

		let materialPlane = null;
      
		switch(tile.drawStatus){
		case "ASMODELLED":
			tile.positionZ = 0.002;
			materialPlane = new THREE.MeshBasicMaterial({
				color: this.get('configurationService.asModelledLandscapeColors.communication')
			});
			break;
		case "GHOST":
			tile.positionZ = 0.0026;
			materialPlane = new THREE.MeshBasicMaterial({
				color: this.get('configurationService.ghostLandscapeColors.communication')
			});
			break;
		case "WARNING":
			tile.positionZ = 0.003;
			materialPlane = new THREE.MeshBasicMaterial({
				color: this.get('configurationService.warningLandscapeColors.communication')
			});
			break;
		default:
			tile.positionZ = 0.0019;
			materialPlane = new THREE.MeshBasicMaterial({
				color: "rgb(0,5,0)"
			});
			break;
		}

      let firstVector = new THREE.Vector3(tile.startPoint.x - centerPoint.x,
        tile.startPoint.y - centerPoint.y, tile.positionZ);
      let secondVector = new THREE.Vector3(tile.endPoint.x - centerPoint.x,
          tile.endPoint.y - centerPoint.y, tile.positionZ);

      // New line approach (draw planes)

      // Euclidean distance
      const lengthPlane = Math.sqrt(
        Math.pow((firstVector.x - secondVector.x),2) +
        Math.pow((firstVector.y - secondVector.y),2));

      const geometryPlane = new THREE.PlaneGeometry(lengthPlane,
        tile.lineThickness * 0.4);

      const plane = new THREE.Mesh(geometryPlane, materialPlane);

      let isDiagonalPlane = false;
      const diagonalPos = new THREE.Vector3();

      // Rotate plane => diagonal plane (diagonal commu line)
      if (Math.abs(firstVector.y - secondVector.y) > 0.1) {
        isDiagonalPlane = true;

        const distanceVector = new THREE.Vector3()
          .subVectors(secondVector, firstVector);

        plane.rotateZ(Math.atan2(distanceVector.y, distanceVector.x));

        diagonalPos.copy(distanceVector).multiplyScalar(0.5).add(firstVector);
      }

      // Set plane position
      if (!isDiagonalPlane) {
        const posX = firstVector.x + (lengthPlane / 2);
        const posY = firstVector.y;
        const posZ = firstVector.z;

        plane.position.set(posX, posY, posZ);
      }
      else {
        plane.position.copy(diagonalPos);
      }

      plane.userData['model'] = tile.emberModel;

      parent.add(plane);
    } // END createLine
});
