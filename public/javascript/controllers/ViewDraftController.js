(function() {
	'use strict';
	angular.module('app')
	.controller('ViewDraftController', ViewDraftController);

	function ViewDraftController (HomeFactory) {
		var vm = this;

		vm.picks = HomeFactory.picks;

	}
})();
