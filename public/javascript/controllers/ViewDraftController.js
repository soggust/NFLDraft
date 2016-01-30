(function() {
	'use strict';
	angular.module('app')
	.controller('ViewDraftController', ViewDraftController);

	function ViewDraftController (HomeFactory) {
		var vm = this;
		vm.draft = HomeFactory.currentDraft;

		console.log(vm.draft);

	}
})();
