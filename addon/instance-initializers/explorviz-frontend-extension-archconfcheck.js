import Router from "explorviz-frontend/router";

export function initialize(appInstance) {

  const service = appInstance.lookup("service:page-setup");

  if(service){
    service.get("navbarRoutes").push("archconfcheck");
  }

  Router.map(function() {
    this.route("archconfcheck");
  });
}

export default {
  name: 'explorviz-frontend-extension-archconfcheck',
  initialize
};