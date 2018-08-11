import Component from '@ember/component';
import layout from '../templates/components/archconfcheck-dropdown';
import Service from '@ember/service';
import ENV from 'explorviz-frontend/config/environment';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from "@ember/service";
import AlertifyHandler from 'explorviz-frontend/mixins/alertify-handler';

export default Component.extend({ 
  layout,


	replayModels: null,
	archConfCheckRepo: service('archconfcheck-repository'),
	store: service(),

	session: service(),
	ajax: service('ajax'),

	init(){
		this._super(...arguments);
		this.getListFromBackend();
	},

	didRender(){
		this._super(...arguments);
		//this.getListFromBackend();
	},
	getListFromBackend(){
		const { access_token } = this.get('session.data.authenticated');
		
		const self = this;

		const url = `${ENV.APP.API_ROOT}${'/landscape/fill-dropdown'}`

		this.get('ajax').raw(url, {
			'id': this,
			headers: { 'Authorization': `Basic ${access_token}` },
			dataType: 'json',
			options: {
				arraybuffer: true
			}
		}
		).then((content) => {
			self.set('replayModels', content.payload);
		}).catch((error) => {

			this.debug("Could not download file", error);
			throw new Error("Could not download file. Enable debugging in console");

		});
	},

	setModellLandscape(nameOfModel){
		const self = this;
		//TODO react to the selected monitored landscape
		
		this.debug("start landscape-request");
		//TODO "0-0" has to be replaced by the moniored Landscape timestamp and activity load
		this.get("store").queryRecord('landscape', 'comparedModel/' + "0-0" + "_" + nameOfModel)
			.then(success, failure).catch(error);

		//--------------inner functions--------------
		function success(landscape){
			self.set('archConfCheckRepo.archConfCheckLandscape', null);
			self.debug("end landscape-request");
			self.set('archConfCheckRepo.archConfCheckLandscape', landscape);
			self.get('archConfCheckRepo').triggerUpdate();
		}

		function failure(e){
			self.showAlertifyMessage("Landscape couldn't be requested!" +
			" Backend offline?");
			self.debug("Landscape couldn't be requested!", e);
		}


		function error(e){
			self.debug("Error when fetching landscape: ", e);
		}
		//------------End of inner functions------------

	},

	actions: {

		select(data) {
			this.setModellLandscape(data);
		}

	}

});
