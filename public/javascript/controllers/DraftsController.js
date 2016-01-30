(function() {
	'use strict';
	angular.module('app')
	.controller('DraftsController', DraftsController);

	function DraftsController(UserFactory) {
		var vm = this;
		vm.drafts = [];

		/* Get Drafts */
		vm.getDrafts = function() {
			UserFactory.getDrafts().then(function(res){
				vm.drafts = res;
			});
		}
		vm.getDrafts();

	}
})();
