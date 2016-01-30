(function() {
	'use strict';
	angular.module('app')
	.controller('DraftsController', DraftsController);

	function DraftsController(UserFactory, HomeFactory) {
		var vm = this;
		vm.drafts = [];

		/* Get Drafts */
		vm.getDrafts = function() {
			UserFactory.getDrafts().then(function(res){
				vm.drafts = res;
			});
		}
		vm.getDrafts();

		/* Set Draft Information For Viewing */
		vm.setCurrentDraft = function(draft) {
			HomeFactory.currentDraft = draft;
		};

	}
})();
