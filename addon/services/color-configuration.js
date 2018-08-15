import ConfigService from 'explorviz-frontend/services/configuration';

/**
*Extends the configuration service from the frontend core by
*colors for highlighting changed and unchanged elements in merged application.
* @class Color-Configuration-Service
* @extends Configuration-Service
*/
export default ConfigService.extend({
  /**
  * Colors for inactive elements in an application
  *
  * @property inactiveApplicationColors
  * @type Object
  */
  inactiveApplicationColors: {
    foundation: "rgb(199,199,199)",
    componentOdd: "rgb(127, 129, 132)",
    clazz: "rgb(54, 55, 56)",
    communication: "rgb(153, 153, 153)",
    highlightedEntity: "rgb(255,0,0)",
  },

  /**
  * Colors for elements that are as modelled in an application
  *
  * @property addedApplicationColors
  * @type Object
  */
  asModelledApplicationColors: {
	foundation: "rgb(206,206,206)",
	componentOdd: "rgb(0,187,65)",
	componentEven: "rgb(22,158,43)",
	clazz: "rgb(62,20,160)",
	highlightedEntity: "rgb(255,0,0)"
  },

  /**
  * Colors for ghost elements in an application
  *
  * @property editedApplicationColors
  * @type Object
  */
  ghostApplicationColors: {
    foundation: "rgb(150,150,239)",
    componentOdd: "rgb(0,189,255)",
    componentEven: "rgb(1,155,232)",
    clazz: "rgb(0,0,255)",
    communication: "rgb(0, 0, 250)",
    highlightedEntity: "rgb(0,0,255)",
  },

  /**
  * Colors for warning elements in an application
  *
  * @property originalApplicationColors
  * @type Object
  */
  warningApplicationColors: {
    foundation: "rgb(239,150,150)",
    componentOdd: "rgb(214, 29, 29)",
    componentEven: "rgb(179, 0, 0)",
    clazz: "rgb(112, 0, 0)",
    communication: "rgb(255,0,0)",
    highlightedEntity: "rgb(255,255,0)",
  },

  //without further commments the colors for the landscape view
  asModelledLandscapeColors: {
	system: "rgb(199,199,199)",
	nodegroup: "rgb(1,155,32)",
	node: "rgb(0,189,56)",
	application: "rgb(81,34,183)",
	communication: "rgb(244,145,0)",
	textsystem: "rgb(0,0,0)",
	textnode: "rgb(255,255,255)",
	textapp: "rgb(255,255,255)",
	collapseSymbol: "rgb(0,0,0)",
	textchanged: false
  },
  ghostLandscapeColors: {
	system: "rgb(150,150,239)",
	nodegroup: "rgb(1,155,232)",
	node: "rgb(0,189,255)",
	application: "rgb(0,0,255)",
	communication: "rgb(30,240,255)",
	textsystem: "rgb(0,0,0)",
	textnode: "rgb(255,255,255)",
	textapp: "rgb(255,255,255)",
	collapseSymbol: "rgb(0,0,0)",
	textchanged: false
  },

  warningLandscapeColors: {
  	system: "rgb(239,150,150)",
	nodegroup: "rgb(179, 0, 0)",
	node: "rgb(214, 29, 29)",
	application: "rgb(112, 0, 0)",
	communication: "rgb(255,0,0)",
	textsystem: "rgb(0,0,0)",
	textnode: "rgb(255,255,255)",
	textapp: "rgb(255,255,255)",
	collapseSymbol: "rgb(0,0,0)",
	textchanged: false
  }



});