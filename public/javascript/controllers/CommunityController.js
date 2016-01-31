(function() {
	'use strict';
	angular.module('app')
	.controller('CommunityController', CommunityController);

	function CommunityController() {
		var vm = this;
		vm.openMenu = false;
		vm.drafts = [];

	}
})();
