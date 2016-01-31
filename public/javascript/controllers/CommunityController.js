(function() {
	'use strict';
	angular.module('app')
	.controller('CommunityController', CommunityController);

	function CommunityController(UserFactory, HomeFactory) {
		var vm = this;
		vm.openMenu = false;
		vm.drafts = [];

		/* Get All Drafts */
		vm.getAllDrafts = function() {
			UserFactory.getAllDrafts().then(function(res) {
				console.log(res);
				vm.drafts = res;
			});
		};
		vm.getAllDrafts();


		/* Set Draft Information For Viewing */
		vm.setCurrentDraft = function(draft) {
			HomeFactory.currentDraft = draft;
		};

	}
})();
